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
    headerTag: 'Base de Conocimiento',
    title: 'Preguntas Frecuentes',
    description: 'Respuestas claras sobre productos, envíos, pagos y uso.',
    faqCategories: [
      {
        _key: 'cat-1',
        _type: 'object',
        label: 'Productos',
        items: [
          { _key: 'q-1-1', _type: 'object', q: '¿Qué vende KaiLab?', a: 'KaiLab comercializa compuestos liofilizados y reactivos para investigación científica y de laboratorio. Cada ficha de producto indica el compuesto, el contenido nominal en miligramos, la pureza reportada y las condiciones de almacenamiento. No son medicamentos, suplementos ni productos de uso clínico.' },
          { _key: 'q-1-2', _type: 'object', q: '¿Qué pureza tienen los productos?', a: 'La pureza se comunica por producto y lote, no como un porcentaje general para todo el catálogo. Cuando existe un COA publicado, mostramos el resultado exacto reportado por el laboratorio independiente y el enlace al documento correspondiente.' },
          { _key: 'q-1-3', _type: 'object', q: '¿Los productos cuentan con análisis de pureza?', a: 'Los productos y lotes cuentan con certificados de análisis publicados. En cada COA encontrarás el laboratorio, el lote, los resultados reportados y el enlace al documento.' },
          { _key: 'q-1-4', _type: 'object', q: '¿Necesito ser un laboratorio o una institución para comprar?', a: 'No solicitamos documentación institucional. Toda compra se realiza bajo los términos de uso exclusivo en investigación, y el comprador asume la responsabilidad de contar con las condiciones, la capacitación y las autorizaciones que correspondan a su actividad.' }
        ]
      },
      {
        _key: 'cat-2',
        _type: 'object',
        label: 'Pedidos y Pagos',
        items: [
          { _key: 'q-2-1', _type: 'object', q: '¿Cómo hago un pedido?', a: 'Selecciona el producto y la cantidad, añádelo al carrito y completa los datos de envío. Antes de pagar podrás revisar los productos, las cantidades, la dirección y el valor total.' },
          { _key: 'q-2-2', _type: 'object', q: '¿Qué métodos de pago aceptan?', a: 'Aceptamos tarjetas de crédito y débito, PSE, Nequi, Daviplata y botón Bancolombia. Los pagos se procesan a través de una pasarela certificada y KaiLab no almacena datos de tarjetas.' },
          { _key: 'q-2-3', _type: 'object', q: '¿Cómo confirmo que mi pedido quedó registrado?', a: 'Al aprobarse el pago recibirás un correo con el número y el resumen del pedido. Si no llega en pocos minutos, revisa la carpeta de correo no deseado y escríbenos antes de intentar pagar de nuevo.' },
          { _key: 'q-2-4', _type: 'object', q: '¿Puedo modificar o cancelar un pedido?', a: 'Escríbenos lo antes posible. Podemos modificar o cancelar un pedido mientras no haya sido despachado. Una vez entregado a la transportadora, aplican las condiciones descritas en nuestros Términos Legales.' },
          { _key: 'q-2-5', _type: 'object', q: '¿Ofrecen precios para pedidos por volumen?', a: 'Sí. Contamos con precios diferenciales para compras por cantidad y para distribuidores. Escríbenos por WhatsApp o correo indicando los productos y las cantidades que necesitas.' }
        ]
      },
      {
        _key: 'cat-3',
        _type: 'object',
        label: 'Envíos',
        items: [
          { _key: 'q-3-1', _type: 'object', q: '¿A dónde envían?', a: 'Enviamos a toda Colombia, a ciudades principales y municipios, a través de transportadoras con cobertura nacional.' },
          { _key: 'q-3-2', _type: 'object', q: '¿Cuánto tarda la entrega?', a: 'En las principales ciudades la entrega suele hacerse al siguiente día hábil. En otras ciudades y municipios, entre 2 y 3 días hábiles. Los pedidos con pago confirmado se despachan en días hábiles; los recibidos en fin de semana o festivo se procesan el siguiente día hábil.' },
          { _key: 'q-3-3', _type: 'object', q: '¿El envío tiene costo?', a: 'El envío es gratuito a toda Colombia.' },
          { _key: 'q-3-4', _type: 'object', q: '¿Cómo llega empacado el pedido?', a: 'Los productos se envían en empaque sellado y sobrio, preparado para proteger el contenido durante el transporte. Al despachar recibirás el número de guía para hacer seguimiento.' }
        ]
      },
      {
        _key: 'cat-4',
        _type: 'object',
        label: 'Almacenamiento',
        items: [
          { _key: 'q-4-1', _type: 'object', q: '¿Cómo debo almacenar el producto en polvo liofilizado?', a: 'Sin reconstituir, consérvalo a -20 °C para almacenamiento prolongado, protegido de la luz y en ambiente seco. En estas condiciones el material mantiene su estabilidad durante períodos prolongados.' },
          { _key: 'q-4-2', _type: 'object', q: '¿Cómo se conserva una vez reconstituido?', a: 'Una vez reconstituido con agua bacteriostática en condiciones de laboratorio, consérvalo refrigerado entre 2 °C y 8 °C. Evita los ciclos repetidos de congelación y descongelación, y manipula el material con técnica aséptica y material de laboratorio apropiado.' },
          { _key: 'q-4-3', _type: 'object', q: '¿El producto se daña si llega sin refrigeración?', a: 'No. El polvo liofilizado es estable a temperatura ambiente durante los tiempos de transporte habituales. Al recibirlo, guárdalo lo antes posible en las condiciones indicadas arriba.' },
          { _key: 'q-4-4', _type: 'object', q: '¿Qué hago si el pedido llega incompleto, incorrecto o el vial presenta una apariencia inusual?', a: 'No utilices el material si el sello está comprometido, hay pérdida de contenido, humedad visible o un cambio inesperado de apariencia. Toma fotografías del producto y del empaque y escríbenos indicando el número de pedido.' }
        ]
      },
      {
        _key: 'cat-5',
        _type: 'object',
        label: 'Uso e Investigación',
        items: [
          { _key: 'q-5-1', _type: 'object', q: '¿Qué significa uso exclusivo para investigación?', a: 'Significa que el material se ofrece para actividades científicas o analíticas realizadas bajo protocolos adecuados. No está destinado al uso humano, veterinario ni clínico, ni al diagnóstico, tratamiento o prevención de enfermedades. Los productos no cuentan con registro INVIMA.' },
          { _key: 'q-5-2', _type: 'object', q: '¿KaiLab indica dosis, ciclos o formas de administración?', a: 'No. No proporcionamos dosis, ciclos, protocolos de aplicación ni asesoría médica. Podemos aclarar información técnica o comercial publicada en la ficha del producto.' },
          { _key: 'q-5-3', _type: 'object', q: '¿KaiLab recomienda productos según objetivos personales?', a: 'No. No recomendamos productos para pérdida de peso, recuperación, rendimiento ni composición corporal. Las referencias que aparecen en las fichas describen áreas de estudio científico y no constituyen una promesa de resultados.' }
        ]
      }
    ],
    trustBadges: [
      { _key: 'badge-1', _type: 'object', title: 'Entrega rápida', desc: '24–48h en ciudades principales' },
      { _key: 'badge-2', _type: 'object', title: 'Empaque sobrio', desc: 'Discreto. Sin referencias visibles' },
      { _key: 'badge-3', _type: 'object', title: 'Tarjeta y Crypto', desc: 'Pagos verificados y seguros' },
      { _key: 'badge-4', _type: 'object', title: 'COA disponibles', desc: 'Reportes independientes por producto y lote' },
    ]
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
