import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { products } from '../components/kailab/data'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'gez5k84y',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

async function uploadImage(imagePath: string) {
  if (!imagePath) return undefined
  try {
    // Remove leading slash if present for path joining
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
    const absolutePath = path.resolve(process.cwd(), 'public', cleanPath)
    if (!fs.existsSync(absolutePath)) {
      console.warn(`[Warning] Image not found: ${absolutePath}`)
      return undefined
    }
    const buffer = fs.readFileSync(absolutePath)
    const asset = await client.assets.upload('image', buffer, {
      filename: path.basename(absolutePath)
    })
    console.log(`Uploaded image ${imagePath} -> ${asset._id}`)
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    }
  } catch (err) {
    console.error(`Failed to upload image: ${imagePath}`, err)
    return undefined
  }
}

async function seedStore() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('Error: SANITY_API_TOKEN is missing in .env.local')
    process.exit(1)
  }

  console.log('--- Starting Store Migration ---')

  // 1. Collect Categories
  const categoryMap = new Map<string, string>() // slug -> Sanity ID
  const uniqueCategories = Array.from(new Set(products.map(p => p.category)))
  
  for (const catName of uniqueCategories) {
    const slug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    
    // Check if category exists
    const existing = await client.fetch(`*[_type == "category" && slug.current == $slug][0]`, { slug })
    if (existing) {
      console.log(`Category exists: ${catName} (${existing._id})`)
      categoryMap.set(catName, existing._id)
    } else {
      console.log(`Creating category: ${catName}`)
      const doc = await client.create({
        _type: 'category',
        title: catName,
        slug: { _type: 'slug', current: slug },
        description: `Categoría para ${catName}`
      })
      categoryMap.set(catName, doc._id)
    }
  }

  // 2. Upload or Update Products
  for (const product of products) {
    console.log(`Processing product: ${product.title}`)
    
    // Check if product already exists
    const existingProduct = await client.fetch(`*[_type == "product" && slug.current == $slug][0]`, { slug: product.slug })
    
    // Inject missing presentation and concentration for specific products with variants
    let presentation = product.presentation
    let concentration = product.concentration

    if (product.slug === 'agua-bacteriostatica-3ml') {
      presentation = 'Vial líquido'
      concentration = '3 ml'
    } else if (product.slug === 'retatrutide') {
      presentation = 'Vial liofilizado'
      concentration = 'Varias (5 mg / 10 mg)'
    }

    if (existingProduct) {
      if (product.slug === 'agua-bacteriostatica-3ml' || product.slug === 'retatrutide') {
        console.log(`Updating presentation and concentration for: ${product.title}`)
        await client.patch(existingProduct._id).set({ presentation, concentration }).commit()
        console.log(`✅ Updated ${product.title}`)
      } else {
        console.log(`Product already exists: ${product.title}, skipping.`)
      }
      continue
    }

    // Upload Main Image
    const mainImageAsset = await uploadImage(product.image || '')
    
    // Upload secondary images if any
    let secondaryImageAssets: any[] | undefined = undefined
    if (product.images && product.images.length > 0) {
      secondaryImageAssets = []
      let imgIndex = 0
      for (const img of product.images) {
        const asset = await uploadImage(img)
        if (asset) {
          secondaryImageAssets.push({ ...asset, _key: `img-${imgIndex}` })
          imgIndex++
        }
      }
    }

    // Get category reference
    const categoryId = categoryMap.get(product.category)

    // Construct Product Document
    const productDoc = {
      _type: 'product',
      title: product.title,
      slug: { _type: 'slug', current: product.slug },
      sku: product.id,
      subtitle: product.subtitle,
      description: product.description,
      features: product.features,
      lot: product.lot,
      formula: product.formula,
      purity: product.purity,
      badges: product.badges,
      presentation: presentation,
      concentration: concentration,
      priceCOP: product.priceCOP || 0,
      inStock: product.stock !== undefined ? product.stock > 0 : true,
      category: categoryId ? { _type: 'reference', _ref: categoryId } : undefined,
      image: mainImageAsset,
      images: secondaryImageAssets,
      infoAccordions: product.infoAccordions?.map((acc, index) => ({
        _key: `accordion-${index}`,
        _type: 'object',
        title: acc.title,
        contentHtml: acc.contentHtml
      })),
      variants: product.variants?.map(v => ({
        _key: v.id,
        name: v.name,
        priceCOP: v.priceCOP,
        sku: v.sku,
        inStock: v.stock > 0
      }))
    }

    const created = await client.create(productDoc)
    console.log(`✅ Created Product: ${created.title} (${created._id})`)
  }

  console.log('--- Migration Complete ---')
}

seedStore().catch(err => {
  console.error('Migration failed:', err)
  process.exit(1)
})
