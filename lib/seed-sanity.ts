import { sanityClient } from './sanity-client'

export async function seedSiteSettings() {
  const doc = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: 'KAILAB · Péptidos de Investigación',
    email: 'contacto@kailab.co',
    phone: '+57 300 000 0000',
    address: 'Medellín, Colombia',
    workingHours: 'Lunes a Viernes: 8:00 AM - 5:00 PM',
    footerNotice: '© KAILAB · Productos de Uso Exclusivo para Investigación (RUO). Prohibido el consumo humano.',
    socialLinks: [
      {
        _key: 'whatsapp-key-1',
        platform: 'WhatsApp',
        url: 'https://wa.me/573000000000',
      },
      {
        _key: 'instagram-key-2',
        platform: 'Instagram',
        url: 'https://instagram.com/kailab_co',
      },
      {
        _key: 'linkedin-key-3',
        platform: 'LinkedIn',
        url: 'https://linkedin.com/company/kailab',
      },
    ],
  }

  try {
    const res = await sanityClient.createOrReplace(doc)
    console.log('✅ Site settings seeded to Sanity successfully:', res._id)
    return res
  } catch (err) {
    console.error('❌ Error seeding Site Settings to Sanity:', err)
  }
}
