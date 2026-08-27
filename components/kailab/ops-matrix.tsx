import { MapPin } from 'lucide-react'
import { MicroBadge } from './badge'
import { shipping, payments } from './data'

export function OpsMatrix() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="max-w-2xl">
          <MicroBadge variant="muted" className="mb-4">
            ops-matrix · CO
          </MicroBadge>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Matriz operativa local
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Tiempos de entrega por ciudad y métodos de pago disponibles en Colombia.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="grid grid-cols-[1.4fr_1fr_1.2fr] gap-2 border-b border-border bg-secondary/50 px-4 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <span>Ciudad</span>
              <span>Tiempo</span>
              <span>Cobertura</span>
            </div>
            <ul className="divide-y divide-border">
              {shipping.map((row) => (
                <li
                  key={row.city}
                  className="grid grid-cols-[1.4fr_1fr_1.2fr] items-center gap-2 px-4 py-3.5 text-sm transition-colors hover:bg-secondary/40"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <MapPin className="h-3.5 w-3.5 text-brand-soft" aria-hidden="true" />
                    {row.city}
                  </span>
                  <span className="font-mono text-xs text-brand-soft">{row.time}</span>
                  <span className="text-xs text-muted-foreground">{row.coverage}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-sm font-medium">Métodos de pago</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Pasarelas y opciones locales verificadas. Confirmación inmediata en pagos digitales.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {payments.map((method) => (
                <MicroBadge key={method} variant="outline" className="px-3 py-1.5">
                  {method}
                </MicroBadge>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-border bg-secondary/40 p-4">
              <p className="font-mono text-xs text-muted-foreground">
                <span className="text-brand-soft">→</span> Envío gratis sobre $250.000 COP · Empaque
                con control de temperatura para péptidos liofilizados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
