'use client'

import Image from 'next/image'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import type { Product } from './data'

type HeroProps = {
  onAdd: (product: Product) => void
  onSearch: () => void
}

export function Hero({ onAdd, onSearch }: HeroProps) {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)] w-full items-center overflow-hidden border-b border-border">
      
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/kailab-images/hero-image.png"
          alt="Kailab Laboratorio Background"
          fill
          priority
          className="object-cover object-center opacity-80"
        />
        
        {/* Layered Gradients for dramatic, tech-noir effect */}
        {/* 1. Base dark tint to ensure text readability always */}
        <div className="absolute inset-0 bg-background/50" />
        
        {/* 2. Deep gradient from left (where text is) to right */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        
        {/* 3. Bottom gradient to blend smoothly into the next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* 4. A subtle primary color wash over the whole thing for brand unity */}
        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
      </div>
      


      {/* Main Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 lg:py-32">
        <div className="max-w-2xl">
          
          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="text-balance text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Péptidos de <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">
              Investigación
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, type: "spring", bounce: 0.4 }}
            className="mt-8 max-w-xl text-balance text-lg font-light leading-relaxed text-gray-300 sm:text-xl"
          >
            Compuestos científicos de alta calidad para uso profesional. Resultados verificables con transparencia radical para protocolos rigurosos.
          </motion.p>

          {/* CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
            className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href="#catalogo"
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden bg-primary px-8 py-4 font-mono text-sm font-bold tracking-widest text-primary-foreground backdrop-blur-md transition-all duration-500 hover:bg-primary/90 active:scale-95"
            >
              {/* L-Shape Border Left */}
              <div className="absolute left-0 top-0 h-full w-[2px] bg-white/30 transition-colors duration-500 group-hover:bg-white"></div>
              {/* L-Shape Border Top */}
              <div className="absolute left-0 top-0 h-[2px] w-12 bg-white/30 transition-all duration-500 group-hover:w-full group-hover:bg-white"></div>
              
              Explora nuestros productos
              <Icon icon="lucide:arrow-right" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </motion.div>
          
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-20 h-[1px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 z-20 h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
      
    </section>
  )
}
