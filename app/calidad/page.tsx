import { TopBar } from '@/components/kailab/top-bar'
import { Navbar } from '@/components/kailab/navbar'
import { CalidadClient } from '@/components/kailab/calidad-client'
import { Footer } from '@/components/kailab/footer'
import { getSiteSettings } from '@/lib/sanity-queries'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calidad y certificados de análisis | KAILAB',
  description: 'Consulta los certificados de análisis disponibles por producto, presentación y lote. Revisa los informes de laboratorio y entiende sus resultados.',
  openGraph: {
    images: [
      {
        url: '/KAILAB_Logo_Navy-Blue.svg',
        width: 1200,
        height: 630,
        alt: 'Logo de KAILAB',
      },
    ],
  },
}

export default async function CalidadPage() {
  const siteSettings = await getSiteSettings()

  return (
    <div className="min-h-[100dvh] bg-background">
      <TopBar />
      <Navbar siteSettings={siteSettings} />
      
      <main className="pt-0">
        <CalidadClient />
      </main>

      <Footer siteSettings={siteSettings} />
    </div>
  )
}
