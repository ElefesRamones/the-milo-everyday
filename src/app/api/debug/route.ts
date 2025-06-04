import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      emailUserExists: !!process.env.EMAIL_USER,
      emailPassExists: !!process.env.EMAIL_PASS,
      cloudinaryExists: !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      nodeEnv: process.env.NODE_ENV,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to check environment' },
      { status: 500 }
    );
  }
}
