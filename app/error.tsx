'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
import { Icon } from '@iconify/react'
import { TopBar } from '@/components/kailab/top-bar'
import { Navbar } from '@/components/kailab/navbar'
import { Footer } from '@/components/kailab/footer'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="min-h-[100dvh] bg-background flex flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-border bg-secondary">
          <Icon icon="lucide:alert-triangle" className="h-10 w-10 text-rose-500/80" />
        </div>
        <h1 className="mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          No pudimos cargar esta información.
        </h1>
        <p className="mb-8 text-base text-muted-foreground max-w-sm mx-auto">
          Inténtalo de nuevo.
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-primary bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-transparent hover:text-primary"
        >
          <Icon icon="lucide:refresh-cw" className="h-4 w-4" />
          Reintentar
        </button>
      </main>
      <Footer />
    </div>
  )
}
