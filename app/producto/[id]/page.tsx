import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { products, formatCOP } from '@/components/kailab/data'
import { MicroBadge } from '@/components/kailab/badge'
import { TopBar } from '@/components/kailab/top-bar'
import { Navbar } from '@/components/kailab/navbar'
import { Footer } from '@/components/kailab/footer'
import { QualityCoa, WhatsIncluded, FaqShort } from '@/components/kailab/home-blocks'

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  const isOutOfStock = product.stock === 0
  const isLowStock = product.stock > 0 && product.stock <= 15

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <TopBar onSearch={() => {}} />
      <Navbar cartCount={0} onSearch={() => {}} onCart={() => {}} />
      
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <Icon icon="lucide:arrow-left" className="h-4 w-4" />
            Volver a la tienda
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-[1fr_1fr] lg:gap-16">
          {/* LEFT: Visuals & Quality */}
          <div className="space-y-6">
            <div className="relative aspect-square w-full rounded-2xl border border-border bg-secondary/20 p-8 overflow-hidden">
              {/* Badges */}
              <div className="absolute left-4 top-4 flex flex-col gap-2 z-10">
                {product.badges.map((b) => (
                  <MicroBadge key={b} variant="brand" className="shadow-md">
                    {b}
                  </MicroBadge>
                ))}
              </div>
              <div className="relative h-full w-full">
                <Image
                  src="/placeholder.jpg"
                  alt={product.title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Quality Signal Card */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                   <Icon icon="lucide:shield-check" className="h-6 w-6 text-primary" />
                </div>
                <div>
                   <h3 className="font-semibold text-foreground">Calidad Verificada</h3>
                   <p className="mt-1 text-sm text-muted-foreground">Lote <span className="font-mono text-primary">{product.lot}</span> con pureza de {product.purity}</p>
                   <a href="#coa" className="mt-2 inline-block text-sm font-medium text-primary hover:underline">Ver Certificado de Análisis (COA) &rarr;</a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Commerce / Details */}
          <div className="flex flex-col">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {product.category}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{product.title}</h1>
            
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Fórmula: <span className="font-mono">{product.formula}</span>. Compuesto liofilizado de alta pureza, sintetizado para investigación y análisis de laboratorio (RUO). No apto para uso humano o veterinario.
            </p>

            <div className="mt-8">
              <h3 className="text-sm font-medium text-foreground">Seleccionar Variante</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                 <button className="rounded-md border-2 border-primary bg-primary/5 px-4 py-2 font-mono text-sm font-bold text-primary">
                    {product.concentration}
                 </button>
                 {/* Mock variant */}
                 <button className="rounded-md border border-border bg-card px-4 py-2 font-mono text-sm text-muted-foreground hover:border-primary/50 transition-colors">
                    Doble ({parseInt(product.concentration) * 2} mg)
                 </button>
              </div>
            </div>

            <div className="mt-8 border-t border-border pt-8">
              <div className="flex items-end gap-3">
                <span className="text-3xl font-bold tracking-tight text-foreground">{formatCOP(product.priceCOP)}</span>
                <span className="mb-1 text-sm text-muted-foreground">COP / unidad</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    isOutOfStock ? 'bg-muted-foreground' : isLowStock ? 'bg-destructive' : 'bg-primary'
                  }`}
                  aria-hidden="true"
                />
                <span className={`text-sm font-medium ${
                  isOutOfStock ? 'text-muted-foreground' : isLowStock ? 'text-destructive' : 'text-primary'
                }`}>
                  {isOutOfStock ? 'Agotado' : isLowStock ? `Últimas ${product.stock} unidades en stock` : 'Disponible en stock local'}
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
               {/* Quantity */}
               <div className="flex h-12 items-center rounded-md border border-border bg-background">
                  <button className="flex h-full w-12 items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50">
                    <Icon icon="lucide:minus" className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-mono font-medium">1</span>
                  <button className="flex h-full w-12 items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                    <Icon icon="lucide:plus" className="h-4 w-4" />
                  </button>
               </div>
               
               {/* Main CTA (Desktop only, hidden on mobile to avoid duplication with sticky bar) */}
               <button 
                  disabled={isOutOfStock}
                  className="group relative hidden h-12 flex-1 items-center justify-center gap-2 rounded-sm border-2 border-primary bg-primary px-8 text-sm font-bold text-primary-foreground shadow-[0_0_25px_rgba(25,89,215,0.7)] transition-all duration-300 hover:bg-transparent hover:text-primary hover:shadow-[0_0_10px_rgba(25,89,215,0.3)] active:scale-95 disabled:pointer-events-none disabled:opacity-50 md:flex"
                >
                 <Icon icon="lucide:shopping-cart" className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12" />
                 Agregar al Carrito
               </button>
            </div>

            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
               <li className="flex items-center gap-3">
                 <Icon icon="lucide:truck" className="h-4 w-4 text-primary" />
                 Despacho en 24h para Bogotá.
               </li>
               <li className="flex items-center gap-3">
                 <Icon icon="lucide:file-check-2" className="h-4 w-4 text-primary" />
                 Incluye reporte impreso del lote {product.lot}.
               </li>
            </ul>

          </div>
        </div>

        {/* Informative Blocks below */}
        <div className="mt-24 space-y-12">
          <WhatsIncluded />
          <QualityCoa />
          <FaqShort />
        </div>
      </main>
      
      <Footer />

      {/* STICKY MOBILE CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 p-4 backdrop-blur-md md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
         <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground truncate max-w-[120px]">{product.title}</span>
              <span className="font-bold text-foreground">{formatCOP(product.priceCOP)}</span>
            </div>
            <button 
              disabled={isOutOfStock}
              className="group relative flex h-11 flex-1 items-center justify-center gap-2 rounded-sm border-2 border-primary bg-primary px-4 text-sm font-bold text-primary-foreground shadow-[0_0_20px_rgba(25,89,215,0.7)] transition-all duration-300 hover:bg-transparent hover:text-primary hover:shadow-[0_0_10px_rgba(25,89,215,0.3)] active:scale-95 disabled:pointer-events-none disabled:opacity-50"
            >
              <Icon icon="lucide:shopping-cart" className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12" />
              Agregar
            </button>
         </div>
      </div>

    </div>
  )
}
