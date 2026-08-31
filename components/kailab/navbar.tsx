'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { cn } from '@/lib/utils'

const menu = [
  { label: 'Tienda', href: '/tienda' },
  { label: 'Guías', href: '/guias' },
  { label: 'Calidad', href: '/calidad' },
  { label: 'Ayuda', href: '/ayuda' },
]

type NavbarProps = {
  cartCount: number
  onSearch: () => void
  onCart: () => void
}

export function Navbar({ cartCount, onSearch, onCart }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/70 backdrop-blur-xl shadow-sm transition-all duration-300">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3"
        aria-label="Principal"
      >
        <div className="flex items-center gap-8">
          <Link 
            href="/" 
            className="flex items-center transition-transform duration-300 hover:scale-105 active:scale-95"
            aria-label="KAILAB inicio"
          >
            <Image
              src="/KAILAB_Logo_Black.svg"
              alt="KAILAB"
              width={132}
              height={38}
              priority
              className="h-8 w-auto brightness-0 invert transition-opacity duration-300 hover:opacity-90"
            />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {menu.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 ease-out hover:text-foreground hover:bg-secondary/50"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onSearch}
            className="group relative flex items-center gap-2 overflow-hidden bg-primary px-4 py-2 font-mono text-xs font-bold tracking-widest text-primary-foreground transition-all duration-500 hover:bg-primary/90 active:scale-95"
            aria-label="Buscar"
          >
            {/* L-Shape Border Left */}
            <div className="absolute left-0 top-0 h-full w-[2px] bg-white/30 transition-colors duration-500 group-hover:bg-white"></div>
            {/* L-Shape Border Top */}
            <div className="absolute left-0 top-0 h-[2px] w-6 bg-white/30 transition-all duration-500 group-hover:w-full group-hover:bg-white"></div>

            <Icon icon="lucide:search" className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
            <span className="hidden sm:inline">Buscar…</span>
          </button>

          <button
            onClick={onCart}
            className="group relative flex items-center gap-2 overflow-hidden bg-primary px-4 py-2 font-mono text-xs font-bold tracking-widest text-primary-foreground transition-all duration-500 hover:bg-primary/90 active:scale-95"
            aria-label={`Carrito, ${cartCount} artículos`}
          >
            {/* L-Shape Border Left */}
            <div className="absolute left-0 top-0 h-full w-[2px] bg-white/30 transition-colors duration-500 group-hover:bg-white"></div>
            {/* L-Shape Border Top */}
            <div className="absolute left-0 top-0 h-[2px] w-6 bg-white/30 transition-all duration-500 group-hover:w-full group-hover:bg-white"></div>

            <Icon icon="lucide:shopping-cart" className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12" aria-hidden="true" />
            <span className="hidden sm:inline">Carrito</span>
            <span className="ml-1 inline-flex min-w-5 items-center justify-center bg-white/20 px-1.5 py-0.5 text-[10px] text-white transition-all duration-300 group-hover:bg-white group-hover:text-primary">
              {cartCount}
            </span>
          </button>
        </div>
      </nav>
    </header>
  )
}
