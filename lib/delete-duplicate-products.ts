import { createClient } from 'next-sanity'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'c0471c26',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function main() {
  const query = `*[_type == "product"]{ _id, title, slug, sku }`
  const products = await client.fetch(query)
  
  console.log('--- Productos Actuales ---')
  const toDelete: string[] = []

  products.forEach((p: any) => {
    console.log(`- ${p.title} (${p.slug?.current}) [ID: ${p._id}]`)
    if (p.slug?.current !== 'retatrutida' && p.slug?.current !== 'retatrutide') {
      toDelete.push(p._id)
    }
  })

  if (toDelete.length > 0) {
    console.log(`\nBorrando ${toDelete.length} productos (no son Retatrutida)...`)
    for (const id of toDelete) {
      await client.delete(id)
      console.log(`Borrando documento ID: ${id}`)
    }
    console.log('Productos eliminados exitosamente.')
  } else {
    console.log('\nNo hay productos adicionales para borrar.')
  }
}

main().catch(console.error)
