'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import { formatCOP, type Product, type Variant } from './data'
import Image from 'next/image'
import Link from 'next/link'
import { MicroBadge } from './badge'
import { cn } from '@/lib/utils'

type ProductCardProps = {
  product: Product
  onAdd: (product: Product, variant?: Variant) => void
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  // Manejo de variantes (si aplica)
  const hasVariants = product.variants && product.variants.length > 0
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null)
  
  // Datos activos
  const activeImage = selectedVariant?.image || product.image || "/placeholder.jpg"
  const activePrice = selectedVariant?.priceCOP ?? product.priceCOP ?? (hasVariants ? Math.min(...product.variants!.map(v => v.priceCOP)) : 0)
  const activeStock = selectedVariant?.stock ?? product.stock ?? 0
  
  const isOutOfStock = activeStock === 0
  const isLowStock = activeStock > 0 && activeStock <= 15
  
  // Estado de COA global de la familia
  const hasAvailableCOA = hasVariants ? product.variants!.some(v => v.coaStatus === 'available') : product.badges.includes('COA')
  
  // Url base de la familia
  const productUrl = hasVariants ? `/tienda/${product.categorySlug}/${product.slug}` : `/producto/${product.id}`
  const linkUrl = selectedVariant ? `${productUrl}/${selectedVariant.slug}` : productUrl

  return (
    <motion.article 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-gradient-to-br from-[#1959D7]/80 to-[#17294F] transition-all duration-300 hover:border-primary/50 hover:shadow-[0_20px_40px_-15px_rgba(25,89,215,0.5)] focus-within:ring-2 focus-within:ring-primary/40"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-white">
        
        {/* Badges de Estado/Calidad */}
        <div className="absolute z-30 flex flex-col gap-1" style={{ top: 'calc(0.75rem + 2mm)', left: 'calc(0.75rem + 1mm)' }}>
          {product.badges.includes('RUO') && (
            <span className="inline-flex items-center rounded-sm bg-[#0d1a2a] px-2 py-0.5 text-[8px] font-mono font-bold uppercase tracking-wider text-white shadow-sm">
              RUO
            </span>
          )}
          {hasAvailableCOA && (
            <span className="inline-flex items-center rounded-sm bg-[#0d1a2a] px-2 py-0.5 text-[8px] font-mono font-bold uppercase tracking-wider text-white shadow-sm">
              COA
            </span>
          )}
        </div>


        {/* Imagen del Producto */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeImage}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full w-full"
            >
              <Image
                src={activeImage}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:scale-[1.05]"
                style={{ filter: "drop-shadow(0px 30px 20px rgba(0,0,0,0.15))" }}
              />
            </motion.div>
          </AnimatePresence>
          {/* Curtain Reveal */}
          <motion.div 
             variants={{
                hidden: { scaleY: 1 },
                visible: { scaleY: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
             }}
             style={{ originY: 1 }}
             className="absolute inset-0 bg-background z-10"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 border-b border-border/40 pb-2 flex items-end justify-between gap-2">
          <div className="min-w-0">
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/80"
            >
              {product.category}
            </motion.p>
            
            <motion.h3 
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="mt-0.5 font-mono text-lg font-bold tracking-tight text-foreground transition-colors duration-300"
            >
              <Link href={linkUrl} className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                {product.title}
              </Link>
            </motion.h3>
          </div>

          {/* Selector de Presentación — inline junto al título */}
          {hasVariants && (
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-row gap-1 relative z-20 shrink-0"
            >
              {product.variants!.map((variant) => {
                const isSelected = selectedVariant?.id === variant.id;
                return (
                  <button
                    key={variant.id}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedVariant(isSelected ? null : variant);
                    }}
                    className={cn(
                      "rounded-sm border px-2 py-0.5 text-[10px] font-mono font-bold transition-all duration-300",
                      isSelected 
                        ? "bg-primary border-primary text-primary-foreground shadow-sm" 
                        : "bg-white/10 border-border/50 text-foreground hover:bg-white/20 hover:border-primary/30"
                    )}
                  >
                    {variant.name}
                  </button>
                )
              })}
            </motion.div>
          )}
        </div>

        <div className="mt-2 flex flex-col justify-end">
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            className="flex items-end justify-between"
          >
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-muted-foreground/80 mb-0.5">
                {!selectedVariant && hasVariants ? "Desde" : "Precio"}
              </span>
              <span className="font-mono text-lg sm:text-xl font-bold tabular-nums text-foreground tracking-tight drop-shadow-sm">
                {formatCOP(activePrice)}
              </span>
            </div>
            
            {/* Disponibilidad */}
            <div className="mb-0.5 flex items-center gap-1.5">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isOutOfStock ? 'bg-muted-foreground' : isLowStock ? 'bg-destructive' : 'bg-white'
                }`}
                aria-hidden="true"
              />
              <span className={`font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-widest ${
                isOutOfStock ? 'text-muted-foreground' : isLowStock ? 'text-destructive' : 'text-white'
              }`}>
                {isOutOfStock ? 'Agotado' : isLowStock ? `Últ. ${activeStock}` : 'Disponible'}
              </span>
            </div>
          </motion.div>

          {/* Línea Compacta de Valor */}
          <motion.div 
             variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
             className="mt-1.5 text-[10px] leading-tight text-white/70"
          >
            Agua bacteriostática incluida · Envío gratis a toda Colombia
          </motion.div>

          {/* CTAs */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            className="mt-2.5 grid grid-cols-2 gap-2 relative z-20"
          >
              <Link
                href={linkUrl}
                className="group inline-flex items-center justify-center gap-1.5 rounded-sm border-2 border-primary bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary active:scale-95"
              >
                <Icon icon="lucide:eye" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                Ver
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  if (hasVariants && !selectedVariant) {
                    return;
                  }
                  onAdd(product, selectedVariant || undefined)
                }}
                disabled={isOutOfStock || (hasVariants && !selectedVariant)}
                className="group relative inline-flex items-center justify-center gap-1.5 rounded-sm border-2 border-primary bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary disabled:pointer-events-none disabled:opacity-50 active:scale-95"
              >
                <Icon icon="lucide:plus" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-90" aria-hidden="true" />
                {hasVariants && !selectedVariant ? "Elige opción" : "Agregar"}
              </button>
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}
