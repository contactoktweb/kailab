import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'

export function WhatsIncluded() {
  const items = [
    { name: 'Solución Reconstituyente', desc: 'Agua bacteriostática grado USP (10ml o 30ml).', icon: 'lucide:droplets' },
    { name: 'Instrumental Analítico', desc: 'Jeringas estériles U-100 para dosificación precisa.', icon: 'lucide:syringe' },
    { name: 'Kit de Asepsia', desc: 'Almohadillas impregnadas en alcohol isopropílico (70%).', icon: 'lucide:shield-plus' },
    { name: 'Cadena de Custodia', desc: 'Estuche térmico protector de poliestireno (según envío).', icon: 'lucide:box' }
  ]

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
      className="relative overflow-hidden border-b border-border bg-secondary/5 py-14 sm:py-16"
    >
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8 items-center">
          
          <div className="lg:col-span-4">
            <div className="mb-4 flex items-center gap-2 text-primary">
               <Icon icon="lucide:package-check" className="h-5 w-5" />
               <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-primary/80">Dotación de Envíos</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
              Equipamiento<br/>Incluido
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
              Cada vial o kit de investigación se despacha con la dotación completa requerida para su reconstitución segura bajo estrictas normas de laboratorio.
            </p>
            <div className="mt-8 hidden flex-col gap-2 lg:flex">
              <div className="h-px w-16 bg-primary/40"></div>
              <div className="h-px w-10 bg-primary/20"></div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid gap-5 sm:grid-cols-2">
              {items.map((item, i) => (
                <div key={i} className="group relative overflow-hidden bg-background p-7 sm:p-8 transition-all duration-500 hover:-translate-y-1 border border-border/40 shadow-sm hover:shadow-md">
                  {/* Decorative asymmetric borders */}
                  <div className="absolute left-0 top-0 h-full w-[3px] bg-border transition-colors duration-500 group-hover:bg-primary"></div>
                  <div className="absolute left-0 top-0 h-[3px] w-10 bg-border transition-all duration-500 group-hover:w-full group-hover:bg-primary/50"></div>
                  
                  <div className="absolute -right-4 -top-4 opacity-[0.02] transition-all duration-500 group-hover:-rotate-12 group-hover:scale-150 group-hover:text-primary group-hover:opacity-[0.04]">
                    <Icon icon={item.icon} className="h-36 w-36 [&_*]:!stroke-[0.25px]" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center border border-primary/30 text-primary transition-all duration-500 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon icon={item.icon} className="h-5 w-5" />
                    </div>
                    <h3 className="font-mono text-base sm:text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">{item.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </motion.section>
  )
}

export function QualityCoa() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
      className="relative overflow-hidden border-b border-border bg-secondary/5 py-14 sm:py-16"
    >

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          
          <div>
            <div className="mb-4 flex items-center gap-2 text-primary">
               <Icon icon="lucide:microscope" className="h-5 w-5" />
               <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-primary/80">Laboratorio Analítico</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
              Calidad y COA<br/>Por Lote
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
              La pureza no se asume, se demuestra. Cada lote que distribuimos cuenta con un Certificado de Análisis (COA) emitido por laboratorios independientes. Validamos la integridad molecular antes de cualquier despacho.
            </p>
            <div className="mt-8">
              <a href="#calidad" className="group inline-flex items-center gap-2.5 font-mono text-base font-bold text-primary transition-all hover:text-primary/80">
                <span className="border-b-2 border-primary/50 pb-0.5 transition-all group-hover:border-primary">Ver reporte de ejemplo</span>
                <Icon icon="lucide:arrow-right" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
          
          {/* Holographic / Scanner Box */}
          <div className="relative">
             {/* Tech Brackets */}
             <div className="absolute -left-2 -top-2 h-8 w-8 border-l-2 border-t-2 border-primary/50"></div>
             <div className="absolute -bottom-2 -right-2 h-8 w-8 border-b-2 border-r-2 border-primary/50"></div>
             
             <div className="group relative overflow-hidden border border-border/40 bg-background/50 p-7 sm:p-9 backdrop-blur-md shadow-sm">
                {/* Scanline animation */}
                <div className="absolute left-0 top-0 h-[1px] w-full bg-primary/50 opacity-0 transition-all duration-1000 group-hover:top-full group-hover:opacity-100"></div>
                
                <div className="mb-6 flex items-center justify-between border-b border-border/40 pb-4">
                  <div className="flex items-center gap-3">
                    <Icon icon="lucide:shield-check" className="h-7 w-7 text-primary" />
                    <span className="font-mono text-base font-bold text-foreground">REPORTE_HPLC-MS.pdf</span>
                  </div>
                  <span className="animate-pulse rounded-sm bg-primary/20 px-2.5 py-1 font-mono text-xs font-semibold text-primary">VERIFICADO</span>
                </div>
                
                <div className="space-y-5 font-mono text-sm sm:text-base">
                  <div className="group/row flex items-center justify-between">
                     <span className="text-muted-foreground transition-colors group-hover/row:text-foreground">Método de Ensayo</span>
                     <span className="font-semibold text-foreground">Cromatografía HPLC</span>
                  </div>
                  <div className="group/row flex items-center justify-between">
                     <span className="text-muted-foreground transition-colors group-hover/row:text-foreground">Pureza Analizada</span>
                     <span className="text-lg sm:text-xl font-bold text-primary">≥ 99.1%</span>
                  </div>
                  <div className="group/row flex items-center justify-between">
                     <span className="text-muted-foreground transition-colors group-hover/row:text-foreground">Trazabilidad</span>
                     <span className="font-semibold text-foreground">Código QR en vial</span>
                  </div>
                  <div className="group/row mt-2 flex items-center justify-between border-t border-border/40 pt-4">
                     <span className="text-muted-foreground transition-colors group-hover/row:text-foreground">Firma Digital</span>
                     <span className="max-w-[160px] truncate text-xs sm:text-sm font-semibold text-primary/70">0x3F9A...B8C2</span>
                  </div>
               </div>
             </div>
          </div>
          
        </div>
      </div>
    </motion.section>
  )
}

export function GuidesBlock() {
  const guides = [
    { title: 'Calculadora de Reconstitución', desc: 'Herramienta interactiva para determinar concentraciones exactas según el volumen de disolvente.', icon: 'lucide:calculator' },
    { title: 'Guía de Conservación Térmica', desc: 'Protocolos de almacenamiento en cadena de frío para preservación de enlaces peptídicos.', icon: 'lucide:thermometer-snowflake' },
    { title: 'Interpretación de HPLC-MS', desc: 'Manual técnico para leer e interpretar certificados de espectrometría de masas y pureza.', icon: 'lucide:bar-chart-2' }
  ]

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
      className="relative overflow-hidden border-b border-border bg-background py-14 sm:py-16"
    >
      {/* Tech line */}
      <div className="absolute left-1/2 top-0 h-px w-[100vw] -ml-[50vw] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="mb-4 flex items-center justify-start gap-2 text-primary lg:justify-end">
               <Icon icon="lucide:book-open-check" className="h-5 w-5" />
               <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-primary/80">Recursos Técnicos</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight lg:text-right">
              Protocolos<br/>RUO
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground lg:text-right">
              Documentación y herramientas de análisis diseñadas exclusivamente para uso en investigación de laboratorio.
            </p>
            <div className="mt-8 hidden flex-col items-end gap-2 lg:flex">
              <div className="h-px w-16 bg-primary/40"></div>
              <div className="h-px w-10 bg-primary/20"></div>
            </div>
          </div>

          <div className="lg:col-span-8 lg:row-start-1">
            <div className="flex flex-col border-t border-border/40">
              {guides.map((guide, i) => (
                <a href="#guias" key={i} className="group relative flex items-center justify-between border-b border-border/40 py-7 sm:py-8 transition-all duration-500 hover:bg-secondary/10 hover:pl-6">
                  {/* Left glow indicator */}
                  <div className="absolute left-0 top-0 h-full w-[3px] bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-muted-foreground transition-colors duration-300 group-hover:text-primary">
                      <Icon icon={guide.icon} className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="font-mono text-base sm:text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                        {guide.title}
                      </h3>
                      <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-muted-foreground">
                        {guide.desc}
                      </p>
                    </div>
                  </div>
                  
                  <div className="hidden pr-4 sm:block">
                     <Icon icon="lucide:arrow-up-right" className="h-6 w-6 text-muted-foreground transition-all duration-300 group-hover:rotate-45 group-hover:text-primary" />
                  </div>
                </a>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </motion.section>
  )
}

export function FaqShort() {
  const faqs = [
    { q: '¿Los péptidos son aptos para consumo humano?', a: 'Negativo. Todos nuestros compuestos están clasificados bajo protocolo RUO (Research Use Only). Su aplicación está estrictamente limitada a ensayos in vitro y análisis de laboratorio cualificado.' },
    { q: '¿Cómo verifico la pureza de un lote específico?', a: 'Cada vial incluye trazabilidad por número de lote. Puede contrastar este identificador con nuestro registro público de Certificados de Análisis (COA), emitidos por laboratorios independientes (HPLC-MS).' },
    { q: '¿Cuáles son los tiempos de distribución logística?', a: 'Los despachos se procesan en un ciclo de 24 horas. Para Bogotá D.C., la entrega es de 1-2 días hábiles; para el resto del territorio nacional, la ventana es de 2-4 días hábiles con cadena de frío garantizada.' },
    { q: '¿Qué pasarelas y protocolos de pago admiten?', a: 'Aceptamos transferencias interbancarias directas (Bancolombia, Nequi), procesador encriptado Wompi (Tarjetas de crédito, PSE) y transferencias en red blockchain (USDT).' }
  ]

  return (
    <section className="relative overflow-hidden border-b border-border bg-background py-14 sm:py-16">

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* Left Column: Title */}
          <div className="lg:col-span-4">
            <div className="mb-4 flex items-center gap-2 text-primary">
               <Icon icon="lucide:terminal-square" className="h-5 w-5" />
               <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-primary/80">Base de Conocimiento</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
              Preguntas<br/>Frecuentes
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
              Directrices operativas, normativas de seguridad y detalles de distribución para investigadores y laboratorios.
            </p>
            <div className="mt-8 hidden flex-col gap-2 lg:flex">
              <div className="h-px w-16 bg-primary/40"></div>
              <div className="h-px w-10 bg-primary/20"></div>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details 
                  key={i} 
                  className="group relative overflow-hidden rounded-sm border border-border/50 bg-secondary/10 transition-all duration-300 hover:border-primary/40 hover:bg-secondary/20 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between p-6 focus:outline-none sm:p-7">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <h4 className="font-mono text-base sm:text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                        {faq.q}
                      </h4>
                    </div>
                    <span className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-border/50 bg-background text-muted-foreground transition-all duration-300 group-open:rotate-45 group-open:border-primary/50 group-open:text-primary group-hover:border-primary/50 group-hover:text-primary">
                      <Icon icon="lucide:plus" className="h-5 w-5" />
                    </span>
                  </summary>
                  
                  <div className="border-t border-border/20 bg-background/40 px-6 pb-6 pt-4 backdrop-blur-sm sm:px-7">
                    <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                      {faq.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export function TrustIndicators() {
  const trust = [
    { icon: 'lucide:file-check-2', title: 'COA por Lote', desc: 'Certificado HPLC-MS verificable' },
    { icon: 'lucide:git-branch', title: 'Trazabilidad Exacta', desc: 'Cadena de custodia documentada' },
    { icon: 'lucide:truck', title: 'Logística RUO', desc: 'Envío Gratis > $250.000 COP' },
    { icon: 'lucide:shield-check', title: 'Transacciones Seguras', desc: 'Wompi · Nequi · Blockchain' },
  ]

  return (
    <section className="relative overflow-hidden border-t border-border bg-background pt-12 pb-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
             visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {trust.map((item, i) => (
            <motion.div
              key={i}
              variants={{
                 hidden: { opacity: 0, y: 30, scale: 1.15 },
                 visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
              }}
              className="group relative overflow-hidden flex items-center rounded-sm border border-border/50 bg-secondary/5 p-5 transition-colors duration-300 hover:bg-secondary/10"
            >
              {/* Left line indicator */}
              <div className="absolute left-0 top-0 h-full w-[2px] bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              
              <div className="flex items-center gap-4 transition-transform duration-300 group-hover:translate-x-2">
                <div className="text-muted-foreground transition-colors duration-300 group-hover:text-primary">
                  <Icon icon={item.icon} className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-mono text-sm font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
