import type { Metadata } from 'next'
import Link from 'next/link'
import { getSiteSettings } from '@/lib/sanity-queries'
import { TopBar } from '@/components/kailab/top-bar'
import { Navbar } from '@/components/kailab/navbar'
import { Footer } from '@/components/kailab/footer'

export const metadata: Metadata = {
  title: 'Privacidad de datos | KAILAB',
  description: 'Nuestra política de privacidad de datos y manejo de información para compras e interacciones en el sitio web de KAILAB.',
}

export default async function PrivacidadPage() {
  const siteSettings = await getSiteSettings()

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <TopBar />
      <Navbar siteSettings={siteSettings} />
      
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <article className="prose prose-sm sm:prose-base dark:prose-invert prose-headings:font-mono prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-bold mb-8">Privacidad de datos</h1>
          
          <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-border/50 pb-2">Nuestro compromiso con tu privacidad</h2>
          <p>
            En KAILAB entendemos que la privacidad de nuestros clientes no es un trámite legal: es parte esencial de lo que somos. Dado el carácter especializado de los productos que ofrecemos, sabemos que la discreción y la confidencialidad son tan importantes para nuestros clientes como la calidad de los compuestos que adquieren.
          </p>
          <p>
            No vendemos ni compartimos los datos de nuestros clientes para que terceros los utilicen con fines comerciales o publicitarios. Compartimos únicamente la información necesaria con los proveedores que intervienen en el pago, la entrega y el funcionamiento del sitio, según se explica en esta política.
          </p>
          <p>
            Los datos que nos confías se usan para procesar tu pedido y mantenerte informado sobre él. Las comunicaciones sobre novedades del catálogo requieren tu autorización para esa finalidad.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-border/50 pb-2">Política de privacidad</h2>
          
          <h3 className="text-xl font-bold mt-6 mb-3">Responsable del tratamiento</h3>
          <p>
            El responsable del tratamiento de los datos personales recopilados a través de kailab.com.co es Sebastian Rojas, persona natural, con domicilio en Calle 74 A No. 22-31 Of. 101, Bogotá, Colombia, código postal 111211. Para cualquier consulta relacionada con el uso de tus datos personales, puedes escribirnos a <a href="mailto:info@kailab.com.co">info@kailab.com.co</a> o contactarnos por WhatsApp al <a href="https://wa.me/573023041412" target="_blank" rel="noopener noreferrer">+57 302 304 1412</a>.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Marco legal</h3>
          <p>
            Esta política se desarrolla en el marco de la Ley Estatutaria 1581 de 2012, el Decreto 1377 de 2013 y demás normas concordantes sobre protección de datos personales en Colombia, bajo la vigilancia de la Superintendencia de Industria y Comercio (SIC).
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Datos que recopilamos</h3>
          <p>Al realizar una compra en KAILAB, recopilamos los datos necesarios para procesar y entregar tu pedido:</p>
          <ul>
            <li>Nombre y apellidos.</li>
            <li>Número de teléfono.</li>
            <li>Correo electrónico.</li>
            <li>Dirección de envío, ciudad o municipio y departamento.</li>
            <li>Apartamento u otro complemento de la dirección, si lo proporcionas.</li>
            <li>Información del pedido y del resultado del pago necesaria para gestionar la compra.</li>
          </ul>
          <p>
            La compra se realiza como invitado: no necesitas registrarte ni crear una cuenta. No solicitamos información de salud ni almacenamos datos completos de tarjetas o información bancaria directa. La pasarela de pago puede solicitar los datos necesarios para procesar la transacción bajo sus propias políticas.
          </p>
          <p>
            También utilizamos información técnica y de navegación para proteger el sitio y medir su funcionamiento, como se explica en la sección de cookies.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Menores de edad</h3>
          <p>
            Este sitio no está dirigido a menores de 18 años y no recopilamos intencionalmente datos personales de menores. Si detectamos que hemos recibido datos de un menor de edad, procederemos a su eliminación.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Finalidad del tratamiento</h3>
          <p>Los datos recopilados se utilizan para:</p>
          <ul>
            <li>Procesar y gestionar tu pedido.</li>
            <li>Coordinar el despacho y seguimiento del envío.</li>
            <li>Comunicarnos contigo en relación con tu compra a través de WhatsApp o correo electrónico.</li>
            <li>Cumplir con las obligaciones legales y contables aplicables.</li>
            <li>Proteger el sitio y medir su funcionamiento y uso.</li>
            <li>Informarte sobre disponibilidad de inventario y novedades de nuestro catálogo, cuando hayas autorizado esa finalidad.</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">Lo que no hacemos con tus datos</h3>
          <p>
            KAILAB no vende ni arrienda los datos personales de sus clientes. No entregamos los datos de contacto o de los pedidos a terceros para que los utilicen en sus propias campañas comerciales o publicitarias.
          </p>
          <p>
            La medición del uso del sitio no implica enviar a Google Analytics tu nombre, correo electrónico, teléfono o dirección de entrega. Las comunicaciones de KAILAB provienen únicamente de KAILAB.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Proveedores que intervienen en el servicio</h3>
          <p>
            Para procesar los pagos, utilizamos pasarelas de pago seguras que operan bajo sus propias políticas de privacidad y estándares de seguridad. KAILAB no almacena datos completos de tarjetas de crédito ni información bancaria directa de sus clientes.
          </p>
          <p>
            Para el despacho de pedidos, compartimos con el operador logístico los datos de contacto y entrega estrictamente necesarios para realizar el envío.
          </p>
          <p>
            Para el funcionamiento del sitio utilizamos proveedores de servicios tecnológicos, como alojamiento web, seguridad, correo electrónico y análisis de visitas. Estos proveedores pueden tratar información en servidores ubicados fuera de Colombia, de acuerdo con las condiciones aplicables a sus servicios. Su intervención se limita a las funciones necesarias para prestar esos servicios; no constituye una venta de los datos de nuestros clientes.
          </p>
          <p>
            También podremos entregar información cuando exista un requerimiento de una autoridad competente.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Conservación de los datos</h3>
          <p>
            Los datos personales de nuestros clientes se conservan durante el tiempo necesario para cumplir con la finalidad para la que fueron recopilados y para atender las obligaciones legales y contables aplicables, conforme a la normativa colombiana vigente. Una vez cumplido este plazo, los datos son eliminados o anonimizados de forma segura.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Seguridad de la información</h3>
          <p>
            Adoptamos medidas técnicas y organizativas razonables para proteger los datos personales de nuestros clientes contra acceso no autorizado, pérdida, alteración o divulgación. El acceso a la información de clientes está restringido al personal estrictamente necesario para la gestión de pedidos.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-border/50 pb-2">Tratamiento de datos personales</h2>
          
          <h3 className="text-xl font-bold mt-6 mb-3">Derechos del titular</h3>
          <p>Los titulares de datos personales tienen los siguientes derechos frente al responsable del tratamiento:</p>
          <ul>
            <li><strong>Conocer:</strong> acceder gratuitamente a los datos personales que KAILAB tenga sobre ti.</li>
            <li><strong>Actualizar:</strong> solicitar la corrección de datos inexactos o incompletos.</li>
            <li><strong>Rectificar:</strong> solicitar la modificación de datos que no correspondan a la realidad.</li>
            <li><strong>Suprimir:</strong> solicitar la eliminación de tus datos cuando consideres que no están siendo tratados conforme a la ley, salvo que exista una obligación legal de conservarlos.</li>
            <li><strong>Revocar:</strong> retirar la autorización otorgada para el tratamiento de tus datos, en los casos en que ello sea procedente.</li>
            <li><strong>Ser informado:</strong> conocer el uso que se ha dado a tus datos personales, previa solicitud.</li>
            <li><strong>Presentar quejas:</strong> acudir ante la Superintendencia de Industria y Comercio (SIC) si consideras que tus derechos han sido vulnerados.</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">Cómo ejercer tus derechos</h3>
          <p>
            Puedes enviarnos una solicitud a <a href="mailto:info@kailab.com.co">info@kailab.com.co</a> indicando tu nombre completo, el derecho que deseas ejercer y una descripción de tu solicitud. Responderemos en un plazo máximo de 10 días hábiles para consultas y 15 días hábiles para reclamos, conforme a lo establecido en la Ley 1581 de 2012.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Autorización para el tratamiento</h3>
          <p>
            Al aceptar esta política durante la compra en kailab.com.co, autorizas a KAILAB a tratar tus datos personales para gestionar el pedido y las demás finalidades descritas que resulten aplicables. Esta autorización puede ser revocada mediante solicitud escrita a <a href="mailto:info@kailab.com.co">info@kailab.com.co</a>, en los casos en que ello sea procedente.
          </p>
          <p>
            La aceptación de la compra no te suscribe automáticamente a comunicaciones promocionales.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-border/50 pb-2">Cookies y tecnologías de seguimiento</h2>
          
          <h3 className="text-xl font-bold mt-6 mb-3">Uso de cookies</h3>
          <p>
            El sitio kailab.com.co utiliza cookies y tecnologías necesarias para el funcionamiento de la tienda, como conservar el carrito de compras y las preferencias de idioma.
          </p>
          <p>
            También utiliza Google Analytics para medir las visitas y las interacciones con el sitio y comprender cómo funciona la navegación. Esta medición utiliza información técnica y de uso, como páginas visitadas y características del navegador o dispositivo. No enviamos a Google Analytics nombres, correos electrónicos, teléfonos ni direcciones de entrega.
          </p>
          <p>
            No utilizamos esta medición para crear campañas de publicidad personalizada en esta versión del sitio.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Control de cookies</h3>
          <p>
            Puedes configurar tu navegador para rechazar o eliminar cookies. Deshabilitar las cookies técnicas puede afectar algunas funciones del sitio, como el carrito de compras.
          </p>
          <p>
            Para conocer cómo utiliza Google la información de los sitios que usan sus servicios, consulta <a href="https://policies.google.com/technologies/partner-sites?hl=es" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/partner-sites?hl=es</a>.
          </p>

          <p className="mt-12 text-sm text-muted-foreground font-mono">
            Última actualización: sept 18, 2026
          </p>
          
        </article>
      </main>

      <Footer siteSettings={siteSettings} />
    </div>
  )
}
