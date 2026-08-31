'use client'

import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
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
    <div className="min-h-[100dvh] bg-background pb-24 md:pb-0">
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
          {/* LEFT: Visuals & Quality */}
          <div className="space-y-6" style={{ perspective: 2000 }}>
            <motion.div 
              initial={{ opacity: 0, rotateX: 40, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
              transition={{ type: "spring", damping: 20, stiffness: 60 }}
              className="relative aspect-square w-full rounded-2xl border border-border bg-secondary/20 p-8 overflow-hidden group shadow-2xl"
            >
              {/* Sweeping Glass Glare */}
              <motion.div
                initial={{ x: "-150%", opacity: 0 }}
                animate={{ x: "200%", opacity: 0.4 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                className="absolute inset-0 z-20 w-1/2 -skew-x-[25deg] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none"
              />
              {/* Badges */}
              <motion.div 
                initial="hidden" animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.4 } }
                }}
                className="absolute left-4 top-4 flex flex-col gap-2 z-10"
              >
                {product.badges.map((b) => (
                  <motion.div key={b} variants={{ hidden: { opacity: 0, scale: 0, rotate: -20 }, visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", bounce: 0.6 } } }}>
                    <MicroBadge variant="brand" className="shadow-md">
                      {b}
                    </MicroBadge>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, rotateY: 90, scale: 0.5 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, duration: 1.2, delay: 0.2 }}
                className="relative h-full w-full z-10"
              >
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative h-full w-full"
                >
                  <Image
                    src="/placeholder.jpg"
                    alt={product.title}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Quality Signal Card */}
            <motion.div 
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="rounded-xl border border-border bg-card p-6"
            >
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
            </motion.div>
          </div>

          {/* RIGHT: Commerce / Details */}
          {/* RIGHT: Commerce / Details */}
          <div className="flex flex-col">
            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
            >
              {product.category}
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              {product.title}
            </motion.h1>
            
            
            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="mt-4 text-base text-muted-foreground leading-relaxed"
            >
              Fórmula: <span className="font-mono">{product.formula}</span>. Compuesto liofilizado de alta pureza, sintetizado para investigación y análisis de laboratorio (RUO). No apto para uso humano o veterinario.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="mt-8"
            >
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
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="mt-8 border-t border-border pt-8"
            >
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
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
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
                  className="group relative hidden h-12 flex-1 items-center justify-center gap-2 rounded-sm border-2 border-primary bg-primary px-8 text-sm font-bold text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary active:scale-95 disabled:pointer-events-none disabled:opacity-50 md:flex"
                >
                 <Icon icon="lucide:shopping-cart" className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12" />
                 Agregar al Carrito
               </button>
            </motion.div>

            <motion.ul 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="mt-8 space-y-3 text-sm text-muted-foreground"
            >
               <li className="flex items-center gap-3">
                 <Icon icon="lucide:truck" className="h-4 w-4 text-primary" />
                 Despacho en 24h para Bogotá.
               </li>
               <li className="flex items-center gap-3">
                 <Icon icon="lucide:file-check-2" className="h-4 w-4 text-primary" />
                 Incluye reporte impreso del lote {product.lot}.
               </li>
            </motion.ul>

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
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
      >
         <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground truncate max-w-[120px]">{product.title}</span>
              <span className="font-bold text-foreground">{formatCOP(product.priceCOP)}</span>
            </div>
            <button 
              disabled={isOutOfStock}
              className="group relative flex h-11 flex-1 items-center justify-center gap-2 rounded-sm border-2 border-primary bg-primary px-4 text-sm font-bold text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary active:scale-95 disabled:pointer-events-none disabled:opacity-50"
            >
              <Icon icon="lucide:shopping-cart" className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12" />
              Agregar
            </button>
         </div>
      </motion.div>

    </div>
  )
}
