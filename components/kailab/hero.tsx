'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, FileCheck2, Truck, CreditCard, GitBranch, Activity } from 'lucide-react'
import { MicroBadge } from './badge'
import { products, formatCOP, type Product } from './data'

const trust = [
  { icon: FileCheck2, title: 'COA por Lote', desc: 'Certificado de análisis verificable' },
  { icon: GitBranch, title: 'Trazabilidad', desc: 'Cadena de custodia documentada' },
  { icon: Truck, title: 'Envío Gratis', desc: 'En pedidos sobre $250.000' },
  { icon: CreditCard, title: 'Pagos Locales', desc: 'Wompi · Nequi · Bancolombia' },
]

type HeroProps = {
  onAdd: (product: Product) => void
  onSearch: () => void
}

export function Hero({ onAdd, onSearch }: HeroProps) {
  // Rotating "live batch" spotlight in the spec panel
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % products.length), 3200)
    return () => clearInterval(id)
  }, [])

  const active = products[index]

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_75%_0%,color-mix(in_oklch,var(--brand)_18%,transparent),transparent)]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:py-24 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        {/* Left: copy */}
        <div>
          <MicroBadge variant="brand" className="mb-6">
            RUO · Research Use Only
          </MicroBadge>

          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Compuestos de investigación con{' '}
            <span className="text-brand-soft">evidencia y trazabilidad</span> por lote.
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Cada referencia de KAILAB llega con su Certificado de Análisis, cadena de custodia
            documentada y las fuentes primarias citadas. Rigor, transparencia y logística local
            para laboratorios en Colombia.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#catalogo"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Ver catálogo
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <button
              onClick={onSearch}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-transparent px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Búsqueda rápida
              <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>

        {/* Right: live spec panel */}
        <div className="relative">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xl">
            <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                <span className="font-mono text-xs text-muted-foreground">batch-inspector.klb</span>
              </div>
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-brand-soft">
                <Activity className="h-3 w-3" aria-hidden="true" />
                live
              </span>
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {active.category}
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-tight">{active.title}</h2>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {active.badges.map((b) => (
                    <MicroBadge key={b} variant="brand">
                      {b}
                    </MicroBadge>
                  ))}
                </div>
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border">
                {[
                  ['Lote', active.lot],
                  ['Pureza', active.purity],
                  ['Fórmula', active.formula],
                  ['Concentración', active.concentration],
                ].map(([k, v]) => (
                  <div key={k} className="bg-card p-3">
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      {k}
                    </dt>
                    <dd className="mt-1 truncate font-mono text-sm text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-xl font-semibold tabular-nums">
                    {formatCOP(active.priceCOP)}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">COP</span>
                </div>
                <button
                  onClick={() => onAdd(active)}
                  className="rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Agregar al carrito
                </button>
              </div>

              {/* rotation indicator */}
              <div className="mt-4 flex gap-1.5">
                {products.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => setIndex(i)}
                    aria-label={`Ver ${p.title}`}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i === index ? 'bg-primary' : 'bg-secondary'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16">
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {trust.map((item) => (
            <li
              key={item.title}
              className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40"
            >
              <item.icon className="h-5 w-5 text-brand-soft" aria-hidden="true" />
              <h3 className="mt-3 text-sm font-medium">{item.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
