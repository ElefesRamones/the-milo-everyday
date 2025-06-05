// Simple email sending function for contact form
exports.handler = async (event, context) => {
  console.log('Email function triggered');
  
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

    // Create email content
    const emailContent = {
      to: 'Elefesramones51@gmail.com',
      subject: 'New Contact Form Submission - Portfolio Website',
      text: `
New Contact Form Submission

Name: ${submission.name}
Email: ${submission.email}
Project Type: ${submission.projectType}

Message:
${submission.message}

Submitted at: ${new Date().toLocaleString()}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p>You have received a new contact form submission from your portfolio website:</p>

<h3>Contact Details:</h3>
<ul>
  <li><strong>Name:</strong> ${submission.name}</li>
  <li><strong>Email:</strong> ${submission.email}</li>
  <li><strong>Project Type:</strong> ${submission.projectType}</li>
</ul>

<h3>Message:</h3>
<p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">${submission.message.replace(/\n/g, '<br>')}</p>

<hr>
<p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
      `
    };

    // For now, just log the email content (we'll add actual sending later)
    console.log('Email would be sent to:', emailContent.to);
    console.log('Subject:', emailContent.subject);
    console.log('From:', submission.name, '(' + submission.email + ')');

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Email notification processed',
        data: submission
      })
    };

  } catch (error) {
    console.error('Error processing email:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Failed to process email'
      })
    };
  }
};
