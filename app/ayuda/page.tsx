import type { Metadata } from 'next'
import { TopBar } from '@/components/kailab/top-bar'
import { Navbar } from '@/components/kailab/navbar'
import { Footer } from '@/components/kailab/footer'
import { getSiteSettings, getHomePage } from '@/lib/sanity-queries'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { SHIPPING_CONFIG } from '@/lib/shipping-config'

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
  const [siteSettings, homeData] = await Promise.all([
    getSiteSettings(),
    getHomePage()
  ])

  const whatsIncludedItems = homeData?.whatsIncluded?.items || [
    { _key: '1', name: 'Agua bacteriostática.' },
    { _key: '2', name: 'Toallitas con alcohol.' },
    { _key: '3', name: 'Información práctica en línea.' },
    { _key: '4', name: 'Envío gratis a toda Colombia, en empaque discreto.' }
  ]

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <TopBar />
      <Navbar siteSettings={siteSettings} />
      
      <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <article className="prose prose-slate prose-a:text-[#1959D7] hover:prose-a:text-[#1959D7]/80 prose-headings:font-bold prose-h1:text-3xl sm:prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl max-w-none">
          <h1 className="mb-4">Ayuda y contacto</h1>
          <p className="text-lg text-slate-600 mb-12">
            Encuentra respuestas sobre tu pedido, el envío, el pago y la documentación de los productos. Si necesitas ayuda con un caso específico, escríbenos.
          </p>
          
          <h2>Pedidos</h2>
          
          <h3>¿Cómo hago un pedido?</h3>
          <p>Elige el producto y su presentación, indica la cantidad y agrégalo al carrito. Completa los datos de envío y revisa los productos y el total antes de pagar.</p>
          
          <h3>¿Qué incluye mi compra?</h3>
          <ul>
            {whatsIncludedItems.map((item) => {
              const nameStr = item.name || ''
              if (nameStr.includes('Información práctica en línea')) {
                return (
                  <li key={item._key}>
                    <Link href="/tienda/metabolico/retatrutida/#informacion-practica">
                      Información práctica en línea.
                    </Link>
                  </li>
                )
              }
              return (
                <li key={item._key}>
                  {nameStr.endsWith('.') ? nameStr : `${nameStr}.`}
                </li>
              )
            })}
          </ul>
          
          <h2>Envíos</h2>
          
          <h3>¿Hacen envíos a toda Colombia?</h3>
          <p>Sí. El envío es gratis a toda Colombia.</p>
          
          <h3>¿Cuánto tarda en llegar mi pedido?</h3>
          <ul>
            <li>Ciudades principales: {SHIPPING_CONFIG.estimatedTimes.ciudadesPrincipales}.</li>
            <li>Ciudades intermedias: {SHIPPING_CONFIG.estimatedTimes.ciudadesIntermedias}.</li>
            <li>Municipios y zonas de cobertura extendida: {SHIPPING_CONFIG.estimatedTimes.municipiosYZonasExtendidas}.</li>
          </ul>
          
          <h3>¿Desde cuándo se cuentan estos tiempos?</h3>
          <p>Desde el despacho, cuando entregamos tu pedido a la transportadora.</p>
          <p>Son tiempos aproximados según el destino, no fechas de llegada garantizadas.</p>
          <p>Al despachar te enviaremos la guía para consultar el avance del envío.</p>
          
          <h3>¿Cuándo despachan mi pedido?</h3>
          <p>Los pedidos con pago confirmado antes de las 4 p. m. de lunes a viernes o antes de las 12 del mediodía del sábado se despachan ese mismo día. Desde esas horas, o en domingos y festivos de Colombia, se despachan el siguiente día hábil. Horarios de Bogotá.</p>
          
          <h3>¿Cómo consulto el estado de mi envío?</h3>
          <p>Cuando despachemos tu pedido, recibirás la información de seguimiento. Si necesitas ayuda para encontrarla, escríbenos con tu número de pedido.</p>
          
          <h3>¿Puedo corregir los datos de entrega?</h3>
          <p>Escríbenos con tu número de pedido y el dato que necesitas corregir. Revisaremos si todavía es posible hacer el cambio según el estado del envío.</p>
          
          <h2>Pagos</h2>
          
          <h3>¿Qué medios de pago puedo usar?</h3>
          <p>Puedes pagar con tarjetas, PSE y billeteras a través de Wompi, o con criptomonedas.</p>
          <ul>
            <li><strong>Wompi:</strong> tarjetas, Nequi, PSE, Botón Bancolombia, Bancolombia QR, Compra y Paga Después Bancolombia, Daviplata y SU+Pay.</li>
            <li><strong>Criptomonedas:</strong> USDT en la red TRC-20.</li>
          </ul>
          <p>Al continuar al pago verás las opciones disponibles para tu compra.</p>
          
          <h3>¿Qué hago si no puedo completar el pago?</h3>
          <p>Si el pago no se abre o aparece un error, escríbenos e indica en qué paso ocurrió. Si ya ves un cobro, cuéntanos antes de repetir el pago para que revisemos el pedido.</p>
          
          <h2>Información y certificados</h2>
          
          <h3>¿Dónde consulto el certificado de un producto?</h3>
          <p>
            En la página del producto o en <Link href="/calidad">Calidad</Link>. Revisa la presentación y el lote indicados en el informe. Si no hay un certificado publicado, verás «Certificado pendiente».
          </p>
          
          <h2>Escríbenos</h2>
          <p>Para consultar un pedido, incluye su número. Para preguntar por un certificado, indica el producto, la presentación y el lote, si lo tienes.</p>
          
          <div className="not-prose mt-6 flex flex-col sm:flex-row gap-4">
            <a
              href="https://wa.me/573023041412"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#25D366]/90"
            >
              <Icon icon="bi:whatsapp" className="h-4 w-4" />
              Escribir por WhatsApp
            </a>
            <a
              href="mailto:info@kailab.com.co"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-8 py-3.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
            >
              <Icon icon="lucide:mail" className="h-4 w-4" />
              info@kailab.com.co
            </a>
          </div>
        </article>
      </main>
      
      <Footer siteSettings={siteSettings} />
    </div>
  )
}
