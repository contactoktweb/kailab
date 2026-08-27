'use client'

import { MessageCircle, Plus } from 'lucide-react'
import { MicroBadge } from './badge'
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
            <li
              key={product.id}
              className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {product.badges.map((badge) => (
                    <MicroBadge key={badge} variant="brand">
                      {badge}
                    </MicroBadge>
                  ))}
                </div>
                <MicroBadge variant="muted">{product.lot}</MicroBadge>
              </div>

              <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {product.category}
              </p>
              <h3 className="mt-1 text-xl font-semibold tracking-tight">{product.title}</h3>

              <dl className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm">
                <div className="flex justify-between gap-2">
                  <dt className="text-muted-foreground">Presentación</dt>
                  <dd className="font-mono text-xs text-foreground">{product.presentation}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-muted-foreground">Concentración</dt>
                  <dd className="font-mono text-xs text-foreground">{product.concentration}</dd>
                </div>
              </dl>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-mono text-2xl font-semibold tabular-nums">
                  {formatCOP(product.priceCOP)}
                </span>
                <span className="font-mono text-xs text-muted-foreground">COP</span>
              </div>

              <div className="mt-5 flex gap-2">
                <a
                  href="#soporte"
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border bg-transparent px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  Quiero asesoría
                </a>
                <button
                  onClick={() => onAdd(product)}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  Agregar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
