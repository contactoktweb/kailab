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
  title: 'KAILAB — Compuestos de investigación con trazabilidad y COA por lote',
  description:
    'Tienda de compuestos para investigación (RUO) con Certificado de Análisis por lote, trazabilidad completa, evidencia clínica referenciada y logística local en Colombia.',
  generator: 'v0.app',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`dark ${fontSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground w-full overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
