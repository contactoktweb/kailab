import { createClient } from 'next-sanity'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'gezrmjqh',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

async function seedStorePage() {
  console.log('🌱 Creando/Actualizando configuración de la Tienda...')

  const storePageDoc = {
    _type: 'storePage',
    _id: 'storePage',
    title: 'Catálogo Completo de Productos',
    subtitle: 'Explora nuestra selección completa de péptidos y compuestos liofilizados de alta pureza.',
  }

  try {
    const result = await client.createOrReplace(storePageDoc)
    console.log('✅ Configuración de Tienda actualizada:', result._id)
  } catch (error) {
    console.error('❌ Error actualizando Configuración de Tienda:', error)
  }
}

seedStorePage()
