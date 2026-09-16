import { TopBar } from '@/components/kailab/top-bar'
import { Navbar } from '@/components/kailab/navbar'
import { FaqShort } from '@/components/kailab/home-blocks'
import { Footer } from '@/components/kailab/footer'
import { getHelpPage, getSiteSettings } from '@/lib/sanity-queries'

export default async function AyudaPage() {
  const [helpData, siteSettings] = await Promise.all([
    getHelpPage(),
    getSiteSettings(),
  ])

  return (
    <div className="min-h-[100dvh] bg-background">
      <TopBar />
      <Navbar siteSettings={siteSettings} />
      
      <main className="pt-8">
        <FaqShort data={helpData} />
      </main>

      <Footer siteSettings={siteSettings} />
    </div>
  )
}
