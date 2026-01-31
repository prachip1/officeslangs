import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://officeslangs.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Office Slang Translator | Decode Corporate Speak',
    template: '%s | Office Slang Translator',
  },
  description:
    'Translate corporate jargon and office slang into clear, simple English. Decode buzzwords like "circle back," "synergy," and "move the needle" instantly.',
  keywords: [
    'office slang translator',
    'corporate jargon',
    'business speak translator',
    'decode corporate language',
    'office buzzwords',
    'corporate speak',
  ],
  authors: [{ name: 'Office Slangs' }],
  creator: 'Office Slangs',
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Office Slang Translator',
    title: 'Office Slang Translator | Decode Corporate Speak',
    description:
      'Translate corporate jargon and office slang into clear, simple English.',
    locale: 'en_US',
    images: [
      {
        url: '/icon.png',
        width: 512,
        height: 512,
        alt: 'Office Slang Translator',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Office Slang Translator | Decode Corporate Speak',
    description: 'Translate corporate jargon into clear, simple English.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Office Slang Translator',
  description:
    'Translate corporate jargon and office slang into clear, simple English.',
  url: siteUrl,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Mona+Sans:ital,wght@0,200..900;1,200..900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
      <Analytics />
    </html>
  )
}
