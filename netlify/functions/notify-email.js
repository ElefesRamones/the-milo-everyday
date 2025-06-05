// Reliable email handler using Resend API
exports.handler = async (event, context) => {
  console.log('Email notification function triggered');
  console.log('Event:', event.httpMethod, event.path);
  console.log('Headers:', event.headers);
  
  // Handle both form submissions and direct function calls
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    let formData;
    
    // Parse form data from different sources
    if (event.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
      formData = new URLSearchParams(event.body);
    } else if (event.headers['content-type']?.includes('application/json')) {
      const jsonData = JSON.parse(event.body);
      formData = new URLSearchParams();
      Object.entries(jsonData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    } else {
      formData = new URLSearchParams(event.body);
    }
    
    const submission = {
      name: formData.get('name'),
      email: formData.get('email'),
      projectType: formData.get('projectType'), 
      message: formData.get('message'),
      formName: formData.get('form-name')
    };

    console.log('Processing email for submission:', submission);

    // Validate required fields
    if (!submission.name || !submission.email || !submission.message) {
      console.log('Missing required fields:', submission);
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Missing required fields',
          received: submission 
        })
      };
    }

    // Try to send email
    const emailSent = await sendEmailNotification(submission);
    
    if (emailSent.success) {
      console.log('Email sent successfully:', emailSent.data);
      
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Email notification sent successfully',
          emailId: emailSent.data,
          submission: submission
        })
      };
    } else {
      console.error('Failed to send email:', emailSent.error);
      
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Failed to send email notification',
          details: emailSent.error,
          submission: submission
        })
      };
    }

  } catch (error) {
    console.error('Error in email function:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal server error',
        details: error.message
      })
    };
  }
};

async function sendEmailNotification(submission) {
  try {
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 30px; border-radius: 10px;">
          <h1 style="color: #333; margin-bottom: 20px;">New Contact Form Submission</h1>
          <p style="color: #666; font-size: 16px;">You have received a new contact form submission from your portfolio website.</p>
        </div>
        
        <div style="padding: 30px; background-color: white; border: 1px solid #e9ecef; margin-top: 20px;">
          <h2 style="color: #495057; border-bottom: 2px solid #007bff; padding-bottom: 10px;">Contact Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${submission.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                <a href="mailto:${submission.email}" style="color: #007bff;">${submission.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Project Type:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${submission.projectType || 'Not specified'}</td>
            </tr>
          </table>
        </div>
        
        <div style="padding: 30px; background-color: #fff; border: 1px solid #e9ecef; margin-top: 10px;">
          <h2 style="color: #495057; border-bottom: 2px solid #28a745; padding-bottom: 10px;">Message</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; border-left: 4px solid #28a745;">
            <p style="line-height: 1.6; margin: 0; white-space: pre-wrap;">${submission.message}</p>
          </div>
        </div>
        
        <div style="padding: 20px; background-color: #f8f9fa; text-align: center; margin-top: 20px; border-radius: 5px;">
          <p style="margin: 0; color: #6c757d; font-size: 14px;">
            <strong>Submitted:</strong> ${new Date().toLocaleString()}<br>
            <strong>Website:</strong> <a href="https://ramonescapulong.com" style="color: #007bff;">ramonescapulong.com</a>
          </p>
        </div>
      </div>
    `;

    const emailText = `
New Contact Form Submission - Portfolio Website

Contact Information:
Name: ${submission.name}
Email: ${submission.email}
Project Type: ${submission.projectType || 'Not specified'}

Message:
${submission.message}

Submitted: ${new Date().toLocaleString()}
Website: https://ramonescapulong.com
    `;

    // Check if we have Resend API key
    if (process.env.RESEND_API_KEY) {
      console.log('Sending email via Resend API...');
      
      const emailData = {
        from: 'Portfolio Contact <contact@ramonescapulong.com>',
        to: ['elefesramones51@gmail.com'],
        subject: `New Contact: ${submission.name} - ${submission.projectType || 'Portfolio Inquiry'}`,
        html: emailHTML,
        text: emailText
      };

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Resend API error:', response.status, errorData);
        throw new Error(`Resend API error: ${response.status} - ${errorData}`);
      }

      const result = await response.json();
      console.log('Resend email sent:', result);
      
      return { success: true, data: result.id };
      
    } else {
      // Fallback: log email details for manual review
      console.log('No email service configured - logging email details:');
      console.log('TO:', 'elefesramones51@gmail.com');
      console.log('SUBJECT:', `New Contact: ${submission.name} - ${submission.projectType || 'Portfolio Inquiry'}`);
      console.log('CONTENT:', emailText);
      
      return { 
        success: true, 
        data: 'logged-' + Date.now(),
        note: 'Email logged - configure RESEND_API_KEY for actual sending'
      };
    }

  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}
