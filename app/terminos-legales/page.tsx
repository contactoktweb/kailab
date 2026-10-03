import type { Metadata } from 'next'
import Link from 'next/link'
import { getSiteSettings } from '@/lib/sanity-queries'
import { TopBar } from '@/components/kailab/top-bar'
import { Navbar } from '@/components/kailab/navbar'
import { Footer } from '@/components/kailab/footer'
import { shipping, shippingRules } from '@/components/kailab/data'

export const metadata: Metadata = {
  title: 'Términos Legales | KAILAB',
  description: 'Términos y condiciones, política de devoluciones y envíos de KAILAB.',
}

export default async function TerminosLegalesPage() {
  const siteSettings = await getSiteSettings()

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <TopBar />
      <Navbar siteSettings={siteSettings} />
      
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <article className="prose prose-sm sm:prose-base dark:prose-invert prose-headings:font-mono prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-bold mb-8">Términos legales</h1>
          
          <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-border/50 pb-2">Términos y condiciones de uso</h2>
          
          <h3 className="text-xl font-bold mt-6 mb-3">Responsable del sitio</h3>
          <p>
            Para cualquier consulta puedes escribirnos a <a href="mailto:info@kailab.com.co">info@kailab.com.co</a> o contactarnos por WhatsApp al <a href="https://wa.me/573023041412" target="_blank" rel="noopener noreferrer">+57 302 304 1412</a>.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Aceptación de los términos</h3>
          <p>
            Al acceder a este sitio y realizar una compra, el usuario declara haber leído, comprendido y aceptado en su totalidad los presentes términos y condiciones. Si no está de acuerdo con alguno de estos términos, le pedimos abstenerse de realizar compras en el sitio.
          </p>
          <p>
            Todas las compras se realizan como invitado. No es necesario registrarse ni crear una cuenta.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Edad mínima</h3>
          <p>
            El uso de este sitio y la realización de compras están reservados a personas mayores de 18 años. Al realizar un pedido, el usuario declara ser mayor de edad conforme a la legislación colombiana.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Naturaleza de los productos</h3>
          <p>
            Los compuestos ofrecidos en KAILAB se suministran liofilizados en viales sellados y están destinados exclusivamente a investigación científica en laboratorio. No están aprobados para consumo humano, uso médico, veterinario, diagnóstico, tratamiento ni prevención de enfermedades. Al completar una compra, el usuario declara comprender y aceptar estas condiciones de uso sin reservas.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Uso del sitio</h3>
          <p>
            El sitio está dirigido a usuarios que comprenden el contexto científico de los productos que adquieren. KAILAB no ofrece asesoría médica ni promueve el uso de sus productos fuera de entornos de investigación. La información publicada es de carácter informativo y no constituye recomendación de ningún tipo.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Propiedad intelectual</h3>
          <p>
            Los contenidos del sitio, incluyendo textos, imágenes, marcas y diseños, son propiedad de KAILAB o de sus respectivos titulares. Queda prohibida su reproducción total o parcial sin autorización escrita.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Limitación de responsabilidad</h3>
          <p>
            KAILAB responde por la calidad, identidad y condiciones de despacho de los productos que comercializa, conforme a la garantía legal prevista en la Ley 1480 de 2011. El comprador es el único responsable del manejo, almacenamiento y destino que dé a los productos una vez recibidos. KAILAB no asume responsabilidad por usos distintos a los expresamente autorizados en estos términos.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Modificación de los términos</h3>
          <p>
            KAILAB podrá actualizar estos términos en cualquier momento. La versión vigente será siempre la publicada en este sitio, con indicación de su fecha de última actualización. El uso continuado del sitio implica la aceptación de la versión vigente.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Jurisdicción</h3>
          <p>
            Los presentes términos se rigen por las leyes de la República de Colombia. Cualquier controversia será resuelta ante las autoridades competentes colombianas.
          </p>

          <h2 id="devoluciones" className="text-2xl font-bold mt-10 mb-4 border-b border-border/50 pb-2 scroll-mt-24">
            Política de devoluciones y reembolsos
          </h2>

          <h3 className="text-xl font-bold mt-6 mb-3">Naturaleza especial de los productos</h3>
          <p>
            KAILAB comercializa compuestos liofilizados en viales de vidrio sellados, destinados a investigación científica. Por su naturaleza, estos productos requieren condiciones específicas de conservación, son de uso especializado y su integridad no puede verificarse una vez salen de nuestras instalaciones.
          </p>
          <p>
            Por estas razones, y de conformidad con el artículo 47 de la Ley 1480 de 2011, los productos de KAILAB están excluidos del derecho de retracto al tratarse de bienes que por su naturaleza no pueden ser devueltos o cuya calidad no puede garantizarse una vez entregados.
          </p>
          <p>
            No aceptamos devoluciones físicas de productos.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Casos en que procede un reembolso</h3>
          <p>
            Sin perjuicio de lo anterior, KAILAB reconoce las siguientes situaciones como válidas para solicitar un reembolso:
          </p>
          <ul>
            <li><strong>Producto incorrecto:</strong> si el pedido recibido no corresponde al producto adquirido.</li>
            <li><strong>Producto no entregado:</strong> si el pedido fue despachado y no llegó a su destino dentro del plazo estimado por causas atribuibles a KAILAB o al operador logístico, una vez verificada la situación.</li>
          </ul>
          <p>
            En ambos casos, el comprador debe notificarnos dentro de los 5 días hábiles siguientes a la fecha de entrega confirmada o a la fecha estimada de entrega, escribiendo a <a href="mailto:info@kailab.com.co">info@kailab.com.co</a> o por <a href="https://wa.me/573023041412" target="_blank" rel="noopener noreferrer">WhatsApp</a>, indicando el número de pedido y una descripción del inconveniente.
          </p>
          <p>
            KAILAB no reconoce reclamaciones por condiciones de almacenamiento inadecuadas tras la entrega, por cambio de opinión del comprador, ni por factores externos al despacho que afecten el producto después de su recepción.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Proceso de reembolso</h3>
          <p>
            Cuando un reembolso proceda según los criterios anteriores, este se realizará exclusivamente al mismo medio de pago utilizado en la compra, dentro de los 15 días calendario siguientes a la aprobación del caso. No realizamos reembolsos en efectivo ni a cuentas o medios de pago distintos al utilizado originalmente en la transacción.
          </p>

          <h2 id="envios" className="text-2xl font-bold mt-10 mb-4 border-b border-border/50 pb-2 scroll-mt-24">
            Política de envíos
          </h2>

          <h3 className="text-xl font-bold mt-6 mb-3">Cobertura y costo</h3>
          <p>
            El envío es gratis a toda Colombia. Por el momento no despachamos pedidos al exterior.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Operadores logísticos</h3>
          <p>
            Trabajamos con empresas de mensajería y logística seleccionadas por su confiabilidad y cobertura nacional. Todos los pedidos se despachan en empaque neutro y discreto por razones de seguridad en el transporte y privacidad del comprador.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Tiempos de despacho</h3>
          <p>
            Los pagos confirmados antes de las 4 p. m. de lunes a viernes o antes de las 12 del mediodía del sábado se despachan ese mismo día. Después de esos horarios, o en domingos y festivos, el despacho pasa al siguiente día hábil. Todos los horarios corresponden a Bogotá, Colombia.
          </p>
          <p>
            El pedido se despacha únicamente cuando el pago está confirmado. Iniciar el pago o enviar un comprobante no equivale a una confirmación de la pasarela.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Tiempos de entrega estimados</h3>
          <ul>
            {shipping.map(row => (
              <li key={row.city}><strong>{row.city}:</strong> aproximadamente {row.time}.</li>
            ))}
          </ul>
          <p>
            {shippingRules.delivery}
          </p>
          <p>
            Si la confirmación del pago tarda, la entrega también puede tomar más tiempo.
          </p>
          <p>
            Los tiempos son estimados y dependen del destino. Pueden verse afectados por condiciones de clima, días festivos, situaciones de orden público u otras circunstancias ajenas a KAILAB y al operador logístico.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Seguimiento</h3>
          <p>
            Una vez despachado el pedido, recibirás la información de seguimiento para consultar el estado de la entrega. También podrás revisar el pedido mediante el enlace privado enviado a tu correo, sin crear una cuenta.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Incidencias en tránsito</h3>
          <p>
            Si tu pedido no llega dentro del plazo estimado o recibes el paquete con daños visibles en el exterior, contáctanos a <a href="mailto:info@kailab.com.co">info@kailab.com.co</a> o por <a href="https://wa.me/573023041412" target="_blank" rel="noopener noreferrer">WhatsApp</a> con tu número de pedido. Gestionamos directamente con el operador logístico y te mantenemos informado durante el proceso.
          </p>
          <p>
            Si el paquete llega con daños externos visibles, te recomendamos documentarlo con fotografías antes de abrirlo, ya que esto facilita la verificación del caso.
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
