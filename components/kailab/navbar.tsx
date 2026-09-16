'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { cn } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'
import type { SiteSettings } from '@/lib/sanity-queries'

const menu = [
  { label: 'Tienda', href: '/tienda' },
  { label: 'Guías', href: '/guias' },
  { label: 'Calidad', href: '/calidad' },
  { label: 'Ayuda', href: '/ayuda' },
]

type NavbarProps = {
  siteSettings?: SiteSettings | null
}

import { useCart } from './cart-context'

export function Navbar({ siteSettings }: NavbarProps) {
  const { cartCount, openSearch, toggleCart } = useCart()
  const logoUrl = siteSettings?.logo ? urlFor(siteSettings.logo).url() : "/KAILAB_Logo_White.png"

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
              src={logoUrl}
              alt={siteSettings?.siteName || "KAILAB"}
              width={132}
              height={38}
              priority
              className="h-8 w-auto transition-opacity duration-300 hover:opacity-90"
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
            onClick={openSearch}
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
            onClick={toggleCart}
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

          <Link
            href="/login"
            className="group relative flex items-center justify-center border border-border bg-secondary/40 p-2.5 font-mono text-xs font-bold text-foreground transition-all duration-300 hover:bg-secondary hover:text-primary active:scale-95"
            aria-label="Acceso Admin / Login"
            title="Acceso Admin / Login"
          >
            <Icon icon="lucide:user" className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </nav>
    </header>
  )
}
