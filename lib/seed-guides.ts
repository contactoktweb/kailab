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
  console.log('--- Subiendo contenido de Guías a Sanity ---')
  
  if (!process.env.SANITY_API_TOKEN) {
    console.error('ERROR: No se encontró SANITY_API_TOKEN en .env.local')
    process.exit(1)
  }

  const guidesPageData = {
    _id: 'guidesPage',
    _type: 'guidesPage',
    headerTag: 'Recursos Técnicos',
    headerIcon: 'lucide:book-open-check',
    title: 'Protocolos\nRUO',
    description: 'Documentación y herramientas de análisis diseñadas exclusivamente para uso en investigación de laboratorio.',
    guidesList: [
      {
        _key: 'guide-1',
        _type: 'object',
        title: 'Calculadora de Reconstitución',
        desc: 'Herramienta interactiva para determinar concentraciones exactas según el volumen de disolvente.',
        icon: 'lucide:calculator',
        link: '#guias'
      },
      {
        _key: 'guide-2',
        _type: 'object',
        title: 'Guía de Conservación Térmica',
        desc: 'Protocolos de almacenamiento en cadena de frío para preservación de enlaces peptídicos.',
        icon: 'lucide:thermometer-snowflake',
        link: '#guias'
      },
      {
        _key: 'guide-3',
        _type: 'object',
        title: 'Interpretación de HPLC-MS',
        desc: 'Manual técnico para leer e interpretar certificados de espectrometría de masas y pureza.',
        icon: 'lucide:bar-chart-2',
        link: '#guias'
      }
    ]
  }

  try {
    const result = await client.createOrReplace(guidesPageData)
    console.log(`✅ Página de Guías subida exitosamente con ID: ${result._id}`)
  } catch (error) {
    console.error('❌ Error al subir la página de guías:', error)
  }

  console.log('--- Proceso terminado ---')
}

main().catch(console.error)
