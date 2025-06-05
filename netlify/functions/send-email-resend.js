// Enhanced email function using Resend API
exports.handler = async (event, context) => {
  console.log('Resend email function triggered');
  
  // Only handle POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse form data
    const formData = new URLSearchParams(event.body);
    const submission = {
      name: formData.get('name'),
      email: formData.get('email'),
      projectType: formData.get('projectType'), 
      message: formData.get('message')
    };

    console.log('Processing email for:', submission.name);

    // Validate required fields
    if (!submission.name || !submission.email || !submission.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Send email using Resend API
    const emailData = {
      from: 'Portfolio Contact <noreply@ramonescapulong.com>',
      to: ['Elefesramones51@gmail.com'],
      subject: `New Contact Form Submission from ${submission.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p>You have received a new contact form submission from your portfolio website:</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Contact Details</h3>
          <p><strong>Name:</strong> ${submission.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${submission.email}">${submission.email}</a></p>
          <p><strong>Project Type:</strong> ${submission.projectType}</p>
        </div>
        
        <div style="background-color: #fff; border-left: 4px solid #007bff; padding: 20px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Message</h3>
          <p style="line-height: 1.6;">${submission.message.replace(/\n/g, '<br>')}</p>
        </div>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 14px;">
          <strong>Submitted:</strong> ${new Date().toLocaleString()}<br>
          <strong>From:</strong> <a href="https://ramonescapulong.com">ramonescapulong.com</a>
        </p>
      `,
      text: `
New Contact Form Submission

Name: ${submission.name}
Email: ${submission.email}
Project Type: ${submission.projectType}

Message:
${submission.message}

Submitted: ${new Date().toLocaleString()}
From: ramonescapulong.com
      `
    };

    // Check if Resend API key is available
    if (!process.env.RESEND_API_KEY) {
      console.log('Resend API key not found, logging email instead');
      console.log('Email data:', emailData);
      
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Form processed (email logged - configure RESEND_API_KEY for actual sending)',
          data: submission
        })
      };
    }

    // Send email via Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      throw new Error(`Resend API error: ${response.status}`);
    }

    const result = await response.json();
    console.log('Email sent successfully:', result.id);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Email sent successfully',
        emailId: result.id,
        data: submission
      })
    };

  } catch (error) {
    console.error('Error sending email:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to send email',
        details: error.message
      })
    };
  }
};
