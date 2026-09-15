'use client'


import { MicroBadge } from './badge'
import { ProductCard } from './product-card'
import { motion } from 'framer-motion'
import { products, type Product, type Variant } from './data'
import Link from 'next/link'
import { Icon } from '@iconify/react'

type ProductGridProps = {
  onAdd: (product: Product, variant?: Variant) => void
  title?: string
  subtitle?: string
  badgeText?: string
  limit?: number
  showViewAllLink?: boolean
}

export function ProductGrid({ 
  onAdd, 
  title = "Explora nuestra selección de péptidos", 
  subtitle = "En KaiLab trabajamos bajo un enfoque serio y ordenado, priorizando la selección cuidadosa de cada compuesto y una gestión responsable de los pedidos.", 
  badgeText = "catalog",
  limit,
  showViewAllLink = false
}: ProductGridProps) {
  
  const displayProducts = limit ? products.slice(0, limit) : products;

  return (
    <section id="catalogo" className="border-b border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
              className="text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
            >
              {title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, type: "spring", bounce: 0.3 }}
              className="mt-2 text-sm text-pretty leading-relaxed text-slate-600"
            >
              {subtitle}
            </motion.p>
          </div>

          {showViewAllLink && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="shrink-0"
            >
              <Link 
                href="/tienda" 
                className="group inline-flex items-center gap-2 text-sm font-bold text-primary transition-all hover:text-primary/80"
              >
                <span>Ver toda la tienda</span>
                <Icon icon="lucide:arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          )}
        </div>

        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {displayProducts.map((product, index) => (
            <motion.li 
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1, type: "spring", bounce: 0.35 }}
            >
              <ProductCard product={product} onAdd={onAdd} />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
