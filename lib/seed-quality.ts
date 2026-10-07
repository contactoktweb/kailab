import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
import path from 'path'

// Cargar variables de entorno desde .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

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
    console.error('❌ ERROR: Falta SANITY_API_TOKEN en .env.local')
    console.log('Por favor, añade el token para poder escribir en Sanity.')
    process.exit(1)
  }

  const qualityPageData = {
    _id: 'qualityPage',
    _type: 'qualityPage',
    headerTag: 'Verificación Independiente',
    title: 'Calidad y certificados de análisis',
    description: 'Un certificado de análisis (COA) muestra los resultados de una muestra evaluada por un laboratorio independiente. Consulta los informes disponibles y revisa el producto, la presentación y el lote de cada uno.',
    searchSection: {
      title: 'Encuentra un certificado',
      label: 'Buscar certificados',
      placeholder: 'Producto, lote o informe',
      buttonLabel: 'Buscar',
      helpText: 'También puedes buscar por laboratorio o número de informe.'
    },
    listSection: {
      title: 'Certificados disponibles',
      description: 'Abre un certificado para consultar el informe completo y los datos del lote.',
      loteLabel: 'Lote',
      labLabel: 'Laboratorio',
      dateLabel: 'Fecha Análisis',
      btnDetail: 'Ver detalle',
      btnProduct: 'Ver producto',
      certificates: [
        {
          _key: 'cert-1',
          id: 'janoshik-223529',
          product: 'Retatrutida 10 mg',
          lote: '317558',
          laboratorio: 'Janoshik',
          fecha: 'ago 24, 2026',
          estado: 'Lote vigente',
          informe: '223529',
          enlaceProducto: '/tienda/metabolico/retatrutida/10mg/',
          cantidadMedida: '10,74 mg',
          pureza: '99,191 %',
          alcance: 'Informe correspondiente a muestra de **Retatrutida 10 mg** (lote 317558), analizada por **Janoshik**. Reporta 10,74 mg y pureza de 99,191 %.',
          pdfUrl: '/certificados/RT10_Janoshik_223529_Informe.pdf'
        }
      ]
    },
    detailSection: {
      title: 'Certificados y lotes',
      description: 'Informes publicados y resultados del lote seleccionado.',
      resultsTitle: 'Resultados del análisis',
      amountLabel: 'Cantidad medida',
      purityLabel: 'Pureza por HPLC',
      scopeTitle: 'Alcance del análisis',
      btnProduct: 'Ver producto',
      btnOpen: 'Abrir certificado',
      btnPdf: 'Ver cromatograma (PDF)',
      emptyStateText: 'Selecciona un certificado de la lista para ver su detalle aquí.'
    },
    verificationSection: {
      tag: 'Proceso de Verificación',
      title: 'Cómo revisar un certificado',
      description: 'Tres pasos interactivos para comprobar la autenticidad, trazabilidad y precisión analítica de cada informe.',
      steps: [
        {
          _key: 'step-1',
          stepLabel: 'PASO 1 / 3',
          title: 'Ubica la presentación y el lote',
          description: 'Revisa que el nombre del producto, la dosis declarada y el código impreso en el vial coincidan con el documento.',
          widgetMainText: 'LOTE #317558',
          widgetBadgeText: '100% MATCH',
          footerText: 'Etiqueta vs Informe'
        },
        {
          _key: 'step-2',
          stepLabel: 'PASO 2 / 3',
          title: 'Abre e inspecciona el informe',
          description: 'Comprueba quién emitió el informe (ej. Janoshik Analytical), la fecha de ensayo y la firma de autenticidad.',
          widgetMainText: 'JANOSHIK #223529',
          widgetBadgeText: 'VALIDADO',
          footerText: 'Laboratorio Externo'
        },
        {
          _key: 'step-3',
          stepLabel: 'PASO 3 / 3',
          title: 'Compara los datos analíticos',
          description: 'Distingue el porcentaje de pureza HPLC (área pico) de la masa real del compuesto medida en miligramos.',
          widgetMainText: 'HPLC 99.19%',
          widgetBadgeText: '10.74 mg',
          footerText: 'Pureza vs Contenido'
        }
      ]
    },
    metricsSection: {
      tag: 'Métricas Analíticas',
      title: 'Qué puede decirte un análisis',
      description: 'En los certificados de péptidos suelen aparecer tres datos principales: identidad, pureza y cantidad. Cada uno responde una pregunta científica distinta.',
      metrics: [
        {
          _key: 'metric-1',
          tag: 'LC-MS',
          title: 'Identidad',
          description: 'Indica qué compuesto identificó el laboratorio al comparar la masa molecular y estructura de la muestra con el estándar de referencia. Responde a la pregunta: ¿qué compuesto es realmente?',
          widgetTitle: 'ESTRUCTURA MS',
          widgetBadge: 'COINCIDENTE'
        },
        {
          _key: 'metric-2',
          tag: 'HPLC',
          title: 'Pureza',
          description: 'Compara la señal del compuesto con otras señales registradas en el equipo. Se expresa como porcentaje de área. Responde a la pregunta: ¿qué tanto predomina frente a impurezas?',
          widgetTitle: 'ÁREA HPLC',
          widgetBadge: '≥ 99.0%'
        },
        {
          _key: 'metric-3',
          tag: 'MEDICIÓN',
          title: 'Cantidad',
          description: 'Indica la cantidad exacta medida en el vial (en miligramos). Es un resultado independiente del porcentaje de pureza. Responde a la pregunta: ¿cuánto compuesto activo hay?',
          widgetTitle: 'MASA NETA',
          widgetBadge: '10.74 mg',
          widgetSubtext1: 'Objetivo: 10.0 mg',
          widgetSubtext2: '+0.74 mg'
        }
      ],
      guideLinkLabel: 'Consultar guía técnica de control de calidad Bachem',
      guideLinkUrl: 'https://www.bachem.com/knowledge-center/quality-control-of-amino-acids-peptides-a-guide/'
    },
    identificationSection: {
      title: 'Cómo identifica el laboratorio un péptido',
      description: 'Un péptido es una cadena de aminoácidos: pequeñas piezas unidas en un orden determinado. Para identificarlo, el laboratorio estudia características que puede medir y las compara con referencias conocidas.',
      methods: [
        {
          _key: 'method-1',
          tag: 'HPLC o UHPLC',
          title: 'Separar los componentes',
          description: 'Un equipo de cromatografía líquida hace pasar la muestra por una columna. Los componentes interactúan de forma diferente y salen en momentos distintos registrados en un cromatograma.'
        },
        {
          _key: 'method-2',
          tag: 'LC-MS',
          title: 'Medir la masa de las moléculas',
          description: 'Un espectrómetro de masas mide señales para determinar la masa molecular y compararla con la esperada. La masa coincidente aporta fuerte evidencia de identidad.'
        },
        {
          _key: 'method-3',
          tag: 'MS/MS',
          title: 'Examinar el orden',
          description: 'Si se necesita estudiar la secuencia, la técnica MS/MS analiza fragmentos del péptido para obtener información detallada sobre el orden exacto de los aminoácidos.'
        },
        {
          _key: 'method-4',
          tag: 'VALIDACIÓN',
          title: 'Comparación con Referencias',
          description: 'El laboratorio compara la muestra con materiales de referencia. La confianza aumenta cuando múltiples métodos aportan evidencias coincidentes.'
        }
      ]
    },
    interpretationSection: {
      title: 'Qué significa el resultado',
      description: 'Interpretar correctamente el certificado es clave para entender el alcance de los análisis y la confianza en el lote fabricado.',
      cards: [
        {
          _key: 'interp-1',
          title: 'Pureza HPLC vs Cantidad',
          description: 'Un 99% de pureza por HPLC indica que el 99% de la señal medida en el detector corresponde al péptido. **No indica la masa total del vial** ni reemplaza la medición de contenido neto.'
        },
        {
          _key: 'interp-2',
          title: 'Confianza y Alcance',
          description: 'Un COA documenta los análisis en la muestra examinada. Permite verificar los resultados exactos del laboratorio y asegurar trazabilidad total con la presentación y el número de lote.'
        }
      ]
    },
    faqSection: {
      tag: 'Soporte y dudas',
      title: 'Preguntas frecuentes',
      description: 'Respuestas rápidas a las consultas más comunes sobre nuestros certificados de análisis y la trazabilidad de los productos.',
      contactTitle: '¿No encuentras lo que buscas?',
      contactDesc: 'Escríbenos directamente por WhatsApp con el nombre del producto y número de lote.',
      contactBtnLabel: 'Contactar',
      contactBtnUrl: 'https://wa.me/573023041412',
      faqs: [
        {
          _key: 'faq-1',
          q: '¿Qué es un lote?',
          a: 'Es el código que identifica un grupo de unidades de un producto. Permite relacionar esa presentación específica con su documentación analítica y registro.'
        },
        {
          _key: 'faq-2',
          q: '¿Qué significa «Certificado pendiente»?',
          a: 'Significa que todavía no hay un certificado publicado para esa presentación y lote en particular. Puede estar en proceso de validación por parte del laboratorio.'
        },
        {
          _key: 'faq-3',
          q: '¿Puedo consultar certificados anteriores?',
          a: 'Sí, mantenemos el historial completo. Puedes consultar los certificados de lotes anteriores utilizando el buscador principal en esta misma sección.'
        }
      ]
    },
    catalogSection: {
      tag: 'Catálogo Oficial',
      titleNormal: 'Calidad ',
      titleHighlight: 'garantizada',
      titleEnd: ' en cada vial.',
      description: 'Revisa las presentaciones, disponibilidad y precios de cada producto en nuestra tienda oficial con envíos a todo el país.',
      btnLabel: 'Ir a la tienda',
      btnUrl: '/tienda'
    }
  }

  try {
    // Eliminar el borrador si existe, para que no interfiera con los datos nuevos
    await client.delete('drafts.qualityPage').catch(() => {
      console.log('No había borrador previo, continuando...')
    })

    const result = await client.createOrReplace(qualityPageData)
    console.log(`✅ Página de Calidad subida exitosamente con ID: ${result._id}`)
  } catch (error) {
    console.error('❌ Error al subir la página de calidad:', error)
  }

  console.log('--- Proceso terminado ---')
}

main()
