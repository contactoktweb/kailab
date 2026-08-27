import { Plus, Eye } from 'lucide-react'
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
              src="/placeholder.jpg"
              alt={product.title}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
        
        {/* Badges Overlay */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {displayBadges.map((badge) => (
            <MicroBadge key={badge} variant="brand" className="shadow-sm">
              {badge}
            </MicroBadge>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {product.category}
        </p>
        
        <h3 className="mt-1 text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
          <Link href={`/producto/${product.id}`} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {product.title}
          </Link>
        </h3>

        <div className="mt-4 flex flex-wrap gap-2">
           {/* Variants as quick buttons if few (mocking presentation/concentration) */}
           <span className="inline-flex items-center rounded bg-secondary px-2 py-1 font-mono text-[11px] text-secondary-foreground">
             {product.concentration}
           </span>
           <span className="inline-flex items-center rounded bg-secondary/50 px-2 py-1 font-mono text-[11px] text-muted-foreground">
             + Agua bac.
           </span>
        </div>

        <div className="mt-auto pt-5">
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-xl font-semibold tabular-nums text-foreground">
              {formatCOP(product.priceCOP)}
            </span>
          </div>
          
          <div className="mt-2 flex items-center gap-2">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isOutOfStock ? 'bg-muted-foreground' : isLowStock ? 'bg-destructive' : 'bg-primary'
              }`}
              aria-hidden="true"
            />
            <span className={`font-mono text-xs ${
              isOutOfStock ? 'text-muted-foreground' : isLowStock ? 'text-destructive' : 'text-primary'
            }`}>
              {isOutOfStock ? 'Agotado' : isLowStock ? `Últimas ${product.stock}` : 'Disponible'}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 relative z-10">
             <Link
                href={`/producto/${product.id}`}
                className="inline-flex items-center justify-center gap-1.5 rounded-md border border-border bg-transparent px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                Ver
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  onAdd(product)
                }}
                disabled={isOutOfStock}
                className="inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 focus:ring-offset-background"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                Agregar
              </button>
          </div>
        </div>
      </div>
    </article>
  )
}
