import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    // Try multiple ways to access environment variables
    const emailUser = process.env.EMAIL_USER || process.env.SMTP_USER || process.env.GMAIL_USER;
    const emailPass = process.env.EMAIL_PASS || process.env.SMTP_PASS || process.env.GMAIL_PASS;
    
    // Log comprehensive environment variable check
    console.log('Comprehensive environment check:', {
      EMAIL_USER: !!process.env.EMAIL_USER,
      EMAIL_PASS: !!process.env.EMAIL_PASS,
      SMTP_USER: !!process.env.SMTP_USER,
      SMTP_PASS: !!process.env.SMTP_PASS,
      GMAIL_USER: !!process.env.GMAIL_USER,
      GMAIL_PASS: !!process.env.GMAIL_PASS,
      emailUser: !!emailUser,
      emailPass: !!emailPass,
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV,
      totalEnvVars: Object.keys(process.env).length,
      emailRelatedKeys: Object.keys(process.env).filter(key => 
        key.toLowerCase().includes('email') || 
        key.toLowerCase().includes('smtp') || 
        key.toLowerCase().includes('mail')
      )
    });

    // Check if environment variables are available
    if (!emailUser || !emailPass) {
      console.error('Missing environment variables:', {
        emailUser: !!emailUser,
        emailPass: !!emailPass,
        EMAIL_USER: !!process.env.EMAIL_USER,
        EMAIL_PASS: !!process.env.EMAIL_PASS
      });
      return NextResponse.json(
        { error: 'Server configuration error. Please contact support.' },
        { status: 500 }
      );
    }

    // Parse request data - handle both JSON and FormData
    let formData;
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      formData = await request.json();
    } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      const form = await request.formData();
      formData = {
        name: form.get('name') as string,
        email: form.get('email') as string,
        projectType: form.get('projectType') as string,
        message: form.get('message') as string
      };
    } else {
      // Try to parse as JSON as fallback
      try {
        formData = await request.json();
      } catch {
        return NextResponse.json(
          { error: 'Invalid request format' },
          { status: 400 }
        );
      }
    }

    const { name, email, projectType, message } = formData;

    // Validate required fields
    if (!name || !email || !projectType || !message) {
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
      );    }

    // Create transporter using Gmail SMTP with found credentials
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: emailUser, // Use the found email user variable
        pass: emailPass, // Use the found email pass variable
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify SMTP connection
    await transporter.verify();

    // Email content for Ramones
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'Elefesramones51@gmail.com',
      subject: `New Portfolio Contact: ${projectType} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Project Inquiry
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Project Type:</strong> ${projectType}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Message:</h3>
            <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #2563eb; border-radius: 4px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p>This message was sent from your portfolio contact form at ramonescapulong.com</p>
            <p>Reply directly to this email to respond to ${name}</p>
          </div>
        </div>
      `,
      replyTo: email, // Allow Ramones to reply directly to the sender
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation email to the sender
    const confirmationOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for your message - Ramones Capulong',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Thank you for reaching out!</h2>
          
          <p>Hi ${name},</p>
          
          <p>Thank you for your interest in working together. I've received your message about <strong>${projectType}</strong> and will get back to you within 24-48 hours.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your message:</h3>
            <p style="font-style: italic;">"${message}"</p>
          </div>
          
          <p>In the meantime, feel free to check out more of my work at <a href="https://ramonescapulong.com/work" style="color: #2563eb;">ramonescapulong.com/work</a>.</p>
          
          <p>Best regards,<br>
          <strong>Ramones Capulong</strong><br>
          Graphic Designer & Content Editor</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            This is an automated confirmation. Please don't reply to this email - I'll respond to your inquiry directly from my personal email.
          </p>
        </div>
      `,
    };

    // Send confirmation email (optional - comment out if not needed)
    await transporter.sendMail(confirmationOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );  } catch (error) {
    console.error('Error sending email:', error);
    
    // Log detailed error information for debugging
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    // Log environment variable status for debugging
    console.error('Environment check:', {
      emailUserExists: !!process.env.EMAIL_USER,
      emailPassExists: !!process.env.EMAIL_PASS,
      nodeEnv: process.env.NODE_ENV
    });
    
    return NextResponse.json(
      { error: 'Failed to send email. Please try again or contact directly.' },
      { status: 500 }
    );
  }
}
