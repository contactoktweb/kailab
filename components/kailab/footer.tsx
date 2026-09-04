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
              Péptidos de investigación y reactivos de laboratorio liofilizados en Colombia. Uso exclusivo en investigación, no para consumo humano.
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
            <div className="flex flex-col gap-2">
              <span className="font-mono">© {new Date().getFullYear()} KAILAB · Bogotá, Colombia</span>
              <a
                href="https://www.kytcode.lat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                Desarrollado por K&T
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor" /* White heart because footer is dark */
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </a>
            </div>
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
