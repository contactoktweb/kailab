import { sanityClient } from './sanity-client'
import { urlFor } from '@/sanity/lib/image'
import type { Product, Variant, InfoAccordion } from '@/components/kailab/data'

export interface SiteSettings {
  siteName?: string
  email?: string
  phone?: string
  address?: string
  workingHours?: string
  footerNotice?: string
  logo?: any
  description?: string
  socialLinks?: Array<{
    _key: string
    platform: string
    url: string
  }>
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const query = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
      siteName,
      email,
      phone,
      address,
      workingHours,
      footerNotice,
      logo,
      description,
      socialLinks
    }`
    const settings = await sanityClient.fetch(query)
    return settings || null
  } catch (error) {
    console.error('Error fetching siteSettings from Sanity:', error)
    return null
  }
}

export interface HomePageData {
  hero?: {
    titlePart1?: string
    titlePart2?: string
    subtitle?: string
    ctaText?: string
    ctaLink?: string
    backgroundImage?: any
  }
  featuredProducts?: {
    title?: string
    subtitle?: string
    products?: any[]
  }
  whatsIncluded?: {
    tag?: string
    title?: string
    description?: string
    items?: Array<{
      _key: string
      name?: string
      desc?: string
    }>
  }
  commitment?: {
    title1?: string
    desc1?: string
    desc2?: string
    title2?: string
    subtitle2?: string
    faq?: Array<{
      _key: string
      question?: string
      answer?: string
    }>
    bannerPrefix?: string
    bannerText?: string
    bannerCtaText?: string
    bannerCtaLink?: string
  }
  quality?: any
  guides?: any
}

export async function getHomePage(): Promise<HomePageData | null> {
  try {
    const query = `*[_type == "homePage" && _id == "homePage"][0]{
      hero,
      featuredProducts,
      whatsIncluded,
      commitment,
      quality,
      guides
    }`
    const data = await sanityClient.fetch(query)
    return data || null
  } catch (error) {
    console.error('Error fetching homePage from Sanity:', error)
    return null
  }
}

export interface StorePageData {
  title?: string
  subtitle?: string
}

export async function getStorePage(): Promise<StorePageData | null> {
  try {
    const query = `*[_type == "storePage" && _id == "storePage"][0]{
      title,
      subtitle
    }`
    const data = await sanityClient.fetch(query)
    return data || null
  } catch (error) {
    console.error('Error fetching storePage from Sanity:', error)
    return null
  }
}

export interface SanityProduct {
  _id: string
  title: string
  slug: { current: string }
  sku: string
  subtitle?: string
  description?: string
  features?: string[]
  shippingNotice?: string
  includedItems?: string[]
  fichaTecnica?: {
    title?: string
    items?: Array<{ question: string; answer: string }>
  }
  reconstitucionText?: string
  lecturaCantidadesText?: string
  dosisCalendarioText?: string
  dosisTables?: Array<{
    presentationId: string
    title: string
    badge: string
    instruction: string
    rows: Array<{ week: string; dose: string; units: string }>
  }>
  experienciaUso?: {
    badge?: string
    title?: string
    tips?: Array<{ title: string; desc: string }>
  }
  preguntasFrecuentes?: {
    badge?: string
    title?: string
    items?: Array<{ q: string; a: string }>
  }
  evidenciaClinica?: {
    badge?: string
    title?: string
    description?: string
    studies?: Array<{
      tag?: string
      title?: string
      description1?: string
      description2?: string
      links?: Array<{ text: string; url: string }>
    }>
    disclaimerTitle?: string
    disclaimerPoints?: string[]
    sourcesTitle?: string
    sourcesSubtitle?: string
    sources?: Array<{ text: string; url: string }>
  }
  lot?: string
  formula?: string
  purity?: string
  badges?: string[]
  presentation?: string
  concentration?: string
  priceCOP: number
  inStock: boolean
  category?: {
    title: string
    slug: { current: string }
  }
  image?: any
  images?: any[]
  infoAccordions?: Array<{
    _key: string
    title: string
    contentHtml?: string
    contentBlocks?: any[]
  }>
  variants?: Array<{
    _key: string
    name: string
    slug?: string
    priceCOP: number
    sku: string
    inStock: boolean
    coaStatus?: 'available' | 'pending'
    image?: any
  }>
}

function mapSanityProductToProduct(p: SanityProduct): Product {
  const isRetatrutide = p.slug?.current === 'retatrutide' || p.slug?.current === 'retatrutida'
  const mappedSlug = isRetatrutide ? 'retatrutida' : (p.slug?.current || '')
  
  let mappedTitle = p.title || ''
  if (isRetatrutide && mappedTitle.toLowerCase().includes('retatrutide')) {
    mappedTitle = 'Retatrutida'
  }

  const defaultRetatrutideSubtitle = 'Agonista triple de receptores (GLP-1 / GIP / Glucagón)'
  const defaultRetatrutideDescription = 'Retatrutide (LY3437943) es un péptido sintético de investigación de 39 aminoácidos que actúa como agonista triple de los receptores GLP-1, GIP y glucagón. Es objeto de estudio en la investigación metabólica, principalmente en áreas como la regulación del peso corporal, la grasa hepática (hígado graso) y el control de la glucosa. Se suministra como vial de polvo liofilizado de 10 mg, destinado exclusivamente a investigación científica.'

  const getVariantImage = (variantName: string) => {
    if (isRetatrutide) {
      if (variantName.includes('5')) return '/kailab-images/RT5_Retatrutide_5mg_RENDER_WEB_UX_PREVIEW.png'
      if (variantName.includes('10')) return '/kailab-images/RT10_Retatrutide_10mg_RENDER_WEB_UX_PREVIEW.png'
    }
    return p.image ? urlFor(p.image).url() : ''
  }

  const getMainImage = () => {
    if (isRetatrutide) return '/kailab-images/RT10_Retatrutide_10mg_RENDER_WEB_UX_PREVIEW.png'
    return p.image ? urlFor(p.image).url() : undefined
  }

  const subtitle = isRetatrutide && (!p.subtitle || p.subtitle.includes('Exclusivamente para investigación'))
    ? defaultRetatrutideSubtitle
    : (p.subtitle || (isRetatrutide ? defaultRetatrutideSubtitle : undefined))

  const description = isRetatrutide && (!p.description || p.description.includes('Péptido en investigación que actúa sobre tres'))
    ? defaultRetatrutideDescription
    : (p.description || (isRetatrutide ? defaultRetatrutideDescription : undefined))

  return {
    id: p.sku || p._id,
    slug: mappedSlug,
    categorySlug: p.category?.slug?.current || '',
    category: p.category?.title || '',
    title: mappedTitle,
    subtitle: subtitle,
    description: description,
    features: p.features || [],
    shippingNotice: p.shippingNotice,
    includedItems: p.includedItems,
    fichaTecnica: p.fichaTecnica,
    reconstitucionText: p.reconstitucionText,
    lecturaCantidadesText: p.lecturaCantidadesText,
    dosisCalendarioText: p.dosisCalendarioText,
    dosisTables: p.dosisTables,
    experienciaUso: p.experienciaUso,
    preguntasFrecuentes: p.preguntasFrecuentes,
    evidenciaClinica: p.evidenciaClinica,
    infoAccordions: p.infoAccordions?.map(acc => ({ title: acc.title, contentHtml: acc.contentHtml, contentBlocks: acc.contentBlocks })) || [],
    lot: p.lot || '',
    purity: p.purity || '',
    formula: p.formula || '',
    badges: p.badges || [],
    variants: p.variants?.map(v => ({
      id: v._key,
      name: v.name,
      sku: v.sku,
      priceCOP: v.priceCOP,
      stock: v.inStock ? 10 : 0,
      coaStatus: v.coaStatus || 'available',
      image: v.image ? urlFor(v.image).url() : getVariantImage(v.name),
      slug: v.slug || v.name.toLowerCase().replace(/\s+/g, '')
    })) || [],
    priceCOP: p.priceCOP,
    presentation: p.presentation,
    concentration: p.concentration,
    stock: p.inStock ? 10 : 0,
    image: getMainImage(),
    images: p.images?.map((img: any) => urlFor(img).url()) || []
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const query = `*[_type == "product"] | order(_createdAt asc) {
      _id,
      title,
      slug,
      sku,
      subtitle,
      description,
      features,
      shippingNotice,
      includedItems,
      fichaTecnica,
      reconstitucionText,
      lecturaCantidadesText,
      dosisCalendarioText,
      dosisTables,
      experienciaUso,
      preguntasFrecuentes,
      evidenciaClinica,
      lot,
      formula,
      purity,
      badges,
      presentation,
      concentration,
      priceCOP,
      inStock,
      category->{title, slug},
      image,
      images,
      infoAccordions[]{
        _key,
        title,
        contentHtml,
        contentBlocks
      },
      variants[]{
        _key,
        name,
        slug,
        priceCOP,
        sku,
        inStock,
        coaStatus,
        image
      }
    }`
    const products = await sanityClient.fetch(query)
    return (products || []).map(mapSanityProductToProduct)
  } catch (error) {
    console.error('Error fetching products from Sanity:', error)
    return []
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const query = `*[_type == "product" && (slug.current == $slug || (slug.current in ["retatrutide", "retatrutida"] && $slug in ["retatrutide", "retatrutida"]))][0] {
      _id,
      title,
      slug,
      sku,
      subtitle,
      description,
      features,
      shippingNotice,
      includedItems,
      fichaTecnica,
      reconstitucionText,
      lecturaCantidadesText,
      dosisCalendarioText,
      dosisTables,
      experienciaUso,
      preguntasFrecuentes,
      evidenciaClinica,
      lot,
      formula,
      purity,
      badges,
      presentation,
      concentration,
      priceCOP,
      inStock,
      category->{title, slug},
      image,
      images,
      infoAccordions[]{
        _key,
        title,
        contentHtml,
        contentBlocks
      },
      variants[]{
        _key,
        name,
        slug,
        priceCOP,
        sku,
        inStock,
        coaStatus,
        image
      }
    }`
    const product = await sanityClient.fetch(query, { slug })
    return product ? mapSanityProductToProduct(product) : null
  } catch (error) {
    console.error(`Error fetching product ${slug} from Sanity:`, error)
    return null
  }
}

export interface GuidesPageData {
  headerTag?: string
  title?: string
  description?: string
  guidesList?: Array<{
    _key: string
    title?: string
    desc?: string
    link?: string
  }>
}

export async function getGuidesPage(): Promise<GuidesPageData | null> {
  try {
    const query = `*[_type == "guidesPage" && _id == "guidesPage"][0]`
    const data = await sanityClient.fetch(query)
    return data || null
  } catch (error) {
    console.error('Error fetching guidesPage from Sanity:', error)
    return null
  }
}

export interface QualityPageData {
  headerTag?: string
  title?: string
  description?: string
  reportName?: string
  status?: string
  statsList?: Array<{
    _key: string
    label?: string
    value?: string
  }>
}

export async function getQualityPage(): Promise<QualityPageData | null> {
  try {
    const query = `*[_type == "qualityPage" && _id == "qualityPage"][0]`
    const data = await sanityClient.fetch(query)
    return data || null
  } catch (error) {
    console.error('Error fetching qualityPage from Sanity:', error)
    return null
  }
}

export interface HelpPageData {
  headerTag?: string
  title?: string
  description?: string
  faqCategories?: Array<{
    _key: string
    label?: string
    items?: Array<{
      _key: string
      q?: string
      a?: string
    }>
  }>
  trustBadges?: Array<{
    _key: string
    title?: string
    desc?: string
  }>
}

export async function getHelpPage(): Promise<HelpPageData | null> {
  try {
    const query = `*[_type == "helpPage" && _id == "helpPage"][0]`
    const data = await sanityClient.fetch(query)
    return data || null
  } catch (error) {
    console.error('Error fetching helpPage from Sanity:', error)
    return null
  }
}
