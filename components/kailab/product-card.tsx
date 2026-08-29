import { Icon } from '@iconify/react'
import { MicroBadge } from './badge'
import { formatCOP, type Product } from './data'
import Image from 'next/image'
import Link from 'next/link'

type ProductCardProps = {
  product: Product
  onAdd: (product: Product) => void
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  // Max 2 primary badges as per rules
  const displayBadges = product.badges.slice(0, 2)
  const isLowStock = product.stock > 0 && product.stock <= 15
  const isOutOfStock = product.stock === 0

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary/40">
      <div className="relative aspect-square w-full bg-secondary/30">
        {/* Placeholder for Product Image - Protagonista */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="relative h-full w-full">
            <Image
              src={product.image || "/placeholder.jpg"}
              alt={product.title}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
        

      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 border-b border-border/40 pb-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/80">
            {product.category}
          </p>
          
          <h3 className="mt-1 font-mono text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            <Link href={`/producto/${product.id}`} className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              {product.title}
            </Link>
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">
             {displayBadges.map((badge) => (
               <MicroBadge key={badge} variant="brand">
                 {badge}
               </MicroBadge>
             ))}
             <span className="inline-flex items-center border-y border-r border-l-2 border-border border-l-primary/60 bg-secondary/30 px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground">
               {product.concentration}
             </span>
             <span className="inline-flex items-center border-y border-r border-l-2 border-border border-l-muted-foreground/40 bg-secondary/10 px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
               + Agua bac.
             </span>
          </div>
        </div>

        <div className="mt-auto flex flex-col justify-end pt-1">
          <div className="flex items-end justify-between">
            <span className="font-mono text-2xl font-bold tabular-nums text-foreground tracking-tight drop-shadow-sm">
              {formatCOP(product.priceCOP)}
            </span>
            
            <div className="mb-1.5 flex items-center gap-1.5">
              <span
                className={`h-1.5 w-1.5 shadow-[0_0_5px_currentColor] ${
                  isOutOfStock ? 'bg-muted-foreground' : isLowStock ? 'bg-destructive' : 'bg-primary'
                }`}
                aria-hidden="true"
              />
              <span className={`font-mono text-[10px] font-bold uppercase tracking-widest ${
                isOutOfStock ? 'text-muted-foreground' : isLowStock ? 'text-destructive' : 'text-primary'
              }`}>
                {isOutOfStock ? 'Agotado' : isLowStock ? `Últ. ${product.stock}` : 'Disponible'}
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 relative z-10">
              <Link
                href={`/producto/${product.id}`}
                className="group inline-flex items-center justify-center gap-1.5 rounded-sm border-2 border-primary bg-primary px-3 py-2 text-xs font-bold text-primary-foreground shadow-[0_0_20px_rgba(25,89,215,0.7)] transition-all duration-300 hover:bg-transparent hover:text-primary hover:shadow-[0_0_10px_rgba(25,89,215,0.3)] active:scale-95"
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
                className="group relative inline-flex items-center justify-center gap-1.5 rounded-sm border-2 border-primary bg-primary px-3 py-2 text-xs font-bold text-primary-foreground shadow-[0_0_20px_rgba(25,89,215,0.7)] transition-all duration-300 hover:bg-transparent hover:text-primary hover:shadow-[0_0_10px_rgba(25,89,215,0.3)] disabled:pointer-events-none disabled:opacity-50 active:scale-95"
              >
                <Icon icon="lucide:plus" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-90" aria-hidden="true" />
                Agregar
              </button>
          </div>
        </div>
      </div>
    </article>
  )
}
