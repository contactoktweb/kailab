'use client'

import { useState, useMemo, useEffect } from 'react'
import { Icon } from '@iconify/react'
import Link from 'next/link'

// Dummy data representing the available certificates based on instructions
const certificates = [
  {
    id: 'janoshik-223529',
    product: 'Retatrutida 10 mg',
    lote: '317558',
    laboratorio: 'Janoshik',
    fecha: 'ago 24, 2026',
    estado: 'Lote vigente',
    informe: '223529',
    enlaceProducto: '/tienda/metabolico/retatrutida/10mg/',
  }
]

export function CalidadClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCertId, setSelectedCertId] = useState<string | null>('janoshik-223529')

  // Check URL params on load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const informe = urlParams.get('informe')
      if (informe) {
        setSelectedCertId(informe)
      }
    }
  }, [])

  // Sync selected cert to URL (without reloading)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      if (selectedCertId) {
        url.searchParams.set('informe', selectedCertId)
      } else {
        url.searchParams.delete('informe')
      }
      window.history.replaceState({}, '', url)
    }
  }, [selectedCertId])

  const filteredCerts = useMemo(() => {
    if (!searchQuery.trim()) return certificates
    const q = searchQuery.toLowerCase()
    return certificates.filter(
      (c) =>
        c.product.toLowerCase().includes(q) ||
        c.lote.toLowerCase().includes(q) ||
        c.informe.toLowerCase().includes(q) ||
        c.laboratorio.toLowerCase().includes(q)
    )
  }, [searchQuery])

  const selectedCert = useMemo(() => {
    return certificates.find(c => c.id === selectedCertId) || null
  }, [selectedCertId])

  return (
    <>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-4">
            Calidad y certificados de análisis
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            Un certificado de análisis (COA) muestra los resultados de una muestra evaluada por un laboratorio. Consulta los informes disponibles y revisa el producto, la presentación y el lote de cada uno.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          {/* LEFT COLUMN: Search & List */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Encuentra un certificado</h2>
              <div className="flex flex-col gap-2">
                <label htmlFor="coa-search" className="text-sm font-bold text-slate-700">
                  Buscar certificados
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Icon icon="lucide:search" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      id="coa-search"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Producto, lote o número de informe"
                      className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm focus:border-[#1959D7] focus:outline-none focus:ring-1 focus:ring-[#1959D7]"
                    />
                  </div>
                  <button className="rounded-lg bg-[#1959D7] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#1959D7]/90">
                    Buscar
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  También puedes buscar por presentación, laboratorio o tipo de análisis.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Certificados disponibles</h2>
              <p className="text-sm text-slate-600 mb-6">
                Abre un certificado para consultar el informe completo y los datos del lote.
              </p>
              
              <div className="flex flex-col gap-4">
                {certificates.length === 0 ? (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center">
                    <Icon icon="lucide:file-x-2" className="h-10 w-10 text-slate-300 mx-auto mb-4" />
                    <p className="text-sm font-medium text-slate-900 mb-2">No hay certificados publicados por el momento.</p>
                    <p className="text-sm text-slate-500 mb-6">Puedes escribirnos por WhatsApp para consultar la documentación disponible.</p>
                    <a 
                      href="https://wa.me/573023041412" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-[#25D366]/90"
                    >
                      <Icon icon="lucide:message-circle" className="h-4 w-4" />
                      Escribir por WhatsApp
                    </a>
                  </div>
                ) : filteredCerts.length > 0 ? (
                  filteredCerts.map((cert) => (
                    <div key={cert.id} className={`rounded-xl border p-5 transition-colors ${selectedCertId === cert.id ? 'border-[#1959D7] bg-[#1959D7]/5' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-bold text-slate-900">{cert.product}</h3>
                        <span className="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                          {cert.estado}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-0.5">Lote</p>
                          <p className="text-slate-900 font-mono">{cert.lote}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-0.5">Laboratorio</p>
                          <p className="text-slate-900">{cert.laboratorio}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-0.5">Fecha del análisis</p>
                          <p className="text-slate-900">{cert.fecha}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <button 
                          onClick={() => {
                            setSelectedCertId(cert.id)
                            document.getElementById('certificados-lotes')?.scrollIntoView({ behavior: 'smooth' })
                          }}
                          className="flex-1 rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-900 transition-colors hover:bg-slate-200 text-center"
                        >
                          Ver certificado
                        </button>
                        <Link 
                          href={cert.enlaceProducto}
                          className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-[#1959D7] transition-colors hover:bg-slate-50 text-center"
                        >
                          Ver producto
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
                    <p className="text-sm text-slate-900 font-medium mb-1">No encontramos certificados con esa búsqueda.</p>
                    <p className="text-sm text-slate-500 mb-4">Prueba con el nombre del producto o el número de lote.</p>
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      Limpiar búsqueda
                    </button>
                  </div>
                )}
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN: Detail */}
          <div className="lg:col-span-7">
            <section id="certificados-lotes" className="scroll-mt-28 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 sticky top-28">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Certificados y lotes</h2>
              <p className="text-sm text-slate-600 mb-8">
                Consulta los certificados publicados y los informes de lotes anteriores.
              </p>

              {selectedCert ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* DETALLE DEL CERTIFICADO */}
                    <div className="rounded-xl bg-white p-6 md:p-8 shadow-sm border border-slate-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-[#1959D7]/10 flex items-center justify-center shrink-0">
                            <Icon icon="lucide:file-check-2" className="h-6 w-6 text-[#1959D7]" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-900">{selectedCert.product}</h3>
                            <p className="text-sm text-slate-500">Informe n.º {selectedCert.informe}</p>
                          </div>
                        </div>
                        <Link 
                          href={selectedCert.enlaceProducto}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-[#1959D7] transition-colors hover:bg-slate-50 shrink-0"
                        >
                          <Icon icon="lucide:package" className="h-4 w-4" />
                          Ver producto
                        </Link>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-8 mb-8">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">Resultados del análisis</h4>
                          <div className="space-y-2.5">
                            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-md border border-slate-100">
                              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Cantidad medida</span>
                              <span className="text-sm font-bold text-slate-900">10,74 mg</span>
                            </div>
                            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-md border border-slate-100">
                              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pureza por HPLC</span>
                              <span className="text-sm font-bold text-slate-900">99,191 %</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">Alcance de este análisis</h4>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            Este informe corresponde a una muestra de {selectedCert.product}, lote {selectedCert.lote}, analizada por {selectedCert.laboratorio}. Reporta 10,74 mg y una pureza de 99,191 %. Los resultados corresponden a la muestra analizada; no significan que se haya examinado cada vial del lote.
                          </p>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-100">
                        <h4 className="text-sm font-bold text-slate-900 mb-4">Certificados de este lote</h4>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button 
                            onClick={() => {
                              const dialog = document.getElementById('cert-viewer') as HTMLDialogElement
                              if (dialog) dialog.showModal()
                            }}
                            className="flex-1 inline-flex justify-center items-center gap-2 rounded-lg bg-[#1959D7] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1959D7]/90"
                          >
                            <Icon icon="lucide:image" className="h-4 w-4" />
                            Abrir certificado
                          </button>
                          <a 
                            href="/certificados/RT10_Janoshik_223529_Informe.pdf" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex-1 inline-flex justify-center items-center gap-2 rounded-lg border-2 border-slate-200 bg-white px-6 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
                          >
                            <Icon icon="lucide:file-text" className="h-4 w-4" />
                            Ver cromatograma (PDF)
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Icon icon="lucide:search-x" className="h-12 w-12 text-slate-300 mb-4" />
                    <p className="text-sm font-medium text-slate-500">
                      Selecciona un certificado de la lista para ver su detalle aquí.
                    </p>
                  </div>
                )}
              </section>
            </div>

          </div>

          {/* EDUCATIONAL BLOCKS */}
          <div className="mt-16 pt-16 border-t border-slate-200">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Cómo revisar un certificado</h2>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600 font-bold text-sm">1</div>
                    <div>
                      <p className="text-base text-slate-700 leading-relaxed">
                        <strong>Ubica la presentación y el lote.</strong> Revisa que correspondan al producto que quieres consultar.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600 font-bold text-sm">2</div>
                    <div>
                      <p className="text-base text-slate-700 leading-relaxed">
                        <strong>Abre el informe.</strong> Revisa el laboratorio, la fecha del análisis y los resultados.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600 font-bold text-sm">3</div>
                    <div>
                      <p className="text-base text-slate-700 leading-relaxed">
                        <strong>Compara los datos.</strong> Revisa que el certificado y el cromatograma correspondan a la misma muestra y consulta sus resultados completos.
                      </p>
                    </div>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Qué puede decirte un análisis</h2>
                <p className="text-base text-slate-600 mb-8 leading-relaxed">
                  En los certificados de péptidos suelen aparecer tres datos: identidad, pureza y cantidad. Cada uno responde una pregunta distinta. Revisa cuáles incluye el informe que estás consultando.
                </p>
                
                <div className="flex flex-col gap-6">
                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-xl">
                    <h3 className="text-sm font-bold text-slate-900 mb-2">Identidad: ¿qué compuesto se identificó?</h3>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Indica qué compuesto identificó el laboratorio al comparar las características medidas de la muestra con las esperadas para ese compuesto.
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-xl">
                    <h3 className="text-sm font-bold text-slate-900 mb-2">Pureza: ¿qué tanto predomina ese compuesto?</h3>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      En HPLC, compara la señal del péptido con las señales incluidas en el análisis. El resultado se expresa como porcentaje de área; no indica cuántos miligramos contiene el vial.
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-xl">
                    <h3 className="text-sm font-bold text-slate-900 mb-2">Cantidad: ¿cuánto se midió?</h3>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Indica la cantidad de compuesto medida en la muestra, por ejemplo, en miligramos. Es un resultado distinto de la cantidad declarada en la etiqueta y del porcentaje de pureza.
                    </p>
                  </div>
                </div>

                {/* Fuente link oculta en texto pero presente para referencia */}
                <div className="mt-6 text-right">
                  <a 
                    href="https://www.bachem.com/knowledge-center/quality-control-of-amino-acids-peptides-a-guide/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <Icon icon="lucide:external-link" className="h-3.5 w-3.5" />
                    Consultar fuente
                  </a>
                </div>
              </section>

            </div>

            <div className="mt-12 lg:mt-16">
              <section className="max-w-3xl">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Cómo identifica el laboratorio un péptido</h2>
                <p className="text-base text-slate-600 mb-8 leading-relaxed">
                  Un péptido es una cadena de aminoácidos: pequeñas piezas unidas en un orden determinado. Para identificarlo, el laboratorio estudia características que puede medir y las compara con referencias conocidas. Estas son algunas de las técnicas utilizadas; no todos los análisis incluyen todas.
                </p>

                <div className="bg-slate-50 border border-slate-100 p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Separar los componentes: HPLC o UHPLC</h3>
                  <div className="space-y-4">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Un equipo de cromatografía líquida hace pasar la muestra por una columna. Los componentes interactúan de forma diferente con ella y pueden salir en momentos distintos. Un detector, con frecuencia de luz ultravioleta, registra sus señales.
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      El resultado es una gráfica llamada cromatograma. Sus picos muestran señales detectadas a lo largo del análisis. Comparar el tiempo de salida con el de una referencia, bajo las mismas condiciones, aporta información para identificar el compuesto. Ese tiempo, por sí solo, no demuestra toda su estructura.
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      HPLC y UHPLC son variantes de esta técnica de separación. Lo importante al leer el informe es saber qué método se utilizó y qué resultados produjo.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-6 rounded-xl mt-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Medir la masa de las moléculas: MS</h3>
                  <div className="space-y-4">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Un espectrómetro de masas mide señales que permiten determinar la masa molecular y compararla con la esperada para el péptido. Cuando se conecta a un equipo de cromatografía líquida, el análisis se llama LC-MS.
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      La masa coincidente aporta otra evidencia de identidad. No demuestra por sí sola el orden completo de los aminoácidos: dos cadenas distintas pueden tener la misma masa.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-6 rounded-xl mt-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Examinar el orden de sus piezas: MS/MS</h3>
                  <div className="space-y-4">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Si se necesita estudiar la secuencia, una técnica llamada MS/MS analiza fragmentos del péptido con carga eléctrica. Al comparar sus masas con las esperadas, se obtiene información sobre el orden de los aminoácidos.
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Es un análisis adicional: no está incluido automáticamente en todos los certificados. La información que aporta depende del método y de los fragmentos que se hayan podido observar.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-6 rounded-xl mt-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">¿Con qué se compara la muestra?</h3>
                  <div className="space-y-4">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Según la prueba, el laboratorio puede comparar la muestra con un material de referencia: una sustancia previamente caracterizada que sirve como punto de comparación. También puede contrastar la masa medida con la calculada para el péptido, o comparar sus fragmentos con los esperados.
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Para medir cantidad, necesita relacionar la señal del equipo con cantidades conocidas mediante un método comprobado; por ejemplo, usando una curva de calibración.
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      La confianza aumenta cuando métodos adecuados aportan evidencias que coinciden entre sí. Importan la referencia, los controles y la capacidad del método para distinguir el compuesto de otras sustancias.
                    </p>
                  </div>
                </div>

                {/* Fuente links oculta en texto pero presente para referencia */}
                <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-4 text-left">
                  <a 
                    href="https://www.thermofisher.com/us/en/home/industrial/chromatography/chromatography-learning-center/liquid-chromatography-information/hplc-basics.html" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <Icon icon="lucide:external-link" className="h-3.5 w-3.5" />
                    Consultar fuente Thermo Fisher
                  </a>
                  <a 
                    href="https://www.mzbiolabs.com/mzbiolabs/our-techniques/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <Icon icon="lucide:external-link" className="h-3.5 w-3.5" />
                    Consultar fuente MZ Biolabs
                  </a>
                  <a 
                    href="https://www.jpt.com/bioassays-analytics/peptide-analysis-services/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <Icon icon="lucide:external-link" className="h-3.5 w-3.5" />
                    Consultar fuente JPT
                  </a>
                  <a 
                    href="https://database.ich.org/sites/default/files/ICH_Q2(R2)_Guideline_2023_1130.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <Icon icon="lucide:external-link" className="h-3.5 w-3.5" />
                    Consultar fuente ICH Q2(R2)
                  </a>
                </div>
              </section>
            </div>

            <div className="mt-12 lg:mt-16 border-t border-slate-200 pt-16">
              <section className="max-w-3xl">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Qué significa el resultado</h2>

                <div className="bg-slate-50 border border-slate-100 p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Un porcentaje de pureza no es una cantidad en miligramos</h3>
                  <div className="space-y-4">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Cuando un informe expresa la pureza por HPLC como porcentaje de área, compara el área del pico asignado al péptido con las áreas incluidas en el análisis.
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Por eso, un 99 % de pureza por este método no significa que el 99 % del peso del contenido del vial sea el péptido buscado. El agua, las sales y otros componentes pueden necesitar mediciones diferentes. La cantidad de péptido se consulta en su propio resultado.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-6 rounded-xl mt-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Otras pruebas responden otras preguntas</h3>
                  <div className="space-y-4">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Según lo solicitado, un laboratorio también puede analizar:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1.5 marker:text-slate-400">
                      <li><strong>Agua y residuos de solventes:</strong> cuánto queda de esas sustancias en la muestra.</li>
                      <li><strong>Microorganismos:</strong> los recuentos microbianos y las pruebas de esterilidad son ensayos distintos.</li>
                      <li><strong>Endotoxinas:</strong> componentes de ciertas bacterias que requieren una prueba específica.</li>
                    </ul>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Estas pruebas no se deducen de la identidad ni del porcentaje de pureza. Busca su resultado por separado. «No detectado» significa que el método no detectó la sustancia dentro de sus límites; no equivale a ausencia absoluta.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-6 rounded-xl mt-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Qué confianza aporta un certificado</h3>
                  <div className="space-y-4">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Te permite revisar qué encontró un laboratorio en una muestra concreta, quién hizo el análisis y qué pruebas utilizó. La identificación tiene más respaldo cuando el método distingue adecuadamente el compuesto y las evidencias obtenidas son consistentes.
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Un certificado se entiende mejor completo: muestra, método, resultados y fecha. Un número de pureza aislado no cuenta toda la historia.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-6 rounded-xl mt-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">La muestra analizada y su lote</h3>
                  <div className="space-y-4">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      El laboratorio analiza la muestra que recibe. El número de lote permite relacionarla con un grupo de unidades del producto. Que una muestra haya sido analizada no significa que se haya examinado cada vial.
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Para saber hasta dónde representa al lote, también importa cómo se seleccionó la muestra, cómo se documentó su origen y qué tan uniforme es el lote. Verificar el informe en la página del laboratorio ayuda a comprobar el documento; la correspondencia con el producto se revisa mediante su presentación y lote.
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed mt-4 font-medium border-t border-slate-200/60 pt-4">
                      Un COA documenta los análisis realizados. No demuestra por sí solo seguridad o eficacia de uso.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-4 text-left">
                  <a 
                    href="https://www.bachem.com/knowledge-center/peptide-content-concentration-calculator/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <Icon icon="lucide:external-link" className="h-3.5 w-3.5" />
                    Consultar fuente Bachem (Contenido del péptido)
                  </a>
                  <a 
                    href="https://www.bachem.com/analytical-capabilities/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <Icon icon="lucide:external-link" className="h-3.5 w-3.5" />
                    Consultar fuente Bachem (Capacidades analíticas)
                  </a>
                  <a 
                    href="https://www.fda.gov/media/83477/download" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <Icon icon="lucide:external-link" className="h-3.5 w-3.5" />
                    Consultar fuente FDA
                  </a>
                  <a 
                    href="https://www.mzbiolabs.com/mzbiolabs/coa-testing/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <Icon icon="lucide:external-link" className="h-3.5 w-3.5" />
                    Consultar fuente MZ Biolabs (Alcance pureza)
                  </a>
                </div>
              </section>
            </div>

            {/* PREGUNTAS FRECUENTES */}
            <div className="mt-16 border-t border-slate-200 pt-16">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Preguntas frecuentes</h2>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10 max-w-4xl mx-auto">
                
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">¿Qué es un lote?</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Es el código que identifica un grupo de unidades de un producto. Permite relacionar esa presentación con su documentación.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">¿Qué significa «Certificado pendiente»?</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Que todavía no hay un certificado publicado para esa presentación y lote.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">¿Puedo consultar certificados de lotes anteriores?</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Sí. Puedes consultar los certificados de lotes anteriores aquí, en Calidad. Se identifican como «Lote anterior».
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">¿Qué hago si no encuentro un certificado?</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    Escríbenos por WhatsApp con el nombre del producto y el número de lote, si lo tienes. Te ayudamos a revisar la documentación disponible.
                  </p>
                  <a 
                    href="https://wa.me/573023041412" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#25D366]/90"
                  >
                    <Icon icon="lucide:message-circle" className="h-4 w-4" />
                    Escribir por WhatsApp
                  </a>
                </div>

              </div>
            </div>

            {/* CONSULTA EL PRODUCTO */}
            <div className="mt-16 border-t border-slate-200 pt-16">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">Consulta el producto</h2>
              <p className="text-sm text-slate-600 leading-relaxed text-center max-w-2xl mx-auto mb-8">
                Revisa su presentación, precio y disponibilidad en la tienda.
              </p>
              <div className="text-center">
                <Link 
                  href="/tienda"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-8 py-3.5 text-sm font-bold text-slate-900 transition-colors hover:bg-slate-200"
                >
                  Ver productos
                  <Icon icon="lucide:arrow-right" className="h-4 w-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* DIALOG VISOR (NATIVO HTML) */}
        <dialog id="cert-viewer" className="backdrop:bg-black/80 backdrop:backdrop-blur-sm bg-transparent w-full max-w-5xl h-[90vh] p-0 m-auto rounded-xl shadow-2xl overflow-hidden focus:outline-none">
          <div className="flex flex-col h-full bg-white">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Icon icon="lucide:image" className="h-4 w-4" />
                {selectedCert?.product} - Lote {selectedCert?.lote}
              </h3>
              <div className="flex items-center gap-2">
                <a 
                  href="/certificados/RT10_Janoshik_223529_Certificado.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#1959D7] hover:underline px-2 hidden sm:block"
                >
                  Abrir certificado
                </a>
                <button 
                  onClick={() => {
                    const dialog = document.getElementById('cert-viewer') as HTMLDialogElement
                    if (dialog) dialog.close()
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-300 transition-colors"
                >
                  <Icon icon="lucide:x" className="h-4 w-4" />
                  Cerrar
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto bg-slate-100 p-4 flex items-center justify-center relative">
              <img 
                src="/certificados/RT10_Janoshik_223529_Certificado.png" 
                alt="Certificado de análisis" 
                className="max-w-full max-h-full object-contain shadow-sm bg-white peer"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const errorMsg = document.getElementById('cert-viewer-error');
                  if (errorMsg) errorMsg.style.display = 'flex';
                }}
              />
              <div id="cert-viewer-error" className="hidden flex-col items-center justify-center gap-4 text-center absolute inset-0 bg-slate-100 p-6">
                <Icon icon="lucide:file-warning" className="h-10 w-10 text-slate-400" />
                <p className="text-sm font-bold text-slate-700">No pudimos abrir el archivo.</p>
                <a 
                  href="/certificados/RT10_Janoshik_223529_Certificado.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#1959D7] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#1959D7]/90"
                >
                  Abrir certificado
                </a>
              </div>
            </div>
          </div>
        </dialog>
    </>
  )
}
