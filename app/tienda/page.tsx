import { TiendaClient } from '@/components/kailab/tienda-client'
import { getSiteSettings, getStorePage } from '@/lib/sanity-queries'
import { products as localProducts } from '@/components/kailab/data'

export default async function TiendaPage() {
  const [siteSettings, storePageData] = await Promise.all([
    getSiteSettings(),
    getStorePage()
  ])

  // Usamos localProducts temporalmente para reflejar los cambios de desarrollo en Retatrutida
  return <TiendaClient siteSettings={siteSettings} products={localProducts as any} storePageData={storePageData} />
}
