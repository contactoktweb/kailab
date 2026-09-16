'use client'

import { useEffect } from 'react'
import { TopBar } from '@/components/kailab/top-bar'
import { Navbar } from '@/components/kailab/navbar'
import { ProductGrid } from '@/components/kailab/product-grid'
import { Footer } from '@/components/kailab/footer'
import { useCart } from '@/components/kailab/cart-context'
import type { SiteSettings, StorePageData } from '@/lib/sanity-queries'
import type { Product } from '@/components/kailab/data'

interface TiendaClientProps {
  siteSettings?: SiteSettings | null
  products: Product[]
  storePageData?: StorePageData | null
}

export function TiendaClient({ siteSettings, products, storePageData }: TiendaClientProps) {
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
      <TopBar />
      <Navbar siteSettings={siteSettings} />
      
      <main className="pt-4 space-y-4">
        <ProductGrid 
          sanityProducts={products}
          onAdd={addToCart} 
          title={storePageData?.title || "Catálogo Completo de Productos"}
          subtitle={storePageData?.subtitle || "Explora nuestra selección completa de péptidos y compuestos liofilizados de alta pureza."}
        />
      </main>

      <Footer siteSettings={siteSettings} />
    </div>
  )
}
