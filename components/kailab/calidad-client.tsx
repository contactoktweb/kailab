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
      <div className="mx-auto max-w-6xl px-4 pt-4 pb-0 sm:px-6 sm:pt-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <div className="mb-3 flex items-center gap-2">
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
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
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
                  <button className="bg-[#1959D7] px-6 py-2.5 font-mono text-xs font-bold tracking-widest uppercase text-white shadow-md transition-all hover:bg-[#1959D7]/90 active:scale-95 shrink-0">
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
              <p className="text-xs text-slate-300/90 mb-3.5">
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
                      className="inline-flex items-center gap-2 bg-[#25D366] px-5 py-2.5 font-mono text-xs font-bold tracking-widest uppercase text-white transition-colors hover:bg-[#25D366]/90 shadow-sm"
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
                            className="flex-1 inline-flex justify-center items-center gap-2 bg-[#1959D7] px-4 py-3 font-mono text-xs font-bold tracking-widest uppercase text-white transition-all hover:bg-[#1959D7]/90 shadow-md active:scale-95"
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

          {/* Elemento gráfico temático (HPLC & Estructura Molecular) bajado medio centímetro */}
          <div className="lg:col-span-12 flex justify-end -mt-12 sm:-mt-[85px] mb-9 pointer-events-none select-none">
            <div className="flex items-center gap-4 opacity-60 hover:opacity-95 transition-opacity duration-500">
              <svg className="h-12 w-40 text-[#1959D7]" viewBox="0 0 160 50" fill="none">
                {/* HPLC Chromatogram Wave */}
                <path d="M 0 40 L 30 40 Q 45 40, 55 25 T 70 6 T 85 38 T 110 40 L 160 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                <circle cx="70" cy="6" r="3.5" fill="#1959D7" />
                {/* Molecular Nodes */}
                <circle cx="130" cy="18" r="3.5" fill="currentColor" />
                <circle cx="150" cy="12" r="2.5" fill="currentColor" />
                <circle cx="145" cy="30" r="2.5" fill="currentColor" />
                <line x1="130" y1="18" x2="150" y2="12" stroke="currentColor" strokeWidth="1.25" opacity="0.6" />
                <line x1="130" y1="18" x2="145" y2="30" stroke="currentColor" strokeWidth="1.25" opacity="0.6" />
              </svg>
              <div className="flex flex-col text-right font-mono text-[10px] tracking-widest text-slate-400 uppercase leading-tight">
                <span className="text-slate-300 font-bold">KAILAB LAB-SPEC</span>
                <span>HPLC · LC-MS VERIFIED</span>
              </div>
            </div>
          </div>

        </div>
      </div> {/* CIERRA CONTAINER PRINCIPAL OSCURO */}

      {/* EDUCATIONAL BLOCKS - FONDO BLANCO FULL WIDTH */}
      <div className="w-full bg-white text-slate-900 border-t border-slate-200 pt-9 pb-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          
          {/* SECTION 1: CÓMO REVISAR UN CERTIFICADO */}
          <section className="mb-9">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-9 pb-6 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1959D7]/10 border border-[#1959D7]/20">
                    <Icon icon="lucide:workflow" className="h-4 w-4 text-[#1959D7]" />
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1959D7]">
                    Proceso de Verificación
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Cómo revisar un certificado
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
                Tres pasos interactivos para comprobar la autenticidad, trazabilidad y precisión analítica de cada informe.
              </p>
            </div>

            {/* Connecting Process Flow Container */}
            <div className="relative">
              {/* Desktop Connecting Line behind cards */}
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-white/10 via-[#1959D7]/40 to-white/10 z-0 pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                
                {/* Card 01 - AZUL NAVY PERMANENTE */}
                <div className="group relative flex flex-col justify-between rounded-2xl border border-white/15 bg-[#17294F] p-6 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#1959D7] hover:shadow-2xl text-white overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1959D7] text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                        <Icon icon="lucide:qr-code" className="h-6 w-6" />
                      </div>
                      <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-slate-200 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                        PASO 1 / 3
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 leading-snug tracking-tight">
                      Ubica la presentación y el lote
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                      Revisa que el nombre del producto, la dosis declarada y el código impreso en el vial coincidan con el documento.
                    </p>

                    {/* Mini Technical Visual Widget 1 */}
                    <div className="rounded-xl bg-white/5 border border-white/10 p-3 flex items-center justify-between font-mono text-[11px] text-slate-200">
                      <span className="flex items-center gap-2 font-bold">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        LOTE #317558
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">100% MATCH</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-slate-200 relative z-10">
                    <span className="flex items-center gap-2">
                      <Icon icon="lucide:check-circle-2" className="h-4 w-4 text-emerald-400" />
                      Etiqueta vs Informe
                    </span>
                    <Icon icon="lucide:arrow-right" className="h-4 w-4 text-blue-300 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Card 02 - AZUL NAVY PERMANENTE */}
                <div className="group relative flex flex-col justify-between rounded-2xl border border-white/15 bg-[#17294F] p-6 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#1959D7] hover:shadow-2xl text-white overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1959D7] text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                        <Icon icon="lucide:file-check" className="h-6 w-6" />
                      </div>
                      <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-slate-200 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                        PASO 2 / 3
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 leading-snug tracking-tight">
                      Abre e inspecciona el informe
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                      Comprueba quién emitió el informe (ej. Janoshik Analytical), la fecha de ensayo y la firma de autenticidad.
                    </p>

                    {/* Mini Technical Visual Widget 2 */}
                    <div className="rounded-xl bg-white/5 border border-white/10 p-3 flex items-center justify-between font-mono text-[11px] text-slate-200">
                      <span className="flex items-center gap-2 font-bold">
                        <Icon icon="lucide:shield-check" className="h-4 w-4 text-blue-300" />
                        JANOSHIK #223529
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">VALIDADO</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-slate-200 relative z-10">
                    <span className="flex items-center gap-2">
                      <Icon icon="lucide:building-2" className="h-4 w-4 text-blue-300" />
                      Laboratorio Externo
                    </span>
                    <Icon icon="lucide:arrow-right" className="h-4 w-4 text-blue-300 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Card 03 - AZUL NAVY PERMANENTE */}
                <div className="group relative flex flex-col justify-between rounded-2xl border border-white/15 bg-[#17294F] p-6 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#1959D7] hover:shadow-2xl text-white overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1959D7] text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                        <Icon icon="lucide:activity" className="h-6 w-6" />
                      </div>
                      <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-slate-200 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                        PASO 3 / 3
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 leading-snug tracking-tight">
                      Compara los datos analíticos
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                      Distingue el porcentaje de pureza HPLC (área pico) de la masa real del compuesto medida en miligramos.
                    </p>

                    {/* Mini Technical Visual Widget 3 */}
                    <div className="rounded-xl bg-white/5 border border-white/10 p-3 flex items-center justify-between font-mono text-[11px] text-slate-200">
                      <span className="flex items-center gap-2 font-bold text-blue-300">
                        <Icon icon="lucide:bar-chart-2" className="h-4 w-4" />
                        HPLC 99.19%
                      </span>
                      <span className="text-[10px] text-white font-bold bg-white/10 px-2 py-0.5 rounded border border-white/20">10.74 mg</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-slate-200 relative z-10">
                    <span className="flex items-center gap-2">
                      <Icon icon="lucide:line-chart" className="h-4 w-4 text-blue-300" />
                      Pureza vs Contenido
                    </span>
                    <Icon icon="lucide:arrow-right" className="h-4 w-4 text-blue-300 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SECTION 2: QUÉ PUEDE DECIRTE UN ANÁLISIS */}
          <section className="mb-9">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-9 pb-6 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1959D7]/10 border border-[#1959D7]/20">
                    <Icon icon="lucide:microscope" className="h-4 w-4 text-[#1959D7]" />
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1959D7]">
                    Métricas Analíticas
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Qué puede decirte un análisis
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
                En los certificados de péptidos suelen aparecer tres datos principales: identidad, pureza y cantidad. Cada uno responde una pregunta científica distinta.
              </p>
            </div>
            
            <div className="flex flex-col gap-5">
              
              {/* Row 1: IDENTIDAD */}
              <div className="group relative bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-[#17294F] hover:bg-[#17294F] flex flex-col md:flex-row items-start md:items-center gap-6 overflow-hidden cursor-default">
                <div className="absolute top-1/2 right-0 -translate-y-1/2 -mr-10 h-40 w-40 rounded-full bg-[#1959D7] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20 pointer-events-none" />

                <div className="flex-shrink-0 flex items-center md:flex-col md:items-start gap-4 w-full md:w-40 relative z-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1959D7]/10 text-[#1959D7] transition-colors duration-500 group-hover:bg-[#1959D7] group-hover:text-white group-hover:shadow-md">
                    <Icon icon="lucide:atom" className="h-7 w-7" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-slate-500 transition-colors duration-500 group-hover:text-slate-400 block mb-1">
                      LC-MS
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight transition-colors duration-500 group-hover:text-white">
                      Identidad
                    </h3>
                  </div>
                </div>

                <div className="flex-grow relative z-10 md:pr-6">
                  <p className="text-sm text-slate-600 leading-relaxed transition-colors duration-500 group-hover:text-slate-300">
                    Indica qué compuesto identificó el laboratorio al comparar la masa molecular y estructura de la muestra con el estándar de referencia. Responde a la pregunta: <em className="text-slate-800 font-medium group-hover:text-slate-200 transition-colors duration-500">¿qué compuesto es realmente?</em>
                  </p>
                </div>

                <div className="flex-shrink-0 w-full md:w-[260px] relative z-10">
                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 transition-colors duration-500 group-hover:bg-white/5 group-hover:border-white/10">
                    <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] mb-3">
                      <span className="flex items-center gap-2 font-bold text-slate-700 transition-colors duration-500 group-hover:text-slate-200">
                        <Icon icon="lucide:fingerprint" className="h-3.5 w-3.5 text-[#1959D7] transition-colors duration-500 group-hover:text-blue-300" />
                        ESTRUCTURA MS
                      </span>
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 transition-colors duration-500 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 group-hover:border-emerald-500/30">
                        COINCIDENTE
                      </span>
                    </div>
                    <div className="flex items-end gap-[2px] h-8 opacity-60">
                      {[30, 50, 40, 90, 100, 60, 20, 40, 80, 50, 30].map((h, i) => (
                        <div key={i} className={`w-full rounded-t-sm ${h === 100 ? 'bg-[#1959D7] group-hover:bg-blue-400' : 'bg-slate-300 group-hover:bg-white/20'}`} style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: PUREZA */}
              <div className="group relative bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-[#17294F] hover:bg-[#17294F] flex flex-col md:flex-row items-start md:items-center gap-6 overflow-hidden cursor-default">
                <div className="absolute top-1/2 right-0 -translate-y-1/2 -mr-10 h-40 w-40 rounded-full bg-[#1959D7] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20 pointer-events-none" />

                <div className="flex-shrink-0 flex items-center md:flex-col md:items-start gap-4 w-full md:w-40 relative z-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1959D7]/10 text-[#1959D7] transition-colors duration-500 group-hover:bg-[#1959D7] group-hover:text-white group-hover:shadow-md">
                    <Icon icon="lucide:pie-chart" className="h-7 w-7" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-slate-500 transition-colors duration-500 group-hover:text-slate-400 block mb-1">
                      HPLC
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight transition-colors duration-500 group-hover:text-white">
                      Pureza
                    </h3>
                  </div>
                </div>

                <div className="flex-grow relative z-10 md:pr-6">
                  <p className="text-sm text-slate-600 leading-relaxed transition-colors duration-500 group-hover:text-slate-300">
                    Compara la señal del compuesto con otras señales registradas en el equipo. Se expresa como porcentaje de área. Responde a la pregunta: <em className="text-slate-800 font-medium group-hover:text-slate-200 transition-colors duration-500">¿qué tanto predomina frente a impurezas?</em>
                  </p>
                </div>

                <div className="flex-shrink-0 w-full md:w-[260px] relative z-10">
                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 transition-colors duration-500 group-hover:bg-white/5 group-hover:border-white/10">
                    <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] mb-4">
                      <span className="flex items-center gap-2 font-bold text-slate-700 transition-colors duration-500 group-hover:text-slate-200">
                        <Icon icon="lucide:activity" className="h-3.5 w-3.5 text-[#1959D7] transition-colors duration-500 group-hover:text-blue-300" />
                        ÁREA HPLC
                      </span>
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 transition-colors duration-500 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 group-hover:border-emerald-500/30">
                        ≥ 99.0%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden transition-colors duration-500 group-hover:bg-white/10">
                      <div className="h-full bg-[#1959D7] transition-all duration-1000 w-[99%] group-hover:bg-emerald-400 relative">
                        <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/40 animate-[shimmer_2s_infinite]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: CANTIDAD */}
              <div className="group relative bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-[#17294F] hover:bg-[#17294F] flex flex-col md:flex-row items-start md:items-center gap-6 overflow-hidden cursor-default">
                <div className="absolute top-1/2 right-0 -translate-y-1/2 -mr-10 h-40 w-40 rounded-full bg-[#1959D7] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20 pointer-events-none" />

                <div className="flex-shrink-0 flex items-center md:flex-col md:items-start gap-4 w-full md:w-40 relative z-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1959D7]/10 text-[#1959D7] transition-colors duration-500 group-hover:bg-[#1959D7] group-hover:text-white group-hover:shadow-md">
                    <Icon icon="lucide:scale" className="h-7 w-7" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-slate-500 transition-colors duration-500 group-hover:text-slate-400 block mb-1">
                      MEDICIÓN
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight transition-colors duration-500 group-hover:text-white">
                      Cantidad
                    </h3>
                  </div>
                </div>

                <div className="flex-grow relative z-10 md:pr-6">
                  <p className="text-sm text-slate-600 leading-relaxed transition-colors duration-500 group-hover:text-slate-300">
                    Indica la cantidad exacta medida en el vial (en miligramos). Es un resultado independiente del porcentaje de pureza. Responde a la pregunta: <em className="text-slate-800 font-medium group-hover:text-slate-200 transition-colors duration-500">¿cuánto compuesto activo hay?</em>
                  </p>
                </div>

                <div className="flex-shrink-0 w-full md:w-[260px] relative z-10">
                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 transition-colors duration-500 group-hover:bg-white/5 group-hover:border-white/10">
                    <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] mb-3">
                      <span className="flex items-center gap-2 font-bold text-slate-700 transition-colors duration-500 group-hover:text-slate-200">
                        <Icon icon="lucide:flask-conical" className="h-3.5 w-3.5 text-[#1959D7] transition-colors duration-500 group-hover:text-blue-300" />
                        MASA NETA
                      </span>
                      <span className="text-[10px] text-slate-700 font-bold bg-white px-2 py-0.5 rounded border border-slate-200 shadow-sm transition-colors duration-500 group-hover:bg-white/10 group-hover:text-white group-hover:border-white/20 group-hover:shadow-none">
                        10.74 mg
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 transition-colors duration-500 group-hover:text-slate-400 font-medium mt-2">
                      <span>Objetivo: 10.0 mg</span>
                      <span className="text-emerald-600 transition-colors duration-500 group-hover:text-emerald-400">+0.74 mg</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 flex justify-end">
              <a 
                href="https://www.bachem.com/knowledge-center/quality-control-of-amino-acids-peptides-a-guide/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1959D7] hover:underline transition-colors"
              >
                <Icon icon="lucide:external-link" className="h-3.5 w-3.5 text-[#1959D7]" />
                Consultar guía técnica de control de calidad Bachem
              </a>
            </div>
          </section>

          {/* Deep Technical Explanation - Bicolor */}
          <div className="mt-9 mb-9">
            <div className="bg-gradient-to-br from-slate-300 via-slate-200/20 to-transparent p-[1px] shadow-2xl">
              <section className="flex flex-col lg:flex-row overflow-hidden bg-white">
                
                {/* Left Side (Navy) */}
                <div className="bg-[#17294F] p-6 sm:p-8 lg:w-2/5 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-[#1959D7] opacity-20 blur-3xl" />
                  <div className="relative z-10">
                    <div className="flex h-12 w-12 items-center justify-center bg-white/10 text-white mb-6">
                    <Icon icon="lucide:microscope" className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight">Cómo identifica el laboratorio un péptido</h2>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Un péptido es una cadena de aminoácidos: pequeñas piezas unidas en un orden determinado. Para identificarlo, el laboratorio estudia características que puede medir y las compara con referencias conocidas.
                  </p>
                </div>
              </div>

              {/* Right Side (White) */}
              <div className="bg-white p-6 sm:p-8 lg:w-3/5">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <span className="flex items-center gap-2 text-xs font-bold text-[#1959D7] mb-2">
                      <Icon icon="lucide:split" className="h-4 w-4" /> HPLC o UHPLC
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mb-2">Separar los componentes</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Un equipo de cromatografía líquida hace pasar la muestra por una columna. Los componentes interactúan de forma diferente y salen en momentos distintos registrados en un cromatograma.
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <span className="flex items-center gap-2 text-xs font-bold text-[#1959D7] mb-2">
                      <Icon icon="lucide:weight" className="h-4 w-4" /> LC-MS
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mb-2">Medir la masa de las moléculas</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Un espectrómetro de masas mide señales para determinar la masa molecular y compararla con la esperada. La masa coincidente aporta fuerte evidencia de identidad.
                    </p>
                  </div>

                  <div className="flex flex-col mt-2 sm:mt-0">
                    <span className="flex items-center gap-2 text-xs font-bold text-[#1959D7] mb-2">
                      <Icon icon="lucide:list-ordered" className="h-4 w-4" /> MS/MS
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mb-2">Examinar el orden</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Si se necesita estudiar la secuencia, la técnica MS/MS analiza fragmentos del péptido para obtener información detallada sobre el orden exacto de los aminoácidos.
                    </p>
                  </div>

                  <div className="flex flex-col mt-2 sm:mt-0">
                    <span className="flex items-center gap-2 text-xs font-bold text-[#1959D7] mb-2">
                      <Icon icon="lucide:book-open-check" className="h-4 w-4" /> VALIDACIÓN
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mb-2">Comparación con Referencias</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      El laboratorio compara la muestra con materiales de referencia. La confianza aumenta cuando múltiples métodos aportan evidencias coincidentes.
                    </p>
                  </div>
                </div>
              </div>

              </section>
            </div>
          </div>

          {/* Results Interpretation - Bicolor Reversed */}
          <div className="mt-9 mb-9">
            <div className="bg-gradient-to-bl from-slate-300 via-slate-200/20 to-transparent p-[1px] shadow-2xl">
              <section className="flex flex-col lg:flex-row-reverse overflow-hidden bg-slate-50">
                
                {/* Right Side (Primary Blue) */}
                <div className="bg-[#1A56DB] p-6 sm:p-8 lg:w-2/5 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-white opacity-10 blur-3xl" />
                  <div className="relative z-10">
                    <div className="flex h-12 w-12 items-center justify-center bg-white/20 text-white mb-6">
                    <Icon icon="lucide:clipboard-check" className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight">Qué significa el resultado</h2>
                  <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                    Interpretar correctamente el certificado es clave para entender el alcance de los análisis y la confianza en el lote fabricado.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 sm:p-8 lg:w-3/5">
                <div className="grid sm:grid-cols-2 gap-6 h-full items-center">
                  <div className="bg-white p-5 sm:p-6 border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] transition-opacity duration-500 group-hover:opacity-10 pointer-events-none">
                      <Icon icon="lucide:percent" className="h-24 w-24 text-[#1A56DB]" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3 relative z-10">Pureza HPLC vs Cantidad</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed relative z-10">
                      Un 99% de pureza por HPLC indica que el 99% de la señal medida en el detector corresponde al péptido. <strong className="text-slate-800">No indica la masa total del vial</strong> ni reemplaza la medición de contenido neto.
                    </p>
                  </div>

                  <div className="bg-white p-5 sm:p-6 border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] transition-opacity duration-500 group-hover:opacity-10 pointer-events-none">
                      <Icon icon="lucide:shield-check" className="h-24 w-24 text-[#1A56DB]" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3 relative z-10">Confianza y Alcance</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed relative z-10">
                      Un COA documenta los análisis en la muestra examinada. Permite verificar los resultados exactos del laboratorio y asegurar trazabilidad total con la presentación y el número de lote.
                    </p>
                  </div>
                </div>
              </div>

              </section>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-9 pt-9 border-t border-slate-200">
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Left Column */}
              <div className="lg:w-1/3">
                <div className="sticky top-24">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1959D7]/10 border border-[#1959D7]/20">
                      <Icon icon="lucide:message-square" className="h-4 w-4 text-[#1959D7]" />
                    </div>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1959D7]">
                      Soporte y dudas
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">Preguntas frecuentes</h2>
                  <p className="text-slate-600 text-sm leading-relaxed mb-8">
                    Respuestas rápidas a las consultas más comunes sobre nuestros certificados de análisis y la trazabilidad de los productos.
                  </p>
                  
                  {/* WhatsApp Help Block */}
                  <div className="bg-slate-50 border border-slate-200 p-6 sm:p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-2 h-full bg-[#25D366] transition-all duration-300 group-hover:w-full opacity-10" />
                    <Icon icon="lucide:headset" className="h-8 w-8 text-[#25D366] mb-5 relative z-10" />
                    <h3 className="font-bold text-slate-900 mb-2 relative z-10">¿No encuentras lo que buscas?</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-8 relative z-10">Escríbenos directamente por WhatsApp con el nombre del producto y número de lote.</p>
                    <a 
                      href="https://wa.me/573023041412" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 bg-[#25D366] px-6 py-3.5 font-mono text-xs font-bold tracking-widest uppercase text-white transition-all hover:bg-[#25D366]/90 shadow-sm relative z-10"
                    >
                      <Icon icon="lucide:message-circle" className="h-4 w-4" />
                      Contactar
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Q&A List */}
              <div className="lg:w-2/3 flex flex-col mt-8 lg:mt-0">
                {[
                  { q: "¿Qué es un lote?", a: "Es el código que identifica un grupo de unidades de un producto. Permite relacionar esa presentación específica con su documentación analítica y registro." },
                  { q: "¿Qué significa «Certificado pendiente»?", a: "Significa que todavía no hay un certificado publicado para esa presentación y lote en particular. Puede estar en proceso de validación por parte del laboratorio." },
                  { q: "¿Puedo consultar certificados anteriores?", a: "Sí, mantenemos el historial completo. Puedes consultar los certificados de lotes anteriores utilizando el buscador principal en esta misma sección." },
                ].map((item, i) => (
                  <div key={i} className="group py-6 sm:py-8 border-b border-slate-200 first:pt-0 last:border-0 relative">
                    {/* Hover subtle glow inverted */}
                    <div className="absolute inset-0 bg-slate-50 opacity-100 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none" />
                    <h3 className="text-lg sm:text-xl font-bold text-[#1A56DB] mb-3 relative z-10 transition-colors group-hover:text-slate-900">{item.q}</h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed relative z-10">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to action shop */}
          <div className="mt-9 pt-9 pb-9 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1A56DB] to-transparent"></div>
            
            <div className="flex flex-col lg:flex-row items-center justify-between mt-4">
              <div className="lg:w-2/3 mb-10 lg:mb-0">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1959D7]/10 border border-[#1959D7]/20">
                    <Icon icon="lucide:shopping-bag" className="h-4 w-4 text-[#1959D7]" />
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1959D7]">
                    Catálogo Oficial
                  </span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
                  Calidad <span className="text-[#1A56DB]">garantizada</span> en cada vial.
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                  Revisa las presentaciones, disponibilidad y precios de cada producto en nuestra tienda oficial con envíos a todo el país.
                </p>
              </div>

              <div className="lg:w-1/3 flex lg:justify-end w-full">
                <Link 
                  href="/tienda"
                  className="group inline-flex items-center justify-center gap-3 bg-[#17294F] px-8 py-5 font-mono text-sm font-bold tracking-widest uppercase text-white transition-all hover:bg-[#17294F]/90 shadow-md hover:shadow-xl active:scale-95 w-full sm:w-auto"
                >
                  Ir a la tienda
                  <Icon icon="lucide:arrow-right" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
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
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 text-xs font-mono tracking-widest uppercase font-bold text-slate-200 hover:bg-slate-700 transition-colors"
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
                className="inline-flex items-center gap-2 bg-[#1959D7] px-6 py-3 font-mono text-xs font-bold tracking-widest uppercase text-white transition-colors hover:bg-[#1959D7]/90"
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
