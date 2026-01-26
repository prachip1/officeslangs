import type { Metadata } from 'next'
import { Arimo } from 'next/font/google'
import './globals.css'

const arimo = Arimo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-arimo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Office Slang Translator',
  description: 'Translate corporate language into clear, simple English',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={arimo.variable}>
      <body className={arimo.className}>{children}</body>
    </html>
  )
}
