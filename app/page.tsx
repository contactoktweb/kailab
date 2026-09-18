import { KailabLanding } from '@/components/kailab/kailab-landing'
import { getHomePage, getSiteSettings } from '@/lib/sanity-queries'
import { products as localProducts } from '@/components/kailab/data'

export default async function Page() {
  const [homeData, siteSettings] = await Promise.all([
    getHomePage(),
    getSiteSettings()
  ])

  // Usamos localProducts temporalmente para desarrollo (solo Retatrutida es público)
  return <KailabLanding homeData={homeData} siteSettings={siteSettings} products={localProducts as any} />
}
