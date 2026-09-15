'use client'

import { useEffect } from 'react'
import { TopBar } from './top-bar'
import { Navbar } from './navbar'
import { Hero } from './hero'
import { ProductGrid } from './product-grid'
import { WhatsIncluded, CommitmentBlock, TrustIndicators } from './home-blocks'
import { Footer } from './footer'
import { useCart } from './cart-context'

export function KailabLanding() {
  const { cartCount, addToCart, toggleCart, openSearch } = useCart()

  // Global ⌘K / Ctrl+K to open the command palette
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        openSearch()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openSearch])

  return (
    <div className="min-h-[100dvh] bg-background">
      <TopBar onSearch={openSearch} />
      <Navbar
        cartCount={cartCount}
        onSearch={openSearch}
        onCart={toggleCart}
      />
      <main>
        <Hero onAdd={addToCart} onSearch={openSearch} />
        <ProductGrid 
          onAdd={addToCart} 
          limit={2}
          title="Productos Destacados"
          subtitle="Nuestra selección destacada de péptidos y compuestos liofilizados de alta pureza."
          showViewAllLink={true}
        />
        <WhatsIncluded />
        <CommitmentBlock />
      </main>
      <Footer />
    </div>
  )
}
