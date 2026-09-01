'use client'

import { use } from 'react'
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

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const product = products.find((p) => p.id === resolvedParams.id)

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
              className="relative aspect-square w-full rounded-2xl border border-transparent bg-gradient-to-br from-[#f0f5ff] to-[#e0ebff] p-8 overflow-hidden group shadow-2xl"
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
                className="absolute left-4 top-4 flex flex-col gap-2 z-30"
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
                    src={product.image || "/placeholder.jpg"}
                    alt={product.title}
                    fill
                    className="object-contain drop-shadow-2xl mix-blend-multiply"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Quality Signal Card */}
            <motion.div 
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="rounded-xl border border-transparent bg-white p-6 shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                   <Icon icon="lucide:shield-check" className="h-6 w-6 text-primary" />
                </div>
                <div>
                   <h3 className="font-semibold text-slate-900">Calidad Verificada</h3>
                   <p className="mt-1 text-sm text-slate-600">Lote <span className="font-mono text-primary font-bold">{product.lot}</span> con pureza de {product.purity}</p>
                   <a href="#coa" className="mt-2 inline-block text-sm font-medium text-primary hover:underline">Ver Certificado de Análisis (COA) &rarr;</a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Commerce / Details */}
          {/* RIGHT: Commerce / Details */}
          <div className="relative flex flex-col justify-center rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md shadow-2xl overflow-hidden">

            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              className="relative z-10 font-mono text-xs uppercase tracking-widest text-sky-400"
            >
              {product.category}
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="relative z-10 mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
            >
              {product.title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="relative z-10 mt-5 text-base text-slate-300 leading-relaxed"
            >
              Fórmula: <span className="font-mono text-white bg-white/10 px-1.5 py-0.5 rounded">{product.formula}</span>. Compuesto liofilizado de alta pureza, sintetizado para investigación y análisis de laboratorio (RUO). No apto para uso humano o veterinario.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="relative z-10 mt-8"
            >
              <h3 className="text-sm font-semibold text-white">Detalles del Producto</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                 <div className="rounded-xl border border-primary/40 bg-primary/10 px-4 py-2 font-mono text-sm font-bold text-white">
                    {product.concentration}
                 </div>
                 <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-mono text-sm text-slate-300 backdrop-blur-sm">
                    {product.presentation}
                 </div>
                 <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-mono text-sm text-slate-300 backdrop-blur-sm">
                    + Agua bacteriostática
                 </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="relative z-10 mt-8 border-t border-white/10 pt-8"
            >
              <div className="flex items-end gap-3">
                <span className="text-4xl font-extrabold tracking-tight text-white">{formatCOP(product.priceCOP)}</span>
                <span className="mb-1 text-sm font-medium text-slate-400">COP / unidad</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    isOutOfStock ? 'bg-slate-500' : isLowStock ? 'bg-destructive' : 'bg-blue-400'
                  }`}
                  aria-hidden="true"
                />
                <span className={`text-sm font-bold tracking-wide uppercase ${
                  isOutOfStock ? 'text-slate-500' : isLowStock ? 'text-destructive' : 'text-blue-400'
                }`}>
                  {isOutOfStock ? 'Agotado' : isLowStock ? `Últimas ${product.stock} unidades` : 'Disponible en stock'}
                </span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="relative z-10 mt-8 flex flex-col sm:flex-row gap-4"
            >
               {/* Quantity */}
               <div className="flex h-14 items-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                  <button className="flex h-full w-14 items-center justify-center text-slate-400 hover:text-white transition-colors disabled:opacity-50">
                    <Icon icon="lucide:minus" className="h-5 w-5" />
                  </button>
                  <span className="w-10 text-center font-mono text-lg font-bold text-white">1</span>
                  <button className="flex h-full w-14 items-center justify-center text-slate-400 hover:text-white transition-colors">
                    <Icon icon="lucide:plus" className="h-5 w-5" />
                  </button>
               </div>
               
               {/* Main CTA */}
               <button 
                  disabled={isOutOfStock}
                  className="group relative hidden h-14 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-transparent bg-white px-8 text-sm font-extrabold text-slate-900 transition-all duration-300 hover:bg-transparent hover:border-white hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-50 md:flex"
                >
                 <Icon icon="lucide:shopping-cart" className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12" />
                 Agregar al Carrito
               </button>
            </motion.div>

            <motion.ul 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="relative z-10 mt-8 space-y-4 text-sm text-slate-300"
            >
               <li className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                 <div className="rounded-full bg-blue-500/20 p-2">
                   <Icon icon="lucide:truck" className="h-4 w-4 text-blue-400" />
                 </div>
                 Despacho en 24h para Bogotá.
               </li>
               <li className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                 <div className="rounded-full bg-blue-500/20 p-2">
                   <Icon icon="lucide:file-check-2" className="h-4 w-4 text-blue-400" />
                 </div>
                 Incluye reporte impreso del lote {product.lot}.
               </li>
            </motion.ul>

          </div>
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
