import './globals.css';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { Inter, Poppins } from 'next/font/google';

// Load the Inter font with Latin subset and swap display strategy
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter', // CSS variable for easy usage
});

// Load the Poppins font with Latin subset, swap display, and specific weights
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600'], // Normal and semi-bold weights
  variable: '--font-poppins', // CSS variable for easy usage
});

// Metadata for the document
export const metadata: Metadata = {
  title: 'Weather App',
  description:
    'See the weather in your area with accurate forecasts and real-time updates.',

  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      {
        url: '/favicons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/favicons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/favicons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicons/safari-pinned-tab.svg',
        color: '#5bbad5',
      },
    ],
  },
  manifest: '/favicons/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'AR Portfolio',
  },
};

// RootLayout component
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
