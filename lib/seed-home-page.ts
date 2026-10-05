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
    const bgPath = path.resolve(process.cwd(), 'public/kailab-images/RT10_Retatrutide_10mg_RENDER_WEB_UX_PREVIEW.png')
    let bgAsset = null
    
    if (fs.existsSync(bgPath)) {
      console.log('Uploading hero background image...')
      const bgStream = fs.createReadStream(bgPath)
      bgAsset = await client.assets.upload('image', bgStream, {
        filename: 'RT10_Retatrutide_10mg_RENDER_WEB_UX_PREVIEW.png',
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
        titlePart1: 'Péptidos para investigación en',
        titlePart2: 'Colombia',
        subtitle: 'Conoce cada producto, elige su presentación y consulta la información práctica y los certificados de análisis disponibles.',
        ctaText: 'Ver productos',
        ctaLink: '/tienda',
        backgroundImage: bgAsset ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: bgAsset._id
          }
        } : undefined,
      },
      featuredProducts: {
        title: 'Nuestros productos'
      },
      whatsIncluded: {
        tag: 'Dotación de Envíos',
        title: 'Incluido con tu compra',
        description: 'Cada vial o kit de investigación se despacha con la dotación completa requerida para su reconstitución segura bajo estrictas normas de laboratorio.',
        items: [
          { _key: 'item1', name: 'Agua bacteriostática', icon: 'lucide:droplets' },
          { _key: 'item2', name: 'Toallitas con alcohol', icon: 'lucide:shield-plus' },
          { _key: 'item3', name: 'Acceso a la guía en línea', icon: 'lucide:book-open' },
          { _key: 'item4', name: 'Envío gratis a toda Colombia, en empaque discreto', icon: 'lucide:package-check' }
        ]
      },
      commitment: {
        title1: 'Compromiso con la seriedad',
        desc1: 'En KaiLab trabajamos bajo un enfoque serio y ordenado, priorizando la selección cuidadosa de cada compuesto, una gestión responsable de los pedidos y una comunicación clara en cada etapa del proceso.',
        desc2: 'Nuestro objetivo es ofrecer una experiencia confiable y transparente para quienes entienden el valor de un manejo riguroso en productos de investigación.',
        title2: 'Preguntas frecuentes',
        faq: [
          { _key: 'faq1', question: '¿Hacen envíos a toda Colombia?', answer: 'Sí. El envío es gratis a toda Colombia.' },
          { _key: 'faq2', question: '¿Dónde consulto el certificado de un producto?', answer: 'En la página del producto o en Calidad. Revisa la presentación y el lote indicados en el informe. Si no hay un certificado publicado, verás «Certificado pendiente».' },
          { _key: 'faq3', question: '¿Dónde encuentro la información de cada presentación?', answer: 'En la página del producto. Selecciona una presentación para consultar su precio, disponibilidad y documentación correspondiente.' },
          { _key: 'faq4', question: '¿Cómo puedo contactar a KAILAB?', answer: 'Escríbenos por WhatsApp al +57 302 304 1412 o a info@kailab.com.co.' }
        ],
        bannerPrefix: 'Uso exclusivo para investigación.',
        bannerText: 'La información del sitio es estrictamente informativa y no constituye en ningún caso asesoría médica.',
        bannerCtaText: 'Descubre cómo operamos',
        bannerCtaLink: '/ayuda'
      },
      quality: {
        headerTag: 'Laboratorio Analítico',
        title: 'Calidad que puedes consultar',
        description: 'Un certificado de análisis (COA) muestra los resultados de una muestra evaluada por un laboratorio. Consulta los informes disponibles y revisa el producto, la presentación y el lote de cada uno.',
        reportName: 'REPORTE_HPLC-MS.pdf',
        status: 'VERIFICADO',
        statsList: [
          { _key: 'stat1', label: 'Método de Ensayo', value: 'Cromatografía HPLC' },
          { _key: 'stat2', label: 'Pureza Analizada', value: '≥ 99.1%' },
          { _key: 'stat3', label: 'Trazabilidad', value: 'Código QR en vial' },
          { _key: 'stat4', label: 'Firma Digital', value: '0x3F9A...B8C2' },
        ]
      },
      guides: {
        headerTag: 'Recursos Técnicos',
        title: 'Guías prácticas',
        description: 'Explicaciones paso a paso para entender la información de cada producto.',
        guidesList: [
          { _key: 'guide1', title: 'Cómo leer un certificado de análisis', desc: 'Aprende a ubicar el producto, el lote y los resultados en un informe real, y a distinguir cantidad de pureza.' }
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
