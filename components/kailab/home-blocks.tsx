'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

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
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">{item.name}</h3>
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

export function CommitmentBlock() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const items = [
    { q: '¿A qué ciudades realizan envíos?', a: 'Realizamos envíos a nivel nacional, cubriendo las principales ciudades y municipios de Colombia.' },
    { q: '¿Cuáles son los tiempos de entrega?', a: 'En las principales ciudades la entrega suele hacerse al siguiente día hábil. En otras ciudades y municipios, entre 2 y 3 días hábiles.' },
    { q: '¿Los envíos son discretos?', a: 'Sí. Todos los pedidos se despachan en empaque discreto y profesional, sin referencias visibles al contenido ni a la tienda.' },
    { q: '¿Cómo puedo hacer seguimiento a mi pedido?', a: 'Una vez confirmado el envío, recibirás la información de seguimiento para monitorear el estado de tu pedido hasta la entrega.' }
  ]

  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
      className="relative overflow-hidden bg-[#fafcff] pt-6 pb-10 sm:pt-8 sm:pb-12"
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#1959D7]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Top Section: Commitment */}
          <div className="lg:col-span-12 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight">Compromiso con la seriedad</h3>
              </div>
              <div className="hidden sm:block h-px bg-gray-200/80 flex-1 ml-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative overflow-hidden rounded-sm border border-gray-200/80 bg-white p-5 sm:p-6 flex items-center">
                <div className="absolute left-0 top-0 h-full w-[3px] bg-[#1959D7]" />
                <p className="text-[15px] leading-relaxed text-slate-600">
                  En KaiLab trabajamos bajo un enfoque serio y ordenado, priorizando la selección cuidadosa de cada compuesto, una gestión responsable de los pedidos y una comunicación clara en cada etapa del proceso.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-sm border border-gray-200/80 bg-white p-5 sm:p-6 flex items-center">
                <div className="absolute left-0 top-0 h-full w-[3px] bg-[#1959D7]" />
                <p className="text-[15px] leading-relaxed text-slate-600">
                  Nuestro objetivo es ofrecer una experiencia confiable y transparente para quienes entienden el valor de un manejo riguroso en productos de investigación.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section: Shipping FAQ */}
          <div className="lg:col-span-12 -mt-4 lg:-mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="hidden sm:block h-px bg-gray-200/80 flex-1 mr-6"></div>
              <div className="text-left sm:text-right">
                <h3 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight">Envíos rápidos y seguros</h3>
                <p className="text-sm text-slate-500 mt-1">Entregas eficientes a nivel nacional, con empaque profesional.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              {items.map((item, i) => {
                const isOpen = openIndex === i
                return (
                  <div 
                    key={i} 
                    className={`relative overflow-hidden rounded-sm border transition-all duration-300 ${
                      isOpen ? 'border-[#1959D7]/40 bg-white shadow-sm' : 'border-gray-200/80 bg-white'
                    }`}
                  >
                    <div className="absolute left-0 top-0 h-full w-[3px] bg-[#1959D7]" />
                    <button onClick={() => setOpenIndex(isOpen ? null : i)} className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none">
                      <span className={`font-semibold tracking-tight transition-colors text-[15px] ${isOpen ? 'text-[#1959D7]' : 'text-slate-800'}`}>
                        {item.q}
                      </span>
                      <span className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm transition-all duration-300 ${isOpen ? 'bg-[#1959D7] text-white rotate-180' : 'bg-gray-100 text-gray-500'}`}>
                        <Icon icon="lucide:chevron-down" className="h-4 w-4" />
                      </span>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-gray-100 px-6 pb-6 pt-4">
                            <p className="text-[14px] leading-relaxed text-slate-600">{item.a}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            <div className="mt-4 w-full flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-sm bg-gradient-to-r from-blue-50/80 to-[#eef4ff] p-4 text-slate-800 border border-blue-100/50 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-white shadow-sm border border-blue-100/80">
                   <Icon icon="lucide:info" className="h-5 w-5 text-[#1959D7]" />
                </div>
                <p className="text-[13px] xl:text-[14px] leading-relaxed">
                  <strong className="font-bold text-[#1959D7]">Uso exclusivo para investigación.</strong> La información del sitio es estrictamente informativa y no constituye en ningún caso asesoría médica.
                </p>
              </div>
              <Link 
                href="/ayuda" 
                className="group relative inline-flex shrink-0 items-center justify-center gap-1.5 overflow-hidden bg-primary px-4 py-2 font-sans text-[11px] font-bold tracking-widest whitespace-nowrap text-primary-foreground backdrop-blur-md transition-all duration-500 hover:bg-primary/90 active:scale-95"
              >
                <div className="absolute left-0 top-0 h-full w-[2px] bg-white/30 transition-colors duration-500 group-hover:bg-white"></div>
                <div className="absolute left-0 top-0 h-[2px] w-6 bg-white/30 transition-all duration-500 group-hover:w-full group-hover:bg-white"></div>
                Descubre cómo operamos
                <Icon icon="lucide:arrow-right" className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
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
              <a href="#calidad" className="group inline-flex items-center gap-2.5 text-base font-bold text-primary transition-all hover:text-primary/80">
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
                
                <div className="space-y-5 text-sm sm:text-base">
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
                      <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
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

type FaqItem = { q: string; a: string }
type FaqCategory = { label: string; items: FaqItem[] }

const FAQ_DATA: FaqCategory[] = [
  {
    label: 'Productos',
    items: [
      {
        q: '¿Qué vende KaiLab?',
        a: 'KaiLab comercializa compuestos liofilizados y reactivos para investigación científica y de laboratorio. Cada ficha de producto indica el compuesto, el contenido nominal en miligramos, la pureza reportada y las condiciones de almacenamiento. No son medicamentos, suplementos ni productos de uso clínico.',
      },
      {
        q: '¿Qué pureza tienen los productos?',
        a: 'La pureza se comunica por producto y lote, no como un porcentaje general para todo el catálogo. Cuando existe un COA publicado, mostramos el resultado exacto reportado por el laboratorio independiente y el enlace al documento correspondiente.',
      },
      {
        q: '¿Los productos cuentan con análisis de pureza?',
        a: 'Los productos y lotes cuentan con certificados de análisis publicados. En cada COA encontrarás el laboratorio, el lote, los resultados reportados y el enlace al documento.',
      },
      {
        q: '¿Necesito ser un laboratorio o una institución para comprar?',
        a: 'No solicitamos documentación institucional. Toda compra se realiza bajo los términos de uso exclusivo en investigación, y el comprador asume la responsabilidad de contar con las condiciones, la capacitación y las autorizaciones que correspondan a su actividad.',
      },
    ],
  },
  {
    label: 'Pedidos y Pagos',
    items: [
      {
        q: '¿Cómo hago un pedido?',
        a: 'Selecciona el producto y la cantidad, añádelo al carrito y completa los datos de envío. Antes de pagar podrás revisar los productos, las cantidades, la dirección y el valor total.',
      },
      {
        q: '¿Qué métodos de pago aceptan?',
        a: 'Aceptamos tarjetas de crédito y débito, PSE, Nequi, Daviplata y botón Bancolombia. Los pagos se procesan a través de una pasarela certificada y KaiLab no almacena datos de tarjetas.',
      },
      {
        q: '¿Cómo confirmo que mi pedido quedó registrado?',
        a: 'Al aprobarse el pago recibirás un correo con el número y el resumen del pedido. Si no llega en pocos minutos, revisa la carpeta de correo no deseado y escríbenos antes de intentar pagar de nuevo.',
      },
      {
        q: '¿Puedo modificar o cancelar un pedido?',
        a: 'Escríbenos lo antes posible. Podemos modificar o cancelar un pedido mientras no haya sido despachado. Una vez entregado a la transportadora, aplican las condiciones descritas en nuestros Términos Legales.',
      },
      {
        q: '¿Ofrecen precios para pedidos por volumen?',
        a: 'Sí. Contamos con precios diferenciales para compras por cantidad y para distribuidores. Escríbenos por WhatsApp o correo indicando los productos y las cantidades que necesitas.',
      },
    ]
  },
  {
    label: 'Envíos',
    items: [
      {
        q: '¿A dónde envían?',
        a: 'Enviamos a toda Colombia, a ciudades principales y municipios, a través de transportadoras con cobertura nacional.',
      },
      {
        q: '¿Cuánto tarda la entrega?',
        a: 'En las principales ciudades la entrega suele hacerse al siguiente día hábil. En otras ciudades y municipios, entre 2 y 3 días hábiles. Los pedidos con pago confirmado se despachan en días hábiles; los recibidos en fin de semana o festivo se procesan el siguiente día hábil.',
      },
      {
        q: '¿El envío tiene costo?',
        a: 'El envío es gratuito a toda Colombia.',
      },
      {
        q: '¿Cómo llega empacado el pedido?',
        a: 'Los productos se envían en empaque sellado y sobrio, preparado para proteger el contenido durante el transporte. Al despachar recibirás el número de guía para hacer seguimiento.',
      },
    ]
  },
  {
    label: 'Almacenamiento',
    items: [
      {
        q: '¿Cómo debo almacenar el producto en polvo liofilizado?',
        a: 'Sin reconstituir, consérvalo a -20 °C para almacenamiento prolongado, protegido de la luz y en ambiente seco. En estas condiciones el material mantiene su estabilidad durante períodos prolongados.',
      },
      {
        q: '¿Cómo se conserva una vez reconstituido?',
        a: 'Una vez reconstituido con agua bacteriostática en condiciones de laboratorio, consérvalo refrigerado entre 2 °C y 8 °C. Evita los ciclos repetidos de congelación y descongelación, y manipula el material con técnica aséptica y material de laboratorio apropiado.',
      },
      {
        q: '¿El producto se daña si llega sin refrigeración?',
        a: 'No. El polvo liofilizado es estable a temperatura ambiente durante los tiempos de transporte habituales. Al recibirlo, guárdalo lo antes posible en las condiciones indicadas arriba.',
      },
      {
        q: '¿Qué hago si el pedido llega incompleto, incorrecto o el vial presenta una apariencia inusual?',
        a: 'No utilices el material si el sello está comprometido, hay pérdida de contenido, humedad visible o un cambio inesperado de apariencia. Toma fotografías del producto y del empaque y escríbenos indicando el número de pedido.',
      },
    ]
  },
  {
    label: 'Uso e Investigación',
    items: [
      {
        q: '¿Qué significa uso exclusivo para investigación?',
        a: 'Significa que el material se ofrece para actividades científicas o analíticas realizadas bajo protocolos adecuados. No está destinado al uso humano, veterinario ni clínico, ni al diagnóstico, tratamiento o prevención de enfermedades. Los productos no cuentan con registro INVIMA.',
      },
      {
        q: '¿KaiLab indica dosis, ciclos o formas de administración?',
        a: 'No. No proporcionamos dosis, ciclos, protocolos de aplicación ni asesoría médica. Podemos aclarar información técnica o comercial publicada en la ficha del producto.',
      },
      {
        q: '¿KaiLab recomienda productos según objetivos personales?',
        a: 'No. No recomendamos productos para pérdida de peso, recuperación, rendimiento ni composición corporal. Las referencias que aparecen en las fichas describen áreas de estudio científico y no constituyen una promesa de resultados.',
      },
    ]
  },
]

const TRUST_BADGES = [
  { icon: 'lucide:zap',          title: 'Entrega rápida',   desc: '24–48h en ciudades principales' },
  { icon: 'lucide:package',      title: 'Empaque sobrio',   desc: 'Discreto. Sin referencias visibles' },
  { icon: 'lucide:credit-card',  title: 'Tarjeta y Crypto', desc: 'Pagos verificados y seguros' },
  { icon: 'lucide:file-check-2', title: 'COA disponibles',  desc: 'Reportes independientes por producto y lote' },
]

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (items.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        Próximamente...
      </p>
    )
  }

  return (
    <div className="space-y-3">
      {items.map((faq, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={i}
            className={`group relative overflow-hidden border transition-all duration-300 ${
              isOpen
                ? 'border-[#1959D7]/40 bg-[#1959D7]/5'
                : 'border-gray-200 bg-white hover:border-[#1959D7]/30 hover:bg-gray-50'
            }`}
          >
            {/* left accent bar */}
            <div
              className={`absolute left-0 top-0 h-full w-[3px] transition-all duration-300 ${
                isOpen ? 'bg-[#1959D7]' : 'bg-gray-200 group-hover:bg-[#1959D7]/50'
              }`}
            />

            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between px-6 py-3.5 text-left focus:outline-none"
            >
              <span
                className={`text-sm sm:text-base font-semibold tracking-tight transition-colors ${
                  isOpen ? 'text-[#1959D7]' : 'text-gray-800 group-hover:text-[#1959D7]'
                }`}
              >
                {faq.q}
              </span>
              <span
                className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center border transition-all duration-300 ${
                  isOpen
                    ? 'border-[#1959D7]/40 bg-[#1959D7]/10 text-[#1959D7]'
                    : 'border-gray-200 text-gray-400 group-hover:border-[#1959D7]/40 group-hover:text-[#1959D7]'
                }`}
              >
                <Icon
                  icon="lucide:plus"
                  className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                />
              </span>
            </button>

            {isOpen && (
              <div className="border-t border-gray-100 bg-gray-50/50 px-6 pb-5 pt-4">
                <p className="text-sm leading-relaxed text-gray-600">
                  {faq.a}
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export function FaqShort() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="relative overflow-hidden border-y border-gray-100 bg-white py-8 sm:py-10">
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
          className="text-center"
        >
          <div className="mb-2 flex items-center justify-center gap-2">
            <Icon icon="lucide:help-circle" className="h-4 w-4 text-[#1959D7]" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#1959D7]">
              Base de Conocimiento
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Preguntas Frecuentes
          </h2>
          <p className="mt-2 text-base leading-relaxed text-gray-500">
            Respuestas claras sobre productos, envíos, pagos y uso.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-0 overflow-x-auto" aria-label="Categorías FAQ">
            {FAQ_DATA.map((cat, i) => {
              const isActive = activeTab === i
              return (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`whitespace-nowrap px-4 pb-3 pt-1 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200 focus:outline-none ${
                    isActive
                      ? 'border-b-2 border-[#1959D7] text-[#1959D7]'
                      : 'border-b-2 border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-600'
                  }`}
                >
                  {cat.label}
                  {cat.items.length > 0 && (
                    <span className={`ml-1 text-[10px] ${isActive ? 'text-[#1959D7]/60' : 'text-gray-300'}`}>
                      ({cat.items.length})
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Accordion */}
        <FaqAccordion items={FAQ_DATA[activeTab].items} />

        {/* Trust Badges */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mt-8">
          {TRUST_BADGES.map((badge, i) => (
            <div
              key={i}
              className="group relative overflow-hidden border border-gray-200 bg-[#17294F] p-5 sm:p-6 transition-all duration-300 hover:border-[#1959D7]/50"
            >
              <div className="absolute left-0 top-0 h-full w-[2px] bg-[#1959D7] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="mb-3 text-[#1959D7]">
                <Icon icon={badge.icon} className="h-5 w-5" />
              </div>
              <p className="text-sm font-bold tracking-tight text-white">{badge.title}</p>
              <p className="mt-1 text-xs leading-snug text-white/60">{badge.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
