import { ArrowRight, FileCheck2, Truck, CreditCard, GitBranch } from 'lucide-react'
import { MicroBadge } from './badge'

const trust = [
  { icon: FileCheck2, title: 'COA por Lote', desc: 'Certificado de análisis verificable' },
  { icon: GitBranch, title: 'Trazabilidad', desc: 'Cadena de custodia documentada' },
  { icon: Truck, title: 'Envío Gratis', desc: 'En pedidos sobre $250.000' },
  { icon: CreditCard, title: 'Pagos Locales', desc: 'Wompi · Nequi · Bancolombia' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_oklch,var(--brand)_18%,transparent),transparent)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-28">
        <div className="flex flex-col items-center text-center">
          <MicroBadge variant="brand" className="mb-6">
            RUO · Research Use Only
          </MicroBadge>

          <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
            Compuestos de investigación con{' '}
            <span className="text-brand-soft">evidencia y trazabilidad</span> por lote.
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Cada referencia de KAILAB llega con su Certificado de Análisis, cadena de custodia
            documentada y las fuentes primarias citadas. Rigor, transparencia y logística local
            para laboratorios y equipos de investigación en Colombia.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#catalogo"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Ver catálogo
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#evidencia"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-transparent px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Ver evidencia comparativa
            </a>
          </div>
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {trust.map((item) => (
            <li
              key={item.title}
              className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40"
            >
              <item.icon className="h-5 w-5 text-brand-soft" aria-hidden="true" />
              <h2 className="mt-3 text-sm font-medium">{item.title}</h2>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
