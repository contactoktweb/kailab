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
            className="group flex items-center gap-2 rounded-sm border-2 border-primary bg-primary px-3.5 py-1.5 text-sm font-bold text-primary-foreground shadow-[0_0_20px_rgba(25,89,215,0.7)] transition-all duration-300 hover:bg-transparent hover:text-primary hover:shadow-[0_0_10px_rgba(25,89,215,0.3)] active:scale-95"
            aria-label="Buscar"
          >
            <Icon icon="lucide:search" className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
            <span className="hidden font-mono text-xs sm:inline">Buscar…</span>
          </button>

          <button
            onClick={onCart}
            className="group relative flex items-center gap-2 rounded-sm border-2 border-primary bg-primary px-4 py-1.5 text-sm font-bold text-primary-foreground shadow-[0_0_20px_rgba(25,89,215,0.7)] transition-all duration-300 hover:bg-transparent hover:text-primary hover:shadow-[0_0_10px_rgba(25,89,215,0.3)] active:scale-95"
            aria-label={`Carrito, ${cartCount} artículos`}
          >
            <Icon icon="lucide:shopping-cart" className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12" aria-hidden="true" />
            <span className="hidden sm:inline">Carrito</span>
            <span className="ml-0.5 inline-flex min-w-5 items-center justify-center rounded-sm bg-primary px-1.5 font-mono text-xs text-primary-foreground transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-foreground group-hover:text-primary">
              {cartCount}
            </span>
          </button>
        </div>
      </nav>
    </header>
  )
}
