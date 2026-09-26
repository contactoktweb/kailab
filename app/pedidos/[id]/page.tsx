import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'
import { formatCOP } from '@/components/kailab/data'

interface OrderPageProps {
  params: { id: string }
}

export default function OrderPage({ params }: OrderPageProps) {
  // Datos simulados del pedido. En el futuro esto vendría de una base de datos o Sanity.
  const orderId = params.id
  
  // Simulador de error si el enlace es inválido (por ahora lo forzamos a false para ver la vista normal)
  const orderFound = true 

  if (!orderFound) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
        <Icon icon="lucide:file-question" className="h-16 w-16 text-muted-foreground mb-4" />
        <p className="text-xl font-bold font-mono text-foreground mb-2">No pudimos abrir este pedido.</p>
        <p className="text-muted-foreground mb-8">Revisa el enlace del correo o escríbenos por WhatsApp.</p>
        <a
          href="https://wa.me/573023041412"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-sm border-2 border-[#25D366] bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-transparent hover:text-[#25D366]"
        >
          <Icon icon="lucide:message-circle" className="h-5 w-5" />
          Escribir por WhatsApp
        </a>
      </div>
    )
  }

  const isPaid = true // Estado del pago: "Estamos esperando la confirmación del pago." o "Pago recibido"
  const isShipped = false // Estado de preparación/envío: "En preparación", "Enviado", "Entregado"
  
  const orderStatus = isPaid ? 'Pago recibido' : 'Estamos esperando la confirmación del pago.'
  
  // Dummy order data
  const subtotal = 159000
  const shipping = 0
  const total = 159000

  return (
    <div className="min-h-screen bg-background text-foreground pb-16">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="Volver al inicio KAILAB">
            <Image src="/kailab-logo.png" alt="KAILAB" width={110} height={32} className="h-7 w-auto" />
          </Link>
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <span>Seguimiento de pedido</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12 space-y-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold font-mono tracking-tight text-foreground sm:text-4xl">
            Pedido {orderId}
          </h1>
          <p className="text-muted-foreground text-sm">
            Guarda este enlace privado para consultar tu pedido en cualquier momento.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold font-mono text-foreground border-b border-border/50 pb-2">
            Estado del pedido
          </h2>
          <div className="rounded-xl border border-border/60 bg-card/50 p-6 flex items-start gap-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${isPaid ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' : 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400'}`}>
              <Icon icon={isPaid ? "lucide:check" : "lucide:clock"} className="h-6 w-6" />
            </div>
            <div>
              <p className="font-bold text-lg">{orderStatus}</p>
              {isPaid ? (
                <p className="text-sm text-muted-foreground mt-1">El pago fue confirmado. Estamos preparando tu paquete.</p>
              ) : (
                <p className="text-sm text-muted-foreground mt-1">Tu transacción está siendo procesada.</p>
              )}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold font-mono text-foreground border-b border-border/50 pb-2">
            Seguimiento del envío
          </h2>
          <div className="rounded-xl border border-border/60 bg-card/50 p-6">
            {!isShipped ? (
              <p className="text-muted-foreground text-sm flex items-center gap-2">
                <Icon icon="lucide:truck" className="h-5 w-5" />
                La información de seguimiento aparecerá aquí cuando despachemos tu pedido.
              </p>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-bold">Paquete despachado</p>
                  <p className="text-sm text-muted-foreground">Guía: 1234567890 · Transportadora</p>
                </div>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm border-2 border-primary bg-primary px-5 py-2 text-sm font-bold text-white transition-all hover:bg-transparent hover:text-primary"
                >
                  Seguir envío
                </a>
              </div>
            )}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section className="space-y-4">
            <h2 className="text-xl font-bold font-mono text-foreground border-b border-border/50 pb-2">
              Resumen de la compra
            </h2>
            <div className="rounded-xl border border-border/60 bg-card/50 p-6">
              <ul className="divide-y divide-border/50">
                <li className="flex items-center gap-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm">Retatrutida · RT5</p>
                    <p className="font-mono text-xs text-muted-foreground">Cant: 1</p>
                  </div>
                  <span className="font-mono text-sm font-bold tabular-nums">
                    {formatCOP(159000)}
                  </span>
                </li>
              </ul>
              <div className="border-t border-border/50 pt-4 mt-2 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">{formatCOP(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Envío</span>
                  <span className="font-mono text-emerald-500 uppercase text-xs font-bold tabular-nums">Gratis</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-border/50">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-mono text-lg font-bold tabular-nums text-foreground">
                    {formatCOP(total)}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold font-mono text-foreground border-b border-border/50 pb-2">
              Datos de entrega
            </h2>
            <div className="rounded-xl border border-border/60 bg-card/50 p-6 space-y-4 text-sm">
              <div>
                <p className="text-muted-foreground font-mono text-xs mb-1">Contacto</p>
                <p className="font-semibold">Nombre del Cliente</p>
                <p>cliente@correo.com</p>
                <p>300 123 4567</p>
              </div>
              <div>
                <p className="text-muted-foreground font-mono text-xs mb-1">Dirección</p>
                <p>Calle Falsa 123 # 4-50</p>
                <p>Apto 101</p>
                <p>Bogotá, Bogotá</p>
                <p>Colombia</p>
              </div>
            </div>
          </section>
        </div>

      </main>
      
      <footer className="border-t border-border mt-16 py-8 text-center font-mono text-xs text-muted-foreground space-y-1">
        <p>© {new Date().getFullYear()} KAILAB · Uso Exclusivo para Investigación (RUO)</p>
        <a
          href="https://www.kytcode.lat"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          Desarrollado por K&T
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </a>
      </footer>
    </div>
  )
}
