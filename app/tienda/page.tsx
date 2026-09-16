import { TiendaClient } from '@/components/kailab/tienda-client'
import { getSiteSettings, getProducts, getStorePage } from '@/lib/sanity-queries'

export default async function TiendaPage() {
  const [siteSettings, products, storePageData] = await Promise.all([
    getSiteSettings(),
    getProducts(),
    getStorePage()
  ])

  return <TiendaClient siteSettings={siteSettings} products={products} storePageData={storePageData} />
}
