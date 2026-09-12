'use client'

import { ReactNode } from 'react'
import { CartProvider, useCart } from './cart-context'
import { CartDrawer } from './cart-drawer'
import { CommandPalette } from './command-palette'
import type { Product } from './data'

function GlobalModals() {
  const {
    cartOpen, closeCart,
    items, updateQty, removeFromCart,
    searchOpen, closeSearch,
    addToCart,
  } = useCart()

  const handleAdd = (product: Product) => {
    addToCart(product)
    closeSearch()
  }

  return (
    <>
      <CartDrawer
        open={cartOpen}
        onClose={closeCart}
        items={items}
        onQty={(productId, variantId, delta) => updateQty(productId, variantId, delta)}
        onRemove={(productId, variantId) => removeFromCart(productId, variantId)}
      />
      <CommandPalette
        open={searchOpen}
        onClose={closeSearch}
        onAdd={handleAdd}
      />
    </>
  )
}

export function KailabProviders({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <GlobalModals />
    </CartProvider>
  )
}
