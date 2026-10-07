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
    console.log(`Processing product: ${product.title} (slug: ${product.slug})`)
    
    // Check if product already exists (by slug or sku or retatrutide aliases)
    const existingProduct = await client.fetch(
      `*[_type == "product" && (slug.current == $slug || sku == $sku || (slug.current in ["retatrutide", "retatrutida"] && $slug in ["retatrutide", "retatrutida"]))][0]`,
      { slug: product.slug, sku: product.id }
    )
    
    let presentation = product.presentation
    let concentration = product.concentration

    if (product.slug === 'agua-bacteriostatica-3ml') {
      presentation = presentation || 'Vial líquido'
      concentration = concentration || '3 ml'
    } else if (product.slug === 'retatrutida' || product.slug === 'retatrutide') {
      presentation = presentation || 'Vial liofilizado'
      concentration = concentration || 'Varias (5 mg / 10 mg)'
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
      features: product.features || [],
      shippingNotice: product.shippingNotice || 'Agua bacteriostática incluida · Envío gratis a toda Colombia',
      includedItems: product.includedItems || [
        'Agua bacteriostática.',
        'Toallitas con alcohol.',
        'Información práctica en línea.',
        'Envío gratis a toda Colombia, en empaque discreto.'
      ],
      lot: product.lot,
      formula: product.formula,
      purity: product.purity,
      badges: product.badges || [],
      presentation: presentation,
      concentration: concentration,
      priceCOP: product.priceCOP || 0,
      inStock: product.stock !== undefined ? product.stock > 0 : true,
      category: categoryId ? { _type: 'reference', _ref: categoryId } : undefined,
      image: mainImageAsset,
      images: secondaryImageAssets,
      fichaTecnica: product.fichaTecnica ? {
        title: product.fichaTecnica.title || 'Introducción al péptido',
        items: product.fichaTecnica.items?.map((item, index) => ({
          _key: `ft-item-${index}`,
          question: item.question,
          answer: item.answer,
        })) || []
      } : undefined,
      reconstitucionText: product.reconstitucionText || 'Reconstituir significa agregar agua bacteriostática al polvo liofilizado (el polvo seco que viene dentro del vial) para convertirlo en una solución lista para usar. Los péptidos se venden en polvo porque así se mantienen estables por más tiempo.',
      lecturaCantidadesText: product.lecturaCantidadesText || 'mg: cantidad de péptido | mL: volumen de líquido | mg/mL: concentración resultante',
      dosisCalendarioText: product.dosisCalendarioText || 'Aplicación una vez por semana, siempre el mismo día. El esquema de referencia sigue el aumento gradual usado en el estudio clínico de fase 2 del retatrutide (NEJM, 2023). Subir la dosis poco a poco ayuda a reducir efectos como náuseas o malestar digestivo. Si aparecen molestias, lo recomendable es mantener la dosis actual más tiempo antes de subir.',
      dosisTables: product.dosisTables?.map((table, tIdx) => ({
        _key: `dt-table-${tIdx}`,
        presentationId: table.presentationId,
        title: table.title,
        badge: table.badge,
        instruction: table.instruction,
        rows: table.rows?.map((row, rIdx) => ({
          _key: `dt-row-${rIdx}`,
          week: row.week,
          dose: row.dose,
          units: row.units
        })) || []
      })),
      experienciaUso: product.experienciaUso ? {
        badge: product.experienciaUso.badge || 'Experiencia de uso',
        title: product.experienciaUso.title || 'Consejos Prácticos',
        tips: product.experienciaUso.tips?.map((tip, idx) => ({
          _key: `tip-${idx}`,
          title: tip.title,
          desc: tip.desc
        })) || []
      } : undefined,
      preguntasFrecuentes: product.preguntasFrecuentes ? {
        badge: product.preguntasFrecuentes.badge || 'Resolución de dudas',
        title: product.preguntasFrecuentes.title || 'Preguntas Frecuentes',
        items: product.preguntasFrecuentes.items?.map((item, idx) => ({
          _key: `faq-${idx}`,
          q: item.q?.replace(/<[^>]*>/g, ''),
          a: item.a?.replace(/<[^>]*>/g, '')
        })) || []
      } : undefined,
      evidenciaClinica: product.evidenciaClinica ? {
        badge: product.evidenciaClinica.badge || 'Evidencia Clínica',
        title: product.evidenciaClinica.title || '¿Qué dicen los estudios?',
        description: product.evidenciaClinica.description,
        studies: product.evidenciaClinica.studies?.map((st, sIdx) => ({
          _key: `study-${sIdx}`,
          tag: st.tag,
          title: st.title,
          description1: st.description1,
          description2: st.description2,
          links: st.links?.map((lk, lIdx) => ({
            _key: `st-lk-${lIdx}`,
            text: lk.text,
            url: lk.url
          })) || []
        })) || [],
        disclaimerTitle: product.evidenciaClinica.disclaimerTitle || 'Cómo interpretar estos datos',
        disclaimerPoints: product.evidenciaClinica.disclaimerPoints || [],
        sourcesTitle: product.evidenciaClinica.sourcesTitle || 'Fuentes científicas',
        sourcesSubtitle: product.evidenciaClinica.sourcesSubtitle || 'Consulta las publicaciones sobre la investigación de la retatrutida.',
        sources: product.evidenciaClinica.sources?.map((sc, scIdx) => ({
          _key: `sc-${scIdx}`,
          text: sc.text,
          url: sc.url
        })) || []
      } : undefined,
      variants: await Promise.all((product.variants || []).map(async v => {
        const variantImageAsset = await uploadImage(v.image || '')
        return {
          _key: v.id,
          name: v.name,
          slug: v.slug,
          priceCOP: v.priceCOP,
          sku: v.sku,
          inStock: v.stock > 0,
          coaStatus: v.coaStatus,
          image: variantImageAsset
        }
      }))
    }

    if (existingProduct) {
      await client.patch(existingProduct._id).set(productDoc).commit()
      console.log(`✅ Updated Product: ${product.title} (${existingProduct._id})`)
    } else {
      const created = await client.create(productDoc)
      console.log(`✅ Created Product: ${created.title} (${created._id})`)
    }
  }

  console.log('--- Migration Complete ---')
}

seedStore().catch(err => {
  console.error('Migration failed:', err)
  process.exit(1)
})
