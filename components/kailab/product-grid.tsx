'use client'


import { MicroBadge } from './badge'
import { ProductCard } from './product-card'
import { motion } from 'framer-motion'
import { products, formatCOP, type Product } from './data'

type ProductGridProps = {
  onAdd: (product: Product) => void
  title?: string
  subtitle?: string
  badgeText?: string
  limit?: number
}

export function ProductGrid({ 
  onAdd, 
  title = "Explora nuestra selección de péptidos", 
  subtitle = "En KaiLab trabajamos bajo un enfoque serio y ordenado, priorizando la selección cuidadosa de cada compuesto y una gestión responsable de los pedidos.", 
  badgeText = "catalog",
  limit
}: ProductGridProps) {
  
  const displayProducts = limit ? products.slice(0, limit) : products;

  return (
    <section id="catalogo" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
              className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              {title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, type: "spring", bounce: 0.3 }}
              className="mt-4 text-pretty leading-relaxed text-muted-foreground"
            >
              {subtitle}
            </motion.p>
          </div>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
