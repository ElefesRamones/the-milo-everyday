import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Remove explicit env config - let Next.js handle it naturally
  experimental: {
    // Enable runtime environment variable access
    serverComponentsExternalPackages: ['nodemailer'],
  },
};

export default nextConfig;
