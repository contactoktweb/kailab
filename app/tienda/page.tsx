import type { Metadata } from 'next'
import { TiendaClient } from '@/components/kailab/tienda-client'
import { getSiteSettings, getStorePage, getProducts } from '@/lib/sanity-queries'
import { products as localProducts } from '@/components/kailab/data'

export const metadata: Metadata = {
  title: 'Tienda de péptidos para investigación | KAILAB',
  description: 'Consulta las presentaciones, los precios y la información de nuestros péptidos para investigación. Envío gratis a toda Colombia.',
}

export default async function TiendaPage() {
  const [siteSettings, storePageData] = await Promise.all([
    getSiteSettings(),
    getStorePage()
  ])

  // Usamos localProducts temporalmente para reflejar los cambios de desarrollo
  return <TiendaClient siteSettings={siteSettings} products={localProducts as any} storePageData={storePageData} />
}
