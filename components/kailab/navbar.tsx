'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, Search, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'

const menu = [
  {
    label: 'Péptidos',
    items: ['BPC-157', 'TB-500', 'GHK-Cu', 'MOTS-c'],
  },
  {
    label: 'Nootrópicos',
    items: ['Semax', 'Selank', 'Noopept', 'Cerebrolysin'],
  },
  {
    label: 'Recursos',
    items: ['COA por lote', 'Guías de manejo', 'Referencias clínicas'],
  },
]

type NavbarProps = {
  cartCount: number
  onSearch: () => void
  onCart: () => void
}

export function Navbar({ cartCount, onSearch, onCart }: NavbarProps) {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3"
        aria-label="Principal"
      >
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center" aria-label="KAILAB inicio">
            <Image
              src="/kailab-logo.png"
              alt="KAILAB"
              width={132}
              height={38}
              priority
              className="h-8 w-auto"
            />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {menu.map((group) => (
              <li
                key={group.label}
                className="relative"
                onMouseEnter={() => setOpen(group.label)}
                onMouseLeave={() => setOpen(null)}
              >
                <button
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  aria-expanded={open === group.label}
                  aria-haspopup="menu"
                >
                  {group.label}
                  <ChevronDown
                    className={cn(
                      'h-3.5 w-3.5 transition-transform',
                      open === group.label && 'rotate-180',
                    )}
                    aria-hidden="true"
                  />
                </button>
                {open === group.label && (
                  <div
                    role="menu"
                    className="absolute left-0 top-full w-56 pt-2"
                  >
                    <ul className="rounded-lg border border-border bg-popover p-1.5 shadow-xl">
                      {group.items.map((item) => (
                        <li key={item}>
                          <a
                            href="#catalogo"
                            role="menuitem"
                            className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSearch}
            className="flex items-center gap-2 rounded-md border border-border bg-secondary px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            aria-label="Buscar"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            <span className="hidden font-mono text-xs sm:inline">Buscar…</span>
            <kbd className="hidden rounded border border-border bg-background px-1 font-mono text-[10px] md:inline">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={onCart}
            className="relative flex items-center gap-2 rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            aria-label={`Carrito, ${cartCount} artículos`}
          >
            <ShoppingCart className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Carrito</span>
            <span className="ml-0.5 inline-flex min-w-5 items-center justify-center rounded-full bg-primary-foreground px-1 font-mono text-xs text-primary">
              {cartCount}
            </span>
          </button>
        </div>
      </nav>
    </header>
  )
}
