'use client'

import { useState, useMemo, useEffect } from 'react'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Data representing available certificates
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
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="mb-2.5 flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1959D7]/20 border border-[#1959D7]/30">
              <Icon icon="lucide:shield-check" className="h-4 w-4 text-[#1959D7]" />
            </div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1959D7]">
              Verificación Independiente
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl mb-3 leading-tight">
            Calidad y certificados de análisis
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Un certificado de análisis (COA) muestra los resultados de una muestra evaluada por un laboratorio independiente. Consulta los informes disponibles y revisa el producto, la presentación y el lote de cada uno.
          </p>
        </motion.div>

        {/* Main Grid: Left List + Right Detail */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          
          {/* LEFT COLUMN: Search & List */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Search Section in White Card */}
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-md text-slate-900">
              <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Icon icon="lucide:search" className="h-4 w-4 text-[#1959D7]" />
                Encuentra un certificado
              </h2>
              <div className="flex flex-col gap-2.5">
                <label htmlFor="coa-search" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Buscar certificados
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Icon icon="lucide:search" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      id="coa-search"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Producto, lote o informe"
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#1959D7] focus:outline-none focus:ring-2 focus:ring-[#1959D7]/20 transition-all"
                    />
                  </div>
                  <button className="rounded-xl bg-[#1959D7] px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#1959D7]/90 active:scale-95 shrink-0">
                    Buscar
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  También puedes buscar por laboratorio o número de informe.
                </p>
              </div>
            </section>

            {/* List Section */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-white">Certificados disponibles</h2>
                <span className="text-xs font-mono font-bold text-slate-300 bg-white/10 px-2 py-0.5 rounded-full">({filteredCerts.length})</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mb-4">
                Abre un certificado para consultar el informe completo y los datos del lote.
              </p>
              
              <div className="flex flex-col gap-3">
                {certificates.length === 0 ? (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                    <Icon icon="lucide:file-x-2" className="h-10 w-10 text-slate-400 mx-auto mb-3" />
                    <p className="text-sm font-bold text-slate-900 mb-1">No hay certificados publicados por el momento.</p>
                    <p className="text-xs text-slate-500 mb-4">Puedes escribirnos por WhatsApp para consultar la documentación disponible.</p>
                    <a 
                      href="https://wa.me/573023041412" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#25D366]/90 shadow-sm"
                    >
                      <Icon icon="lucide:message-circle" className="h-4 w-4" />
                      Escribir por WhatsApp
                    </a>
                  </div>
                ) : filteredCerts.length > 0 ? (
                  filteredCerts.map((cert) => {
                    const isSelected = selectedCertId === cert.id
                    return (
                      <div 
                        key={cert.id} 
                        onClick={() => {
                          setSelectedCertId(cert.id)
                          document.getElementById('certificados-lotes')?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        className={`group relative rounded-2xl border p-4 sm:p-5 transition-all duration-300 cursor-pointer bg-white text-slate-900 shadow-sm ${
                          isSelected 
                            ? 'border-[#1959D7] ring-2 ring-[#1959D7]/30 shadow-md' 
                            : 'border-slate-200 hover:border-[#1959D7]/50 hover:shadow-md'
                        }`}
                      >
                        {/* Selected Indicator Bar */}
                        {isSelected && (
                          <div className="absolute left-0 top-3 bottom-3 w-1.5 rounded-r-full bg-[#1959D7]" />
                        )}

                        <div className="flex items-start justify-between gap-3 mb-3">
                          <h3 className="text-base font-bold text-slate-900 group-hover:text-[#1959D7] transition-colors">{cert.product}</h3>
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 shrink-0">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            {cert.estado}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2.5 mb-4 text-xs">
                          <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                            <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-0.5">Lote</p>
                            <p className="text-slate-900 font-mono font-semibold">{cert.lote}</p>
                          </div>
                          <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                            <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-0.5">Laboratorio</p>
                            <p className="text-slate-900 font-semibold">{cert.laboratorio}</p>
                          </div>
                          <div className="col-span-2 bg-slate-50 rounded-xl p-2.5 border border-slate-100 flex justify-between items-center">
                            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Fecha Análisis</span>
                            <span className="text-slate-900 font-medium">{cert.fecha}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedCertId(cert.id)
                              document.getElementById('certificados-lotes')?.scrollIntoView({ behavior: 'smooth' })
                            }}
                            className={`flex-1 rounded-xl px-3 py-2 text-xs font-bold transition-all text-center ${
                              isSelected
                                ? 'bg-[#1959D7] text-white shadow-sm hover:bg-[#1959D7]/90'
                                : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                            }`}
                          >
                            Ver detalle
                          </button>
                          <Link 
                            href={cert.enlaceProducto}
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-[#1959D7] transition-all hover:bg-slate-50 text-center flex items-center justify-center gap-1"
                          >
                            Ver producto
                            <Icon icon="lucide:arrow-right" className="h-3 w-3 text-[#1959D7]" />
                          </Link>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center bg-white">
                    <p className="text-sm text-slate-900 font-bold mb-1">No encontramos certificados con esa búsqueda.</p>
                    <p className="text-xs text-slate-500 mb-4">Prueba con el nombre del producto o el número de lote.</p>
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      Limpiar búsqueda
                    </button>
                  </div>
                )}
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN: Compact Detail Card in White */}
          <div className="lg:col-span-7">
            <section 
              id="certificados-lotes" 
              className="scroll-mt-28 bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xl sticky top-24 text-slate-900"
            >
              {/* Header inside right card */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <Icon icon="lucide:file-check-2" className="h-5 w-5 text-[#1959D7]" />
                    Certificados y lotes
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Informes publicados y resultados del lote seleccionado.
                  </p>
                </div>
              </div>

              {selectedCert ? (
                <div className="animate-in fade-in duration-300">
                    {/* Compact Inner Box */}
                    <div className="rounded-xl bg-slate-50/80 p-4 sm:p-5 border border-slate-200/80">
                      
                      {/* Product Header Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-200/60">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-[#1959D7]/10 border border-[#1959D7]/20 flex items-center justify-center shrink-0">
                            <Icon icon="lucide:flask-conical" className="h-5 w-5 text-[#1959D7]" />
                          </div>
                          <div>
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">{selectedCert.product}</h3>
                            <p className="text-xs text-slate-500 font-mono mt-0.5">Informe n.º {selectedCert.informe}</p>
                          </div>
                        </div>
                        <Link 
                          href={selectedCert.enlaceProducto}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-[#1959D7] transition-all hover:bg-slate-100 shrink-0 self-start sm:self-center shadow-xs"
                        >
                          <Icon icon="lucide:package" className="h-3.5 w-3.5" />
                          Ver producto
                        </Link>
                      </div>
                      
                      {/* Analysis Results & Scope Compact Grid */}
                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        
                        {/* Stats Column */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1.5 flex items-center gap-1.5">
                            <Icon icon="lucide:bar-chart-3" className="h-3.5 w-3.5 text-[#1959D7]" />
                            Resultados del análisis
                          </h4>
                          <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs">
                            <span className="text-[11px] font-mono font-bold text-slate-500 uppercase">Cantidad medida</span>
                            <span className="text-sm font-bold text-slate-900">10,74 mg</span>
                          </div>
                          <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs">
                            <span className="text-[11px] font-mono font-bold text-slate-500 uppercase">Pureza por HPLC</span>
                            <span className="text-sm font-bold text-[#1959D7]">99,191 %</span>
                          </div>
                        </div>

                        {/* Scope Column */}
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1.5 flex items-center gap-1.5">
                            <Icon icon="lucide:info" className="h-3.5 w-3.5 text-[#1959D7]" />
                            Alcance del análisis
                          </h4>
                          <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs">
                            <p className="text-xs text-slate-600 leading-relaxed">
                              Informe correspondiente a muestra de <strong className="text-slate-900">{selectedCert.product}</strong> (lote {selectedCert.lote}), analizada por <strong className="text-slate-900">{selectedCert.laboratorio}</strong>. Reporta 10,74 mg y pureza de 99,191 %.
                            </p>
                          </div>
                        </div>

                      </div>

                      {/* Action Buttons Row */}
                      <div className="pt-3.5 border-t border-slate-200/80">
                        <div className="flex flex-col sm:flex-row gap-2.5">
                          <button 
                            onClick={() => {
                              const dialog = document.getElementById('cert-viewer') as HTMLDialogElement
                              if (dialog) dialog.showModal()
                            }}
                            className="flex-1 inline-flex justify-center items-center gap-2 rounded-xl bg-[#1959D7] px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#1959D7]/90 shadow-md active:scale-95"
                          >
                            <Icon icon="lucide:image" className="h-4 w-4" />
                            Abrir certificado
                          </button>
                          <a 
                            href="/certificados/RT10_Janoshik_223529_Informe.pdf" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex-1 inline-flex justify-center items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition-all hover:bg-slate-100"
                          >
                            <Icon icon="lucide:file-text" className="h-4 w-4 text-slate-500" />
                            Ver cromatograma (PDF)
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Icon icon="lucide:search-x" className="h-10 w-10 text-slate-400 mb-3" />
                  <p className="text-xs sm:text-sm font-medium text-slate-500">
                    Selecciona un certificado de la lista para ver su detalle aquí.
                  </p>
                </div>
              )}
            </section>
          </div>

        </div>

        {/* EDUCATIONAL BLOCKS */}
        <div className="mt-16 pt-12 border-t border-slate-800/80">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
            
            {/* Steps block */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Icon icon="lucide:list-checks" className="h-6 w-6 text-[#1959D7]" />
                Cómo revisar un certificado
              </h2>
              <ul className="space-y-4">
                <li className="flex gap-4 items-start bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm text-slate-900">
                  <div className="h-7 w-7 rounded-lg bg-[#1959D7] text-white flex items-center justify-center shrink-0 font-mono font-bold text-xs shadow-xs">1</div>
                  <div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      <strong className="text-slate-900">Ubica la presentación y el lote:</strong> Revisa que correspondan al producto que quieres consultar.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4 items-start bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm text-slate-900">
                  <div className="h-7 w-7 rounded-lg bg-[#1959D7] text-white flex items-center justify-center shrink-0 font-mono font-bold text-xs shadow-xs">2</div>
                  <div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      <strong className="text-slate-900">Abre el informe:</strong> Revisa el laboratorio, la fecha del análisis y los resultados.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4 items-start bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm text-slate-900">
                  <div className="h-7 w-7 rounded-lg bg-[#1959D7] text-white flex items-center justify-center shrink-0 font-mono font-bold text-xs shadow-xs">3</div>
                  <div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      <strong className="text-slate-900">Compara los datos:</strong> Revisa que el certificado y el cromatograma correspondan a la misma muestra.
                    </p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Analysis details */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <Icon icon="lucide:microscope" className="h-6 w-6 text-[#1959D7]" />
                Qué puede decirte un análisis
              </h2>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                En los certificados de péptidos suelen aparecer tres datos: identidad, pureza y cantidad. Cada uno responde una pregunta distinta.
              </p>
              
              <div className="flex flex-col gap-4">
                <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-xl shadow-sm text-slate-900">
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#1959D7]" />
                    Identidad: ¿qué compuesto se identificó?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Indica qué compuesto identificó el laboratorio al comparar las características medidas de la muestra con las esperadas para ese compuesto.
                  </p>
                </div>
                
                <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-xl shadow-sm text-slate-900">
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#1959D7]" />
                    Pureza: ¿qué tanto predomina ese compuesto?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    En HPLC, compara la señal del péptido con las señales incluidas en el análisis. El resultado se expresa como porcentaje de área; no indica cuántos miligramos contiene el vial.
                  </p>
                </div>
                
                <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-xl shadow-sm text-slate-900">
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#1959D7]" />
                    Cantidad: ¿cuánto se midió?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Indica la cantidad de compuesto medida en la muestra, por ejemplo, en miligramos. Es un resultado distinto de la cantidad declarada en la etiqueta y del porcentaje de pureza.
                  </p>
                </div>
              </div>

              <div className="mt-4 text-right">
                <a 
                  href="https://www.bachem.com/knowledge-center/quality-control-of-amino-acids-peptides-a-guide/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors"
                >
                  <Icon icon="lucide:external-link" className="h-3.5 w-3.5 text-[#1959D7]" />
                  Consultar fuente Bachem
                </a>
              </div>
            </section>

          </div>

          {/* Deep Technical Explanation */}
          <div className="mt-12 lg:mt-16 border-t border-slate-800/80 pt-12">
            <section className="max-w-4xl">
              <h2 className="text-2xl font-bold text-white mb-3">Cómo identifica el laboratorio un péptido</h2>
              <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
                Un péptido es una cadena de aminoácidos: pequeñas piezas unidas en un orden determinado. Para identificarlo, el laboratorio estudia características que puede medir y las compara con referencias conocidas.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200/80 p-5 rounded-xl shadow-sm text-slate-900">
                  <h3 className="text-base font-bold text-slate-900 mb-2">Separar los componentes: HPLC o UHPLC</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Un equipo de cromatografía líquida hace pasar la muestra por una columna. Los componentes interactúan de forma diferente y salen en momentos distintos registrados en un cromatograma.
                  </p>
                </div>

                <div className="bg-white border border-slate-200/80 p-5 rounded-xl shadow-sm text-slate-900">
                  <h3 className="text-base font-bold text-slate-900 mb-2">Medir la masa de las moléculas: MS</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Un espectrómetro de masas mide señales para determinar la masa molecular y compararla con la esperada (LC-MS). La masa coincidente aporta una fuerte evidencia de identidad.
                  </p>
                </div>

                <div className="bg-white border border-slate-200/80 p-5 rounded-xl shadow-sm text-slate-900">
                  <h3 className="text-base font-bold text-slate-900 mb-2">Examinar el orden: MS/MS</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Si se necesita estudiar la secuencia, la técnica MS/MS analiza fragmentos del péptido para obtener información detallada sobre el orden exacto de los aminoácidos.
                  </p>
                </div>

                <div className="bg-white border border-slate-200/80 p-5 rounded-xl shadow-sm text-slate-900">
                  <h3 className="text-base font-bold text-slate-900 mb-2">Comparación con Referencias</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    El laboratorio compara la muestra con materiales de referencia previamente caracterizados. La confianza aumenta cuando múltiples métodos validados aportan evidencias coincidentes.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Results Interpretation */}
          <div className="mt-12 lg:mt-16 border-t border-slate-800/80 pt-12">
            <section className="max-w-4xl">
              <h2 className="text-2xl font-bold text-white mb-6">Qué significa el resultado</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200/80 p-5 rounded-xl shadow-sm text-slate-900">
                  <h3 className="text-base font-bold text-slate-900 mb-2">Pureza HPLC vs Cantidad</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Un 99% de pureza por HPLC indica que el 99% de la señal medida en el detector corresponde al péptido. No indica la masa total del vial ni reemplaza la medición de contenido.
                  </p>
                </div>

                <div className="bg-white border border-slate-200/80 p-5 rounded-xl shadow-sm text-slate-900">
                  <h3 className="text-base font-bold text-slate-900 mb-2">Confianza y Alcance del Lote</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Un COA documenta los análisis en la muestra examinada. Permite verificar los resultados del laboratorio y trazabilidad con la presentación y el número de lote.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 border-t border-slate-800/80 pt-12">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Preguntas frecuentes</h2>
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              
              <div className="bg-white border border-slate-200/80 p-5 rounded-xl shadow-sm text-slate-900">
                <h3 className="text-base font-bold text-slate-900 mb-1.5">¿Qué es un lote?</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Es el código que identifica un grupo de unidades de un producto. Permite relacionar esa presentación con su documentación.
                </p>
              </div>

              <div className="bg-white border border-slate-200/80 p-5 rounded-xl shadow-sm text-slate-900">
                <h3 className="text-base font-bold text-slate-900 mb-1.5">¿Qué significa «Certificado pendiente»?</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Que todavía no hay un certificado publicado para esa presentación y lote.
                </p>
              </div>

              <div className="bg-white border border-slate-200/80 p-5 rounded-xl shadow-sm text-slate-900">
                <h3 className="text-base font-bold text-slate-900 mb-1.5">¿Puedo consultar certificados anteriores?</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Sí. Puedes consultar los certificados de lotes anteriores aquí en la sección de Calidad.
                </p>
              </div>

              <div className="bg-white border border-slate-200/80 p-5 rounded-xl shadow-sm text-slate-900">
                <h3 className="text-base font-bold text-slate-900 mb-1.5">¿Qué hago si no encuentro un certificado?</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                  Escríbenos por WhatsApp con el nombre del producto y el número de lote para ayudarte.
                </p>
                <a 
                  href="https://wa.me/573023041412" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#25D366]/90 shadow-sm"
                >
                  <Icon icon="lucide:message-circle" className="h-4 w-4" />
                  Escribir por WhatsApp
                </a>
              </div>

            </div>
          </div>

          {/* Call to action shop in White Card */}
          <div className="mt-16 border-t border-slate-800/80 pt-12">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-lg text-center max-w-3xl mx-auto text-slate-900">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Consulta el catálogo de productos</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto mb-6">
                Revisa las presentaciones, disponibilidad y precios de cada producto en nuestra tienda.
              </p>
              <Link 
                href="/tienda"
                className="inline-flex items-center gap-2 rounded-xl bg-[#1959D7] px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#1959D7]/90 shadow-md active:scale-95"
              >
                Ver tienda de productos
                <Icon icon="lucide:arrow-right" className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* DIALOG VISOR (NATIVO HTML) */}
      <dialog id="cert-viewer" className="backdrop:bg-black/85 backdrop:backdrop-blur-md bg-transparent w-full max-w-5xl h-[90vh] p-0 m-auto rounded-2xl shadow-2xl overflow-hidden focus:outline-none border border-slate-800">
        <div className="flex flex-col h-full bg-slate-950 text-white">
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-900">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Icon icon="lucide:image" className="h-4 w-4 text-[#1959D7]" />
              {selectedCert?.product} - Lote {selectedCert?.lote}
            </h3>
            <div className="flex items-center gap-3">
              <a 
                href="/certificados/RT10_Janoshik_223529_Certificado.png"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#1959D7] hover:underline hidden sm:block"
              >
                Abrir certificado original
              </a>
              <button 
                onClick={() => {
                  const dialog = document.getElementById('cert-viewer') as HTMLDialogElement
                  if (dialog) dialog.close()
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-700 transition-colors"
              >
                <Icon icon="lucide:x" className="h-4 w-4" />
                Cerrar
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto bg-slate-900/50 p-4 flex items-center justify-center relative">
            <img 
              src="/certificados/RT10_Janoshik_223529_Certificado.png" 
              alt="Certificado de análisis" 
              className="max-w-full max-h-full object-contain shadow-2xl bg-white peer rounded-lg"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const errorMsg = document.getElementById('cert-viewer-error');
                if (errorMsg) errorMsg.style.display = 'flex';
              }}
            />
            <div id="cert-viewer-error" className="hidden flex-col items-center justify-center gap-4 text-center absolute inset-0 bg-slate-950 p-6">
              <Icon icon="lucide:file-warning" className="h-10 w-10 text-slate-500" />
              <p className="text-sm font-bold text-slate-300">No pudimos abrir el archivo directamente.</p>
              <a 
                href="/certificados/RT10_Janoshik_223529_Certificado.png"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#1959D7] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1959D7]/90"
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
