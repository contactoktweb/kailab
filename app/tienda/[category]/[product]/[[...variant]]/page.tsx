'use client'

import { use } from 'react'
import { notFound, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { products, formatCOP } from '@/components/kailab/data'
import { MicroBadge } from '@/components/kailab/badge'
import { TopBar } from '@/components/kailab/top-bar'
import { Navbar } from '@/components/kailab/navbar'
import { Footer } from '@/components/kailab/footer'
import { cn } from '@/lib/utils'

export default function CanonicalProductPage({ 
  params 
}: { 
  params: Promise<{ category: string, product: string, variant?: string[] }> 
}) {
  const resolvedParams = use(params)
  const router = useRouter()

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
  
  // COA logic based on contract
  // Si no hay variante seleccionada, mostramos el global. Si hay, mostramos el de la variante.
  const displayCOA = activeVariant ? activeVariant.coaStatus : (hasVariants ? (product.variants!.some(v => v.coaStatus === 'available') ? 'available' : 'pending') : 'pending')

  const handleVariantChange = (slug: string) => {
    router.push(`/tienda/${product.categorySlug}/${product.slug}/${slug}`, { scroll: false })
  }

  // --- COMPONENTES EXTRAIDOS PARA REUTILIZAR EN MOBILE/DESKTOP ---
  
  const Breadcrumb = () => (
    <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
      <Icon icon="lucide:arrow-left" className="h-4 w-4" />
      Volver a la tienda
    </Link>
  )

  const TitleAndCategory = () => (
    <div className="flex flex-col items-start gap-3">
      <div className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
        {product.category}
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
        {product.title}
      </h1>
    </div>
  )

  const MainImage = () => (
    <div style={{ perspective: 2000 }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative aspect-square w-full rounded-2xl border border-transparent bg-gradient-to-br from-[#f0f5ff] to-[#e0ebff] p-8 overflow-hidden group shadow-2xl"
      >
        <motion.div
          initial={{ x: "-150%", opacity: 0 }} animate={{ x: "200%", opacity: 0.4 }} transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute inset-0 z-20 w-1/2 -skew-x-[25deg] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none"
        />
        <div className="absolute left-4 top-4 flex flex-col gap-2 z-30">
          {product.badges.map((b) => (
            <MicroBadge key={b} variant="brand" className="shadow-md">{b}</MicroBadge>
          ))}
        </div>
        <motion.div 
          animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-full w-full z-10"
        >
          <Image src={activeImage} alt={product.title} fill className="object-contain drop-shadow-2xl mix-blend-multiply" />
        </motion.div>
      </motion.div>
    </div>
  )

  const VariantSelector = () => {
    if (!hasVariants) return null;
    return (
      <div className="mt-4 border-y border-slate-200 py-6">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Presentación</p>
        <div className="grid grid-cols-2 gap-3">
          {product.variants!.map((v) => {
            const isSelected = activeVariant?.id === v.id;
            return (
              <button
                key={v.id}
                onClick={() => handleVariantChange(v.slug)}
                className={cn(
                  "flex items-center justify-center rounded-lg border-2 py-3 text-sm font-bold font-mono transition-all duration-300",
                  isSelected 
                    ? "border-primary bg-primary text-primary-foreground shadow-md" 
                    : "border-slate-200 bg-white text-slate-600 hover:border-primary/50 hover:bg-slate-50"
                )}
              >
                {v.name}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const PriceBlock = () => (
    <div className="mt-6 flex flex-col gap-2">
      <p className="text-sm font-semibold text-slate-500">Precio</p>
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex flex-col">
           {hasVariants && !activeVariant && (
             <span className="text-xs font-bold text-slate-500 uppercase">Desde</span>
           )}
           <div className="flex items-baseline gap-2">
             <span className="text-4xl font-extrabold tracking-tight text-slate-900">{formatCOP(activePrice)}</span>
             <span className="text-xs text-slate-500 font-bold uppercase">COP</span>
           </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${isOutOfStock ? 'bg-slate-300' : isLowStock ? 'bg-destructive' : 'bg-green-500'}`} />
          <span className={`text-xs font-bold uppercase tracking-widest ${isOutOfStock ? 'text-slate-500' : isLowStock ? 'text-destructive' : 'text-green-600'}`}>
            {isOutOfStock ? 'Agotado' : isLowStock ? `Últimas ${activeStock}` : 'Disponible'}
          </span>
        </div>
      </div>
    </div>
  )

  const QuantityAndCTA = () => (
    <div className="mt-6 flex flex-col sm:flex-row gap-4">
      <div className="flex h-14 items-center rounded-lg border border-slate-300 bg-white">
        <button className="flex h-full w-14 items-center justify-center text-slate-500 hover:text-slate-900 transition-colors disabled:opacity-50"><Icon icon="lucide:minus" className="h-5 w-5" /></button>
        <span className="w-10 text-center font-mono text-base font-bold text-slate-900">1</span>
        <button className="flex h-full w-14 items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"><Icon icon="lucide:plus" className="h-5 w-5" /></button>
      </div>
      
      <button 
        disabled={isOutOfStock || (hasVariants && !activeVariant)}
        className="group flex h-14 flex-1 items-center justify-center gap-3 rounded-lg bg-primary px-8 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
      >
        <Icon icon="lucide:shopping-cart" className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12" />
        {hasVariants && !activeVariant ? "Selecciona una variante" : "Agregar al Carrito"}
      </button>
    </div>
  )

  const InclusionsBlock = () => (
    <ul className="mt-6 space-y-3 text-sm text-slate-600">
      <li className="flex items-center gap-3">
        <Icon icon="lucide:flask-conical" className="h-5 w-5 text-primary" />
        <span className="font-semibold text-slate-900">Agua bacteriostática incluida</span>
      </li>
      <li className="flex items-center gap-3">
        <Icon icon="lucide:truck" className="h-5 w-5 text-slate-600" />
        Envío gratis a toda Colombia.
      </li>
    </ul>
  )

  const COABlock = () => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={displayCOA}
      className={cn("rounded-xl border p-6 mt-6 md:mt-0 shadow-lg transition-colors", displayCOA === 'available' ? "bg-white border-green-200" : "bg-slate-50 border-slate-200")}
    >
      <div className="flex items-start gap-4">
        <div className={cn("rounded-full p-3", displayCOA === 'available' ? "bg-green-100" : "bg-slate-200")}>
           <Icon icon={displayCOA === 'available' ? "lucide:shield-check" : "lucide:clock"} className={cn("h-6 w-6", displayCOA === 'available' ? "text-green-600" : "text-slate-500")} />
        </div>
        <div>
           <h3 className="font-semibold text-slate-900">
             {displayCOA === 'available' ? "Calidad Verificada" : "Análisis en progreso"}
           </h3>
           <p className="mt-1 text-sm text-slate-600">
             Lote <span className="font-mono text-primary font-bold">{product.lot}</span> con pureza de {product.purity}
           </p>
           {displayCOA === 'available' ? (
              <a href="#coa" className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-green-600 hover:underline">
                <Icon icon="lucide:file-text" className="h-4 w-4" />
                Ver Reporte de Laboratorio
              </a>
           ) : (
              <p className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-slate-500">
                El COA de esta presentación está pendiente de publicación.
              </p>
           )}
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-[100dvh] bg-background pb-24 md:pb-0">
      <TopBar onSearch={() => {}} />
      <Navbar cartCount={0} onSearch={() => {}} onCart={() => {}} />
      
      <main className="mx-auto max-w-5xl px-4 lg:px-8 py-8 flex flex-col gap-6">
        
        {/* MOBILE ORDEN: 1. Breadcrumb, 2. Nombre y Categoria */}
        <div className="flex flex-col gap-6 md:hidden">
          <Breadcrumb />
          <TitleAndCategory />
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_1fr] lg:gap-12">
          
          {/* COLUMNA IZQUIERDA */}
          <div className="flex flex-col gap-6">
            <MainImage />
            {/* COA DESKTOP (Oculto en mobile para respetar el orden 9) */}
            <div className="hidden md:block">
              <COABlock />
            </div>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="relative flex flex-col rounded-xl bg-white p-6 lg:p-8 shadow-2xl h-full">
            
            {/* DESKTOP ORDEN: Breadcrumb y Titulo arriba en la columna derecha */}
            <div className="hidden md:flex flex-col gap-6 mb-6">
              <Breadcrumb />
              <TitleAndCategory />
            </div>

            <p className="text-base leading-relaxed text-slate-600 mb-2">
              Fórmula: <span className="font-mono text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">{product.formula}</span>. {product.description}
            </p>

            <VariantSelector />
            <PriceBlock />
            <QuantityAndCTA />
            <InclusionsBlock />

            {/* COA MOBILE (Oculto en desktop, visible al final en mobile) */}
            <div className="block md:hidden">
              <COABlock />
            </div>

          </div>
        </div>

      </main>
      <Footer />
    </div>
  )
}
