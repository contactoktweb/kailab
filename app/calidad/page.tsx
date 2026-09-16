import { TopBar } from '@/components/kailab/top-bar'
import { Navbar } from '@/components/kailab/navbar'
import { QualityCoa } from '@/components/kailab/home-blocks'
import { Footer } from '@/components/kailab/footer'
import { getQualityPage, getSiteSettings } from '@/lib/sanity-queries'

export default async function CalidadPage() {
  const [qualityData, siteSettings] = await Promise.all([
    getQualityPage(),
    getSiteSettings(),
  ])

  return (
    <div className="min-h-[100dvh] bg-background">
      <TopBar />
      <Navbar siteSettings={siteSettings} />
      
      <main className="pt-8">
        <QualityCoa data={qualityData} />
      </main>

      <Footer siteSettings={siteSettings} />
    </div>
  )
}
