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

        <div id="compra" className="grid gap-6 md:grid-cols-[1fr_1.1fr] lg:gap-8 scroll-mt-28 items-stretch">

          {/* LEFT: Image + COA */}
          <div className="flex flex-col gap-4">
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
                    alt={activeVariant ? `${product.title} ${activeVariant.name} de KAILAB` : product.title}
                    fill
                    className="object-contain drop-shadow-2xl mix-blend-multiply transition-opacity duration-300"
                  />
                </motion.div>
              </motion.div>
            </div>
            {/* COA SECTION MOVED HERE */}
            <div id="certificado" className="hidden md:flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm scroll-mt-28">
              <div className="flex items-start gap-3">
                <div className={cn("rounded-full p-2 shrink-0", displayCOA === 'available' ? "bg-green-100" : "bg-slate-100")}>
                  <Icon icon={displayCOA === 'available' ? "lucide:file-check" : "lucide:clock"} className={cn("h-4 w-4", displayCOA === 'available' ? "text-green-600" : "text-slate-500")} />
                </div>
                <div className="flex-1">
                  <h2 className="text-base font-bold text-slate-900 mb-1">
                    Certificado de análisis (COA)
                  </h2>
                  <p className="text-[11px] text-slate-600 mb-3 leading-relaxed">
                    Consulta los resultados del análisis de laboratorio y revisa a qué presentación y lote corresponden.
                  </p>

                  {displayCOA === 'available' ? (
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
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
                            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#1959D7] px-3 py-1.5 text-[10px] font-bold text-white transition-colors hover:bg-[#1959D7]/90"
                          >
                            <Icon icon="lucide:external-link" className="h-3 w-3" />
                            Abrir
                          </a>
                          {isRT10 && (
                            <a 
                              href="/certificados/RT10_Janoshik_223529_Informe.pdf" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
                            >
                              <Icon icon="lucide:file-text" className="h-3 w-3" />
                              PDF
                            </a>
                          )}
                        </div>
                      </div>
                      
                      {isRT10 && (
                        <div className="mt-2 rounded-lg bg-white p-2.5 border border-slate-200">
                          <p className="text-[9px] leading-relaxed text-slate-500">
                            Muestra analizada por Janoshik. Reporta 10,74 mg y pureza de 99,191 %.
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3 text-slate-500">
                      <Icon icon="lucide:clock" className="h-3.5 w-3.5 shrink-0" />
                      <p className="text-[11px] font-medium">
                        Certificado pendiente
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Commerce details */}
          <div className="relative flex flex-col rounded-xl bg-white p-4 lg:p-5 shadow-2xl justify-between h-full">

            {/* DESKTOP: Breadcrumb + Title */}
            <div className="hidden md:flex flex-col gap-2 mb-1.5">
              {breadcrumbElement}
              {titleAndCategoryElement}
            </div>

            {product.description ? (
              <p className="text-[11px] leading-snug text-slate-700 mb-2.5">
                {product.description}
              </p>
            ) : (
              <p className="text-[11px] leading-relaxed text-slate-600 mb-2.5">
                Fórmula: <span className="font-mono text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">{product.formula}</span>. Compuesto liofilizado de alta pureza, sintetizado para investigación y análisis de laboratorio (RUO). No apto para uso humano o veterinario.
              </p>
            )}

            <div className="mb-2.5">
              {/* FEATURES */}
              {product.features && product.features.length > 0 && (
                <div className="grid gap-y-1.5 gap-x-3 w-full grid-cols-2">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <Icon icon="lucide:check" className="h-3 w-3 text-slate-900 shrink-0" />
                      <span className="text-[10px] text-slate-700 leading-tight">{feat}</span>
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
                        "group flex h-full flex-1 items-center justify-center gap-2 rounded-lg transition-all duration-300 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 px-4 font-bold text-center",
                        cartState === 'success'
                          ? "bg-green-600 text-white"
                          : cartState === 'error_add' || cartState === 'error_price'
                          ? "bg-red-600 text-white"
                          : "bg-[#1959D7] text-white hover:bg-[#1959D7]/90"
                      )}
                    >
                      <Icon
                        icon={cartState === 'success' ? "lucide:check" : isOutOfStock ? "lucide:x" : "lucide:shopping-cart"}
                        className={cn("h-4 w-4 shrink-0 transition-transform duration-300", cartState === 'idle' && !isOutOfStock && "group-hover:-rotate-12")}
                      />
                      <span className="text-xs leading-tight">
                        {isOutOfStock ? "Agotado" : 
                         cartState === 'adding' ? "Agregando…" : 
                         cartState === 'success' ? "Agregado al carrito." : 
                         cartState === 'error_add' ? "No pudimos agregar el producto. Inténtalo de nuevo." : 
                         cartState === 'error_price' ? "No pudimos cargar el precio. Inténtalo de nuevo." : 
                         "Agregar al carrito"}
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
            <div className="mt-2.5 flex flex-col gap-1.5 rounded-lg border border-slate-200 bg-slate-50 p-2.5">
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
          <div className="flex items-start gap-3">
            <div className={cn("rounded-full p-2.5 shrink-0", displayCOA === 'available' ? "bg-green-100" : "bg-slate-100")}>
              <Icon icon={displayCOA === 'available' ? "lucide:file-check" : "lucide:clock"} className={cn("h-5 w-5", displayCOA === 'available' ? "text-green-600" : "text-slate-500")} />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-slate-900 mb-1.5">
                Certificado de análisis (COA)
              </h2>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Consulta los resultados del análisis de laboratorio y revisa a qué presentación y lote corresponden.
              </p>

              {displayCOA === 'available' ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
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
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#1959D7] px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-[#1959D7]/90"
                      >
                        <Icon icon="lucide:external-link" className="h-4 w-4" />
                        Abrir certificado
                      </a>
                      {isRT10 && (
                        <a 
                          href="/certificados/RT10_Janoshik_223529_Informe.pdf" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border-2 border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
                        >
                          <Icon icon="lucide:file-text" className="h-4 w-4" />
                          Ver cromatograma (PDF)
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {isRT10 && (
                    <div className="mt-3 rounded-lg bg-white p-3 border border-slate-200">
                      <p className="text-[10px] leading-relaxed text-slate-500">
                        Muestra analizada por Janoshik. Reporta 10,74 mg y pureza de 99,191 %. Los resultados no significan que se haya examinado cada vial del lote.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-slate-500">
                  <Icon icon="lucide:clock" className="h-4 w-4 shrink-0" />
                  <p className="text-xs font-medium">
                    Certificado pendiente
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Custom Retatrutide Content vs Default Accordions */}
        {isRetatrutide && (
          <div className="mt-8 md:mt-12 pt-8 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
            {/* Nav / TOC (Frontend System Style) */}
            <div className="mb-10 flex flex-wrap items-center gap-3 border-y border-border/50 bg-background/50 py-4">
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary/80 ml-2 mr-2">Navegar:</span>
              <a href="#reconstitucion" className="inline-flex items-center rounded-sm bg-secondary/10 px-4 py-2 text-xs font-bold text-foreground transition-colors hover:bg-secondary/20 hover:text-primary border border-border/40">Reconstitución</a>
              <a href="#consejos" className="inline-flex items-center rounded-sm bg-secondary/10 px-4 py-2 text-xs font-bold text-foreground transition-colors hover:bg-secondary/20 hover:text-primary border border-border/40">Consejos prácticos</a>
              <a href="#preguntas-frecuentes" className="inline-flex items-center rounded-sm bg-secondary/10 px-4 py-2 text-xs font-bold text-foreground transition-colors hover:bg-secondary/20 hover:text-primary border border-border/40">Preguntas frecuentes</a>
              <a href="#estudios" className="inline-flex items-center rounded-sm bg-secondary/10 px-4 py-2 text-xs font-bold text-foreground transition-colors hover:bg-secondary/20 hover:text-primary border border-border/40">Estudios</a>
            </div>

            {/* Content blocks (Frontend System Layout) */}
            <div className="max-w-7xl mx-auto space-y-12 mb-24">
              
              {/* INTRO Y RECONSTITUCIÓN (DISEÑO LISTA DESCRIPTIVA) */}
              <section id="informacion" className="scroll-mt-28 mb-24">
                <div className="mb-10">
                  <div className="mb-4 flex items-center gap-2 text-primary">
                    <Icon icon="lucide:flask-conical" className="h-5 w-5" />
                    <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-primary/80">Ficha Técnica</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl leading-tight">Introducción al péptido</h2>
                </div>
                
                <dl className="divide-y divide-border/50 border-y border-border/50 bg-background">
                  <div className="grid sm:grid-cols-3 gap-4 py-8">
                    <dt className="text-lg font-bold text-foreground">¿Qué es?</dt>
                    <dd className="sm:col-span-2 text-sm text-muted-foreground leading-relaxed">
                      Un péptido en investigación: una molécula formada por una cadena de aminoácidos. En publicaciones científicas también aparece como retatrutide o LY3437943.
                    </dd>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4 py-8">
                    <dt className="text-lg font-bold text-foreground">¿Para qué se investiga?</dt>
                    <dd className="sm:col-span-2 text-sm text-muted-foreground leading-relaxed">
                      Por sus efectos sobre el peso corporal y la glucosa en sangre. Se evalúa en personas con obesidad, sobrepeso o diabetes tipo 2.
                    </dd>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4 py-8">
                    <dt className="text-lg font-bold text-foreground">¿Cómo funciona?</dt>
                    <dd className="sm:col-span-2 text-sm text-muted-foreground leading-relaxed">
                      Activa los receptores de GIP, GLP-1 y glucagón; por eso se describe como un agonista triple.
                    </dd>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4 py-8" id="reconstitucion">
                    <dt className="text-lg font-bold text-foreground">Reconstitución</dt>
                    <dd className="sm:col-span-2 text-sm text-muted-foreground leading-relaxed">
                      Significa disolver el polvo del vial con un líquido adecuado (como agua bacteriostática) para obtener una solución inyectable.
                    </dd>
                  </div>
                  
                  {/* INFO PRÁCTICA */}
                  <div className="grid sm:grid-cols-3 gap-4 py-8 bg-secondary/5">
                    <dt className="text-lg font-bold text-foreground">Lectura de cantidades</dt>
                    <dd className="sm:col-span-2 text-sm text-muted-foreground leading-relaxed">
                      <div className="flex flex-wrap gap-4 text-sm font-mono">
                        <div className="flex items-center gap-2"><span className="font-bold text-primary">mg</span><span className="text-muted-foreground">cantidad de péptido</span></div>
                        <div className="flex items-center gap-2"><span className="font-bold text-primary">mL</span><span className="text-muted-foreground">volumen de líquido</span></div>
                        <div className="flex items-center gap-2"><span className="font-bold text-primary">mg/mL</span><span className="text-muted-foreground">concentración resultante</span></div>
                      </div>
                    </dd>
                  </div>

                  {/* BORRADORES OCULTOS K&T */}
                  <div className="hidden py-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Cantidad de agua</h3>
                    <div>
                      <p>Presentación: [Editable]</p>
                      <p>Agua para reconstituir: [Editable]</p>
                      <p>Concentración resultante: [Editable]</p>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mt-4 mb-2">Antes de empezar</h3>
                    <ul className="list-disc pl-4"><li>[Materiales - Editable]</li></ul>
                    <h3 className="text-lg font-bold text-slate-900 mt-4 mb-2">Paso a paso</h3>
                    <ol className="list-decimal pl-4"><li>[Paso 1 - Editable]</li></ol>
                    <p>[Frase final - Editable]</p>
                    
                    <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Almacenamiento</h2>
                    <div>
                      <p>Antes de reconstituir: [Editable]</p>
                      <p>Después de reconstituir: [Editable]</p>
                      <p>¿Cuánto tiempo se conserva?: [Editable]</p>
                      <p>Si queda fuera de la nevera: [Editable]</p>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Dosis y calendario</h2>
                    <div className="bg-slate-50 border border-slate-200 p-4 md:p-6">
                      <div className="flex gap-2 mb-6">
                        <button type="button" className={cn("px-3 py-1 text-sm font-bold transition-colors", isRT5 || (!isRT5 && !isRT10) ? "bg-[#1959D7] text-white" : "bg-slate-200 text-slate-600")}>RT5</button>
                        <button type="button" className={cn("px-3 py-1 text-sm font-bold transition-colors", isRT10 ? "bg-[#1959D7] text-white" : "bg-slate-200 text-slate-600")}>RT10</button>
                      </div>
                      
                      { (isRT5 || (!isRT5 && !isRT10)) ? (
                        <>
                          <h3 className="text-lg font-bold text-slate-900 mb-1">Retatrutida 5 mg (RT5)</h3>
                          <p className="text-xs text-slate-700 uppercase tracking-widest mb-4">REVISIÓN PRIVADA · Concentración preparada y escala de la jeringa: campos vacíos.</p>
                          <h4 className="text-base font-bold text-slate-900 mb-2">RT5</h4>
                          <div className="overflow-x-auto border border-slate-200 bg-white">
                            <table className="w-full text-left text-sm text-slate-900">
                              <thead className="bg-[#e2e8f0] font-bold">
                                <tr>
                                  <th className="px-4 py-2 w-1/3">Semana</th>
                                  <th className="px-4 py-2 w-1/3">Dosis (mg)</th>
                                  <th className="px-4 py-2 w-1/3">Unidades de la jeringa</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {Array.from({ length: 20 }).map((_, i) => (
                                  <tr key={i} className="hover:bg-slate-50">
                                    <td className="px-4 py-2">Semana {i + 1}</td>
                                    <td className="px-4 py-2"></td>
                                    <td className="px-4 py-2"></td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </>
                      ) : (
                        <>
                          <h3 className="text-lg font-bold text-slate-900 mb-1">Retatrutida 10 mg (RT10)</h3>
                          <p className="text-xs text-slate-700 uppercase tracking-widest mb-4">REVISIÓN PRIVADA · Concentración preparada y escala de la jeringa: campos vacíos.</p>
                          <h4 className="text-base font-bold text-slate-900 mb-2">RT10</h4>
                          <div className="overflow-x-auto border border-slate-200 bg-white">
                            <table className="w-full text-left text-sm text-slate-900">
                              <thead className="bg-[#e2e8f0] font-bold">
                                <tr>
                                  <th className="px-4 py-2 w-1/3">Semana</th>
                                  <th className="px-4 py-2 w-1/3">Dosis (mg)</th>
                                  <th className="px-4 py-2 w-1/3">Unidades de la jeringa</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {Array.from({ length: 20 }).map((_, i) => (
                                  <tr key={i} className="hover:bg-slate-50">
                                    <td className="px-4 py-2">Semana {i + 1}</td>
                                    <td className="px-4 py-2"></td>
                                    <td className="px-4 py-2"></td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </>
                      )}
                      <div className="mt-6 bg-slate-100 p-3">
                        <p className="text-xs font-bold text-slate-900 leading-relaxed">
                          PARA K&T · Mantener vacías las columnas de dosis y unidades. No escribir cero, calcular conversiones ni copiar cantidades de los estudios.
                        </p>
                      </div>
                    </div>
                  </div>
                </dl>
              </section>

              {/* CONSEJOS PRÁCTICOS (DISEÑO MACIZO GRID) */}
              <section id="consejos" className="scroll-mt-28 mb-24">
                <div className="border border-border/50 bg-background shadow-sm">
                  <div className="p-6 sm:p-10 border-b border-border/50 bg-secondary/5">
                    <div className="mb-4 flex items-center gap-2 text-primary">
                      <Icon icon="lucide:lightbulb" className="h-5 w-5" />
                      <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-primary/80">Experiencia de uso</span>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl leading-tight">Consejos Prácticos</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border/50">
                    {[
                      { title: "Los aumentos no son una meta", desc: "TRIUMPH-1 incluyó grupos con dosis objetivo de 4, 9 y 12 mg. Llegar a 12 mg no fue el objetivo para todos. El calendario no establece una dosis adecuada universal." },
                      { title: "Más no siempre es mejor", desc: "En los estudios, las dosis mayores produjeron más pérdida de peso en promedio, pero algunos efectos adversos también fueron más frecuentes." },
                      { title: "El progreso es gradual", desc: "Que el peso no cambie durante unos días no demuestra, por sí solo, que una dosis sea insuficiente." },
                      { title: "Comidas e hidratación", desc: "Come despacio, sirve porciones pequeñas. Toma agua a lo largo del día. Si tienes náuseas, prueba con sorbos pequeños y comidas poco grasosas." },
                      { title: "Molestias reportadas", desc: "En los ensayos se han reportado náuseas, vómitos, diarrea o estreñimiento. La intensidad varía entre personas." },
                      { title: "Lleva un registro sencillo", desc: "Anota las fechas, los cambios de apetito y las molestias que notes. Ayuda a observar cómo cambian con el tiempo." }
                    ].map((tip, i) => (
                      <div key={i} className={cn("p-6 sm:p-8 hover:bg-secondary/5 transition-colors relative group", (i >= 2 && i < 3) ? "border-t-0" : (i >= 3 ? "border-t border-border/50" : ""))}>
                        <div className="absolute left-0 top-0 h-0 w-full bg-primary/20 transition-all duration-300 group-hover:h-1"></div>
                        <h3 className="text-base font-bold text-foreground mb-3">{tip.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* PREGUNTAS FRECUENTES (DISEÑO CAJONES ACORDEON CLEAN) */}
              <section id="preguntas-frecuentes" className="scroll-mt-28 mb-24 max-w-4xl">
                 <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-8 flex items-center gap-3">
                   <Icon icon="lucide:help-circle" className="h-6 w-6 text-primary" />
                   Preguntas frecuentes
                 </h2>
                 <div className="flex flex-col gap-3">
                    {[
                      { q: "¿En qué se diferencia de la tirzepatida?", a: "La tirzepatida activa los receptores GIP y GLP-1. La retatrutida también activa el receptor de glucagón; por eso se describe como un agonista triple. Son moléculas diferentes, y esa diferencia no demuestra por sí sola que una sea mejor para todas las personas." },
                      { q: "¿Qué se sabe de su efecto sobre el hambre?", a: "En un análisis de un ensayo clínico de Lilly, los participantes que recibieron retatrutida reportaron menos hambre y menor tendencia a comer en exceso, especialmente en los grupos con dosis más altas. Esto no significa que el apetito desaparezca por completo." },
                      { q: "¿Qué resultados de pérdida de peso se han observado?", a: "En TRIUMPH-1, adultos con obesidad o sobrepeso, sin diabetes, perdieron en promedio entre 17,6 % y 25,0 % de su peso a las 80 semanas, según la dosis, frente a 3,9 % con placebo. Estos resultados corresponden al medicamento de investigación de Lilly, no a los viales de KAILAB." },
                      { q: "¿Dónde puedo revisar los análisis antes de comprar?", a: "En la pestaña 'Certificado de análisis (COA)' puedes abrir el informe disponible para la presentación y el lote correspondientes. Si aún no hay un informe publicado, la página lo indica como «Certificado pendiente»." },
                      { q: "¿Qué viene incluido y cuánto cuesta el envío?", a: "Incluimos agua bacteriostática, toallitas con alcohol e información práctica en línea. El envío es gratis a toda Colombia y el empaque es discreto." }
                    ].map((faq, i) => (
                      <details key={i} className="group border border-border/50 bg-background open:bg-secondary/5 transition-colors duration-300">
                        <summary className="cursor-pointer p-5 font-bold text-foreground flex items-center justify-between [&::-webkit-details-marker]:hidden">
                           {faq.q}
                           <Icon icon="lucide:chevron-down" className="h-4 w-4 transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="px-5 pb-5 pt-0 text-sm text-muted-foreground leading-relaxed border-t border-border/50 mx-5 mt-2 pt-4">
                           {faq.a}
                        </div>
                      </details>
                    ))}
                 </div>
              </section>

              {/* ESTUDIOS Y FUENTES (DISEÑO PANELES LATERALES + FOOTER INVERTIDO) */}
              <section id="estudios" className="scroll-mt-28 mb-16">
                 <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/50 pb-6 mb-10 gap-4">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Evidencia Clínica</h2>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary/80 bg-primary/10 px-3 py-1">Estudios</span>
                 </div>
                 
                 <div className="grid lg:grid-cols-2 gap-12 lg:gap-8">
                    {/* Estudio 1: Left */}
                    <div className="relative border-l-4 border-primary pl-6 py-2">
                       <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-2">Estudio de Peso Corporal</span>
                       <h3 className="text-xl font-bold text-foreground mb-4">Ensayo TRIUMPH-1</h3>
                       <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                         En 2.339 adultos con obesidad o sobrepeso a lo largo de 80 semanas, se compararon dosis de 4, 9 y 12 mg con placebo. La reducción promedio fue de 17,6 % a 25,0 %, frente a 3,9 % con placebo.
                       </p>
                       <a href="#" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/80 group">
                         Leer comunicado <Icon icon="lucide:arrow-right" className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                       </a>
                    </div>
                    {/* Estudio 2: Right */}
                    <div className="relative border-l-4 border-emerald-600 pl-6 py-2">
                       <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-2">Estudio de Glucosa</span>
                       <h3 className="text-xl font-bold text-foreground mb-4">TRANSCEND-T2D-1</h3>
                       <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                         En 537 adultos con diabetes tipo 2 a lo largo de 40 semanas. La HbA1c disminuyó entre 1,7 y 1,9 puntos porcentuales, frente a 0,8 con placebo.
                       </p>
                       <div className="flex gap-4">
                         <a href="#" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-emerald-700 hover:text-emerald-800 group">
                           Investigación <Icon icon="lucide:arrow-right" className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                         </a>
                       </div>
                    </div>
                 </div>

                 {/* Disclaimer */}
                 <div className="mt-8 bg-secondary/10 border-l-2 border-primary/50 p-6">
                    <p className="text-sm text-foreground font-bold mb-1">Interpretación de los datos</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Son promedios de grupos; no predicen resultados individuales. También se reportaron náuseas, diarrea, vómitos y otros eventos. Los ensayos evaluaron el medicamento de investigación de Lilly, no los viales de KAILAB.
                    </p>
                 </div>
                 
                 {/* Bibliografía Footer */}
                 <div className="mt-16 bg-foreground text-background p-8 sm:p-12">
                   <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-background/70 mb-8 flex items-center gap-2">
                     <Icon icon="lucide:book-open" className="h-4 w-4" /> Bibliografía y Documentación
                   </h3>
                   <ul className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
                     {[
                        "Retatrutida y obesidad (NEJM, 2023)",
                        "Comportamiento alimentario (DOM, 2025)",
                        "TRIUMPH-1 (Lilly, 2026)",
                        "TRANSCEND-T2D-1 (Lilly, 2026)",
                        "Mecanismo e investigación (Lilly)"
                     ].map((fuente, i) => (
                        <li key={i} className="flex items-center gap-3 border-b border-background/20 pb-3">
                           <Icon icon="lucide:arrow-up-right" className="h-3 w-3 text-background/50" />
                           <a href="#" className="text-sm font-medium hover:text-background/80 transition-colors">{fuente}</a>
                        </li>
                     ))}
                   </ul>
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
