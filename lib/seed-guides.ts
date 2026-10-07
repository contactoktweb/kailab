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
    headerTag: 'Recursos',
    title: 'Guías Prácticas',
    description: 'Explicaciones claras para entender la información de los productos y aprender a consultar su documentación y certificados de análisis.',
    guideTitle: 'Cómo leer un certificado de análisis',
    guideDescription: 'Empieza por el producto y el lote. Después revisa quién realizó el análisis, cuándo se hizo y qué resultados aparecen. La cantidad en miligramos y el porcentaje de pureza son datos distintos.',
    exampleBlock: {
      title: 'Un ejemplo real',
      description: 'Usaremos el informe n.º 223529 de Janoshik, correspondiente a una muestra identificada en el documento como Retatrutide 10 mg, lote 317558. Este ejemplo explica cómo leer ese informe; sus resultados corresponden a la muestra analizada.'
    },
    steps: [
      {
        _key: 'step-n1',
        _type: 'stepNormal',
        title: 'Identifica la muestra y el lote',
        description: 'Busca el nombre, la presentación declarada y el número de lote. Estos datos identifican qué muestra se envió al laboratorio. El nombre escrito en el informe no sustituye la lectura de las pruebas realizadas.'
      },
      {
        _key: 'step-n2',
        _type: 'stepNormal',
        title: 'Revisa el laboratorio y la fecha',
        description: 'Comprueba quién emitió el informe y cuándo se realizó el análisis. La fecha del análisis no es una fecha de vencimiento.'
      },
      {
        _key: 'step-t3',
        _type: 'stepWithTable',
        title: 'Distingue cantidad y pureza',
        description: 'Cada resultado responde una pregunta diferente. Un porcentaje alto de pureza no reemplaza la medición de cantidad ni otros análisis.',
        table: [
          {
            _key: 'row-1',
            label: 'Presentación declarada',
            value: '10 mg',
            explanation: 'Identifica la presentación de la muestra.'
          },
          {
            _key: 'row-2',
            label: 'Cantidad medida',
            value: '10,74 mg',
            explanation: 'Es la cantidad reportada por el análisis.'
          },
          {
            _key: 'row-3',
            label: 'Pureza por HPLC',
            value: '99,191 %',
            explanation: 'Es un porcentaje de área; no indica los miligramos del vial.'
          }
        ],
        tableNote: 'Cada resultado responde una pregunta diferente. Un porcentaje alto de pureza no reemplaza la medición de cantidad ni otros análisis.'
      },
      {
        _key: 'step-n4',
        _type: 'stepNormal',
        title: 'Reconoce la gráfica',
        description: 'En el cromatograma disponible abajo verás señales registradas durante la separación de la muestra. El eje de tiempo indica cuándo aparecen y los picos muestran las señales detectadas. El porcentaje de pureza por área se calcula comparando las áreas de los picos, no solo su altura.'
      },
      {
        _key: 'step-b5',
        _type: 'stepWithButtons',
        title: 'Abre el informe completo',
        description: 'Abre el certificado y el cromatograma. Revisa el número de informe, la muestra, el lote y los resultados. El análisis de una muestra no significa que se haya examinado cada vial del lote.',
        buttons: [
          {
            _key: 'btn-1',
            label: 'Abrir certificado',
            url: '/certificados/RT10_Janoshik_223529_Certificado.png'
          },
          {
            _key: 'btn-2',
            label: 'Ver cromatograma (PDF)',
            url: '/certificados/RT10_Janoshik_223529_Informe.pdf'
          }
        ]
      }
    ],
    wantToKnowMore: {
      title: '¿Quieres saber más?',
      description: 'En Calidad encontrarás una explicación de las técnicas utilizadas y de lo que puede decirte cada resultado.',
      buttonLabel: 'Ver Calidad',
      buttonUrl: '/calidad'
    },
    bottomLinks: [
      {
        _key: 'link-1',
        title: 'Tienda',
        description: 'Ver nuestros productos',
        url: '/tienda'
      },
      {
        _key: 'link-2',
        title: 'Ayuda',
        description: 'Preguntas y contacto',
        url: '/ayuda'
      }
    ]
  }

  try {
    // Eliminar el borrador si existe, para que no interfiera con los datos nuevos
    await client.delete('drafts.guidesPage').catch(() => {
      console.log('No había borrador previo, continuando...')
    })

    const result = await client.createOrReplace(guidesPageData)
    console.log(`✅ Página de Guías subida exitosamente con ID: ${result._id}`)
  } catch (error) {
    console.error('❌ Error al subir la página de guías:', error)
  }

  console.log('--- Proceso terminado ---')
}

main().catch(console.error)
