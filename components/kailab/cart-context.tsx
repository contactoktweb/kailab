'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import type { Product, Variant, CartItem } from './data'

type CartContextType = {
  items: CartItem[]
  cartOpen: boolean
  searchOpen: boolean
  cartCount: number
  cartTotal: number
  addToCart: (product: Product, variant?: Variant, qty?: number) => void
  removeFromCart: (productId: string, variantId?: string) => void
  updateQty: (productId: string, variantId: string | undefined, delta: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  openSearch: () => void
  closeSearch: () => void
  toggleSearch: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const STORAGE_KEY = 'kailab_cart_v1'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Cargar desde localStorage al montar
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setItems(JSON.parse(saved))
      }
    } catch (e) {
      console.error('Error cargando el carrito:', e)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Guardar en localStorage cuando cambien los ítems
  useEffect(() => {
    if (!isLoaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (e) {
      console.error('Error guardando el carrito:', e)
    }
  }, [items, isLoaded])

  const addToCart = (product: Product, variant?: Variant, qty: number = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.product.id === product.id && i.variant?.id === variant?.id
      )

      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          qty: updated[existingIndex].qty + qty,
        }
        return updated
      }

      return [...prev, { product, variant, qty }]
    })
    setCartOpen(true)
  }

  const removeFromCart = (productId: string, variantId?: string) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.product.id === productId && i.variant?.id === variantId)
      )
    )
  }

  const updateQty = (productId: string, variantId: string | undefined, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.product.id === productId && i.variant?.id === variantId) {
            const newQty = i.qty + delta
            return newQty > 0 ? { ...i, qty: newQty } : null
          }
          return i
        })
        .filter((i): i is CartItem => i !== null)
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const openCart = () => setCartOpen(true)
  const closeCart = () => setCartOpen(false)
  const toggleCart = () => setCartOpen((v) => !v)

  const openSearch = () => setSearchOpen(true)
  const closeSearch = () => setSearchOpen(false)
  const toggleSearch = () => setSearchOpen((v) => !v)

  const cartCount = items.reduce((sum, i) => sum + i.qty, 0)
  const cartTotal = items.reduce((sum, i) => {
    const price = i.variant?.priceCOP ?? i.product.priceCOP ?? 0
    return sum + price * i.qty
  }, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        cartOpen,
        searchOpen,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
        openSearch,
        closeSearch,
        toggleSearch,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider')
  }
  return context
}
