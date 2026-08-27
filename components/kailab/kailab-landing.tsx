'use client'

import { useCallback, useEffect, useState } from 'react'
import { TopBar } from './top-bar'
import { Navbar } from './navbar'
import { Hero } from './hero'
import { EvidenceChart } from './evidence-chart'
import { ProductGrid } from './product-grid'
import { OpsMatrix } from './ops-matrix'
import { Footer } from './footer'
import { CommandPalette } from './command-palette'
import { CartDrawer } from './cart-drawer'
import type { CartItem, Product } from './data'

export function KailabLanding() {
  const [items, setItems] = useState<CartItem[]>([])
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  const cartCount = items.reduce((sum, i) => sum + i.qty, 0)

  const addToCart = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        )
      }
      return [...prev, { product, qty: 1 }]
    })
    setCartOpen(true)
  }, [])

  const changeQty = useCallback((id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.product.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    )
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== id))
  }, [])

  // Global ⌘K / Ctrl+K to open the command palette
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <TopBar onSearch={() => setPaletteOpen(true)} />
      <Navbar
        cartCount={cartCount}
        onSearch={() => setPaletteOpen(true)}
        onCart={() => setCartOpen(true)}
      />
      <main>
        <Hero onAdd={addToCart} onSearch={() => setPaletteOpen(true)} />
        <EvidenceChart />
        <ProductGrid onAdd={addToCart} />
        <OpsMatrix />
      </main>
      <Footer />

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onAdd={addToCart}
      />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        onQty={changeQty}
        onRemove={removeItem}
      />
    </div>
  )
}
