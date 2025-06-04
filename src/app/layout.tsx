import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Ramones Capulong - Graphic Designer & Content Editor",
  description: "Portfolio of Ramones (Elefes Ramones Capulong), a professional graphic designer and content editor specializing in visual solutions and brand identity.",
  keywords: ["graphic design", "content editing", "brand identity", "logo design", "digital graphics"],
  authors: [{ name: "Ramones Capulong" }],
  openGraph: {
    title: "Ramones Capulong - Graphic Designer & Content Editor",
    description: "Professional graphic designer and content editor portfolio",
    url: "https://ramonescapulong.com",
    siteName: "Ramones Capulong Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
