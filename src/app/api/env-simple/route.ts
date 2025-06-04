import { NextResponse } from 'next/server';

export async function GET() {
  // Simple environment variable check with different approaches
  const result = {
    timestamp: new Date().toISOString(),
    process_env_direct: {
      EMAIL_USER: process.env.EMAIL_USER || 'NOT_FOUND',
      EMAIL_PASS: process.env.EMAIL_PASS || 'NOT_FOUND',
    },
    process_env_exists: {
      EMAIL_USER: 'EMAIL_USER' in process.env,
      EMAIL_PASS: 'EMAIL_PASS' in process.env,
    },
    all_env_keys: Object.keys(process.env).filter(key => 
      key.includes('EMAIL') || key.includes('MAIL') || key.includes('SMTP')
    ),
    env_count: Object.keys(process.env).length,
    vercel_info: {
      VERCEL: process.env.VERCEL,
      VERCEL_ENV: process.env.VERCEL_ENV,
      NODE_ENV: process.env.NODE_ENV,
    }
  };

  return NextResponse.json(result);
}
