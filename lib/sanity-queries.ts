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
  }
}

export async function getHomePage(): Promise<HomePageData | null> {
  try {
    const query = `*[_type == "homePage" && _id == "homePage"][0]{
      hero,
      featuredProducts,
      whatsIncluded,
      commitment
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
    contentHtml: string
  }>
  variants?: Array<{
    _key: string
    name: string
    priceCOP: number
    sku: string
    inStock: boolean
  }>
}

function mapSanityProductToProduct(p: SanityProduct): Product {
  return {
    id: p.sku || p._id,
    slug: p.slug?.current || '',
    categorySlug: p.category?.slug?.current || '',
    category: p.category?.title || '',
    title: p.title || '',
    subtitle: p.subtitle,
    description: p.description,
    features: p.features || [],
    infoAccordions: p.infoAccordions?.map(acc => ({ title: acc.title, contentHtml: acc.contentHtml })) || [],
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
      coaStatus: 'available',
      image: p.image ? urlFor(p.image).url() : '',
      slug: v.name.toLowerCase().replace(/\s+/g, '-')
    })) || [],
    priceCOP: p.priceCOP,
    presentation: p.presentation,
    concentration: p.concentration,
    stock: p.inStock ? 10 : 0,
    image: p.image ? urlFor(p.image).url() : undefined,
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
      infoAccordions,
      variants
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
    const query = `*[_type == "product" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      sku,
      subtitle,
      description,
      features,
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
      infoAccordions,
      variants
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
