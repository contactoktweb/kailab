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

async function seedHomePage() {
  console.log('Seeding Home Page...')
  
  try {
    // 1. Upload hero background image
    const bgPath = path.resolve(process.cwd(), 'public/kailab-images/hero-image.png')
    let bgAsset = null
    
    if (fs.existsSync(bgPath)) {
      console.log('Uploading hero background image...')
      const bgStream = fs.createReadStream(bgPath)
      bgAsset = await client.assets.upload('image', bgStream, {
        filename: 'hero-image.png',
      })
      console.log('Background uploaded:', bgAsset._id)
    } else {
      console.log('Hero background not found at', bgPath)
    }

    // 2. Create the document
    const homeDoc = {
      _id: 'homePage', // Fixed ID so it acts as a singleton
      _type: 'homePage',
      hero: {
        titlePart1: 'Péptidos de',
        titlePart2: 'Investigación',
        subtitle: 'Compuestos científicos de alta pureza para uso profesional. Resultados analíticos verificables con transparencia radical para laboratorios.',
        ctaText: 'Explora nuestros productos',
        ctaLink: '#catalogo',
        backgroundImage: bgAsset ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: bgAsset._id
          }
        } : undefined,
      },
      featuredProducts: {
        title: 'Productos Destacados',
        subtitle: 'Nuestra selección destacada de péptidos y compuestos liofilizados de alta pureza.',
        products: []
      },
      whatsIncluded: {
        tag: 'Dotación de Envíos',
        title: 'Equipamiento Incluido',
        description: 'Cada vial o kit de investigación se despacha con la dotación completa requerida para su reconstitución segura bajo estrictas normas de laboratorio.',
        items: [
          { _key: 'item1', name: 'Solución Reconstituyente', desc: 'Agua bacteriostática grado USP (10ml o 30ml).', icon: 'lucide:droplets' },
          { _key: 'item2', name: 'Instrumental Analítico', desc: 'Jeringas estériles U-100 para dosificación precisa.', icon: 'lucide:syringe' },
          { _key: 'item3', name: 'Kit de Asepsia', desc: 'Almohadillas impregnadas en alcohol isopropílico (70%).', icon: 'lucide:shield-plus' },
          { _key: 'item4', name: 'Cadena de Custodia', desc: 'Estuche térmico protector de poliestireno (según envío).', icon: 'lucide:box' }
        ]
      },
      commitment: {
        title1: 'Compromiso con la seriedad',
        desc1: 'En KaiLab trabajamos bajo un enfoque serio y ordenado, priorizando la selección cuidadosa de cada compuesto, una gestión responsable de los pedidos y una comunicación clara en cada etapa del proceso.',
        desc2: 'Nuestro objetivo es ofrecer una experiencia confiable y transparente para quienes entienden el valor de un manejo riguroso en productos de investigación.',
        title2: 'Envíos rápidos y seguros',
        subtitle2: 'Entregas eficientes a nivel nacional, con empaque profesional.',
        faq: [
          { _key: 'faq1', question: '¿A qué ciudades realizan envíos?', answer: 'Realizamos envíos a nivel nacional, cubriendo las principales ciudades y municipios de Colombia.' },
          { _key: 'faq2', question: '¿Cuáles son los tiempos de entrega?', answer: 'En las principales ciudades la entrega suele hacerse al siguiente día hábil. En otras ciudades y municipios, entre 2 y 3 días hábiles.' },
          { _key: 'faq3', question: '¿Los envíos son discretos?', answer: 'Sí. Todos los pedidos se despachan en empaque discreto y profesional, sin referencias visibles al contenido ni a la tienda.' },
          { _key: 'faq4', question: '¿Cómo puedo hacer seguimiento a mi pedido?', answer: 'Una vez confirmado el envío, recibirás la información de seguimiento para monitorear el estado de tu pedido hasta la entrega.' }
        ]
      }
    }

    console.log('Creating or updating homePage in Sanity...')
    const result = await client.createOrReplace(homeDoc)
    console.log('Done! Document ID:', result._id)
  } catch (err) {
    console.error('Error seeding home page:', err)
  }
}

seedHomePage()
