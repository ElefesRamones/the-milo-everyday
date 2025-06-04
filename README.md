# Ramones Capulong Portfolio

A clean, modern portfolio website for Ramones (Elefes Ramones Capulong), a professional graphic designer and content editor.

## 🎯 Features

- **Clean Design**: Minimal, professional layout focusing on content
- **Responsive**: Mobile-first design that looks great on all devices
- **Fast Performance**: Optimized with Next.js 15 and Turbopack
- **SEO Optimized**: Proper meta tags and semantic structure
- **Contact Form**: Functional contact form with email integration
- **Portfolio Showcase**: Dynamic project pages with detailed case studies

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Images**: Next.js Image component + Cloudinary integration
- **Deployment**: Vercel (ready to deploy)
- **Domain**: ramonescapulong.com

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd milo-everyday
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Edit `.env.local` with your credentials:
```env
# Gmail Configuration for Contact Form
EMAIL_USER=Elefesramones51@gmail.com
EMAIL_PASS=your_gmail_app_password

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
NEXT_PUBLIC_SITE_URL=https://ramonescapulong.com
```

**📧 Gmail App Password Setup:**
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Security → 2-Step Verification (enable if not already)
3. Security → App passwords
4. Generate password for "Mail"
5. Use this 16-character password in `EMAIL_PASS`

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📁 Project Structure

```
src/
├── app/                 # Next.js 15 App Router
│   ├── layout.tsx       # Root layout with navigation
│   ├── page.tsx         # Homepage
│   ├── about/           # About page
│   ├── contact/         # Contact page
│   ├── work/            # Portfolio pages
│   │   ├── page.tsx     # Portfolio grid
│   │   └── [id]/        # Individual project pages
└── components/          # Reusable components
    ├── Navigation.tsx   # Site navigation
    └── ContactForm.tsx  # Contact form component
```

## 🎨 Design System

### Colors
- **Primary**: #2563eb (Blue)
- **Text**: #1a1a1a (Dark Gray)
- **Background**: #ffffff (White)
- **Secondary**: #f3f4f6 (Light Gray)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights for hierarchy
- **Body**: Regular weight for readability

### Layout
- **Max Width**: 1200px (6xl)
- **Responsive**: Mobile-first breakpoints
- **Spacing**: Consistent scale (4, 6, 8, 12, 16, 20, 24px)

## 📄 Pages

### Homepage (`/`)
- Hero section with call-to-action
- Featured work showcase
- About preview
- Contact section

### Portfolio (`/work`)
- Project grid with filtering
- Category organization
- Project preview cards

### Individual Projects (`/work/[id]`)
- Detailed case studies
- Project images and details
- Tools and deliverables
- Navigation to other projects

### About (`/about`)
- Professional background
- Skills and approach
- Tools and expertise
- Personal touch

### Contact (`/contact`)
- Contact form
- Project inquiry details
- Response time information
- FAQ section

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment

```bash
npm run build
npm run start
```

## 🖼 Content Management

### Adding New Projects

1. Edit `src/app/work/page.tsx` to add project to the grid
2. Add project data to `src/app/work/[id]/page.tsx`
3. Upload images to Cloudinary
4. Update image references

### Updating Content

- **Contact Info**: Update in multiple files (layout, contact page, etc.)
- **About Content**: Edit `src/app/about/page.tsx`
- **Homepage**: Edit `src/app/page.tsx`

## 📧 Contact Integration

The contact form uses a mailto fallback system:
- Form creates a pre-filled email
- Opens user's default email client
- Fallback to direct email link

For advanced form handling, consider integrating:
- Formspree
- Netlify Forms
- Custom API routes

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting (recommended)
- Consistent component structure

## 📱 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement approach

## 🔗 External Services

### Cloudinary Setup

1. Create a free Cloudinary account
2. Get your cloud name, API key, and secret
3. Add to `.env.local`
4. Upload portfolio images to Cloudinary

### Domain Configuration

For ramonescapulong.com:
1. Configure DNS settings
2. Update NEXT_PUBLIC_SITE_URL
3. Set up SSL certificate (automatic with Vercel)

## 📞 Support

For questions or support:
- **Email**: Elefesramones51@gmail.com
- **Website**: ramonescapulong.com

## 📄 License

This project is created specifically for Ramones Capulong's portfolio. Please respect the intellectual property and content rights.
