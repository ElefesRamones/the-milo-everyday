import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check all possible environment variable sources
    const envCheck = {
      // Process env direct access
      processEnv: {
        EMAIL_USER: !!process.env.EMAIL_USER,
        EMAIL_PASS: !!process.env.EMAIL_PASS,
        NODE_ENV: process.env.NODE_ENV,
        VERCEL_ENV: process.env.VERCEL_ENV,
      },
      // Check if variables exist with different naming
      alternativeNaming: {
        EMAIL_USER_EXISTS: !!process.env.EMAIL_USER,
        SMTP_USER_EXISTS: !!process.env.SMTP_USER,
        GMAIL_USER_EXISTS: !!process.env.GMAIL_USER,
        EMAIL_PASS_EXISTS: !!process.env.EMAIL_PASS,
        SMTP_PASS_EXISTS: !!process.env.SMTP_PASS,
        GMAIL_PASS_EXISTS: !!process.env.GMAIL_PASS,
      },
      // Check all environment variable keys that contain EMAIL
      emailRelatedKeys: Object.keys(process.env).filter(key => 
        key.toLowerCase().includes('email') || 
        key.toLowerCase().includes('smtp') || 
        key.toLowerCase().includes('mail')
      ),
      // Runtime info
      runtime: {
        isVercel: !!process.env.VERCEL,
        isProduction: process.env.NODE_ENV === 'production',
        vercelEnv: process.env.VERCEL_ENV,
        timestamp: new Date().toISOString(),
      },
      // Try to access env from different sources
      envSources: {
        directAccess: {
          EMAIL_USER: process.env.EMAIL_USER ? 'PRESENT' : 'MISSING',
          EMAIL_PASS: process.env.EMAIL_PASS ? 'PRESENT' : 'MISSING',
        },
        // Check if there are any env variables at all
        totalEnvVars: Object.keys(process.env).length,
        sampleKeys: Object.keys(process.env).slice(0, 10),
      }
    };

    return NextResponse.json(envCheck, { status: 200 });
  } catch (error) {
    console.error('Environment check error:', error);
    return NextResponse.json({ 
      error: 'Failed to check environment',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
