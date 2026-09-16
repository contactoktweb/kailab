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
  const seen = new Set<string>()
  const duplicates: string[] = []

  products.forEach((p: any) => {
    console.log(`- ${p.title} (${p.sku}) [ID: ${p._id}]`)
    const key = p.title?.toLowerCase()
    if (seen.has(key)) {
      console.log(`  -> DUPLICADO ENCONTRADO: ${p.title}`)
      duplicates.push(p._id)
    } else {
      seen.add(key)
    }
  })

  if (duplicates.length > 0) {
    console.log(`\nBorrando ${duplicates.length} duplicados...`)
    for (const id of duplicates) {
      await client.delete(id)
      console.log(`Borrando documento ID: ${id}`)
    }
    console.log('Duplicados eliminados exitosamente.')
  } else {
    console.log('\nNo se encontraron duplicados.')
  }
}

main().catch(console.error)
