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
  console.log('--- Subiendo contenido de Ayuda a Sanity ---')
  
  if (!process.env.SANITY_API_TOKEN) {
    console.error('ERROR: No se encontró SANITY_API_TOKEN en .env.local')
    process.exit(1)
  }

  const helpPageData = {
    _id: 'helpPage',
    _type: 'helpPage',
    title: 'Página de Ayuda',
    ordersSection: {
      tag: 'Pedidos',
      title: 'Cómo hacer tu pedido',
      faqs: [
        {
          _key: 'orders-1',
          q: '¿Cómo hago un pedido?',
          a: 'Elige el producto y su presentación, indica la cantidad y agrégalo al carrito. Completa los datos de envío y revisa los productos y el total antes de pagar.'
        },
        {
          _key: 'orders-2',
          q: '¿Qué incluye mi compra?',
          a: '',
          answerList: [
            'Agua bacteriostática.',
            'Toallitas con alcohol.',
            'Acceso a la guía en línea.',
            'Envío gratis a toda Colombia, en empaque discreto.'
          ]
        }
      ]
    },
    shippingSection: {
      tag: 'Envíos',
      title: 'Tiempos y condiciones de entrega',
      faqs: [
        {
          _key: 'ship-1',
          q: '¿Hacen envíos a toda Colombia?',
          a: 'Sí. El envío es gratis a toda Colombia.'
        },
        {
          _key: 'ship-2',
          q: '¿Cuánto tarda en llegar mi pedido?',
          a: 'Ciudades principales: 1 a 2 días hábiles\nCiudades intermedias: 2 a 3 días hábiles\nMunicipios y zonas extendidas: 3 a 5 días hábiles'
        },
        {
          _key: 'ship-3',
          q: '¿Desde cuándo se cuentan estos tiempos?',
          a: 'Los tiempos de tránsito aplican desde el momento en que la transportadora recibe el paquete, sin contar domingos ni festivos.'
        },
        {
          _key: 'ship-4',
          q: '¿Cuándo despachan mi pedido?',
          a: 'Los pedidos pagados antes de la 1:00 PM se despachan el mismo día hábil. Si se paga después, en fin de semana o festivo, se despacha el siguiente día hábil.'
        },
        {
          _key: 'ship-5',
          q: '¿Cómo consulto el estado de mi envío?',
          a: 'Cuando despachemos tu pedido, recibirás la información de seguimiento. Si necesitas ayuda para encontrarla, escríbenos con tu número de pedido.'
        },
        {
          _key: 'ship-6',
          q: '¿Puedo corregir los datos de entrega?',
          a: 'Escríbenos con tu número de pedido y el dato que necesitas corregir. Revisaremos si todavía es posible hacer el cambio según el estado del envío.'
        }
      ]
    },
    paymentsSection: {
      tag: 'Pagos',
      title: 'Medios de pago disponibles',
      faqs: [
        {
          _key: 'pay-1',
          q: '¿Qué medios de pago puedo usar?',
          a: 'Puedes pagar con tarjetas, PSE y billeteras a través de Wompi, o con criptomonedas.\n\nWompi: Tarjetas, Nequi, PSE, Botón Bancolombia, Bancolombia QR, Compra y Paga Después Bancolombia, Daviplata y SU+Pay.\n\nCripto: USDT en la red TRC-20.\n\nAl continuar al pago verás las opciones disponibles para tu compra.'
        },
        {
          _key: 'pay-2',
          q: '¿Qué hago si no puedo completar el pago?',
          a: 'Si el pago no se abre o aparece un error, escríbenos e indica en qué paso ocurrió. Si ya ves un cobro, cuéntanos antes de repetir el pago para que revisemos el pedido.'
        }
      ]
    },
    certificatesSection: {
      tag: 'Información y certificados',
      title: 'Documentación y certificados de análisis',
      faqs: [
        {
          _key: 'cert-1',
          q: '¿Dónde consulto el certificado de un producto?',
          a: 'En la página del producto o en Calidad. Revisa la presentación y el lote indicados en el informe. Si no hay un certificado publicado, verás «Certificado pendiente».'
        }
      ]
    },
    contactSection: {
      tag: 'Contacto directo',
      title: 'Escríbenos',
      description: 'Para consultar un pedido, incluye su número. Para preguntar por un certificado, indica el producto, la presentación y el lote, si lo tienes.',
      whatsappBtnLabel: 'Escribir por WhatsApp',
      whatsappUrl: 'https://wa.me/573023041412',
      emailBtnLabel: 'info@kailab.com.co',
      emailAddress: 'info@kailab.com.co'
    }
  }

  try {
    const result = await client.createOrReplace(helpPageData)
    console.log(`✅ Página de Ayuda subida exitosamente con ID: ${result._id}`)
  } catch (error) {
    console.error('❌ Error al subir la página de ayuda:', error)
  }

  console.log('--- Proceso terminado ---')
}

main().catch(console.error)
