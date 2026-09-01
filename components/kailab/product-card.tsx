'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { formatCOP, type Product } from './data'
import Image from 'next/image'
import Link from 'next/link'

type ProductCardProps = {
  product: Product
  onAdd: (product: Product) => void
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const isLowStock = product.stock > 0 && product.stock <= 15
  const isOutOfStock = product.stock === 0

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
      <div className="relative aspect-square w-full overflow-hidden bg-secondary/30 transition-colors duration-700 group-hover:bg-secondary/50">
        {/* Placeholder for Product Image - Protagonista */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="relative h-full w-full"
          >
            <Image
              src={product.image || "/placeholder.jpg"}
              alt={product.title}
              fill
              className="object-contain transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-4 group-hover:scale-[1.05]"
              style={{ filter: "drop-shadow(0px 30px 20px rgba(0,0,0,0.15))" }}
            />
            {/* Curtain Reveal */}
            <motion.div 
               variants={{
                  hidden: { scaleY: 1 },
                  visible: { scaleY: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
               }}
               style={{ originY: 1 }}
               className="absolute inset-0 bg-background z-10"
            />
          </motion.div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 border-b border-border/40 pb-3">
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/80"
          >
            {product.category}
          </motion.p>
          
          <motion.h3 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
            className="mt-1 font-mono text-xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary"
          >
            <Link href={`/producto/${product.id}`} className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              {product.title}
            </Link>
          </motion.h3>

        </div>

        <div className="mt-auto flex flex-col justify-end pt-1">
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
            className="flex items-end justify-between"
          >
            <span className="font-mono text-2xl font-bold tabular-nums text-foreground tracking-tight drop-shadow-sm">
              {formatCOP(product.priceCOP)}
            </span>
            
            <div className="mb-1.5 flex items-center gap-1.5">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isOutOfStock ? 'bg-muted-foreground' : isLowStock ? 'bg-destructive' : 'bg-white'
                }`}
                aria-hidden="true"
              />
              <span className={`font-mono text-[10px] font-bold uppercase tracking-widest ${
                isOutOfStock ? 'text-muted-foreground' : isLowStock ? 'text-destructive' : 'text-white'
              }`}>
                {isOutOfStock ? 'Agotado' : isLowStock ? `Últ. ${product.stock}` : 'Disponible'}
              </span>
            </div>
          </motion.div>

          <motion.div 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
            className="mt-4 grid grid-cols-2 gap-2 relative z-10"
          >
              <Link
                href={`/producto/${product.id}`}
                className="group inline-flex items-center justify-center gap-1.5 rounded-sm border-2 border-primary bg-primary px-3 py-2 text-xs font-bold text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary active:scale-95"
              >
                <Icon icon="lucide:eye" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                Ver
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  onAdd(product)
                }}
                disabled={isOutOfStock}
                className="group relative inline-flex items-center justify-center gap-1.5 rounded-sm border-2 border-primary bg-primary px-3 py-2 text-xs font-bold text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary disabled:pointer-events-none disabled:opacity-50 active:scale-95"
              >
                <Icon icon="lucide:plus" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-90" aria-hidden="true" />
                Agregar
              </button>
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}
