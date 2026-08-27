import { FileCheck2, PackageOpen, BookOpen, HelpCircle } from 'lucide-react'

export function WhatsIncluded() {
  return (
    <section className="border-b border-border bg-secondary/20 py-16">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <PackageOpen className="mx-auto h-8 w-8 text-primary" />
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground">¿Qué incluye cada pedido?</h2>
        <p className="mt-2 text-muted-foreground">Cada vial o presentación incluye lo necesario para reconstitución segura.</p>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
           {/* Mock Data for what's included */}
           {['Agua bacteriostática', 'Jeringas U-100', 'Paños con alcohol', 'Estuche protector'].map((item) => (
             <div key={item} className="rounded-lg border border-border bg-card p-4">
               <span className="text-sm font-medium text-foreground">{item}</span>
             </div>
           ))}
        </div>
      </div>
    </section>
  )
}

export function QualityCoa() {
  return (
    <section className="border-b border-border bg-background py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <FileCheck2 className="h-8 w-8 text-primary" />
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground">Calidad y COA por Lote</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              La pureza no se asume, se demuestra. Cada lote que distribuimos cuenta con un Certificado de Análisis (COA) de laboratorios de terceros, garantizando identidad y concentración antes del despacho.
            </p>
            <a href="#calidad" className="mt-6 inline-flex text-sm font-medium text-primary hover:underline">
              Ver reporte de ejemplo &rarr;
            </a>
          </div>
          <div className="rounded-xl border border-border bg-secondary/50 p-6">
             <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between border-b border-border pb-2">
                   <span className="text-muted-foreground">Ensayo</span>
                   <span className="text-foreground">HPLC-MS</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                   <span className="text-muted-foreground">Pureza Promedio</span>
                   <span className="text-primary font-bold">99.1%</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                   <span className="text-muted-foreground">Trazabilidad</span>
                   <span className="text-foreground">QR / ID de Lote</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function GuidesBlock() {
  return (
    <section className="border-b border-border bg-secondary/10 py-16">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <BookOpen className="mx-auto h-8 w-8 text-primary" />
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground">Guías y Protocolos (RUO)</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
           {['Calculadora de Reconstitución', 'Guía de Conservación de Péptidos', 'Interpretación de un COA'].map((title) => (
             <a href="#guias" key={title} className="group rounded-lg border border-border bg-card p-6 text-left transition-colors hover:border-primary/40">
               <h3 className="font-semibold text-foreground group-hover:text-primary">{title}</h3>
               <p className="mt-2 text-sm text-muted-foreground">Recurso educativo para investigación.</p>
             </a>
           ))}
        </div>
      </div>
    </section>
  )
}

export function FaqShort() {
  return (
    <section className="border-b border-border bg-background py-16">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <HelpCircle className="mx-auto h-8 w-8 text-primary" />
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground">Preguntas Frecuentes</h2>
        <div className="mt-8 space-y-4 text-left">
           {[
             { q: '¿Cuál es el tiempo de entrega?', a: '24-48h en Bogotá. 2-4 días hábiles resto del país.' },
             { q: '¿Qué medios de pago aceptan?', a: 'Bancolombia, Nequi, Wompi y USDT.' }
           ].map((faq, i) => (
             <div key={i} className="rounded-lg border border-border bg-card p-4">
               <h4 className="font-semibold text-foreground">{faq.q}</h4>
               <p className="mt-1 text-sm text-muted-foreground">{faq.a}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  )
}
