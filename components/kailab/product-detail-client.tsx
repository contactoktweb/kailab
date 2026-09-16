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
          className="p-4 pt-2 text-[13px] leading-relaxed text-slate-700" 
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </motion.div>
    </div>
  )
}

interface ProductDetailClientProps {
  product: Product
  siteSettings?: SiteSettings | null
}

export function ProductDetailClient({ product, siteSettings }: ProductDetailClientProps) {
  const { cartCount, addToCart, toggleCart, openSearch } = useCart()

  const [qty, setQty] = useState(1)
  const [addedFeedback, setAddedFeedback] = useState(false)
  const [currentImage, setCurrentImage] = useState<string | null>(null)

  useEffect(() => {
    if (product.image && !currentImage) {
      setCurrentImage(product.image)
    }
  }, [product, currentImage])

  const isOutOfStock = (product.stock ?? 0) === 0
  const isLowStock = (product.stock ?? 0) > 0 && (product.stock ?? 0) <= 15

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

  const handleAddToCart = () => {
    if (isOutOfStock) return
    for (let i = 0; i < qty; i++) {
      addToCart(product)
    }
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 2000)
    toggleCart()
  }

  return (
    <div className="min-h-[100dvh] bg-background pb-24 md:pb-0">
      <TopBar onSearch={openSearch} />
      <Navbar cartCount={cartCount} onSearch={openSearch} onCart={toggleCart} siteSettings={siteSettings} />

      <main className="mx-auto max-w-5xl px-4 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/tienda" className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1959D7]">
            <Icon icon="lucide:arrow-left" className="h-4 w-4 text-[#1959D7]" />
            Volver a la tienda
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] lg:gap-12">
          {/* LEFT: Visual & Quality */}
          <div className="flex flex-col justify-between space-y-6 h-full" style={{ perspective: 2000 }}>
            <motion.div
              initial={{ opacity: 0, rotateX: 40, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
              transition={{ type: "spring", damping: 20, stiffness: 60 }}
              className="relative aspect-square w-full rounded-2xl border border-transparent bg-gradient-to-br from-[#f0f5ff] to-[#e0ebff] p-8 overflow-hidden group shadow-2xl"
            >
              {/* Sweeping Glass Glare */}
              <motion.div
                initial={{ x: "-150%", opacity: 0 }}
                animate={{ x: "200%", opacity: 0.4 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                className="absolute inset-0 z-20 w-1/2 -skew-x-[25deg] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none"
              />
              <div
                className="absolute z-30 flex flex-col gap-1"
                style={{ top: 'calc(0.75rem + 9mm)', left: 'calc(0.75rem + 9mm)' }}
              >
                {product.badges?.includes('RUO') && (
                  <span className="inline-flex items-center rounded-sm bg-[#0d1a2a] px-2 py-0.5 text-[8px] font-mono font-bold uppercase tracking-wider text-white shadow-sm">
                    RUO
                  </span>
                )}
                {product.badges?.includes('COA') && (
                  <span className="inline-flex items-center rounded-sm bg-[#0d1a2a] px-2 py-0.5 text-[8px] font-mono font-bold uppercase tracking-wider text-white shadow-sm">
                    COA
                  </span>
                )}
              </div>
              <motion.div
                initial={{ opacity: 0, rotateY: 90, scale: 0.5 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, duration: 1.2, delay: 0.2 }}
                className="relative h-full w-full z-10"
              >
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={currentImage || product.image || "/placeholder.jpg"}
                    alt={product.title}
                    fill
                    className="object-contain drop-shadow-2xl mix-blend-multiply"
                  />
                </motion.div>
              </motion.div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(img)}
                      className={cn(
                        "relative h-12 w-12 rounded-md border-2 overflow-hidden bg-white shadow-sm transition-all hover:scale-105",
                        currentImage === img ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                      )}
                    >
                      <Image src={img} alt="Thumbnail" fill className="object-contain mix-blend-multiply" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Quality Signal Card */}
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="rounded-xl border border-transparent bg-white p-6 shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Icon icon="lucide:shield-check" className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Calidad Verificada</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Lote <span className="font-mono text-primary font-bold">{product.lot}</span> con pureza de {product.purity}
                  </p>
                  <a href="#coa" className="mt-2 inline-block text-sm font-medium text-primary hover:underline">
                    Ver Certificado de Análisis (COA) &rarr;
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Commerce / Details */}
          <div className="relative flex flex-col justify-center rounded-xl bg-white p-5 lg:p-6 shadow-2xl h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <div className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200">
                {product.category}
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="mt-1.5 text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl flex flex-col gap-0.5"
            >
              <span dangerouslySetInnerHTML={{ __html: product.title.replace(' ', '&nbsp;') }} />
              {product.subtitle && (
                <span className="text-xs sm:text-sm font-medium text-slate-700">
                  {product.subtitle}
                </span>
              )}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="mt-2.5 flex flex-col gap-2"
            >
              {product.description ? (
              <p className="text-[12px] leading-snug text-slate-700">
                {product.description}
              </p>
              ) : (
                <p className="text-sm leading-relaxed text-slate-600">
                  Fórmula: <span className="font-mono text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded text-xs">{product.formula}</span>. Compuesto liofilizado de alta pureza, sintetizado para investigación y análisis de laboratorio (RUO). No apto para uso humano o veterinario.
                </p>
              )}

              {product.features && product.features.length > 0 && (
                <div className="grid grid-cols-2 gap-y-1.5 gap-x-4">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <Icon icon="lucide:check" className="h-3.5 w-3.5 text-slate-900 shrink-0" />
                      <span className="text-[11px] text-slate-700">{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>


            {/* Price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              className="mt-3 flex flex-col gap-0.5"
            >
              <p className="text-[11px] font-semibold text-slate-500">Precio</p>
              <div className="flex items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900">
                    {formatCOP((product.priceCOP ?? 0) * qty)}
                  </span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase">COP</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`h-2 w-2 rounded-full ${isOutOfStock ? 'bg-slate-300' : isLowStock ? 'bg-red-500' : 'bg-green-500'}`}
                    aria-hidden="true"
                  />
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${isOutOfStock ? 'text-slate-500' : isLowStock ? 'text-red-600' : 'text-green-600'}`}>
                    {isOutOfStock ? 'Agotado' : isLowStock ? `Últimas ${product.stock}` : 'Disponible'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Qty + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
              className="mt-3 flex flex-col sm:flex-row gap-3"
            >
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
                  onClick={() => setQty((q) => Math.min(product.stock || 99, q + 1))}
                  disabled={isOutOfStock}
                  className="flex h-full w-10 items-center justify-center text-slate-500 transition-colors hover:text-slate-900 disabled:opacity-30"
                  aria-label="Aumentar cantidad"
                >
                  <Icon icon="lucide:plus" className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-row items-center gap-3 flex-1">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
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
                    className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12"
                  />
                </button>
                <WompiCheckoutButton
                  amountCOP={(product.priceCOP ?? 0) * qty}
                  productName={product.title}
                  label="Pagar"
                  onSuccess={(data) => console.log('Wompi success', data)}
                  onError={(err) => console.error('Wompi error', err)}
                />
              </div>
            </motion.div>

            {/* Shipping Info Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              className="mt-4 flex gap-2.5 text-slate-700"
            >
              <Icon icon="lucide:truck" className="h-4 w-4 shrink-0 text-slate-900" />
              <div className="flex flex-col gap-0.5">
                <p className="text-[13px] font-bold text-slate-900">Envío gratuito a toda Colombia</p>
                <p className="text-xs font-semibold text-[#1959D7]">Despacho en 1 día hábil</p>
                <ul className="mt-1.5 list-disc pl-3.5 space-y-1 text-[11px] leading-relaxed text-slate-600">
                  <li>Los pedidos se envían en empaque sellado y sobrio.</li>
                  <li>Entrega al siguiente día hábil en principales ciudades y de 2 a 3 días hábiles en el resto del país.</li>
                  <li>Al despachar el pedido recibes el número de guía para hacer seguimiento.</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Info Accordions */}
        {product.infoAccordions && product.infoAccordions.length > 0 && (
          <div className="mt-8 md:mt-12 pt-8 border-t border-slate-200/80">
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
            <span className="text-xs text-muted-foreground truncate max-w-[120px]">{product.title}</span>
            <span className="font-bold text-foreground">{formatCOP((product.priceCOP ?? 0) * qty)}</span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
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
