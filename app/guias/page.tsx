import { TopBar } from '@/components/kailab/top-bar'
import { Navbar } from '@/components/kailab/navbar'
import { GuidesBlock } from '@/components/kailab/home-blocks'
import { Footer } from '@/components/kailab/footer'
import { getGuidesPage, getSiteSettings } from '@/lib/sanity-queries'

export default async function GuiasPage() {
  const [guidesData, siteSettings] = await Promise.all([
    getGuidesPage(),
    getSiteSettings(),
  ])

  return (
    <div className="min-h-[100dvh] bg-background">
      <TopBar />
      <Navbar siteSettings={siteSettings} />
      
      <main className="pt-8">
        <GuidesBlock data={guidesData} />
      </main>

      <Footer siteSettings={siteSettings} />
    </div>
  )
}
