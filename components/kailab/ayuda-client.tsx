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

import type { HelpPageData } from '@/lib/sanity-queries'

interface AyudaClientProps {
  helpData: HelpPageData | null
}

export function AyudaClient({ helpData }: AyudaClientProps) {
  const o = helpData?.ordersSection
  const s = helpData?.shippingSection
  const p = helpData?.paymentsSection
  const c = helpData?.certificatesSection
  const contact = helpData?.contactSection

  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Sección: Pedidos */}
        {o && (
          <section className="py-6">
            <AnimatedSection>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1959D7]/10 border border-[#1959D7]/20">
                  <Icon icon="lucide:shopping-bag" className="h-4 w-4 text-[#1959D7]" />
                </div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1959D7]">
                  {o.tag || 'Pedidos'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
                {o.title || 'Cómo hacer tu pedido'}
              </h2>
            </AnimatedSection>

            <div className="space-y-5">
              {o.faqs?.map((faq, i) => (
                <AnimatedSection delay={100 + i * 50} key={faq._key}>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1.5">{faq.q}</h3>
                    {faq.answerList && faq.answerList.length > 0 ? (
                      <ul className="space-y-1.5 mt-2">
                        {faq.answerList.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                            <Icon icon="lucide:check" className="h-4 w-4 text-[#1959D7] mt-0.5 shrink-0" />
                            {item.includes('Información práctica en línea') ? (
                              <Link href="/tienda/metabolico/retatrutida/#informacion-practica" className="text-[#1959D7] hover:underline">
                                {item}
                              </Link>
                            ) : (
                              item.endsWith('.') ? item : `${item}.`
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                        {faq.a || ''}
                      </p>
                    )}
                    {i < (o.faqs?.length || 0) - 1 && <Divider className="mt-5" />}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </section>
        )}

        <Divider />

        {s && (
          <>
            <Divider />
            <section className="py-6">
              <AnimatedSection>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1959D7]/10 border border-[#1959D7]/20">
                    <Icon icon="lucide:truck" className="h-4 w-4 text-[#1959D7]" />
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1959D7]">
                    {s.tag || 'Envíos'}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
                  {s.title || 'Tiempos y condiciones de entrega'}
                </h2>
              </AnimatedSection>

              <div className="space-y-5">
                {s.faqs?.map((faq, i) => (
                  <AnimatedSection delay={100 + i * 50} key={faq._key}>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 mb-1.5">{faq.q}</h3>
                      
                      {/* Special rendering for shipping times if it matches the text exactly */}
                      {faq.q?.includes('¿Cuánto tarda en llegar mi pedido?') ? (
                        <div className="border border-slate-200 mt-3">
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
                      ) : (
                        faq.answerList && faq.answerList.length > 0 ? (
                          <ul className="space-y-1.5 mt-2">
                            {faq.answerList.map((item, j) => (
                              <li key={j} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                                <Icon icon="lucide:check" className="h-4 w-4 text-[#1959D7] mt-0.5 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                            {faq.a || ''}
                          </p>
                        )
                      )}
                      
                      {i < (s.faqs?.length || 0) - 1 && <Divider className="mt-5" />}
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </section>
          </>
        )}

        <Divider />

        {p && (
          <>
            <Divider />
            <section className="py-6">
              <AnimatedSection>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1959D7]/10 border border-[#1959D7]/20">
                    <Icon icon="lucide:credit-card" className="h-4 w-4 text-[#1959D7]" />
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1959D7]">
                    {p.tag || 'Pagos'}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
                  {p.title || 'Medios de pago disponibles'}
                </h2>
              </AnimatedSection>

              <div className="space-y-5">
                {p.faqs?.map((faq, i) => (
                  <AnimatedSection delay={100 + i * 50} key={faq._key}>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 mb-1.5">{faq.q}</h3>
                      
                      {faq.q?.includes('¿Qué medios de pago puedo usar?') ? (
                        <>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                            {faq.a?.split('\n\n')[0] || ''}
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-start gap-3">
                              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#1959D7] mt-0.5 shrink-0 w-12">Wompi</span>
                              <p className="text-xs sm:text-sm text-slate-600">{faq.a?.split('\n\n')[1]?.replace('Wompi: ', '') || ''}</p>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#1959D7] mt-0.5 shrink-0 w-12">Cripto</span>
                              <p className="text-xs sm:text-sm text-slate-600">{faq.a?.split('\n\n')[2]?.replace('Cripto: ', '') || ''}</p>
                            </div>
                          </div>
                          <p className="text-xs text-slate-400 mt-3">{faq.a?.split('\n\n')[3] || ''}</p>
                        </>
                      ) : (
                        faq.answerList && faq.answerList.length > 0 ? (
                          <ul className="space-y-1.5 mt-2">
                            {faq.answerList.map((item, j) => (
                              <li key={j} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                                <Icon icon="lucide:check" className="h-4 w-4 text-[#1959D7] mt-0.5 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                            {faq.a || ''}
                          </p>
                        )
                      )}

                      {i < (p.faqs?.length || 0) - 1 && <Divider className="mt-5" />}
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </section>
          </>
        )}

        <Divider />

        {c && (
          <>
            <Divider />
            <section className="py-6">
              <AnimatedSection>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1959D7]/10 border border-[#1959D7]/20">
                    <Icon icon="lucide:file-check-2" className="h-4 w-4 text-[#1959D7]" />
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1959D7]">
                    {c.tag || 'Información y certificados'}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
                  {c.title || 'Documentación y certificados de análisis'}
                </h2>
              </AnimatedSection>

              <div className="space-y-5">
                {c.faqs?.map((faq, i) => (
                  <AnimatedSection delay={100 + i * 50} key={faq._key}>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 mb-1.5">{faq.q}</h3>
                      {faq.q?.includes('¿Dónde consulto el certificado') ? (
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          En la página del producto o en{' '}
                          <Link href="/calidad" className="text-[#1959D7] hover:underline font-semibold">
                            Calidad
                          </Link>
                          . {faq.a?.split('Calidad.')[1]?.trim() || faq.a || ''}
                        </p>
                      ) : (
                        faq.answerList && faq.answerList.length > 0 ? (
                          <ul className="space-y-1.5 mt-2">
                            {faq.answerList.map((item, j) => (
                              <li key={j} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                                <Icon icon="lucide:check" className="h-4 w-4 text-[#1959D7] mt-0.5 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                            {faq.a || ''}
                          </p>
                        )
                      )}
                      
                      {i < (c.faqs?.length || 0) - 1 && <Divider className="mt-5" />}
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </section>
          </>
        )}

        <Divider />

        {contact && (
          <>
            <Divider />
            <section className="py-6">
              <AnimatedSection>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1959D7]/10 border border-[#1959D7]/20">
                    <Icon icon="lucide:message-circle" className="h-4 w-4 text-[#1959D7]" />
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1959D7]">
                    {contact.tag || 'Contacto directo'}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                  {contact.title || 'Escríbenos'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
                  {contact.description || 'Para consultar un pedido, incluye su número. Para preguntar por un certificado, indica el producto, la presentación y el lote, si lo tienes.'}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={100}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={contact.whatsappUrl || "https://wa.me/573023041412"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] px-8 py-3 font-mono text-xs font-bold tracking-widest uppercase text-white transition-all hover:bg-[#25D366]/90 active:scale-95"
                  >
                    <Icon icon="bi:whatsapp" className="h-4 w-4" />
                    {contact.whatsappBtnLabel || 'Escribir por WhatsApp'}
                  </a>
                  <a
                    href={`mailto:${contact.emailAddress || 'info@kailab.com.co'}`}
                    className="inline-flex items-center justify-center gap-2 border border-slate-300 bg-white px-8 py-3 font-mono text-xs font-bold tracking-widest uppercase text-slate-700 transition-all hover:bg-slate-50 active:scale-95"
                  >
                    <Icon icon="lucide:mail" className="h-4 w-4" />
                    {contact.emailBtnLabel || contact.emailAddress || 'info@kailab.com.co'}
                  </a>
                </div>
              </AnimatedSection>
            </section>
          </>
        )}

      </div>
    </div>
  )
}
