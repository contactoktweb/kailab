import Image from 'next/image'
import { WhatsAppIcon, whatsappHref } from './whatsapp'

const columns = [
  {
    title: 'Catálogo',
    links: ['Péptidos', 'Nootrópicos', 'Metabólico', 'Novedades'],
  },
  {
    title: 'Recursos',
    links: ['COA por lote', 'Guías de manejo', 'Referencias clínicas', 'Trazabilidad'],
  },
  {
    title: 'Soporte',
    links: ['Preguntas frecuentes', 'Envíos y tiempos', 'Política de devoluciones'],
  },
]

export function Footer() {
  return (
    <footer id="soporte" className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_2fr]">
          <div>
            <Image
              src="/kailab-logo.png"
              alt="KAILAB"
              width={132}
              height={38}
              className="h-8 w-auto"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Compuestos para investigación con certificación por lote y logística local. Rigor y
              transparencia en cada referencia.
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
              Soporte por WhatsApp
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-foreground/80 transition-colors hover:text-brand-soft"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="font-mono text-xs leading-relaxed text-muted-foreground">
            Solo para uso en investigación (RUO / Research Use Only). No apto para consumo humano ni
            animal, ni para uso diagnóstico o terapéutico. Los productos no han sido evaluados por el
            INVIMA. La venta está dirigida exclusivamente a investigadores y entidades cualificadas.
          </p>
          <div className="mt-6 flex flex-col justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
            <span className="font-mono">© 2026 KAILAB · Bogotá, Colombia</span>
            <div className="flex gap-4">
              <a href="#" className="transition-colors hover:text-foreground">
                Términos
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                Privacidad
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                RUO
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
