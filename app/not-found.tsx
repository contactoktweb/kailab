import Link from 'next/link'
import { Icon } from '@iconify/react'
import { TopBar } from '@/components/kailab/top-bar'
import { Navbar } from '@/components/kailab/navbar'
import { Footer } from '@/components/kailab/footer'
import { getSiteSettings } from '@/lib/sanity-queries'

export default async function NotFound() {
  // Intentamos obtener configuraciones, pero si falla no rompe la página 404
  let siteSettings = null
  try {
    siteSettings = await getSiteSettings()
  } catch (e) {
    console.error(e)
  }

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col">
      <TopBar />
      <Navbar siteSettings={siteSettings} />
      <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-border bg-secondary">
          <Icon icon="lucide:file-question" className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          No encontramos esta página
        </h1>
        <p className="mb-8 text-base text-muted-foreground max-w-sm mx-auto">
          Puedes volver al inicio o buscar lo que necesitas en la tienda.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-sm border border-border bg-secondary px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/70"
          >
            <Icon icon="lucide:home" className="h-4 w-4" />
            Volver al inicio
          </Link>
          <Link
            href="/tienda"
            className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-primary bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-transparent hover:text-primary"
          >
            <Icon icon="lucide:store" className="h-4 w-4" />
            Ver productos
          </Link>
        </div>
      </main>
      <Footer siteSettings={siteSettings} />
    </div>
  )
}
