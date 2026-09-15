import { Icon } from '@iconify/react'

const BADGES = [
  {
    icon: 'lucide:file-check-2',
    title: 'Calidad documentada',
    description: 'Certificados de análisis disponibles',
  },
  {
    icon: 'lucide:package-check',
    title: 'Empaque discreto',
    description: 'Todos los pedidos se despachan con empaque sobrio y presentación profesional.',
  },
  {
    icon: 'lucide:sparkles',
    title: 'Proceso de compra claro',
    description: 'Ofrecemos información directa para un proceso de compra simple y sin fricción.',
  },
]

export function StoreTrustBadges() {
  return (
    <section aria-label="Garantías de servicio" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
        {BADGES.map((badge) => (
          <div
            key={badge.title}
            className="group rounded-2xl border border-border/70 bg-card/40 p-6 text-center backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:bg-card/70 hover:shadow-lg hover:shadow-primary/5 flex flex-col items-center justify-center space-y-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
              <Icon icon={badge.icon} className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-foreground tracking-tight">
              {badge.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xs">
              {badge.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
