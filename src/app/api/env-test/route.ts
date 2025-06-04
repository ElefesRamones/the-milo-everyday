import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    allEnvKeys: Object.keys(process.env).filter(key => 
      key.includes('EMAIL') || key.includes('VERCEL') || key.includes('NODE')
    ),
    emailUser: process.env.EMAIL_USER || 'NOT_SET',
    emailPass: process.env.EMAIL_PASS ? 'SET' : 'NOT_SET',
    emailUserExists: !!process.env.EMAIL_USER,
    emailPassExists: !!process.env.EMAIL_PASS,
  });
}
