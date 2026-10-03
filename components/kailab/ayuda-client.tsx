'use client'

import { useEffect, useRef, useState } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { SHIPPING_CONFIG } from '@/lib/shipping-config'
import { shippingRules } from '@/components/kailab/data'

/** Divisor elegante con degradado */
function Divider({ className = '' }: { className?: string }) {
  return (
    <div className={`h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent ${className}`} />
  )
}

/** Hook simple de animación al hacer scroll */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

/** Sección animada */
function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useFadeIn()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      {children}
    </div>
  )
}

interface WhatsIncludedItem {
  _key: string
  name?: string
}

interface AyudaClientProps {
  whatsIncludedItems: WhatsIncludedItem[]
}

export function AyudaClient({ whatsIncludedItems }: AyudaClientProps) {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Sección: Pedidos */}
        <section className="py-6">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1959D7]/10 border border-[#1959D7]/20">
                <Icon icon="lucide:shopping-bag" className="h-4 w-4 text-[#1959D7]" />
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1959D7]">
                Pedidos
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
              Cómo hacer tu pedido
            </h2>
          </AnimatedSection>

          <div className="space-y-5">
            <AnimatedSection delay={100}>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">¿Cómo hago un pedido?</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Elige el producto y su presentación, indica la cantidad y agrégalo al carrito. Completa los datos de envío y revisa los productos y el total antes de pagar.
                </p>
                <Divider className="mt-5" />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">¿Qué incluye mi compra?</h3>
                <ul className="space-y-1.5 mt-2">
                  {whatsIncludedItems.map((item) => {
                    const nameStr = item.name || ''
                    if (nameStr.includes('Información práctica en línea')) {
                      return (
                        <li key={item._key} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                          <Icon icon="lucide:check" className="h-4 w-4 text-[#1959D7] mt-0.5 shrink-0" />
                          <Link href="/tienda/metabolico/retatrutida/#informacion-practica" className="text-[#1959D7] hover:underline">
                            Información práctica en línea.
                          </Link>
                        </li>
                      )
                    }
                    return (
                      <li key={item._key} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                        <Icon icon="lucide:check" className="h-4 w-4 text-[#1959D7] mt-0.5 shrink-0" />
                        {nameStr.endsWith('.') ? nameStr : `${nameStr}.`}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <Divider />

        {/* Sección: Envíos */}
        <section className="py-6">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1959D7]/10 border border-[#1959D7]/20">
                <Icon icon="lucide:truck" className="h-4 w-4 text-[#1959D7]" />
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1959D7]">
                Envíos
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
              Tiempos y condiciones de entrega
            </h2>
          </AnimatedSection>

          <div className="space-y-5">
            <AnimatedSection delay={100}>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">¿Hacen envíos a toda Colombia?</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Sí. El envío es gratis a toda Colombia.</p>
                <Divider className="mt-5" />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3">¿Cuánto tarda en llegar mi pedido?</h3>
                <div className="border border-slate-200">
                  <div className="flex justify-between items-center px-4 py-2.5 border-b border-slate-200">
                    <span className="text-xs sm:text-sm text-slate-600">Ciudades principales</span>
                    <span className="font-mono text-xs font-bold text-slate-900">{SHIPPING_CONFIG.estimatedTimes.ciudadesPrincipales}</span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2.5 border-b border-slate-200">
                    <span className="text-xs sm:text-sm text-slate-600">Ciudades intermedias</span>
                    <span className="font-mono text-xs font-bold text-slate-900">{SHIPPING_CONFIG.estimatedTimes.ciudadesIntermedias}</span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2.5">
                    <span className="text-xs sm:text-sm text-slate-600">Municipios y zonas extendidas</span>
                    <span className="font-mono text-xs font-bold text-slate-900">{SHIPPING_CONFIG.estimatedTimes.municipiosYZonasExtendidas}</span>
                  </div>
                </div>
                <Divider className="mt-5" />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">¿Desde cuándo se cuentan estos tiempos?</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {shippingRules.delivery}
                </p>
                <Divider className="mt-5" />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={250}>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">¿Cuándo despachan mi pedido?</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {shippingRules.cutoff}
                </p>
                <Divider className="mt-5" />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">¿Cómo consulto el estado de mi envío?</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Cuando despachemos tu pedido, recibirás la información de seguimiento. Si necesitas ayuda para encontrarla, escríbenos con tu número de pedido.
                </p>
                <Divider className="mt-5" />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={350}>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">¿Puedo corregir los datos de entrega?</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Escríbenos con tu número de pedido y el dato que necesitas corregir. Revisaremos si todavía es posible hacer el cambio según el estado del envío.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <Divider />

        {/* Sección: Pagos */}
        <section className="py-6">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1959D7]/10 border border-[#1959D7]/20">
                <Icon icon="lucide:credit-card" className="h-4 w-4 text-[#1959D7]" />
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1959D7]">
                Pagos
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
              Medios de pago disponibles
            </h2>
          </AnimatedSection>

          <div className="space-y-5">
            <AnimatedSection delay={100}>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">¿Qué medios de pago puedo usar?</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                  Puedes pagar con tarjetas, PSE y billeteras a través de Wompi, o con criptomonedas.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#1959D7] mt-0.5 shrink-0 w-12">Wompi</span>
                    <p className="text-xs sm:text-sm text-slate-600">Tarjetas, Nequi, PSE, Botón Bancolombia, Bancolombia QR, Compra y Paga Después Bancolombia, Daviplata y SU+Pay.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#1959D7] mt-0.5 shrink-0 w-12">Cripto</span>
                    <p className="text-xs sm:text-sm text-slate-600">USDT en la red TRC-20.</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-3">Al continuar al pago verás las opciones disponibles para tu compra.</p>
                <Divider className="mt-5" />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">¿Qué hago si no puedo completar el pago?</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Si el pago no se abre o aparece un error, escríbenos e indica en qué paso ocurrió. Si ya ves un cobro, cuéntanos antes de repetir el pago para que revisemos el pedido.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <Divider />

        {/* Sección: Certificados */}
        <section className="py-6">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1959D7]/10 border border-[#1959D7]/20">
                <Icon icon="lucide:file-check-2" className="h-4 w-4 text-[#1959D7]" />
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1959D7]">
                Información y certificados
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
              Documentación y certificados de análisis
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">¿Dónde consulto el certificado de un producto?</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                En la página del producto o en{' '}
                <Link href="/calidad" className="text-[#1959D7] hover:underline font-semibold">
                  Calidad
                </Link>
                . Revisa la presentación y el lote indicados en el informe. Si no hay un certificado publicado, verás «Certificado pendiente».
              </p>
            </div>
          </AnimatedSection>
        </section>

        <Divider />

        {/* Sección: Escríbenos */}
        <section className="py-6">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1959D7]/10 border border-[#1959D7]/20">
                <Icon icon="lucide:message-circle" className="h-4 w-4 text-[#1959D7]" />
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1959D7]">
                Contacto directo
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Escríbenos
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
              Para consultar un pedido, incluye su número. Para preguntar por un certificado, indica el producto, la presentación y el lote, si lo tienes.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/573023041412"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] px-8 py-3 font-mono text-xs font-bold tracking-widest uppercase text-white transition-all hover:bg-[#25D366]/90 active:scale-95"
              >
                <Icon icon="bi:whatsapp" className="h-4 w-4" />
                Escribir por WhatsApp
              </a>
              <a
                href="mailto:info@kailab.com.co"
                className="inline-flex items-center justify-center gap-2 border border-slate-300 bg-white px-8 py-3 font-mono text-xs font-bold tracking-widest uppercase text-slate-700 transition-all hover:bg-slate-50 active:scale-95"
              >
                <Icon icon="lucide:mail" className="h-4 w-4" />
                info@kailab.com.co
              </a>
            </div>
          </AnimatedSection>
        </section>

      </div>
    </div>
  )
}
