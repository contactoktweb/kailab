'use client'

import { useState } from 'react'
import { TopBar } from '@/components/kailab/top-bar'
import { Navbar } from '@/components/kailab/navbar'
import { ProductGrid } from '@/components/kailab/product-grid'
import { Footer } from '@/components/kailab/footer'
import { CommandPalette } from '@/components/kailab/command-palette'
import { CartDrawer } from '@/components/kailab/cart-drawer'
import type { CartItem, Product } from '@/components/kailab/data'

export default function TiendaPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  const cartCount = items.reduce((sum, i) => sum + i.qty, 0)

  const addToCart = (product: Product) => {
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
  }

  const changeQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.product.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    )
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== id))
  }

  return (
    <div className="min-h-[100dvh] bg-background">
      <TopBar onSearch={() => setPaletteOpen(true)} />
      <Navbar
        cartCount={cartCount}
        onSearch={() => setPaletteOpen(true)}
        onCart={() => setCartOpen(true)}
      />
      
      <main className="pt-4">
        <ProductGrid 
          onAdd={addToCart} 
          title="Catálogo Completo de Productos"
          subtitle="Explora nuestra selección completa de péptidos y compuestos liofilizados de alta pureza."
        />
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
