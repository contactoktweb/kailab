import { KailabLanding } from '@/components/kailab/kailab-landing'
import { getHomePage, getSiteSettings, getProducts } from '@/lib/sanity-queries'

export default async function Page() {
  const [homeData, siteSettings, products] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
    getProducts()
  ])

  return <KailabLanding homeData={homeData} siteSettings={siteSettings} products={products} />
}
