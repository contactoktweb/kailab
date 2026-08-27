'use client'

import { useEffect, useRef, useState } from 'react'
import { MicroBadge } from './badge'
import { evidence } from './data'

export function EvidenceChart() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="evidencia" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="max-w-2xl">
          <MicroBadge variant="muted" className="mb-4">
            evidence-map · v1.2
          </MicroBadge>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Mapa de evidencia comparativa
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Magnitudes reportadas frente a control en la literatura primaria. Cada fila enlaza a su
            fuente verificable (DOI o registro NCT). Los datos se presentan con fines de
            investigación.
          </p>
        </div>

        <div
          ref={ref}
          className="mt-10 rounded-xl border border-border bg-card p-4 sm:p-6"
        >
          <ul className="flex flex-col divide-y divide-border">
            {evidence.map((row, i) => (
              <li key={row.source} className="grid gap-3 py-5 md:grid-cols-[1fr_auto] md:items-center">
                <div className="min-w-0">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-sm font-medium">{row.label}</p>
                    <span className="font-mono text-sm text-brand-soft md:hidden">
                      {row.metric}
                    </span>
                  </div>

                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary transition-[width] duration-1000 ease-out"
                      style={{
                        width: visible ? `${row.value}%` : '0%',
                        transitionDelay: `${i * 120}ms`,
                      }}
                    />
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <MicroBadge variant="outline">
                      {row.sourceType}
                    </MicroBadge>
                    <span className="truncate font-mono text-xs text-muted-foreground">
                      {row.source}
                    </span>
                  </div>
                </div>

                <div className="hidden font-mono text-2xl tabular-nums text-brand-soft md:block">
                  {row.metric}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 font-mono text-xs text-muted-foreground">
          * Valores ilustrativos agregados de fuentes públicas · Solo para uso en investigación (RUO)
        </p>
      </div>
    </section>
  )
}
