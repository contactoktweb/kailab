'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const logoUrl = "/KAILAB_Logo_White.png"

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
              width={200}
              height={58}
              priority
              className="h-10 sm:h-12 w-auto transition-opacity duration-300 hover:opacity-90"
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

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden items-center justify-center p-2 text-foreground transition-colors hover:text-primary"
            aria-label="Abrir menú"
          >
            <Icon icon={mobileMenuOpen ? "lucide:x" : "lucide:menu"} className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-0 top-full w-full border-b border-border bg-background shadow-lg md:hidden"
          >
            <nav className="flex flex-col p-4">
              <ul className="flex flex-col gap-4">
                {menu.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-lg font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
