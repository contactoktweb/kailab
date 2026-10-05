import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'gezrmjqh',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

async function seedSettings() {
  console.log('Seeding site settings...')
  
  try {
    // 1. Upload logo
    const logoPath = path.resolve(process.cwd(), 'public/KAILAB_Logo_White.png')
    let logoAsset = null
    
    if (fs.existsSync(logoPath)) {
      console.log('Uploading logo...')
      const logoStream = fs.createReadStream(logoPath)
      logoAsset = await client.assets.upload('image', logoStream, {
        filename: 'KAILAB_Logo_White.png',
      })
      console.log('Logo uploaded:', logoAsset._id)
    } else {
      console.log('Logo not found at', logoPath)
    }

    // 2. Create the document
    const settingsDoc = {
      _id: 'siteSettings', // Use a fixed ID so it acts as a singleton
      _type: 'siteSettings',
      siteName: 'KAILAB',
      logo: logoAsset ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: logoAsset._id
        }
      } : undefined,
      email: 'info@kailab.com.co',
      phone: '3023041412',
      address: 'Bogotá, Colombia',
      workingHours: 'Lunes a Viernes 8:00 AM - 5:00 PM',
      socialLinks: [
        {
          _key: 'whatsapp',
          platform: 'WhatsApp',
          url: 'https://wa.me/573023041412'
        }
      ],
      description: 'Información clara sobre péptidos para investigación.',
      footerNotice: 'Exclusivamente para investigación. No destinado a uso humano ni veterinario.'
    }

    console.log('Creating or updating document in Sanity...')
    const result = await client.createOrReplace(settingsDoc)
    console.log('Done! Document ID:', result._id)
  } catch (err) {
    console.error('Error seeding site settings:', err)
  }
}

seedSettings()
