'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import type { Product } from './data'
import { urlFor } from '@/sanity/lib/image'
import type { HomePageData } from '@/lib/sanity-queries'

type HeroProps = {
  onAdd: (product: Product) => void
  onSearch: () => void
  heroData?: HomePageData['hero']
}

export function Hero({ onAdd, onSearch, heroData }: HeroProps) {
  let heroImageUrl = "/kailab-images/RT10_Retatrutide_10mg_RENDER_WEB_UX_PREVIEW.png"
  if (heroData?.backgroundImage?.asset) {
    try {
      heroImageUrl = urlFor(heroData.backgroundImage).url()
    } catch (e) {
      console.error('Error resolving hero background image from Sanity:', e)
    }
  }

  return (
    <section className="relative flex min-h-[calc(100dvh-110px)] w-full items-center overflow-hidden bg-white border-b border-border">
      
      {/* Background decorations */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Main Content: Two columns on desktop */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Column: Text (First on mobile) */}
          <div className="flex flex-col items-start gap-4 lg:gap-6 order-1">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl lg:leading-[1.1]"
            >
              {heroData?.titlePart1 !== undefined ? heroData.titlePart1 : 'Péptidos para investigación en'}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1959D7] to-blue-400">
                {heroData?.titlePart2 !== undefined ? heroData.titlePart2 : 'Colombia'}
              </span>
            </motion.h1>

            {heroData?.subtitle !== undefined ? (
              heroData.subtitle ? (
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-xl text-balance text-base leading-relaxed text-slate-600 sm:text-lg"
                >
                  {heroData.subtitle}
                </motion.p>
              ) : null
            ) : (
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-xl text-balance text-base leading-relaxed text-slate-600 sm:text-lg"
              >
                Conoce cada producto, elige su presentación y consulta la información práctica y los certificados de análisis disponibles.
              </motion.p>
            )}

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, type: "spring", bounce: 0.4 }}
              className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href={heroData?.ctaLink !== undefined && heroData?.ctaLink !== null ? heroData.ctaLink : "/tienda"}
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden bg-primary px-8 py-4 font-mono text-sm font-bold tracking-widest text-primary-foreground backdrop-blur-md transition-all duration-500 hover:bg-primary/90 active:scale-95"
              >
                {/* L-Shape Border Left */}
                <div className="absolute left-0 top-0 h-full w-[2px] bg-white/30 transition-colors duration-500 group-hover:bg-white"></div>
                {/* L-Shape Border Top */}
                <div className="absolute left-0 top-0 h-[2px] w-12 bg-white/30 transition-all duration-500 group-hover:w-full group-hover:bg-white"></div>
                
                {heroData?.ctaText !== undefined && heroData?.ctaText !== null ? heroData.ctaText : 'Ver productos'}
                <Icon icon="lucide:arrow-right" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
          
          {/* Right Column: Image (Second on mobile) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center order-2"
          >
            {/* Subtle levitation animation for the image */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative w-full aspect-square max-w-[350px] lg:max-w-[450px]"
            >
              <Image
                src={heroImageUrl}
                alt="Péptidos para investigación"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
                quality={85}
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
          
        </div>
      </div>
      
    </section>
  )
}
