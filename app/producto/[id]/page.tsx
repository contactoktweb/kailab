import { notFound } from 'next/navigation'
import { products as localProducts } from '@/components/kailab/data'
import { getSiteSettings } from '@/lib/sanity-queries'
import { ProductDetailClient } from '@/components/kailab/product-detail-client'

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  
  const siteSettings = await getSiteSettings()
  const product = localProducts.find(p => p.slug === resolvedParams.id)

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} siteSettings={siteSettings} />
}
