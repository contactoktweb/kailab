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
  console.log('--- Subiendo contenido de Calidad a Sanity ---')
  
  if (!process.env.SANITY_API_TOKEN) {
    console.error('ERROR: No se encontró SANITY_API_TOKEN en .env.local')
    process.exit(1)
  }

  const qualityPageData = {
    _id: 'qualityPage',
    _type: 'qualityPage',
    headerTag: 'Laboratorio Analítico',
    title: 'Calidad y COA\nPor Lote',
    description: 'La pureza no se asume, se demuestra. Cada lote que distribuimos cuenta con un Certificado de Análisis (COA) emitido por laboratorios independientes. Validamos la integridad molecular antes de cualquier despacho.',
    linkText: 'Ver reporte de ejemplo',
    linkUrl: '#calidad',
    reportName: 'REPORTE_HPLC-MS.pdf',
    status: 'VERIFICADO',
    statsList: [
      {
        _key: 'stat-1',
        _type: 'object',
        label: 'Método de Ensayo',
        value: 'Cromatografía HPLC'
      },
      {
        _key: 'stat-2',
        _type: 'object',
        label: 'Pureza Analizada',
        value: '≥ 99.1%'
      },
      {
        _key: 'stat-3',
        _type: 'object',
        label: 'Trazabilidad',
        value: 'Código QR en vial'
      },
      {
        _key: 'stat-4',
        _type: 'object',
        label: 'Firma Digital',
        value: '0x3F9A...B8C2'
      }
    ]
  }

  try {
    const result = await client.createOrReplace(qualityPageData)
    console.log(`✅ Página de Calidad subida exitosamente con ID: ${result._id}`)
  } catch (error) {
    console.error('❌ Error al subir la página de calidad:', error)
  }

  console.log('--- Proceso terminado ---')
}

main().catch(console.error)
