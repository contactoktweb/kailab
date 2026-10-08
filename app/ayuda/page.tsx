import type { Metadata } from 'next'
import { TopBar } from '@/components/kailab/top-bar'
import { Navbar } from '@/components/kailab/navbar'
import { Footer } from '@/components/kailab/footer'
import { AyudaClient } from '@/components/kailab/ayuda-client'
import { getSiteSettings, getHelpPage } from '@/lib/sanity-queries'
import { Icon } from '@iconify/react'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Ayuda, pagos y envíos | KAILAB',
  description: 'Encuentra respuestas sobre pedidos, medios de pago, tiempos de entrega y certificados de análisis. Contacta a KAILAB por WhatsApp o correo.',
  openGraph: {
    title: 'Ayuda, pagos y envíos | KAILAB',
    description: 'Encuentra respuestas sobre pedidos, medios de pago, tiempos de entrega y certificados de análisis. Contacta a KAILAB por WhatsApp o correo.',
    url: 'https://kailab.com.co/ayuda',
    images: [
      {
        url: '/KAILAB_Logo_Navy-Blue.svg',
        width: 1200,
        height: 630,
        alt: 'KAILAB | Ayuda, pagos y envíos',
      },
    ],
  },
}

export default async function AyudaPage() {
  const [siteSettings, helpData] = await Promise.all([
    getSiteSettings(),
    getHelpPage()
  ])

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <TopBar />
      <Navbar siteSettings={siteSettings} />

      <main className="flex-1 w-full">

        {/* Hero Header — dark navy background */}
        <div className="mx-auto max-w-4xl px-4 pt-10 pb-9 sm:px-6 lg:px-8">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1959D7]/20 border border-[#1959D7]/30">
              <Icon icon="lucide:life-buoy" className="h-4 w-4 text-[#1959D7]" />
            </div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1959D7]">
              Centro de ayuda
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3 leading-tight">
            Ayuda y contacto
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Encuentra respuestas sobre tu pedido, el envío, el pago y la documentación de los productos. Si necesitas ayuda con un caso específico, escríbenos.
          </p>
        </div>

        {/* Animated white content area */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-300/50 to-transparent" />
        <AyudaClient helpData={helpData} />

      </main>

      <Footer siteSettings={siteSettings} />
    </div>
  )
}
