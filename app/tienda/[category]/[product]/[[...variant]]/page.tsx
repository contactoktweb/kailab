import { notFound } from 'next/navigation'
import { getProductBySlug, getSiteSettings } from '@/lib/sanity-queries'
import { VariantDetailClient } from '@/components/kailab/variant-detail-client'

export default async function CanonicalProductPage({
  params
}: {
  params: Promise<{ category: string, product: string, variant?: string[] }>
}) {
  const resolvedParams = await params
  
  const [product, siteSettings] = await Promise.all([
    getProductBySlug(resolvedParams.product),
    getSiteSettings()
  ])

  if (!product) {
    notFound()
  }

  return (
    <VariantDetailClient 
      product={product} 
      initialVariantSlug={resolvedParams.variant?.[0]} 
      siteSettings={siteSettings} 
    />
  )
}
