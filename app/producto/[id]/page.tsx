import { notFound } from 'next/navigation'
import { getProductBySlug, getSiteSettings } from '@/lib/sanity-queries'
import { ProductDetailClient } from '@/components/kailab/product-detail-client'

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  
  const [product, siteSettings] = await Promise.all([
    getProductBySlug(resolvedParams.id),
    getSiteSettings()
  ])

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} siteSettings={siteSettings} />
}
