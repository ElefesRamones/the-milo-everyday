import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, projectType, message } = await request.json();

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
      );
    }    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Ramones' Gmail address
        pass: process.env.EMAIL_PASS, // App password (not regular password)
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
