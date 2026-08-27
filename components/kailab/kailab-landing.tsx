'use client'

import { useState } from 'react'
import { TopBar } from './top-bar'
import { Navbar } from './navbar'
import { Hero } from './hero'
import { EvidenceChart } from './evidence-chart'
import { ProductGrid } from './product-grid'
import { OpsMatrix } from './ops-matrix'
import { Footer } from './footer'
import type { Product } from './data'

export function KailabLanding() {
  const [cartCount, setCartCount] = useState(0)

  const handleAdd = (_product: Product) => {
    setCartCount((count) => count + 1)
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar cartCount={cartCount} />
      <main>
        <Hero />
        <EvidenceChart />
        <ProductGrid onAdd={handleAdd} />
        <OpsMatrix />
      </main>
      <Footer />
    </div>
  )
}
