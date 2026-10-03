import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug, getSiteSettings } from '@/lib/sanity-queries'
import { VariantDetailClient } from '@/components/kailab/variant-detail-client'

import { urlFor } from '@/sanity/lib/image'

export async function generateMetadata({
  params
}: {
  params: Promise<{ category: string, product: string, variant?: string[] }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const product = await getProductBySlug(resolvedParams.product)
  const variantSlug = resolvedParams.variant?.[0]
  
  if (!product) {
    return {}
  }

  const isRetatrutide = product.slug === 'retatrutide' || product.slug === 'retatrutida'
  const isRT5 = isRetatrutide && variantSlug === '5mg'
  const isRT10 = isRetatrutide && variantSlug === '10mg'

  let title = `${product.title} | KAILAB`
  let description = product.description || ''

  if (isRetatrutide) {
    if (isRT5) {
      title = 'Retatrutida 5 mg | KAILAB'
      description = 'Retatrutida de 5 mg. Consulta la información del producto y los certificados de análisis disponibles por lote.'
    } else if (isRT10) {
      title = 'Retatrutida 10 mg | KAILAB'
      description = 'Retatrutida de 10 mg. Consulta la información del producto y los certificados de análisis disponibles por lote.'
    } else {
      title = 'Retatrutida 5 mg y 10 mg | KAILAB'
      description = 'Retatrutida en presentaciones de 5 mg y 10 mg. Consulta la información del producto y los certificados de análisis disponibles por presentación y lote.'
    }
  }

  const canonicalUrl = isRetatrutide 
    ? `https://kailab.com.co/tienda/metabolico/retatrutida/` 
    : `https://kailab.com.co/tienda/${resolvedParams.category}/${resolvedParams.product}/`

  const activeVariant = variantSlug ? product.variants?.find(v => v.slug === variantSlug) : undefined
  const activeImage = activeVariant?.image || product.image
  
  let imageUrl = undefined;
  if (activeImage) {
    if (activeImage.startsWith('http')) {
      imageUrl = activeImage;
    } else if (activeImage.startsWith('/')) {
      imageUrl = `https://kailab.com.co${activeImage}`;
    } else {
      try {
        imageUrl = urlFor(activeImage).width(1200).height(630).fit('crop').url();
      } catch (e) {
        imageUrl = undefined;
      }
    }
  }

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl
    },
    robots: {
      index: true,
      follow: true
    },
    openGraph: {
      title,
      description,
      ...(imageUrl ? {
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title
          }
        ]
      } : {})
    }
  }
}

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
