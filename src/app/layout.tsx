import { Inter, Playfair_Display, Montserrat } from 'next/font/google';
import { Metadata } from 'next';
import './globals.css';
import { fonts } from './fonts';

export const metadata: Metadata = {
  metadataBase: new URL('https://annadaataagro.com'),
  title: 'Annadaata Agro Industries - Rice Manufacturing Company in West Bengal, India',
  description: 'Leading rice manufacturer in Bardhaman, West Bengal. Specializing in premium rice varieties including Minikit, Swarna, Kuruva, IR-36, Banshkathi, and our flagship Gobindobhog Rice. Quality rice production with traditional expertise.',
  keywords: 'rice manufacturer, rice mill Bardhaman, Gobindobhog Rice, Minikit Rice, Swarna Rice, Kuruva Rice, IR-36 Rice, Banshkathi Rice, rice supplier West Bengal, rice wholesaler India, rice processing unit, bulk rice supplier',
  authors: [{ name: 'Annadaata Agro Industries' }],
  creator: 'Annadaata Agro Industries',
  publisher: 'Annadaata Agro Industries',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://annadaataagro.com',
    title: 'Annadaata Agro Industries - Rice Manufacturing Company in West Bengal',
    description: 'Leading rice manufacturer in Bardhaman, West Bengal. Premium quality rice varieties including Minikit, Swarna, Kuruva, IR-36, Banshkathi, and Gobindobhog Rice.',
    siteName: 'Annadaata Agro Industries',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Annadaata Agro Industries - Rice Manufacturing Company',
    description: 'Leading rice manufacturer in Bardhaman, West Bengal. Premium quality rice varieties with traditional expertise.',
  },
  alternates: {
    canonical: 'https://annadaataagro.com',
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
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  // verification: {
  //   google: 'add-your-google-site-verification-here',
  // },
  category: 'Food & Agriculture Manufacturing',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${fonts.inter.variable} ${fonts.playfairDisplay.variable} ${fonts.montserrat.variable} font-body`}>
        {children}
      </body>
    </html>
  );
}