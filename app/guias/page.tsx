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
      
      <main className="flex-1 bg-slate-50 pb-10">
        {/* HERO SECTION */}
        <section className="relative bg-[#17294F] pt-10 pb-32 shadow-lg z-0 overflow-hidden">
          {/* Decoración de fondo */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full bg-primary/10 blur-[80px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[80px]"></div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary font-mono text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
              <Icon icon="lucide:book-open" className="h-4 w-4" />
              Recursos
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
              Guías Prácticas
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Explicaciones claras para entender la información de los productos y aprender a consultar su documentación y certificados de análisis.
            </p>
          </div>
        </section>

        {/* CONTENT SECTION */}
        <section className="relative z-10 max-w-4xl mx-auto px-4 lg:px-8 -mt-20">
          
          <div className="bg-white rounded-none p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-slate-100">
            <div className="mb-6 border-b border-primary/40 pb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Cómo leer un certificado de análisis</h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Empieza por el producto y el lote. Después revisa quién realizó el análisis, cuándo se hizo y qué resultados aparecen. La cantidad en miligramos y el porcentaje de pureza son datos distintos.
              </p>
            </div>

            <div className="mb-6 p-5 bg-primary/5 rounded-none border border-primary/20">
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Icon icon="lucide:search" className="h-5 w-5 text-primary" />
                Un ejemplo real
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Usaremos el informe n.º 223529 de Janoshik, correspondiente a una muestra identificada en el documento como <strong>Retatrutide 10 mg, lote 317558</strong>. Este ejemplo explica cómo leer ese informe; sus resultados corresponden a la muestra analizada.
              </p>
            </div>

            <div className="space-y-6">
              {/* Paso 1 */}
              <div className="flex gap-4 sm:gap-6">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-none bg-slate-900 text-white font-mono font-bold text-base sm:text-lg shadow-[2px_2px_0px_#1959D7]">1</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Identifica la muestra y el lote</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Busca el nombre, la presentación declarada y el número de lote. Estos datos identifican qué muestra se envió al laboratorio. El nombre escrito en el informe no sustituye la lectura de las pruebas realizadas.
                  </p>
                </div>
              </div>

              {/* Paso 2 */}
              <div className="flex gap-4 sm:gap-6">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-none bg-slate-900 text-white font-mono font-bold text-base sm:text-lg shadow-[2px_2px_0px_#1959D7]">2</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Revisa el laboratorio y la fecha</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Comprueba quién emitió el informe y cuándo se realizó el análisis. La fecha del análisis no es una fecha de vencimiento.
                  </p>
                </div>
              </div>

              {/* Paso 3 */}
              <div className="flex gap-4 sm:gap-6">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-none bg-slate-900 text-white font-mono font-bold text-base sm:text-lg shadow-[2px_2px_0px_#1959D7]">3</div>
                <div className="w-full">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Distingue cantidad y pureza</h3>
                  
                  <div className="overflow-hidden my-4 border border-slate-200 rounded-xl shadow-sm">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-5 py-4 font-bold text-slate-900 w-1/3">Dato del informe</th>
                          <th className="px-5 py-4 font-bold text-slate-900 w-1/4">Resultado</th>
                          <th className="px-5 py-4 font-bold text-slate-900 w-auto">Cómo leerlo</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-5 py-4 font-medium text-slate-900">Presentación declarada</td>
                          <td className="px-5 py-4 text-slate-700 font-mono text-xs">10 mg</td>
                          <td className="px-5 py-4 text-slate-600">Identifica la presentación de la muestra.</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-5 py-4 font-medium text-slate-900">Cantidad medida</td>
                          <td className="px-5 py-4 text-slate-700 font-mono text-xs">10,74 mg</td>
                          <td className="px-5 py-4 text-slate-600">Es la cantidad reportada por el análisis.</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-5 py-4 font-medium text-slate-900">Pureza por HPLC</td>
                          <td className="px-5 py-4 text-slate-700 font-mono text-xs">99,191 %</td>
                          <td className="px-5 py-4 text-slate-600">Es un porcentaje de área; no indica los miligramos del vial.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-slate-500 italic">
                    Cada resultado responde una pregunta diferente. Un porcentaje alto de pureza no reemplaza la medición de cantidad ni otros análisis.
                  </p>
                </div>
              </div>

              {/* Paso 4 */}
              <div className="flex gap-4 sm:gap-6">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-none bg-slate-900 text-white font-mono font-bold text-base sm:text-lg shadow-[2px_2px_0px_#1959D7]">4</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Reconoce la gráfica</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    En el cromatograma disponible abajo verás señales registradas durante la separación de la muestra. El eje de tiempo indica cuándo aparecen y los picos muestran las señales detectadas. El porcentaje de pureza por área se calcula comparando las áreas de los picos, no solo su altura.
                  </p>
                </div>
              </div>

              {/* Paso 5 */}
              <div className="flex gap-4 sm:gap-6">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-none bg-slate-900 text-white font-mono font-bold text-base sm:text-lg shadow-[2px_2px_0px_#1959D7]">5</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Abre el informe completo</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    Abre el certificado y el cromatograma. Revisa el número de informe, la muestra, el lote y los resultados. El análisis de una muestra no significa que se haya examinado cada vial del lote.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 mb-0">
                    <a 
                      href="/certificados/RT10_Janoshik_223529_Certificado.png" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden bg-primary px-4 py-2.5 font-mono text-[11px] font-bold tracking-widest text-primary-foreground backdrop-blur-md transition-all duration-500 hover:bg-primary/90 active:scale-95"
                    >
                      {/* L-Shape Border Left */}
                      <div className="absolute left-0 top-0 h-full w-[2px] bg-white/30 transition-colors duration-500 group-hover:bg-white"></div>
                      {/* L-Shape Border Top */}
                      <div className="absolute left-0 top-0 h-[2px] w-6 bg-white/30 transition-all duration-500 group-hover:w-full group-hover:bg-white"></div>
                      
                      Abrir certificado
                      <Icon icon="lucide:external-link" className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                    <a 
                      href="/certificados/RT10_Janoshik_223529_Informe.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden bg-white border border-slate-200 px-4 py-2.5 font-mono text-[11px] font-bold tracking-widest text-slate-800 transition-all duration-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 active:scale-95"
                    >
                      {/* L-Shape Border Left */}
                      <div className="absolute left-0 top-0 h-full w-[2px] bg-primary/40 transition-colors duration-500 group-hover:bg-primary"></div>
                      {/* L-Shape Border Top */}
                      <div className="absolute left-0 top-0 h-[2px] w-6 bg-primary/40 transition-all duration-500 group-hover:w-full group-hover:bg-primary"></div>

                      <Icon icon="lucide:file-text" className="h-3 w-3 text-slate-600 transition-transform duration-300 group-hover:translate-x-0.5" />
                      Ver cromatograma (PDF)
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-6 bg-primary/5 rounded-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-primary/20">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none bg-primary/10 text-primary">
                  <Icon icon="lucide:info" className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">¿Quieres saber más?</h4>
                  <p className="text-sm text-slate-700">En Calidad encontrarás una explicación de las técnicas utilizadas y de lo que puede decirte cada resultado.</p>
                </div>
              </div>
              <Link
                href="/calidad"
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden bg-primary px-6 py-4 font-mono text-sm font-bold tracking-widest text-primary-foreground backdrop-blur-md transition-all duration-500 hover:bg-primary/90 active:scale-95 whitespace-nowrap shrink-0"
              >
                {/* L-Shape Border Left */}
                <div className="absolute left-0 top-0 h-full w-[2px] bg-white/30 transition-colors duration-500 group-hover:bg-white"></div>
                {/* L-Shape Border Top */}
                <div className="absolute left-0 top-0 h-[2px] w-12 bg-white/30 transition-all duration-500 group-hover:w-full group-hover:bg-white"></div>
                
                Ver Calidad
                <Icon icon="lucide:arrow-right" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          
          {/* ENLACES DE REGRESO */}
          <div className="mt-12 mb-0">
            <div className="grid sm:grid-cols-2 gap-4">
              <Link 
                href="/tienda"
                className="group flex items-center justify-between p-6 rounded-none bg-[#17294F] shadow-sm border border-white/10 transition-all hover:shadow-md hover:border-white/30"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-none bg-white/10 text-slate-300 group-hover:bg-white/20 group-hover:text-white transition-colors">
                    <Icon icon="lucide:shopping-bag" className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white">Tienda</span>
                    <span className="block text-xs text-slate-400">Ver nuestros productos</span>
                  </div>
                </div>
                <Icon icon="lucide:chevron-right" className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
              </Link>
              <Link 
                href="/ayuda"
                className="group flex items-center justify-between p-6 rounded-none bg-[#17294F] shadow-sm border border-white/10 transition-all hover:shadow-md hover:border-white/30"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-none bg-white/10 text-slate-300 group-hover:bg-white/20 group-hover:text-white transition-colors">
                    <Icon icon="lucide:help-circle" className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white">Ayuda</span>
                    <span className="block text-xs text-slate-400">Preguntas y contacto</span>
                  </div>
                </div>
                <Icon icon="lucide:chevron-right" className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
              </Link>
            </div>
          </div>

        </section>
      </main>
      
      <Footer siteSettings={siteSettings} />
    </div>
  )
}
