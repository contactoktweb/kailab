import { sanityClient } from './sanity-client'

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
