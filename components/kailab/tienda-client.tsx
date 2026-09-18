'use client'

import { useEffect, useState, useMemo } from 'react'
import { TopBar } from '@/components/kailab/top-bar'
import { Navbar } from '@/components/kailab/navbar'
import { ProductGrid } from '@/components/kailab/product-grid'
import { Footer } from '@/components/kailab/footer'
import { useCart } from '@/components/kailab/cart-context'
import type { SiteSettings, StorePageData } from '@/lib/sanity-queries'
import type { Product } from '@/components/kailab/data'
import { cn } from '@/lib/utils'

interface TiendaClientProps {
  siteSettings?: SiteSettings | null
  products: Product[]
  storePageData?: StorePageData | null
}

export function TiendaClient({ siteSettings, products, storePageData }: TiendaClientProps) {
  const { cartCount, addToCart, toggleCart, openSearch } = useCart()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filtrar solo productos públicos (según requerimiento de catálogo)
  const publicProducts = useMemo(() => products.filter(p => p.isPublic), [products])

  // Extraer categorías únicas que tienen productos públicos
  const categories = useMemo(() => {
    const cats = new Set<string>()
    publicProducts.forEach(p => {
      if (p.category) cats.add(p.category)
    })
    return Array.from(cats).sort()
  }, [publicProducts])

  // Filtrar productos por categoría
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return publicProducts
    return publicProducts.filter(p => p.category === selectedCategory)
  }, [publicProducts, selectedCategory])

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
      
      <main className="pt-4 space-y-4 pb-12">
        {categories.length > 1 && (
          <div className="mx-auto max-w-7xl px-4 pt-6">
            <div className="flex flex-wrap gap-2 mb-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-300 border",
                  selectedCategory === null
                    ? "bg-primary border-primary text-primary-foreground shadow-sm"
                    : "bg-background border-border text-foreground hover:bg-muted"
                )}
              >
                Todos
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-300 border",
                    selectedCategory === cat
                      ? "bg-primary border-primary text-primary-foreground shadow-sm"
                      : "bg-background border-border text-foreground hover:bg-muted"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        <ProductGrid 
          sanityProducts={filteredProducts}
          onAdd={addToCart} 
          title="Péptidos para investigación"
          subtitle="Elige una presentación para consultar su precio, disponibilidad e información."
          isTiendaPage={true}
        />
      </main>

      <Footer siteSettings={siteSettings} />
    </div>
  )
}
