import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
import { randomKey } from '@sanity/util/content'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'gezrmjqh',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

async function fixKeys() {
  console.log('--- Buscando productos sin _key en infoAccordions o imágenes ---')
  const products = await client.fetch(`*[_type == "product" && (defined(infoAccordions) || defined(images))]`)

  for (const p of products) {
    let needsUpdate = false
    let patch = client.patch(p._id)

    if (p.infoAccordions) {
      const updatedAccordions = p.infoAccordions.map((acc: any, index: number) => {
        if (!acc._key) {
          needsUpdate = true
          return { ...acc, _key: `acc-${p._id}-${index}` }
        }
        return acc
      })
      if (needsUpdate) patch = patch.set({ infoAccordions: updatedAccordions })
    }

    if (p.images) {
      const updatedImages = p.images.map((img: any, index: number) => {
        if (!img._key) {
          needsUpdate = true
          return { ...img, _key: `img-${p._id}-${index}` }
        }
        return img
      })
      if (needsUpdate) patch = patch.set({ images: updatedImages })
    }

    if (needsUpdate) {
      console.log(`Corrigiendo _key para: ${p.title}`)
      await patch.commit()
    }
  }
  console.log('✅ Corrección de llaves terminada.')
}

fixKeys().catch(console.error)
