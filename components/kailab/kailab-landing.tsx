'use client'

import { useEffect } from 'react'
import { TopBar } from './top-bar'
import { Navbar } from './navbar'
import { Hero } from './hero'
import { ProductGrid } from './product-grid'
import { WhatsIncluded, CommitmentBlock, TrustIndicators } from './home-blocks'
import { Footer } from './footer'
import { useCart } from './cart-context'
import type { HomePageData, SiteSettings } from '@/lib/sanity-queries'
import type { Product } from './data'

interface KailabLandingProps {
  homeData?: HomePageData | null
  siteSettings?: SiteSettings | null
  products: Product[]
}

export function KailabLanding({ homeData, siteSettings, products }: KailabLandingProps) {
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
      <TopBar />
      <Navbar siteSettings={siteSettings} />
      <main>
        <Hero 
          onAdd={addToCart} 
          onSearch={openSearch} 
          heroData={homeData?.hero} 
        />
        <ProductGrid 
          sanityProducts={products}
          onAdd={addToCart} 
          limit={4}
          title={homeData?.featuredProducts?.title || "Productos Destacados"}
          subtitle={homeData?.featuredProducts?.subtitle || "Nuestra selección destacada de péptidos y compuestos liofilizados de alta pureza."}
          showViewAllLink={true}
        />
        <WhatsIncluded data={homeData?.whatsIncluded} />
        <CommitmentBlock data={homeData?.commitment} />
      </main>
      <Footer siteSettings={siteSettings} />
    </div>
  )
}
