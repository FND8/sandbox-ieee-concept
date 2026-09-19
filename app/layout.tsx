import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Noto_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { ConditionalNavbar } from "@/components/conditional-navbar";

const notoSansHeading = Noto_Sans({subsets:['latin'],variable:'--font-heading'});

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Sandbox IEEE ITB',
    template: '%s | The Sandbox 4.0',
  },
  description: 'The Sandbox 4.0 by IEEE ITB Student Branch is a national-level competition event featuring three competitions: ProtoTech Competition (PTC), Technovate Paper Competition (TPC), and Business Case Competition (BCC). Through structured competition flows, participants are encouraged to develop innovative solutions using smart automation technology to address real-world challenges.',
  keywords: [
    'Sandbox',
    'Sandbox IEEE ITB',
    'Sandbox ITB',
    'IEEE ITB',
    'ITB',
    'TPC',
    'PTC',
    'BCC',
  ],
  authors: [{ name: 'Farrell Nabil Deyandra' }],
  creator: 'Farrell Nabil Deyandra',
  publisher: 'Farrell Nabil Deyandra',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sandbox-ieee-concept.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sandbox-ieee-concept.vercel.app',
    title: 'Sadbox IEEE ITB',
    description: 'The Sandbox 4.0 by IEEE ITB Student Branch is a national-level competition event featuring three competitions: ProtoTech Competition (PTC), Technovate Paper Competition (TPC), and Business Case Competition (BCC). Through structured competition flows, participants are encouraged to develop innovative solutions using smart automation technology to address real-world challenges.',
    siteName: 'Sandbox IEEE ITB',
    images: [
      {
        url: '/sandbox-logo.png', 
        width: 800,
        height: 800,
        alt: 'Sandbox by IEEE ITB Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sandbox IEEE ITB',
    description: 'The Sandbox 4.0 by IEEE ITB Student Branch is a national-level competition event featuring three competitions: ProtoTech Competition (PTC), Technovate Paper Competition (TPC), and Business Case Competition (BCC). Through structured competition flows, participants are encouraged to develop innovative solutions using smart automation technology to address real-world challenges.',
    images: ['/sandbox-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable, notoSansHeading.variable, "dark")}
    >
      <body className="min-h-full flex flex-col">
        <ConditionalNavbar />
        {children}
        <Toaster position="top-center" richColors/>
      </body>
    </html>
  );
}
