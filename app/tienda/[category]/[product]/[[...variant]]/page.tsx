import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug, getSiteSettings } from '@/lib/sanity-queries'
import { products as localProducts } from '@/components/kailab/data'
import { VariantDetailClient } from '@/components/kailab/variant-detail-client'
import type { Product } from '@/components/kailab/data'

import { urlFor } from '@/sanity/lib/image'

/**
 * Obtiene el producto desde Sanity como fuente primaria.
 * Si Sanity no retorna datos (error, documento no existente), cae al fallback local (data.ts).
 */
async function resolveProduct(productSlug: string): Promise<Product | undefined> {
  // Normalizar: la URL puede llegar como 'retatrutida' pero Sanity lo almacena como 'retatrutide'
  const slugToQuery = productSlug === 'retatrutida' ? 'retatrutide' : productSlug

  try {
    const sanityProduct = await getProductBySlug(slugToQuery)
    if (sanityProduct) return sanityProduct
  } catch (e) {
    console.error('[resolveProduct] Error fetching from Sanity, falling back to local data:', e)
  }

  // Fallback: datos locales hardcodeados
  return localProducts.find(
    p => p.slug === productSlug || (productSlug === 'retatrutida' && p.slug === 'retatrutide')
  )
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ category: string, product: string, variant?: string[] }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const variantSlug = resolvedParams.variant?.[0]

  // Para metadata usamos fallback local para mayor velocidad (no bloquear SSG)
  const product = localProducts.find(
    p => p.slug === resolvedParams.product || (resolvedParams.product === 'retatrutida' && p.slug === 'retatrutide')
  )
  
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
  
  // Sanity es la fuente primaria; si falla, cae a datos locales
  const [siteSettings, product] = await Promise.all([
    getSiteSettings(),
    resolveProduct(resolvedParams.product),
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
