'use client'

import { useEffect } from 'react'
import { TopBar } from './top-bar'
import { Navbar } from './navbar'
import { Hero } from './hero'
import { ProductGrid } from './product-grid'
import { BenefitsStrip, WhatsIncluded, CommitmentBlock, QualityCoa, GuidesBlock } from './home-blocks'
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

  // Solo mostrar productos públicos en la página de inicio
  const publicProducts = products.filter(p => p.isPublic)

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
        <BenefitsStrip />
        
        <div className="flex flex-col justify-center min-h-[calc(100vh-64px)] bg-secondary/5 border-b border-border">
          <WhatsIncluded data={homeData?.whatsIncluded} />
          <QualityCoa data={homeData?.quality as any} />
        </div>

        <ProductGrid 
          sanityProducts={publicProducts}
          onAdd={addToCart} 
          limit={4}
          title="Nuestros productos"
          subtitle=""
          showViewAllLink={true}
        />

        <GuidesBlock data={homeData?.guides as any} />
        <CommitmentBlock data={homeData?.commitment} />
      </main>
      <Footer siteSettings={siteSettings} />
    </div>
  )
}
