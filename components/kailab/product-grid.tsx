'use client'

import { MessageCircle, Plus } from 'lucide-react'
import { MicroBadge } from './badge'
import { ProductCard } from './product-card'
import { products, formatCOP, type Product } from './data'

export function ProductGrid({ onAdd }: { onAdd: (product: Product) => void }) {
  return (
    <section id="catalogo" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <MicroBadge variant="muted" className="mb-4">
              catalog · {products.length} refs
            </MicroBadge>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Catálogo de referencias
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Cada lote incluye COA verificable y ficha técnica. Precios en pesos colombianos (COP).
            </p>
          </div>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={onAdd} />
          ))}
        </ul>
      </div>
    </section>
  )
}
