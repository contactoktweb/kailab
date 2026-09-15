'use client'

import { useEffect } from 'react'
import { TopBar } from '@/components/kailab/top-bar'
import { Navbar } from '@/components/kailab/navbar'
import { ProductGrid } from '@/components/kailab/product-grid'
import { Footer } from '@/components/kailab/footer'
import { useCart } from '@/components/kailab/cart-context'

export default function TiendaPage() {
  const { cartCount, addToCart, toggleCart, openSearch } = useCart()

  // Global ⌘K / Ctrl+K
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
      
      <main className="pt-4 space-y-4">
        <ProductGrid 
          onAdd={addToCart} 
          title="Catálogo Completo de Productos"
          subtitle="Explora nuestra selección completa de péptidos y compuestos liofilizados de alta pureza."
        />
      </main>

      <Footer />
    </div>
  )
}
