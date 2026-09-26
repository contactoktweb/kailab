import type { Metadata } from 'next'
import { getSiteSettings } from '@/lib/sanity-queries'
import { CarritoClient } from '@/components/kailab/carrito-client'
import { TopBar } from '@/components/kailab/top-bar'
import { Navbar } from '@/components/kailab/navbar'
import { Footer } from '@/components/kailab/footer'

export const metadata: Metadata = {
  title: 'Tu carrito | KAILAB',
  description: 'Revisa los productos y las cantidades antes de continuar al pago.',
  robots: {
    index: false,
    follow: false
  }
}

export default async function CarritoPage() {
  const siteSettings = await getSiteSettings()

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <TopBar />
      <Navbar siteSettings={siteSettings} />
      
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <CarritoClient />
      </main>

      <Footer siteSettings={siteSettings} />
    </div>
  )
}
