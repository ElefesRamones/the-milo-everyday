# Portfolio Development Scripts

## Quick Commands

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Check TypeScript
npx tsc --noEmit

## Deployment

# Deploy to Vercel
npx vercel

# Deploy to production
npx vercel --prod

## Content Updates

# Add this to package.json scripts for convenience:
# "type-check": "tsc --noEmit",
# "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md}\"",
# "format:check": "prettier --check \"**/*.{ts,tsx,js,jsx,json,md}\""

## Environment Setup

# 1. Copy environment file
cp .env.local.example .env.local

# 2. Edit with your Cloudinary credentials
# NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
# CLOUDINARY_API_KEY=your_api_key  
# CLOUDINARY_API_SECRET=your_api_secret

## Git Workflow

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial portfolio setup"

# Add remote and push
git remote add origin https://github.com/yourusername/ramones-portfolio.git
git push -u origin main
