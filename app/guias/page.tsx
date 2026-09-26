import type { Metadata } from 'next'
import { TopBar } from '@/components/kailab/top-bar'
import { Navbar } from '@/components/kailab/navbar'
import { Footer } from '@/components/kailab/footer'
import { getSiteSettings } from '@/lib/sanity-queries'
import Link from 'next/link'
import { Icon } from '@iconify/react'

export const metadata: Metadata = {
  title: 'Guías prácticas sobre péptidos | KAILAB',
  description: 'Explicaciones claras para entender la información de los productos y aprender a consultar sus certificados de análisis.',
  openGraph: {
    images: [
      {
        url: '/KAILAB_Logo_Navy-Blue.svg',
        width: 1200,
        height: 630,
        alt: 'Logo de KAILAB',
      },
    ],
  },
}

export default async function GuiasPage() {
  const siteSettings = await getSiteSettings()

  return (
    <div className="min-h-[100dvh] bg-background">
      <TopBar />
      <Navbar siteSettings={siteSettings} />
      
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-4">
            Guías prácticas
          </h1>
          <p className="text-lg text-slate-600">
            Explicaciones claras para entender la información de los productos y consultar su documentación.
          </p>
        </div>

        <article className="prose prose-slate prose-a:text-[#1959D7] hover:prose-a:text-[#1959D7]/80 prose-headings:font-bold prose-h2:text-2xl sm:prose-h2:text-3xl max-w-none">
          <section id="leer-certificado" className="scroll-mt-28">
            <h2>Cómo leer un certificado de análisis</h2>
            <p className="text-base text-slate-700">
              Empieza por el producto y el lote. Después revisa quién realizó el análisis, cuándo se hizo y qué resultados aparecen. La cantidad en miligramos y el porcentaje de pureza son datos distintos.
            </p>

            <h3>Un ejemplo real</h3>
            <p>
              Usaremos el informe n.º 223529 de Janoshik, correspondiente a una muestra identificada en el documento como Retatrutide 10 mg, lote 317558. Este ejemplo explica cómo leer ese informe; sus resultados corresponden a la muestra analizada.
            </p>

            <h3>1. Identifica la muestra y el lote</h3>
            <p>
              Busca el nombre, la presentación declarada y el número de lote. Estos datos identifican qué muestra se envió al laboratorio. El nombre escrito en el informe no sustituye la lectura de las pruebas realizadas.
            </p>

            <h3>2. Revisa el laboratorio y la fecha</h3>
            <p>
              Comprueba quién emitió el informe y cuándo se realizó el análisis. La fecha del análisis no es una fecha de vencimiento.
            </p>

            <h3>3. Distingue cantidad y pureza</h3>
            <div className="overflow-x-auto my-6 border border-slate-200 rounded-lg">
              <table className="w-full text-left text-sm m-0">
                <thead className="bg-slate-100 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 font-bold text-slate-900">Dato del informe</th>
                    <th className="px-4 py-3 font-bold text-slate-900">Resultado</th>
                    <th className="px-4 py-3 font-bold text-slate-900">Cómo leerlo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-medium text-slate-900">Presentación declarada</td>
                    <td className="px-4 py-3 text-slate-700">10 mg</td>
                    <td className="px-4 py-3 text-slate-700">Identifica la presentación de la muestra.</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-medium text-slate-900">Cantidad medida</td>
                    <td className="px-4 py-3 text-slate-700">10,74 mg</td>
                    <td className="px-4 py-3 text-slate-700">Es la cantidad reportada por el análisis.</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-medium text-slate-900">Pureza por HPLC</td>
                    <td className="px-4 py-3 text-slate-700">99,191 %</td>
                    <td className="px-4 py-3 text-slate-700">Es un porcentaje de área; no indica los miligramos del vial.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Cada resultado responde una pregunta diferente. Un porcentaje alto de pureza no reemplaza la medición de cantidad ni otros análisis.
            </p>

            <h3>4. Reconoce la gráfica</h3>
            <p>
              En el cromatograma disponible abajo verás señales registradas durante la separación de la muestra. El eje de tiempo indica cuándo aparecen y los picos muestran las señales detectadas. El porcentaje de pureza por área se calcula comparando las áreas de los picos, no solo su altura.
            </p>

            <h3>5. Abre el informe completo</h3>
            <p>
              Abre el certificado y el cromatograma. Revisa el número de informe, la muestra, el lote y los resultados. El análisis de una muestra no significa que se haya examinado cada vial del lote.
            </p>

            <div className="not-prose flex flex-col sm:flex-row gap-3 mt-6 mb-8">
              <a 
                href="/certificados/RT10_Janoshik_223529_Certificado.png" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1959D7] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1959D7]/90"
              >
                <Icon icon="lucide:external-link" className="h-4 w-4" />
                Abrir certificado
              </a>
              <a 
                href="/certificados/RT10_Janoshik_223529_Informe.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-slate-200 bg-white px-6 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
              >
                <Icon icon="lucide:file-text" className="h-4 w-4" />
                Ver cromatograma (PDF)
              </a>
            </div>

            <p>
              En Calidad encontrarás una explicación de las técnicas utilizadas y de lo que puede decirte cada resultado.
            </p>
            
            <div className="not-prose mt-4">
              <Link
                href="/calidad"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#1959D7] hover:underline"
              >
                Calidad
                <Icon icon="lucide:arrow-right" className="h-4 w-4" />
              </Link>
            </div>

          </section>
        </article>

        {/* ENLACES DE REGRESO */}
        <div className="mt-16 border-t border-slate-200 pt-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/tienda"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-100 px-6 py-4 text-sm font-bold text-slate-900 transition-colors hover:bg-slate-200"
            >
              Ver productos
              <Icon icon="lucide:arrow-right" className="h-4 w-4" />
            </Link>
            <Link 
              href="/ayuda"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-100 px-6 py-4 text-sm font-bold text-slate-900 transition-colors hover:bg-slate-200"
            >
              Ayuda
              <Icon icon="lucide:help-circle" className="h-4 w-4" />
            </Link>
          </div>
        </div>

      </main>
      
      <Footer siteSettings={siteSettings} />
    </div>
  )
}
