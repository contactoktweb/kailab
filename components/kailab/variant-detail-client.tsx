'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { formatCOP, type Product } from '@/components/kailab/data'
import { TopBar } from '@/components/kailab/top-bar'
import { Navbar } from '@/components/kailab/navbar'
import { Footer } from '@/components/kailab/footer'
import { useCart } from '@/components/kailab/cart-context'
import { cn } from '@/lib/utils'
import { WompiCheckoutButton } from '@/components/kailab/wompi-checkout'
import type { SiteSettings } from '@/lib/sanity-queries'

function AccordionItem({ title, contentHtml }: { title: string, contentHtml: string }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border border-slate-200 bg-white rounded-lg overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
      >
        {title}
        <Icon icon="lucide:chevron-down" className={cn("h-4 w-4 text-slate-500 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div 
          className="p-4 pt-0 text-[13px] leading-relaxed text-slate-700" 
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </motion.div>
    </div>
  )
}

interface VariantDetailClientProps {
  product: Product
  initialVariantSlug?: string
  siteSettings?: SiteSettings | null
}

export function VariantDetailClient({ product, initialVariantSlug, siteSettings }: VariantDetailClientProps) {
  const { cartCount, addToCart, toggleCart, openSearch } = useCart()

  const [qty, setQty] = useState(1)
  const [addedFeedback, setAddedFeedback] = useState(false)

  const hasVariants = product.variants && product.variants.length > 0
  
  // Usamos estado local para la variante para evitar un re-render/salto completo de la página de Next.js al navegar
  const defaultSlug = hasVariants ? (initialVariantSlug || product.variants![0].slug) : initialVariantSlug
  const [localVariantSlug, setLocalVariantSlug] = useState<string | undefined>(defaultSlug)
  const activeVariant = hasVariants ? product.variants!.find(v => v.slug === localVariantSlug) : null

  // UI States
  const activeImage = activeVariant?.image || product.image || "/placeholder.jpg"
  const activePrice = activeVariant?.priceCOP ?? product.priceCOP ?? (hasVariants ? Math.min(...product.variants!.map(v => v.priceCOP)) : 0)
  const activeStock = activeVariant?.stock ?? product.stock ?? 0
  const isOutOfStock = activeStock === 0
  const isLowStock = activeStock > 0 && activeStock <= 15

  const isRetatrutide = product.slug === 'retatrutide' || product.id === 'PROD-RETATRUTIDE'
  const isRT10 = isRetatrutide && activeVariant?.name.includes('10')
  const isRT5 = isRetatrutide && activeVariant?.name.includes('5')

  let displayCOA = activeVariant
    ? activeVariant.coaStatus
    : (hasVariants
      ? (product.variants!.some(v => v.coaStatus === 'available') ? 'available' : 'pending')
      : 'pending')
      
  if (isRT5) {
    displayCOA = 'pending'
  } else if (isRT10) {
    displayCOA = 'available'
  }

  // Global ⌘K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        openSearch()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openSearch])

  const handleVariantChange = (slug: string) => {
    setQty(1)
    setLocalVariantSlug(slug)
    window.history.replaceState(null, '', `/tienda/${product.categorySlug}/${product.slug}/${slug}`)
  }

  const handleAddToCart = () => {
    if (isOutOfStock || (hasVariants && !activeVariant)) return
    for (let i = 0; i < qty; i++) {
      addToCart(product, activeVariant || undefined)
    }
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 2000)
    toggleCart()
  }

  // El bloque COA pequeño fue eliminado a favor de la sección completa abajo

  const breadcrumbElement = (
    <Link href="/tienda" className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-400 md:text-[#1959D7] transition-colors hover:text-blue-300 md:hover:text-[#1959D7]/80">
      <Icon icon="lucide:arrow-left" className="h-4 w-4" />
      Volver a la tienda
    </Link>
  )

  const titleAndCategoryElement = (
    <div className="flex flex-col items-start gap-1.5">
      <div className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-700">
        {product.category}
      </div>
      <h1 className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">
        {product.title}
      </h1>
      {product.subtitle && (
        <p className="text-xs sm:text-sm font-medium text-slate-700">
          {product.subtitle}
        </p>
      )}
    </div>
  )

  return (
    <div className="min-h-[100dvh] bg-background pb-24 md:pb-0">
      <TopBar onSearch={openSearch} />
      <Navbar siteSettings={siteSettings} />

      <main className="mx-auto max-w-5xl px-4 lg:px-8 py-8 flex flex-col gap-6">

        {/* MOBILE: Breadcrumb + Title */}
        <div className="flex flex-col gap-4 md:hidden">
          {breadcrumbElement}
          {titleAndCategoryElement}
        </div>

        <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] lg:gap-8">

          {/* LEFT: Image + COA (desktop) */}
          <div className="flex flex-col gap-4 h-full">
            <div style={{ perspective: 2000 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="relative aspect-square w-full rounded-2xl border border-transparent bg-gradient-to-br from-[#f0f5ff] to-[#e0ebff] p-8 overflow-hidden group shadow-2xl"
              >
                <motion.div
                  initial={{ x: "-150%", opacity: 0 }} animate={{ x: "200%", opacity: 0.4 }} transition={{ duration: 1.5, delay: 0.3 }}
                  className="absolute inset-0 z-20 w-1/2 -skew-x-[25deg] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none"
                />
                <div className="absolute z-30 flex flex-col gap-1" style={{ top: 'calc(0.75rem + 9mm)', left: 'calc(0.75rem + 9mm)' }}>
                  {product.badges?.includes('RUO') && (
                    <span className="inline-flex items-center rounded-sm bg-[#0d1a2a] px-2 py-0.5 text-[8px] font-mono font-bold uppercase tracking-wider text-white shadow-sm">
                      RUO
                    </span>
                  )}
                  {displayCOA === 'available' && (
                    <span className="inline-flex items-center rounded-sm bg-[#0d1a2a] px-2 py-0.5 text-[8px] font-mono font-bold uppercase tracking-wider text-white shadow-sm">
                      COA
                    </span>
                  )}
                </div>
                <motion.div
                  animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative h-full w-full z-10"
                >
                  <Image
                    src={activeImage}
                    alt={product.title}
                    fill
                    className="object-contain drop-shadow-2xl mix-blend-multiply transition-opacity duration-300"
                  />
                </motion.div>
              </motion.div>
            </div>
            <div className="hidden md:flex flex-col flex-1">
              {/* Espacio reservado si se necesita algo debajo de la imagen en desktop */}
            </div>
          </div>

          {/* RIGHT: Commerce details */}
          <div className="relative flex flex-col rounded-xl bg-white p-5 lg:p-6 shadow-2xl justify-between">

            {/* DESKTOP: Breadcrumb + Title */}
            <div className="hidden md:flex flex-col gap-2 mb-2">
              {breadcrumbElement}
              {titleAndCategoryElement}
            </div>

            {product.description ? (
              <p className="text-[12px] leading-snug text-slate-700 mb-3">
                {product.description}
              </p>
            ) : (
              <p className="text-sm leading-relaxed text-slate-600 mb-4">
                Fórmula: <span className="font-mono text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded text-xs">{product.formula}</span>. Compuesto liofilizado de alta pureza, sintetizado para investigación y análisis de laboratorio (RUO). No apto para uso humano o veterinario.
              </p>
            )}

            <div className="mb-3">
              {/* FEATURES */}
              {product.features && product.features.length > 0 && (
                <div className="grid gap-y-1.5 gap-x-3 w-full grid-cols-2">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <Icon icon="lucide:check" className="h-3.5 w-3.5 text-slate-900 shrink-0" />
                      <span className="text-[11px] text-slate-700 leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-0 border-y border-slate-200 py-3 flex flex-row flex-wrap items-end justify-between gap-x-4 gap-y-3">
              
              {/* PRECIO Y DISPONIBILIDAD */}
              <div className="flex flex-col gap-1.5 items-start shrink-0">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Precio</p>
                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${isOutOfStock ? 'bg-slate-300' : isLowStock ? 'bg-red-500' : 'bg-green-500'}`} />
                    <span className={`text-[8px] font-bold uppercase tracking-widest ${isOutOfStock ? 'text-slate-500' : isLowStock ? 'text-red-600' : 'text-green-600'}`}>
                      {isOutOfStock ? 'Agotado' : 'Disponible'}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-1 h-8">
                    <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 leading-none">{formatCOP(activePrice)}</span>
                    <span className="text-[9px] text-slate-500 font-bold uppercase leading-none mt-1">COP</span>
                  </div>
                </div>
              </div>

              {/* PRESENTACIÓN (Centro) */}
              {hasVariants && (
                <div className="flex flex-col gap-1.5 shrink-0">
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest text-left">Elige una presentación</p>
                  <div className="flex flex-row flex-wrap gap-1.5 justify-start">
                    {product.variants!.map((v) => {
                      const isSelected = activeVariant?.id === v.id
                      return (
                        <button
                          key={v.id}
                          onClick={() => handleVariantChange(v.slug)}
                          className={cn(
                            "flex h-8 min-w-[3.5rem] px-2 items-center justify-center rounded-lg border-2 text-[11px] font-bold font-mono transition-all duration-300",
                            isSelected
                              ? "border-[#1959D7] bg-[#1959D7] text-white shadow-md"
                              : "border-[#1959D7]/50 bg-[#1959D7]/[0.04] text-[#1959D7] hover:border-[#1959D7] hover:bg-[#1959D7]/10"
                          )}
                        >
                          {v.name}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* BOTONES */}
              <div className="flex flex-col gap-2 w-full mt-2">
                <div className="flex flex-col sm:flex-row items-end gap-3 w-full">
                  {/* Qty selector */}
                  <div className="flex flex-col gap-1.5 shrink-0 w-full sm:w-auto">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest text-left">Cantidad</p>
                    <div className="flex h-11 w-full sm:w-auto shrink-0 items-center rounded-lg border border-slate-300 bg-white">
                      <button
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        disabled={qty <= 1}
                        className="flex h-full w-12 sm:w-10 items-center justify-center text-slate-500 transition-colors hover:text-slate-900 disabled:opacity-30"
                        aria-label="Disminuir cantidad"
                      >
                        <Icon icon="lucide:minus" className="h-4 w-4" />
                      </button>
                      <span className="flex-1 sm:w-8 text-center font-mono text-sm font-bold text-slate-900 tabular-nums">{qty}</span>
                      <button
                        onClick={() => setQty((q) => Math.max(activeStock || 99, q + 1))}
                        disabled={isOutOfStock}
                        className="flex h-full w-12 sm:w-10 items-center justify-center text-slate-500 transition-colors hover:text-slate-900 disabled:opacity-30"
                        aria-label="Aumentar cantidad"
                      >
                        <Icon icon="lucide:plus" className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-row items-center gap-3 flex-1 w-full h-11 mt-1.5 sm:mt-0">
                    {/* Add to cart */}
                    <button
                      onClick={handleAddToCart}
                      disabled={isOutOfStock || (hasVariants && !activeVariant)}
                      title="Agregar al carrito"
                      aria-label="Agregar al carrito"
                      className={cn(
                        "group flex h-full flex-1 items-center justify-center gap-2 rounded-lg transition-all duration-300 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 px-4 font-bold",
                        addedFeedback
                          ? "bg-green-600 text-white"
                          : "bg-[#1959D7] text-white hover:bg-[#1959D7]/90"
                      )}
                    >
                      <Icon
                        icon={addedFeedback ? "lucide:check" : "lucide:shopping-cart"}
                        className={cn("h-4 w-4 transition-transform duration-300", !addedFeedback && "group-hover:-rotate-12")}
                      />
                      <span className="text-sm">{addedFeedback ? "Agregado" : "Agregar al carrito"}</span>
                    </button>
                    <div className="h-full">
                      <WompiCheckoutButton
                        amountCOP={activePrice * qty}
                        productName={product.title}
                        label="Pagar"
                        onSuccess={(data) => console.log('Wompi success', data)}
                        onError={(err) => console.error('Wompi error', err)}
                      />
                    </div>
                  </div>
                </div>


                
                <div className="mt-2 flex items-center justify-center gap-2 border-t border-slate-100 pt-3">
                  <p className="text-center text-[11px] font-semibold text-slate-600">
                    Agua bacteriostática incluida <span className="mx-1 text-slate-300">·</span> Envío gratis a toda Colombia
                  </p>
                </div>
              </div>
            </div>

            {/* Included Info Block */}
            <div className="mt-4 flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Icon icon="lucide:package-check" className="h-4 w-4 text-[#1959D7]" />
                Incluido con tu compra
              </h2>
              <ul className="list-disc pl-4 space-y-1.5 text-xs text-slate-700">
                <li>Agua bacteriostática.</li>
                <li>Toallitas con alcohol.</li>
                <li><a href="#guia-manejo" className="text-[#1959D7] font-semibold hover:underline">Información práctica en línea.</a></li>
                <li>Envío gratis a toda Colombia, en empaque discreto.</li>
              </ul>
            </div>



            {/* COA MOBILE ELIMINADO (Ahora es una sección completa abajo) */}
          </div>
        </div>

        {/* COA SECTION */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className={cn("hidden sm:flex rounded-full p-3 shrink-0", displayCOA === 'available' ? "bg-green-100" : "bg-slate-100")}>
              <Icon icon={displayCOA === 'available' ? "lucide:file-check" : "lucide:clock"} className={cn("h-6 w-6", displayCOA === 'available' ? "text-green-600" : "text-slate-500")} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                Certificado de análisis (COA)
              </h2>
              <p className="text-sm md:text-base text-slate-600 mb-6">
                Consulta los resultados del análisis de laboratorio y revisa a qué presentación y lote corresponden.
              </p>

              {displayCOA === 'available' ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 md:p-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex flex-col gap-1 text-sm">
                      <span className="font-semibold text-slate-900">
                        {isRT10
                          ? 'Retatrutide 10 mg · Lote 317558'
                          : `${product.title} ${activeVariant ? `· ${activeVariant.name}` : ''} · Lote ${product.lot}`
                        }
                      </span>
                      <span className="text-slate-500">
                        {isRT10
                          ? 'Análisis por Janoshik (Informe 223529)'
                          : `Pureza: ${product.purity}`
                        }
                      </span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <a 
                        href={isRT10 ? '/certificados/RT10_Janoshik_223529_Certificado.png' : '#certificado'} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1959D7] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#1959D7]/90"
                      >
                        <Icon icon="lucide:external-link" className="h-4 w-4" />
                        Abrir certificado
                      </a>
                      {isRT10 && (
                        <a 
                          href="/certificados/RT10_Janoshik_223529_Informe.pdf" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
                        >
                          <Icon icon="lucide:file-text" className="h-4 w-4" />
                          Ver cromatograma (PDF)
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {isRT10 && (
                    <div className="mt-4 rounded-lg bg-white p-4 border border-slate-200">
                      <p className="text-xs leading-relaxed text-slate-500">
                        Este informe corresponde a una muestra de Retatrutide 10 mg, lote 317558, analizada por Janoshik. Reporta 10,74 mg y una pureza de 99,191 %. Los resultados corresponden a la muestra analizada; no significan que se haya examinado cada vial del lote.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-500">
                  <Icon icon="lucide:clock" className="h-5 w-5 shrink-0" />
                  <p className="text-sm font-medium">
                    Certificado pendiente
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Custom Retatrutide Content vs Default Accordions */}
        {isRetatrutide ? (
          <div className="mt-8 md:mt-12 pt-8 border-t border-slate-200/80">
            {/* Nav / TOC */}
            <div className="mb-10 flex flex-wrap items-center gap-3">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mr-2">En esta página:</span>
              <a href="#reconstitucion" className="inline-flex items-center rounded-full bg-secondary/50 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground">Reconstitución</a>
              <a href="#consejos" className="inline-flex items-center rounded-full bg-secondary/50 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground">Consejos prácticos</a>
              <a href="#preguntas-frecuentes" className="inline-flex items-center rounded-full bg-secondary/50 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground">Preguntas frecuentes</a>
              <a href="#estudios" className="inline-flex items-center rounded-full bg-secondary/50 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground">Estudios</a>
            </div>

            {/* Content blocks */}
            <div className="grid gap-8 md:grid-cols-2 max-w-4xl bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-slate-200">
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">¿Qué es la retatrutida?</h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  La retatrutida es un péptido en investigación: una molécula formada por una cadena de aminoácidos. En publicaciones científicas también aparece como retatrutide o LY3437943.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">¿Para qué se investiga?</h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Se estudia por sus efectos sobre el peso corporal y el control de la glucosa en sangre. Los ensayos clínicos evalúan su eficacia y seguridad en personas con obesidad, sobrepeso o diabetes tipo 2.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">¿Cómo funciona?</h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Los receptores reciben señales que activan respuestas en las células. La retatrutida activa los receptores de GIP, GLP-1 y glucagón; por eso se describe como un agonista triple.
                </p>
              </section>

              <section id="reconstitucion" className="scroll-mt-28">
                <h2 className="text-xl font-bold text-slate-900 mb-3">Reconstitución</h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Reconstituir significa disolver el polvo del vial con un líquido adecuado para obtener una solución.
                </p>
              </section>

              {/* Contenedor de información práctica */}
              <div id="informacion-practica" className="scroll-mt-28 col-span-full">
                {/* NOTA K&T: Conservar cantidades, materiales y pasos como borradores editables, ocultos al público */}
                <div className="hidden">
                  {/* <h3>Cantidades</h3> */}
                  {/* <p>Contenido editable aquí</p> */}
                  {/* <h3>Materiales</h3> */}
                  {/* <p>Contenido editable aquí</p> */}
                  {/* <h3>Pasos</h3> */}
                  {/* <p>Contenido editable aquí</p> */}
                </div>
              </div>
            </div>
          </div>
        ) : (
          product.infoAccordions && product.infoAccordions.length > 0 && (
            <div className="mt-8 md:mt-12 pt-8 border-t border-slate-200/80">
              <div className="grid gap-4 md:grid-cols-2 items-start">
                {product.infoAccordions.map((acc, i) => (
                  <AccordionItem key={i} title={acc.title} contentHtml={acc.contentHtml} />
                ))}
              </div>
            </div>
          )
        )}
      </main>

      <Footer siteSettings={siteSettings} />

      {/* STICKY MOBILE CTA */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground truncate max-w-[130px]">{product.title}{activeVariant ? ` · ${activeVariant.name}` : ''}</span>
            <span className="font-bold text-foreground">{formatCOP(activePrice * qty)}</span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || (hasVariants && !activeVariant)}
            className={cn(
              "group relative flex h-10 flex-1 items-center justify-center gap-2 rounded-sm border-2 px-4 text-sm font-bold transition-all duration-300 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
              addedFeedback
                ? "border-green-600 bg-green-600 text-white"
                : "border-[#1959D7] bg-[#1959D7] text-white hover:bg-transparent hover:text-[#1959D7]"
            )}
          >
            <Icon icon={addedFeedback ? "lucide:check" : "lucide:shopping-cart"} className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12" />
            {addedFeedback ? "¡Agregado!" : "Agregar"}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
