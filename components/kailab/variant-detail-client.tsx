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

  // Escuchar botones Atrás / Adelante del navegador
  useEffect(() => {
    const handlePopState = () => {
      const pathParts = window.location.pathname.split('/')
      if (pathParts.length >= 5 && pathParts[1] === 'tienda') {
        const urlVariantSlug = pathParts[4]
        if (urlVariantSlug && hasVariants && product.variants?.some(v => v.slug === urlVariantSlug)) {
          setLocalVariantSlug(urlVariantSlug)
        }
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [hasVariants, product])

  const handleVariantChange = (slug: string) => {
    setQty(1)
    setLocalVariantSlug(slug)
    window.history.pushState(null, '', `/tienda/${product.categorySlug}/${product.slug}/${slug}`)
  }

  const [cartState, setCartState] = useState<'idle' | 'adding' | 'success' | 'error_add' | 'error_price'>('idle')

  const handleAddToCart = async () => {
    if (isOutOfStock || (hasVariants && !activeVariant)) return
    if (!activePrice || activePrice <= 0) {
      setCartState('error_price')
      setTimeout(() => setCartState('idle'), 3000)
      return
    }

    setCartState('adding')
    try {
      await new Promise(r => setTimeout(r, 400)) // Simulación para mostrar el estado "Agregando..."
      for (let i = 0; i < qty; i++) {
        addToCart(product, activeVariant || undefined)
      }
      setCartState('success')
      setTimeout(() => {
        setCartState('idle')
        toggleCart()
      }, 2000)
    } catch (e) {
      setCartState('error_add')
      setTimeout(() => setCartState('idle'), 3000)
    }
  }

  // El bloque COA pequeño fue eliminado a favor de la sección completa abajo

  const breadcrumbElement = (
    <Link href="/tienda" className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-400 md:text-[#1959D7] transition-colors hover:text-blue-300 md:hover:text-[#1959D7]/80">
      <Icon icon="lucide:arrow-left" className="h-4 w-4" />
      Volver a la tienda
    </Link>
  )

  const titleAndCategoryElement = (
    <div className="flex flex-col items-start gap-2">
      <div className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
        {product.category}
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
        {product.title}
      </h1>
      {product.subtitle && (
        <p className="text-sm sm:text-base font-medium text-slate-600">
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

        <div id="compra" className="grid gap-6 md:grid-cols-[1fr_1.1fr] lg:gap-8 scroll-mt-28 items-stretch">

          {/* LEFT: Image + COA */}
          <div className="flex flex-col gap-4">
            <div style={{ perspective: 2000 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="relative aspect-square w-full rounded-xl border border-transparent bg-gradient-to-br from-[#f0f5ff] to-[#e0ebff] p-8 overflow-hidden group shadow-2xl"
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
                    alt={activeVariant ? `${product.title} ${activeVariant.name} de KAILAB` : product.title}
                    fill
                    className="object-contain drop-shadow-2xl mix-blend-multiply transition-opacity duration-300"
                  />
                </motion.div>
              </motion.div>
            </div>
            {/* COA SECTION MOVED HERE */}
            {/* COA SECTION MOVED HERE */}
            <div id="certificado" className="hidden md:flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm scroll-mt-28">
              <h2 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <div className={cn("rounded-full p-2 shrink-0", displayCOA === 'available' ? "bg-green-100" : "bg-slate-100")}>
                  <Icon icon={displayCOA === 'available' ? "lucide:file-check" : "lucide:clock"} className={cn("h-4 w-4", displayCOA === 'available' ? "text-green-600" : "text-slate-500")} />
                </div>
                Certificado de análisis (COA)
              </h2>
              <p className="text-[11px] text-slate-600 mb-4 leading-relaxed">
                Consulta los resultados del análisis de laboratorio y revisa a qué presentación y lote corresponden.
              </p>

              {displayCOA === 'available' ? (
                <div className="rounded-none border border-slate-200 bg-slate-50 p-3 max-w-[380px]">
                      <div className="flex flex-col gap-3 mb-2">
                        <div className="flex flex-col gap-0.5 text-[11px]">
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
                        
                        <div className="flex flex-wrap gap-2">
                          <a 
                            href={isRT10 ? '/certificados/RT10_Janoshik_223529_Certificado.png' : '#certificado'} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="group relative inline-flex flex-1 items-center justify-center gap-1.5 bg-primary px-3 py-1.5 text-[10px] font-mono tracking-widest font-bold text-white transition-all duration-300 hover:bg-primary/90 overflow-hidden"
                          >
                            <div className="absolute left-0 top-0 h-full w-[2px] bg-white/30 transition-colors duration-500 group-hover:bg-white"></div>
                            <div className="absolute left-0 top-0 h-[2px] w-4 bg-white/30 transition-all duration-500 group-hover:w-full group-hover:bg-white"></div>
                            <Icon icon="lucide:external-link" className="h-3 w-3" />
                            ABRIR
                          </a>
                          {isRT10 && (
                            <a 
                              href="/certificados/RT10_Janoshik_223529_Informe.pdf" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="group relative inline-flex flex-1 items-center justify-center gap-1.5 bg-slate-100 border border-slate-200 px-3 py-1.5 text-[10px] font-mono tracking-widest font-bold text-slate-700 transition-all duration-300 hover:bg-slate-200 hover:text-slate-900 overflow-hidden"
                            >
                              <div className="absolute left-0 top-0 h-full w-[2px] bg-slate-300 transition-colors duration-500 group-hover:bg-primary/50"></div>
                              <div className="absolute left-0 top-0 h-[2px] w-4 bg-slate-300 transition-all duration-500 group-hover:w-full group-hover:bg-primary/50"></div>
                              <Icon icon="lucide:file-text" className="h-3 w-3" />
                              PDF
                            </a>
                          )}
                        </div>
                      </div>
                      
                      {isRT10 && (
                        <div className="mt-2 rounded-none bg-white p-2.5 border border-slate-200">
                          <p className="text-[9px] leading-relaxed text-slate-500">
                            Este informe corresponde a una muestra de Retatrutide 10 mg, lote 317558, analizada por Janoshik. Reporta 10,74 mg y una pureza de 99,191 %. Los resultados corresponden a la muestra analizada; no significan que se haya examinado cada vial del lote.
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mt-4 flex items-center gap-2 rounded-none border border-dashed border-slate-300 bg-slate-50 p-3 text-slate-500 max-w-[380px]">
                      <Icon icon="lucide:clock" className="h-3.5 w-3.5 shrink-0" />
                      <p className="text-[11px] font-medium">
                        Certificado pendiente
                      </p>
                    </div>
                  )}
            </div>
          </div>

          {/* RIGHT: Commerce details */}
          <div className="relative flex flex-col rounded-xl bg-white p-4 lg:p-5 shadow-2xl justify-between h-full">

            {/* DESKTOP: Breadcrumb + Title */}
            <div className="hidden md:flex flex-col gap-1.5 mb-2">
              {breadcrumbElement}
              {titleAndCategoryElement}
            </div>

            {product.description ? (
              <p className="text-[13px] sm:text-sm leading-relaxed text-slate-700 mb-2">
                {product.description}
              </p>
            ) : (
              <p className="text-[13px] sm:text-sm leading-relaxed text-slate-600 mb-2">
                Fórmula: <span className="font-mono text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded text-xs">{product.formula}</span>. Compuesto liofilizado de alta pureza, sintetizado para investigación y análisis de laboratorio (RUO). No apto para uso humano o veterinario.
              </p>
            )}

            <div className="mb-2">
              {/* FEATURES */}
              {product.features && product.features.length > 0 && (
                <div className="grid gap-y-1.5 gap-x-4 w-full grid-cols-2">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Icon icon="lucide:check" className="h-4 w-4 text-slate-900 shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-700 leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-0 border-y border-slate-200 py-2.5 flex flex-row flex-wrap items-end justify-between gap-x-4 gap-y-3">
              
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
                            "flex h-8 min-w-[3.5rem] px-2 items-center justify-center rounded-none border-2 text-[11px] font-bold font-mono transition-all duration-300",
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
                    <div className="flex h-9 w-full sm:w-auto shrink-0 items-center rounded-lg border border-slate-300 bg-white">
                      <button
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        disabled={qty <= 1}
                        className="flex h-full w-12 sm:w-10 items-center justify-center text-slate-500 transition-colors hover:text-slate-900 disabled:opacity-30"
                        aria-label="Disminuir cantidad"
                      >
                        <Icon icon="lucide:minus" className="h-3.5 w-3.5" />
                      </button>
                      <span className="flex-1 sm:w-8 text-center font-mono text-sm font-bold text-slate-900 tabular-nums">{qty}</span>
                      <button
                        onClick={() => setQty((q) => Math.max(activeStock || 99, q + 1))}
                        disabled={isOutOfStock}
                        className="flex h-full w-12 sm:w-10 items-center justify-center text-slate-500 transition-colors hover:text-slate-900 disabled:opacity-30"
                        aria-label="Aumentar cantidad"
                      >
                        <Icon icon="lucide:plus" className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-row items-center gap-2 flex-1 w-full h-9 mt-1.5 sm:mt-0">
                    {/* Add to cart */}
                    <button
                      onClick={cartState === 'success' ? toggleCart : handleAddToCart}
                      disabled={isOutOfStock || (hasVariants && !activeVariant) || cartState === 'adding'}
                      title={isOutOfStock ? "Agotado" : "Agregar al carrito"}
                      aria-label="Agregar al carrito"
                      className={cn(
                        "group relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden transition-all duration-500 active:scale-95 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 font-mono text-[10px] sm:text-xs font-bold tracking-widest text-white backdrop-blur-md",
                        cartState === 'success'
                          ? "bg-green-600"
                          : cartState === 'error_add' || cartState === 'error_price'
                          ? "bg-red-600"
                          : "bg-primary hover:bg-primary/90"
                      )}
                    >
                      {/* L-Shape Border Left */}
                      <div className="absolute left-0 top-0 h-full w-[2px] bg-white/30 transition-colors duration-500 group-hover:bg-white"></div>
                      {/* L-Shape Border Top */}
                      <div className="absolute left-0 top-0 h-[2px] w-8 bg-white/30 transition-all duration-500 group-hover:w-full group-hover:bg-white"></div>

                      <Icon
                        icon={cartState === 'success' ? "lucide:check" : isOutOfStock ? "lucide:x" : "lucide:shopping-cart"}
                        className={cn("h-3.5 w-3.5 shrink-0 transition-transform duration-300", cartState === 'idle' && !isOutOfStock && "group-hover:-rotate-12")}
                      />
                      <span className="leading-tight">
                        {isOutOfStock ? "AGOTADO" : 
                         cartState === 'adding' ? "AGREGANDO…" : 
                         cartState === 'success' ? "AGREGADO" : 
                         cartState === 'error_add' ? "ERROR" : 
                         cartState === 'error_price' ? "ERROR" : 
                         "AGREGAR AL CARRITO"}
                      </span>
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


                
                <div className="mt-1 flex items-center justify-center gap-2 border-t border-slate-100 pt-1.5">
                  <p className="text-center text-[10px] font-semibold text-slate-600">
                    Agua bacteriostática incluida <span className="mx-1 text-slate-300">·</span> Envío gratis a toda Colombia
                  </p>
                </div>
              </div>
            </div>

            {/* Included Info Block */}
            <div className="mt-2.5 flex flex-col gap-1.5 rounded-none border border-slate-200 bg-slate-50 p-2.5">
              <h2 className="text-[12px] font-bold text-slate-900 flex items-center gap-1.5">
                <Icon icon="lucide:package-check" className="h-3 w-3 text-[#1959D7]" />
                Incluido con tu compra
              </h2>
              <ul className="list-disc pl-4 space-y-0.5 text-[10px] text-slate-700">
                <li>Agua bacteriostática.</li>
                <li>Toallitas con alcohol.</li>
                <li><a href="#informacion-practica" className="text-[#1959D7] font-semibold hover:underline">Información práctica en línea.</a></li>
                <li>Envío gratis a toda Colombia, en empaque discreto.</li>
              </ul>
            </div>



            {/* COA MOBILE ELIMINADO (Ahora es una sección completa abajo) */}
          </div>
        </div>

        {/* COA MOBILE */}
        <div id="certificado-mobile" className="md:hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm scroll-mt-28">
          <h2 className="text-lg font-bold text-slate-900 mb-2.5 flex items-center gap-2.5">
            <div className={cn("rounded-full p-2.5 shrink-0", displayCOA === 'available' ? "bg-green-100" : "bg-slate-100")}>
              <Icon icon={displayCOA === 'available' ? "lucide:file-check" : "lucide:clock"} className={cn("h-5 w-5", displayCOA === 'available' ? "text-green-600" : "text-slate-500")} />
            </div>
            Certificado de análisis (COA)
          </h2>
          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            Consulta los resultados del análisis de laboratorio y revisa a qué presentación y lote corresponden.
          </p>

          {displayCOA === 'available' ? (
            <div className="rounded-none border border-slate-200 bg-slate-50 p-3.5 max-w-[380px]">
                  <div className="flex flex-col gap-4 mb-3">
                    <div className="flex flex-col gap-0.5 text-xs">
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
                    
                    <div className="flex flex-col gap-2">
                      <a 
                        href={isRT10 ? '/certificados/RT10_Janoshik_223529_Certificado.png' : '#certificado'} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden bg-primary px-6 py-3 font-mono text-xs font-bold tracking-widest text-white backdrop-blur-md transition-all duration-500 hover:bg-primary/90 active:scale-95"
                      >
                        {/* L-Shape Border Left */}
                        <div className="absolute left-0 top-0 h-full w-[2px] bg-white/30 transition-colors duration-500 group-hover:bg-white"></div>
                        {/* L-Shape Border Top */}
                        <div className="absolute left-0 top-0 h-[2px] w-8 bg-white/30 transition-all duration-500 group-hover:w-full group-hover:bg-white"></div>

                        ABRIR CERTIFICADO
                        <Icon icon="lucide:external-link" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                      {isRT10 && (
                        <a 
                          href="/certificados/RT10_Janoshik_223529_Informe.pdf" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden bg-slate-100 border border-slate-200 px-6 py-3 font-mono text-xs font-bold tracking-widest text-slate-700 backdrop-blur-md transition-all duration-500 hover:bg-slate-200 hover:text-slate-900 active:scale-95"
                        >
                          {/* L-Shape Border Left */}
                          <div className="absolute left-0 top-0 h-full w-[2px] bg-slate-300 transition-colors duration-500 group-hover:bg-primary/50"></div>
                          {/* L-Shape Border Top */}
                          <div className="absolute left-0 top-0 h-[2px] w-8 bg-slate-300 transition-all duration-500 group-hover:w-full group-hover:bg-primary/50"></div>

                          <Icon icon="lucide:file-text" className="h-4 w-4" />
                          VER CROMATOGRAMA
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {isRT10 && (
                    <div className="mt-3 rounded-none bg-white p-3 border border-slate-200">
                      <p className="text-[10px] leading-relaxed text-slate-500">
                        Muestra analizada por Janoshik. Reporta 10,74 mg y pureza de 99,191 %. Los resultados no significan que se haya examinado cada vial del lote.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 rounded-none border border-dashed border-slate-300 bg-slate-50 p-4 text-slate-500 max-w-[380px]">
                  <Icon icon="lucide:clock" className="h-4 w-4 shrink-0" />
                  <p className="text-xs font-medium">
                    Certificado pendiente
                  </p>
                </div>
              )}
        </div>

        {/* Custom Retatrutide Content vs Default Accordions */}
        {isRetatrutide && (
          <div className="mt-6 pt-6 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
            {/* Nav / TOC (Frontend System Style) */}
            <div className="mb-6 flex flex-wrap items-center gap-3 border-y border-slate-200 bg-white py-4 shadow-sm px-4">
              <span className="font-mono text-[11px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 ml-2 mr-2 border border-primary/20">Navegar:</span>
              <a href="#reconstitucion" className="inline-flex items-center rounded-none bg-slate-100 px-4 py-2 text-xs font-bold text-slate-900 transition-colors hover:bg-slate-200 hover:text-primary border border-slate-200">Reconstitución</a>
              <a href="#consejos" className="inline-flex items-center rounded-none bg-slate-100 px-4 py-2 text-xs font-bold text-slate-900 transition-colors hover:bg-slate-200 hover:text-primary border border-slate-200">Consejos prácticos</a>
              <a href="#preguntas-frecuentes" className="inline-flex items-center rounded-none bg-slate-100 px-4 py-2 text-xs font-bold text-slate-900 transition-colors hover:bg-slate-200 hover:text-primary border border-slate-200">Preguntas frecuentes</a>
              <a href="#estudios" className="inline-flex items-center rounded-none bg-slate-100 px-4 py-2 text-xs font-bold text-slate-900 transition-colors hover:bg-slate-200 hover:text-primary border border-slate-200">Estudios</a>
            </div>

            {/* Content blocks (Frontend System Layout) */}
            <div className="flex flex-col mb-0 w-[100vw] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
              
              {/* INTRO Y RECONSTITUCIÓN (BLANCO) */}
              <section id="informacion" className="scroll-mt-28 relative z-30 bg-white pt-10 pb-10 rounded-b-xl shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
                <div className="max-w-5xl mx-auto px-4 lg:px-8">
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-6">
                    <div className="mb-4 flex items-center gap-2 text-primary">
                      <Icon icon="lucide:flask-conical" className="h-5 w-5" />
                      <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-primary/80">Ficha Técnica</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl leading-tight">Introducción al péptido</h2>
                  </motion.div>
                  
                  <motion.dl initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="space-y-2">
                    <div className="grid sm:grid-cols-3 gap-3 py-5 border-b border-slate-100">
                      <dt className="text-lg font-bold text-slate-900">¿Qué es la retatrutida?</dt>
                      <dd className="sm:col-span-2 text-sm text-slate-600 leading-relaxed">
                        La retatrutida es un péptido en investigación: una molécula formada por una cadena de aminoácidos. En publicaciones científicas también aparece como retatrutide o LY3437943.
                      </dd>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-3 py-5 border-b border-slate-100">
                      <dt className="text-lg font-bold text-slate-900">¿Para qué se investiga?</dt>
                      <dd className="sm:col-span-2 text-sm text-slate-600 leading-relaxed">
                        Se estudia por sus efectos sobre el peso corporal y el control de la glucosa en sangre. Los ensayos clínicos evalúan su eficacia y seguridad en personas con obesidad, sobrepeso o diabetes tipo 2.
                      </dd>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-3 py-5 border-b border-slate-100">
                      <dt className="text-lg font-bold text-slate-900">¿Cómo funciona?</dt>
                      <dd className="sm:col-span-2 text-sm text-slate-600 leading-relaxed">
                        Los receptores reciben señales que activan respuestas en las células. La retatrutida activa los receptores de GIP, GLP-1 y glucagón; por eso se describe como un agonista triple.
                      </dd>
                    </div>
                    {/* RECONSTITUCIÓN */}
                    <div className="grid sm:grid-cols-3 gap-3 py-5 border-b border-slate-100" id="reconstitucion">
                      <dt className="text-lg font-bold text-slate-900">Reconstitución</dt>
                      <dd className="sm:col-span-2 text-sm text-slate-600 leading-relaxed space-y-4">
                        <p>
                          Reconstituir significa agregar agua bacteriostática al polvo liofilizado (el polvo seco que viene dentro del vial) para convertirlo en una solución lista para usar. Los péptidos se venden en polvo porque así se mantienen estables por más tiempo.
                        </p>
                      </dd>
                    </div>
                    
                    {/* INFO PRÁCTICA (UNIDADES INCLUIDAS) */}
                    <div id="informacion-practica" className="grid sm:grid-cols-3 gap-3 py-5 bg-slate-50/50 scroll-mt-28 rounded-xl px-4 my-4">
                      <dt className="text-lg font-bold text-slate-900">Lectura de cantidades</dt>
                      <dd className="sm:col-span-2 text-sm text-slate-600 leading-relaxed">
                        <div className="flex flex-wrap gap-4 text-sm font-mono">
                          <div className="flex items-center gap-2"><span className="font-bold text-primary">mg</span><span className="text-slate-500">cantidad de péptido</span></div>
                          <div className="flex items-center gap-2"><span className="font-bold text-primary">mL</span><span className="text-slate-500">volumen de líquido</span></div>
                          <div className="flex items-center gap-2"><span className="font-bold text-primary">mg/mL</span><span className="text-slate-500">concentración resultante</span></div>
                        </div>
                      </dd>
                    </div>

                    {/* DOSIS Y CALENDARIO */}
                    <div className="py-6" id="dosis">
                      <div className="max-w-none">
                        <h2 className="text-lg font-bold text-slate-900 mb-3">Dosis y calendario</h2>
                        <p className="text-sm text-slate-600 leading-relaxed mb-6">
                          Aplicación una vez por semana, siempre el mismo día. El esquema de referencia sigue el aumento gradual usado en el estudio clínico de fase 2 del retatrutide (NEJM, 2023). Subir la dosis poco a poco ayuda a reducir efectos como náuseas o malestar digestivo. Si aparecen molestias, lo recomendable es mantener la dosis actual más tiempo antes de subir.
                        </p>

                        {/* TABLA RT5 */}
                        <div className={cn("rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm transition-all", (!isRT10) ? "block" : "hidden")}>
                          <div className="bg-slate-50/80 border-b border-slate-200/80 p-4 sm:p-5">
                            <h3 className="text-base font-bold text-slate-900 flex items-center justify-between">
                              <span>Retatrutida 5 mg (RT5)</span>
                              <span className="text-[11px] font-mono font-semibold text-[#1959D7] bg-[#1959D7]/10 px-2.5 py-1 rounded-full">5 mg / mL</span>
                            </h3>
                            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                              Reconstituir: disolver en 1 mL de agua bacteriostática. Concentración final: 5 mg por mL (20 unidades = 1 mg).
                            </p>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs sm:text-sm text-slate-900">
                              <thead className="bg-slate-100/70 font-bold border-b border-slate-200/80 text-slate-700 uppercase tracking-wider text-[11px]">
                                <tr>
                                  <th className="px-5 py-3.5 w-1/3">Semana</th>
                                  <th className="px-5 py-3.5 w-1/3">Dosis (mg)</th>
                                  <th className="px-5 py-3.5 w-1/3">Unidades en la jeringa</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                <tr className="hover:bg-slate-50/80 transition-colors">
                                  <td className="px-5 py-3.5 font-semibold text-slate-900">1 a 4</td>
                                  <td className="px-5 py-3.5 font-medium text-slate-700">2 mg</td>
                                  <td className="px-5 py-3.5 font-mono font-bold text-[#1959D7]">40 unidades</td>
                                </tr>
                                <tr className="hover:bg-slate-50/80 transition-colors">
                                  <td className="px-5 py-3.5 font-semibold text-slate-900">5 a 8</td>
                                  <td className="px-5 py-3.5 font-medium text-slate-700">4 mg</td>
                                  <td className="px-5 py-3.5 font-mono font-bold text-[#1959D7]">80 unidades</td>
                                </tr>
                                <tr className="hover:bg-slate-50/80 transition-colors">
                                  <td className="px-5 py-3.5 font-semibold text-slate-900">9 a 12</td>
                                  <td className="px-5 py-3.5 font-medium text-slate-700">4 mg</td>
                                  <td className="px-5 py-3.5 font-mono font-bold text-[#1959D7]">80 unidades</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* TABLA RT10 */}
                        <div className={cn("rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm transition-all", (isRT10) ? "block" : "hidden")}>
                          <div className="bg-slate-50/80 border-b border-slate-200/80 p-4 sm:p-5">
                            <h3 className="text-base font-bold text-slate-900 flex items-center justify-between">
                              <span>Retatrutida 10 mg (RT10)</span>
                              <span className="text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">10 mg / mL</span>
                            </h3>
                            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                              Reconstituir: disolver en 1 mL de agua bacteriostática. Concentración final: 10 mg por mL (10 unidades = 1 mg).
                            </p>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs sm:text-sm text-slate-900">
                              <thead className="bg-slate-100/70 font-bold border-b border-slate-200/80 text-slate-700 uppercase tracking-wider text-[11px]">
                                <tr>
                                  <th className="px-5 py-3.5 w-1/3">Semana</th>
                                  <th className="px-5 py-3.5 w-1/3">Dosis (mg)</th>
                                  <th className="px-5 py-3.5 w-1/3">Unidades en la jeringa</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                <tr className="hover:bg-slate-50/80 transition-colors">
                                  <td className="px-5 py-3.5 font-semibold text-slate-900">1 a 4</td>
                                  <td className="px-5 py-3.5 font-medium text-slate-700">2 mg</td>
                                  <td className="px-5 py-3.5 font-mono font-bold text-[#1959D7]">20 unidades</td>
                                </tr>
                                <tr className="hover:bg-slate-50/80 transition-colors">
                                  <td className="px-5 py-3.5 font-semibold text-slate-900">5 a 8</td>
                                  <td className="px-5 py-3.5 font-medium text-slate-700">4 mg</td>
                                  <td className="px-5 py-3.5 font-mono font-bold text-[#1959D7]">40 unidades</td>
                                </tr>
                                <tr className="hover:bg-slate-50/80 transition-colors">
                                  <td className="px-5 py-3.5 font-semibold text-slate-900">9 a 12</td>
                                  <td className="px-5 py-3.5 font-medium text-slate-700">8 mg</td>
                                  <td className="px-5 py-3.5 font-mono font-bold text-[#1959D7]">80 unidades</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.dl>
                </div>
              </section>

              {/* CONSEJOS PRÁCTICOS (AZUL OSCURO) */}
              <section id="consejos" className="scroll-mt-48 relative z-20 bg-[#17294F] pt-20 pb-10 -mt-8 rounded-b-[3rem] sm:rounded-b-[4rem] shadow-[0_15px_50px_rgba(0,0,0,0.15)]">
                <div className="max-w-5xl mx-auto px-4 lg:px-8">
                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-8">
                    <div className="mb-4 flex items-center gap-2 text-blue-400">
                      <Icon icon="lucide:lightbulb" className="h-5 w-5" />
                      <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-blue-400/80">Experiencia de uso</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl leading-tight">Consejos Prácticos</h2>
                  </motion.div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.85fr] gap-4">
                    {[
                      [
                        // Grandes (Izquierda)
                        { 
                          title: "Qué molestias se han reportado", 
                          desc: "Entre los efectos adversos frecuentes en los ensayos se encuentran: Náuseas, Diarrea, Estreñimiento, Vómitos. La intensidad y la duración varían entre personas. No existe un plazo único en el que estas molestias deban desaparecer." 
                        },
                        { title: "Los aumentos no son una meta", desc: "TRIUMPH-1 incluyó grupos con dosis objetivo de 4, 9 y 12 mg. Llegar a 12 mg no fue el objetivo para todos los participantes. El calendario no establece una dosis adecuada para todas las personas." },
                        { title: "Más no siempre es mejor", desc: "En los estudios, las dosis mayores produjeron más pérdida de peso en promedio, pero algunos efectos adversos también fueron más frecuentes. Una mayor cantidad no garantiza un mejor resultado individual." }
                      ],
                      [
                        // Medianas (Centro)
                        { title: "Lleva un registro sencillo", desc: "Anota las fechas, los cambios de apetito y las molestias que notes. Un registro breve ayuda a observar cómo cambian con el tiempo." },
                        { title: "El progreso se observa con el tiempo", desc: "Que el peso no cambie durante unos días no demuestra, por sí solo, que una dosis sea insuficiente." },
                        { title: "Si aparece estreñimiento", desc: "Aumenta la fibra de forma gradual, acompáñala con agua y mantén actividad física regular." }
                      ],
                      [
                        // Pequeñas (Derecha)
                        { title: "Comidas más pequeñas", desc: "Come despacio y sirve porciones pequeñas. Detente cuando te sientas satisfecho." },
                        { title: "Hidratación", desc: "Toma agua a lo largo del día. Si tienes náuseas, prueba con sorbos pequeños y frecuentes." },
                        { title: "Si aparece náusea", desc: "Prueba comidas sencillas y poco grasosas. Evita acostarte justo después de comer." }
                      ]
                    ].map((column, colIndex) => (
                      <div key={colIndex} className="flex flex-col gap-4">
                        {column.map((tip, i) => {
                          const globalIndex = colIndex * 3 + i;
                          return (
                            <motion.div 
                              initial={{ opacity: 0, y: 20 }} 
                              whileInView={{ opacity: 1, y: 0 }} 
                              viewport={{ once: true }} 
                              transition={{ duration: 0.5, delay: globalIndex * 0.05, ease: "easeOut" }}
                              key={i} 
                              className="group relative flex flex-col justify-start overflow-hidden bg-white/5 p-5 sm:p-6 transition-all duration-500 hover:-translate-y-1 border border-[#1959D7]/20 hover:border-white/10 shadow-sm h-full rounded-2xl"
                            >
                              <div className="absolute left-0 top-0 h-full w-[3px] bg-[#1959D7] transition-colors duration-500 group-hover:bg-white/30"></div>
                              <div className="absolute left-0 top-0 h-[3px] w-full bg-[#1959D7]/50 transition-all duration-500 group-hover:w-16 group-hover:bg-white/30"></div>
                              
                              <div className="relative z-10 flex items-start gap-4">
                                 <div>
                                   <h3 className="text-base font-bold text-white mb-1.5 transition-colors">{tip.title}</h3>
                                   <p className="text-xs text-slate-400 leading-relaxed">{tip.desc}</p>
                                 </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* PREGUNTAS FRECUENTES (BLANCO) */}
              <section id="preguntas-frecuentes" className="scroll-mt-48 relative z-10 bg-white pt-20 pb-10 -mt-8 rounded-b-[3rem] sm:rounded-b-[4rem] shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
                 <div className="max-w-6xl mx-auto px-4 lg:px-8">
                   <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
                     <div className="mb-4 flex items-center gap-2 text-primary">
                       <Icon icon="lucide:help-circle" className="h-5 w-5" />
                       <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-primary/80">Resolución de dudas</span>
                     </div>
                     <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl leading-tight">Preguntas Frecuentes</h2>
                   </motion.div>
                   
                   <div className="grid md:grid-cols-2 gap-x-8 border-t border-slate-200">
                      {[
                        { 
                          q: "¿En qué se diferencia de la tirzepatida?", 
                          a: <span>La tirzepatida activa los receptores GIP y GLP-1. La retatrutida también activa el receptor de glucagón; por eso se describe como un agonista triple. Son moléculas diferentes, y esa diferencia no demuestra por sí sola que una sea mejor para todas las personas.</span> 
                        },
                        { 
                          q: "¿Qué se sabe de su efecto sobre el hambre?", 
                          a: <span>En un análisis de un ensayo clínico de Lilly, los participantes que recibieron retatrutida reportaron menos hambre y menor tendencia a comer en exceso, especialmente en los grupos con dosis más altas. Esto no significa que el apetito desaparezca por completo. (<a href="https://dom-pubs.onlinelibrary.wiley.com" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">Consultar fuente</a>)</span> 
                        },
                        { 
                          q: "¿Qué resultados de pérdida de peso se han observado?", 
                          a: <span>En <a href="https://investor.lilly.com" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">TRIUMPH-1</a>, adultos con obesidad o sobrepeso, sin diabetes, perdieron en promedio entre 17,6 % y 25,0 % de su peso a las 80 semanas, según la dosis, frente a 3,9 % con placebo. Estos resultados corresponden al medicamento de investigación de Lilly, no a los viales de KAILAB. (<a href="https://investor.lilly.com" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">Consultar fuente</a>)</span> 
                        },
                        { 
                          q: "¿Dónde puedo revisar los análisis antes de comprar?", 
                          a: <span>En <a href="#certificado" className="text-primary font-semibold hover:underline">Certificado de análisis (COA)</a> puedes abrir el informe disponible para la presentación y el lote correspondientes. Si aún no hay un informe publicado, la página lo indica como «Certificado pendiente».</span> 
                        },
                        { 
                          q: "¿Qué viene incluido y cuánto cuesta el envío?", 
                          a: <span>Incluimos agua bacteriostática, toallitas con alcohol e <a href="#informacion-practica" className="text-primary font-semibold hover:underline">Información práctica en línea</a>. El envío es gratis a toda Colombia y el empaque es discreto.</span> 
                        }
                      ].map((faq, i) => (
                        <motion.details 
                          initial={{ opacity: 0, y: 15 }} 
                          whileInView={{ opacity: 1, y: 0 }} 
                          viewport={{ once: true }} 
                          transition={{ duration: 0.4, delay: i * 0.08 }}
                          key={i} 
                          className="group border-b border-slate-200 bg-white open:bg-slate-50 transition-colors duration-300 relative overflow-hidden"
                        >
                          <div className="absolute left-0 top-0 h-full w-[3px] bg-primary opacity-0 transition-opacity duration-300 group-open:opacity-100"></div>
                          
                          <summary className="cursor-pointer p-6 sm:px-8 font-bold text-slate-900 flex items-center justify-between [&::-webkit-details-marker]:hidden hover:text-primary transition-colors">
                             <div className="flex items-center gap-4">
                               <span className="font-mono text-xs text-slate-400 group-open:text-primary transition-colors">0{i+1}</span>
                               <span className="text-base">{faq.q}</span>
                             </div>
                             <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-slate-200 group-open:border-primary/30 group-open:bg-primary/10 transition-colors rounded-lg">
                               <Icon icon="lucide:plus" className="h-4 w-4 text-slate-400 transition-transform duration-500 group-open:rotate-45 group-hover:text-primary group-open:text-primary" />
                             </div>
                          </summary>
                          <div className="px-6 sm:px-8 pb-8 pt-0 ml-8 text-sm text-slate-600 leading-relaxed max-w-3xl">
                             {faq.a}
                          </div>
                        </motion.details>
                      ))}
                   </div>

                   {/* BOTÓN VOLVER A LA COMPRA */}
                   <div className="mt-12 flex justify-center">
                      <a 
                        href="#compra" 
                        className="group relative inline-flex items-center justify-center gap-3 overflow-hidden bg-primary px-8 py-4 font-mono text-sm font-bold tracking-widest text-white backdrop-blur-md transition-all duration-500 hover:bg-primary/90 active:scale-95"
                      >
                        {/* L-Shape Border Left */}
                        <div className="absolute left-0 top-0 h-full w-[2px] bg-white/30 transition-colors duration-500 group-hover:bg-white"></div>
                        {/* L-Shape Border Top */}
                        <div className="absolute left-0 top-0 h-[2px] w-12 bg-white/30 transition-all duration-500 group-hover:w-full group-hover:bg-white"></div>

                        COMPRAR AHORA
                        <Icon icon="lucide:shopping-cart" className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                      </a>
                   </div>
                 </div>
              </section>

              {/* ESTUDIOS Y FUENTES */}
              <section id="estudios" className="scroll-mt-28 relative z-0 bg-slate-50 pt-20 pb-10 px-4 lg:px-8 -mt-8">
                 <div className="max-w-5xl mx-auto">
                   <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-6 border-b border-slate-200 pb-4">
                     <div className="mb-4 flex items-center gap-2 text-primary">
                       <Icon icon="lucide:microscope" className="h-5 w-5" />
                       <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-primary/80">Evidencia Clínica</span>
                     </div>
                     <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl leading-tight">¿Qué dicen los estudios?</h2>
                     <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-3xl">
                       Los ensayos clínicos han observado reducciones de peso y de glucosa en sangre. Los resultados varían según la dosis, la población y la duración del estudio.
                     </p>
                   </motion.div>
                   
                   <div className="grid lg:grid-cols-2 gap-8 lg:gap-8">
                      {/* Estudio 1: TRIUMPH-1 */}
                      <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative border-l-4 border-primary pl-6 pt-2 pb-8">
                         <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Estudio de Peso Corporal · TRIUMPH-1 · 2026</span>
                         <h3 className="text-xl font-bold text-slate-900 mb-2">TRIUMPH-1 (2.339 adultos · 80 semanas)</h3>
                         <p className="text-sm text-slate-600 leading-relaxed mb-3">
                           Se compararon dosis de 4, 9 y 12 mg una vez por semana con placebo en adultos con obesidad o sobrepeso, sin diabetes.
                         </p>
                         <p className="text-sm text-slate-600 leading-relaxed mb-6">
                           La reducción promedio de peso fue de 17,6 % a 25,0 %, según la dosis, frente a 3,9 % con placebo. Este análisis considera las interrupciones del tratamiento.
                         </p>
                         <a 
                           href="https://investor.lilly.com" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1959D7] hover:underline group"
                         >
                           <Icon icon="lucide:external-link" className="h-4 w-4" />
                           Ver resultados de TRIUMPH-1 (Comunicado de Lilly · mayo de 2026)
                         </a>
                      </motion.div>
                      {/* Estudio 2: Right */}
                      <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="relative border-l-4 border-emerald-500 pl-6 pt-2 pb-8">
                         <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">TRANSCEND-T2D-1 · 2026 · 537 adultos · 40 semanas</span>
                         <h3 className="text-xl font-bold text-slate-900 mb-3">Glucosa en sangre</h3>
                         <p className="text-sm text-slate-600 leading-relaxed mb-3">
                           En adultos con diabetes tipo 2, se compararon dosis de 4, 9 y 12 mg una vez por semana con placebo.
                         </p>
                         <p className="text-sm text-slate-600 leading-relaxed mb-6">
                           La HbA1c, un indicador del nivel promedio de glucosa en sangre, disminuyó entre 1,7 y 1,9 puntos porcentuales, frente a 0,8 con placebo. Este análisis considera las interrupciones del tratamiento.
                         </p>
                         <div className="flex flex-col gap-3">
                           <a 
                             href="https://investor.lilly.com" 
                             target="_blank" 
                             rel="noopener noreferrer" 
                             className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1959D7] hover:underline group"
                           >
                             <Icon icon="lucide:external-link" className="h-4 w-4 shrink-0" />
                             Ver resultados de TRANSCEND-T2D-1 (Comunicado de Lilly · marzo de 2026)
                           </a>
                           <a 
                             href="https://www.thelancet.com" 
                             target="_blank" 
                             rel="noopener noreferrer" 
                             className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-600 hover:underline group"
                           >
                             <Icon icon="lucide:external-link" className="h-4 w-4 shrink-0" />
                             Ver publicación en The Lancet · junio de 2026
                           </a>
                         </div>
                      </motion.div>
                   </div>

                   {/* Disclaimer */}
                   <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-8 bg-slate-200/50 border-l-2 border-primary/40 p-5 rounded-r-2xl">
                      <h3 className="text-sm text-slate-900 font-bold mb-3 flex items-center gap-2">
                        <Icon icon="lucide:info" className="h-4 w-4 text-primary shrink-0" />
                        Cómo interpretar estos datos
                      </h3>
                      <ul className="space-y-2 text-xs text-slate-700 leading-relaxed list-disc list-inside">
                        <li>Son promedios de grupos; no predicen el resultado de una persona.</li>
                        <li>También se reportaron náuseas, diarrea, vómitos y otros eventos adversos.</li>
                        <li>Los ensayos evaluaron el medicamento de investigación de Lilly, no los viales de KAILAB.</li>
                      </ul>
                   </motion.div>
                   
                   {/* Fuentes científicas */}
                   <div className="mt-14 mb-0 bg-[#17294F] text-white p-8 sm:p-12 rounded-xl shadow-2xl">
                     <h2 className="text-2xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
                       <Icon icon="lucide:book-open" className="h-6 w-6 text-emerald-400" />
                       Fuentes científicas
                     </h2>
                     <p className="text-sm text-slate-400 mb-8">Consulta las publicaciones sobre la investigación de la retatrutida.</p>
                     
                     <ul className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
                       {[
                         { text: "Retatrutida y obesidad — ensayo de fase 2 (NEJM, 2023)", url: "https://www.nejm.org" },
                         { text: "Retatrutida y comportamiento alimentario (Diabetes, Obesity and Metabolism, 2025)", url: "https://dom-pubs.onlinelibrary.wiley.com" },
                         { text: "TRIUMPH-1: resultados de peso corporal (Lilly, 2026)", url: "https://investor.lilly.com" },
                         { text: "TRANSCEND-T2D-1: resultados en diabetes tipo 2 (Lilly, 2026)", url: "https://investor.lilly.com" },
                         { text: "TRANSCEND-T2D-1: publicación científica (The Lancet, 2026)", url: "https://www.thelancet.com" },
                         { text: "Retatrutida: mecanismo e investigación (Lilly)", url: "https://www.lilly.com" },
                         { text: "Tirzepatida: información del medicamento (Lilly)", url: "https://www.lilly.com" }
                       ].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 border-b border-white/10 pb-3">
                             <Icon icon="lucide:external-link" className="h-4 w-4 text-emerald-400/70 shrink-0" />
                             <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-emerald-400 transition-colors">
                               {item.text}
                             </a>
                          </li>
                       ))}
                     </ul>
                   </div>
                 </div>
              </section>
            </div>
          </div>
        )}

        {!isRetatrutide && product.infoAccordions && product.infoAccordions.length > 0 && (
          <div className="mt-8 md:mt-12 pt-8 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
            <div className="grid gap-4 md:grid-cols-2 items-start">
              {product.infoAccordions.map((acc, i) => (
                <AccordionItem key={i} title={acc.title} contentHtml={acc.contentHtml} />
              ))}
            </div>
          </div>
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
            onClick={cartState === 'success' ? toggleCart : handleAddToCart}
            disabled={isOutOfStock || (hasVariants && !activeVariant) || cartState === 'adding'}
            className={cn(
              "group relative flex h-10 flex-1 items-center justify-center gap-2 rounded-sm border-2 px-2 text-xs sm:text-sm sm:px-4 font-bold transition-all duration-300 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
              cartState === 'success'
                ? "border-green-600 bg-green-600 text-white"
                : cartState === 'error_add' || cartState === 'error_price'
                ? "border-red-600 bg-red-600 text-white"
                : "border-[#1959D7] bg-[#1959D7] text-white hover:bg-transparent hover:text-[#1959D7]"
            )}
          >
            <Icon icon={cartState === 'success' ? "lucide:check" : isOutOfStock ? "lucide:x" : "lucide:shopping-cart"} className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-rotate-12" />
            <span className="truncate">
              {isOutOfStock ? "Agotado" :
               cartState === 'adding' ? "Agregando…" :
               cartState === 'success' ? "Agregado al carrito." :
               cartState === 'error_add' ? "No pudimos agregar el producto. Inténtalo de nuevo." :
               cartState === 'error_price' ? "No pudimos cargar el precio. Inténtalo de nuevo." :
               "Agregar al carrito"}
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}
