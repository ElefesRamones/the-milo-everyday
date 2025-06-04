import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Updated: 2025-06-05 - Switched to Resend for better Vercel compatibility
export async function POST(request: NextRequest) {
  try {
    // Check for Resend API key
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      console.error('Missing RESEND_API_KEY environment variable');
      return NextResponse.json(
        { error: 'Server configuration error. Email service not configured.' },
        { status: 500 }
      );
    }

    // Initialize Resend
    const resend = new Resend(resendApiKey);

    // Parse request data - handle both JSON and FormData
    let formData;
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      formData = await request.json();
    } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      const form = await request.formData();
      formData = {
        name: form.get('name')?.toString() || '',
        email: form.get('email')?.toString() || '',
        message: form.get('message')?.toString() || ''
      };
    } else {
      // Try to parse as JSON anyway
      try {
        formData = await request.json();
      } catch {
        return NextResponse.json(
          { error: 'Invalid request format' },
          { status: 400 }
        );
      }
    }

    const { name, email, message } = formData;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    console.log('Sending email via Resend:', {
      from: email,
      to: 'elefesramones51@gmail.com',
      name: name,
      timestamp: new Date().toISOString()
    });

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <noreply@ramonescapulong.com>', // Must be from your verified domain
      to: ['elefesramones51@gmail.com'],
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 5px;">From:</h3>
            <p style="margin: 0; font-size: 16px;"><strong>${name}</strong></p>
            <p style="margin: 0; color: #666;">${email}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 5px;">Message:</h3>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #007cba;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #888; font-size: 12px;">
            <p>This message was sent from the contact form on ramonescapulong.com</p>
            <p>Sent: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

From: ${name}
Email: ${email}

Message:
${message}

---
This message was sent from the contact form on ramonescapulong.com
Sent: ${new Date().toLocaleString()}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      );
    }

    console.log('Email sent successfully via Resend:', data);

    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
