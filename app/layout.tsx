import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Geist_Mono } from 'next/font/google'
import './globals.css'

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'KAILAB | Péptidos para investigación en Colombia',
  description:
    'Explora péptidos de investigación, consulta sus presentaciones y los certificados de análisis disponibles. Envío gratis a toda Colombia.',
  generator: 'v0.app',
  openGraph: {
    title: 'KAILAB | Péptidos para investigación en Colombia',
    description: 'Explora péptidos de investigación, consulta sus presentaciones y los certificados de análisis disponibles. Envío gratis a toda Colombia.',
    images: ['/03 — Banners y gráficos opcionales-20260918T175123Z-1-001/03 — Banners y gráficos opcionales/KAILAB_Product-Lineup_6-Vials_Banner_White.png'],
  },
  icons: {
    icon: '/KAILAB_Favicon_512.svg',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#17294F',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

import { KailabProviders } from '@/components/kailab/kailab-providers'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`dark ${fontSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground w-full overflow-x-hidden">
        <KailabProviders>
          {children}
        </KailabProviders>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
