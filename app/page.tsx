import type { Metadata } from 'next'
import { KailabLanding } from '@/components/kailab/kailab-landing'
import { getHomePage, getSiteSettings } from '@/lib/sanity-queries'
import { products as localProducts } from '@/components/kailab/data'

export const metadata: Metadata = {
  title: 'KAILAB | Péptidos para investigación en Colombia',
  description: 'Explora péptidos de investigación, consulta sus presentaciones y los certificados de análisis disponibles. Envío gratis a toda Colombia.',
  openGraph: {
    title: 'KAILAB | Péptidos para investigación en Colombia',
    description: 'Explora péptidos de investigación, consulta sus presentaciones y los certificados de análisis disponibles. Envío gratis a toda Colombia.',
    url: 'https://kailab.com.co/',
    images: [
      {
        url: '/KAILAB_Logo_Navy-Blue.svg', // Idealmente una imagen exportada de 1200x630
        width: 1200,
        height: 630,
        alt: 'KAILAB | Péptidos para investigación en Colombia',
      },
    ],
  },
}

export default async function Page() {
  const [homeData, siteSettings] = await Promise.all([
    getHomePage(),
    getSiteSettings()
  ])

  // Usamos localProducts temporalmente para desarrollo (solo Retatrutida es público)
  return <KailabLanding homeData={homeData} siteSettings={siteSettings} products={localProducts as any} />
}
