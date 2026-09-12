'use client'

import { use, useState, useEffect } from 'react'
import { notFound, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { products, formatCOP } from '@/components/kailab/data'
import { TopBar } from '@/components/kailab/top-bar'
import { Navbar } from '@/components/kailab/navbar'
import { Footer } from '@/components/kailab/footer'
import { useCart } from '@/components/kailab/cart-context'
import { cn } from '@/lib/utils'
import { WompiCheckoutButton } from '@/components/kailab/wompi-checkout'

export default function CanonicalProductPage({
  params
}: {
  params: Promise<{ category: string, product: string, variant?: string[] }>
}) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { cartCount, addToCart, toggleCart, openSearch } = useCart()

  const [qty, setQty] = useState(1)
  const [addedFeedback, setAddedFeedback] = useState(false)

  const product = products.find((p) => p.slug === resolvedParams.product)
  if (!product) notFound()

  const hasVariants = product.variants && product.variants.length > 0
  const variantSlug = resolvedParams.variant?.[0]
  const activeVariant = hasVariants ? product.variants!.find(v => v.slug === variantSlug) : null

  // UI States
  const activeImage = activeVariant?.image || product.image || "/placeholder.jpg"
  const activePrice = activeVariant?.priceCOP ?? product.priceCOP ?? (hasVariants ? Math.min(...product.variants!.map(v => v.priceCOP)) : 0)
  const activeStock = activeVariant?.stock ?? product.stock ?? 0
  const isOutOfStock = activeStock === 0
  const isLowStock = activeStock > 0 && activeStock <= 15

  const displayCOA = activeVariant
    ? activeVariant.coaStatus
    : (hasVariants
      ? (product.variants!.some(v => v.coaStatus === 'available') ? 'available' : 'pending')
      : 'pending')

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
    router.push(`/tienda/${product.categorySlug}/${product.slug}/${slug}`, { scroll: false })
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

  const coaBlockElement = (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={displayCOA}
      className={cn("rounded-xl border p-5 mt-4 md:mt-0 shadow-lg transition-colors", displayCOA === 'available' ? "bg-white border-green-200" : "bg-slate-50 border-slate-200")}
    >
      <div className="flex items-start gap-3">
        <div className={cn("rounded-full p-2.5", displayCOA === 'available' ? "bg-green-100" : "bg-slate-200")}>
          <Icon icon={displayCOA === 'available' ? "lucide:shield-check" : "lucide:clock"} className={cn("h-5 w-5", displayCOA === 'available' ? "text-green-600" : "text-slate-500")} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            {displayCOA === 'available' ? "Calidad Verificada" : "Análisis en progreso"}
          </h3>
          <p className="mt-0.5 text-xs text-slate-600">
            Lote <span className="font-mono text-[#1959D7] font-bold">{product.lot}</span> con pureza de {product.purity}
          </p>
          {displayCOA === 'available' ? (
            <a href="#coa" className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-green-600 hover:underline">
              <Icon icon="lucide:file-text" className="h-3.5 w-3.5" />
              Ver Reporte de Laboratorio
            </a>
          ) : (
            <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-slate-500">
              El COA de esta presentación está pendiente de publicación.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )

  const breadcrumbElement = (
    <Link href="/tienda" className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1959D7]">
      <Icon icon="lucide:arrow-left" className="h-4 w-4 text-[#1959D7]" />
      Volver a la tienda
    </Link>
  )

  const titleAndCategoryElement = (
    <div className="flex flex-col items-start gap-2">
      <div className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
        {product.category}
      </div>
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
        {product.title}
      </h1>
    </div>
  )

  return (
    <div className="min-h-[100dvh] bg-background pb-24 md:pb-0">
      <TopBar onSearch={openSearch} />
      <Navbar cartCount={cartCount} onSearch={openSearch} onCart={toggleCart} />

      <main className="mx-auto max-w-5xl px-4 lg:px-8 py-8 flex flex-col gap-6">

        {/* MOBILE: Breadcrumb + Title */}
        <div className="flex flex-col gap-4 md:hidden">
          {breadcrumbElement}
          {titleAndCategoryElement}
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_1fr] lg:gap-8">

          {/* LEFT: Image + COA (desktop) */}
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
                  {product.badges.includes('RUO') && (
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
                    key={activeImage}
                    src={activeImage}
                    alt={product.title}
                    fill
                    className="object-contain drop-shadow-2xl mix-blend-multiply transition-opacity duration-300"
                  />
                </motion.div>
              </motion.div>
            </div>
            <div className="hidden md:block">
              {coaBlockElement}
            </div>
          </div>

          {/* RIGHT: Commerce details */}
          <div className="relative flex flex-col rounded-xl bg-white p-5 lg:p-6 shadow-2xl justify-between">

            {/* DESKTOP: Breadcrumb + Title */}
            <div className="hidden md:flex flex-col gap-3 mb-3">
              {breadcrumbElement}
              {titleAndCategoryElement}
            </div>

            <p className="text-sm leading-relaxed text-slate-600 mb-1">
              Fórmula: <span className="font-mono text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded text-xs">{product.formula}</span>. {product.description}
            </p>

            {hasVariants && (
              <div className="mt-3 border-y border-slate-200 py-3">
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Presentación</p>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants!.map((v) => {
                    const isSelected = activeVariant?.id === v.id
                    return (
                      <button
                        key={v.id}
                        onClick={() => handleVariantChange(v.slug)}
                        className={cn(
                          "flex items-center justify-center rounded-lg border-2 py-2 text-xs font-bold font-mono transition-all duration-300",
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

            <div className="mt-3 flex flex-col gap-1">
              <p className="text-xs font-semibold text-slate-500">Precio</p>
              <div className="flex items-baseline justify-between gap-4">
                <div className="flex flex-col">
                  {hasVariants && !activeVariant && (
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Desde</span>
                  )}
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">{formatCOP(activePrice)}</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">COP</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${isOutOfStock ? 'bg-slate-300' : isLowStock ? 'bg-red-500' : 'bg-green-500'}`} />
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${isOutOfStock ? 'text-slate-500' : isLowStock ? 'text-red-600' : 'text-green-600'}`}>
                    {isOutOfStock ? 'Agotado' : isLowStock ? `Últimas ${activeStock}` : 'Disponible'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 flex flex-col sm:flex-row gap-3">
              {/* Qty selector */}
              <div className="flex h-11 items-center rounded-lg border border-slate-300 bg-white">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  className="flex h-full w-10 items-center justify-center text-slate-500 transition-colors hover:text-slate-900 disabled:opacity-30"
                  aria-label="Disminuir cantidad"
                >
                  <Icon icon="lucide:minus" className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-mono text-sm font-bold text-slate-900 tabular-nums">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(activeStock || 99, q + 1))}
                  disabled={isOutOfStock}
                  className="flex h-full w-10 items-center justify-center text-slate-500 transition-colors hover:text-slate-900 disabled:opacity-30"
                  aria-label="Aumentar cantidad"
                >
                  <Icon icon="lucide:plus" className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-row items-center gap-3 flex-1">
                {/* Add to cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock || (hasVariants && !activeVariant)}
                  title="Agregar al Carrito"
                  aria-label="Agregar al Carrito"
                  className={cn(
                    "group flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-all duration-300 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
                    addedFeedback
                      ? "bg-green-600 text-white"
                      : "bg-[#1959D7] text-white hover:bg-[#1959D7]/90"
                  )}
                >
                  <Icon
                    icon={addedFeedback ? "lucide:check" : "lucide:shopping-cart"}
                    className={cn("h-5 w-5 transition-transform duration-300", !addedFeedback && "group-hover:-rotate-12")}
                  />
                </button>
                <WompiCheckoutButton
                  amountCOP={activePrice * qty}
                  productName={product.title}
                  label="Pagar"
                  onSuccess={(data) => console.log('Wompi success', data)}
                  onError={(err) => console.error('Wompi error', err)}
                />
              </div>
            </div>

            <ul className="mt-3 space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2.5">
                <Icon icon="lucide:flask-conical" className="h-4 w-4 text-[#1959D7] shrink-0" />
                <span className="font-semibold text-slate-900">Agua bacteriostática incluida</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon icon="lucide:truck" className="h-4 w-4 text-slate-600 shrink-0" />
                Envío gratis a toda Colombia.
              </li>
            </ul>

            {/* COA MOBILE */}
            <div className="block md:hidden">
              {coaBlockElement}
            </div>
          </div>
        </div>
      </main>

      <Footer />

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
              "group relative flex h-11 flex-1 items-center justify-center gap-2 rounded-sm border-2 px-4 text-sm font-bold transition-all duration-300 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
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
