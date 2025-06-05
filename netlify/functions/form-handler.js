// Netlify function to handle form submissions and send emails
const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  console.log('Form submission received:', event.body);
  
  // Only handle POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the form data
    const formData = new URLSearchParams(event.body);
    const submission = {
      name: formData.get('name'),
      email: formData.get('email'),
      projectType: formData.get('projectType'), 
      message: formData.get('message')
    };

    console.log('Parsed form data:', submission);

    // Validate required fields
    if (!submission.name || !submission.email || !submission.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Send email notification
    try {
      await sendEmailNotification(submission);
      console.log('Email notification sent successfully');
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't fail the whole function if email fails
    }

    // Return success response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Form submission processed successfully'
      })
    };

  } catch (error) {
    console.error('Error processing form submission:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Failed to process form submission'
      })
    };
  }
};

async function sendEmailNotification(submission) {
  // Create a transporter using Gmail SMTP
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS  // App-specific password
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'Elefesramones51@gmail.com',
    subject: 'New Contact Form Submission - Portfolio Website',
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
      <p>${submission.message.replace(/\n/g, '<br>')}</p>
      
      <hr>
      <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
    `,
    // Also send a plain text version
    text: `
New Contact Form Submission

Name: ${submission.name}
Email: ${submission.email}
Project Type: ${submission.projectType}

Message:
${submission.message}

Submitted at: ${new Date().toLocaleString()}
    `
  };

  return transporter.sendMail(mailOptions);
}
