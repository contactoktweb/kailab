'use client'

import { useState, FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Icon } from '@iconify/react'
import { useCart } from '@/components/kailab/cart-context'
import { formatCOP, type CheckoutFormData, type DocumentType } from '@/components/kailab/data'

// --- Constantes ---
const DOCUMENT_TYPES: { value: DocumentType; label: string }[] = [
  { value: 'CC', label: 'Cédula de Ciudadanía (CC)' },
  { value: 'CE', label: 'Cédula de Extranjería (CE)' },
  { value: 'NIT', label: 'NIT' },
  { value: 'PASAPORTE', label: 'Pasaporte' },
]

const COLOMBIA_CITIES = [
  'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena',
  'Bucaramanga', 'Cúcuta', 'Pereira', 'Manizales', 'Santa Marta',
  'Ibagué', 'Villavicencio', 'Pasto', 'Montería', 'Neiva',
  'Armenia', 'Sincelejo', 'Valledupar', 'Tunja', 'Popayán',
  'Otra ciudad',
]

const INITIAL_FORM: CheckoutFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  documentType: 'CC',
  documentNumber: '',
  country: 'Colombia',
  city: '',
  address: '',
  addressExtra: '',
  orderNote: '',
}

type FormErrors = Partial<Record<keyof CheckoutFormData, string>>

// Campos requeridos
const REQUIRED: (keyof CheckoutFormData)[] = [
  'firstName', 'lastName', 'email', 'phone',
  'documentType', 'documentNumber', 'city', 'address',
]

function validate(form: CheckoutFormData): FormErrors {
  const errors: FormErrors = {}

  REQUIRED.forEach((key) => {
    if (!form[key]?.toString().trim()) {
      errors[key] = 'Este campo es requerido.'
    }
  })

  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Ingresa un correo electrónico válido.'
  }

  if (form.phone && !/^[0-9+\s\-()]{7,15}$/.test(form.phone)) {
    errors.phone = 'Número de teléfono inválido.'
  }

  return errors
}

// --- Sub-componentes ---

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block font-mono text-xs font-semibold text-foreground mb-1.5">
      {children}
      {required && <span className="ml-1 text-rose-400">*</span>}
    </label>
  )
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="mt-1 font-mono text-[11px] text-rose-400 flex items-center gap-1">
      <Icon icon="lucide:alert-circle" className="h-3 w-3 shrink-0" />
      {message}
    </p>
  )
}

function InputField({
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon,
}: {
  id: string
  type?: string
  placeholder?: string
  value: string
  onChange: (v: string) => void
  error?: string
  icon?: string
}) {
  return (
    <div className="relative">
      {icon && (
        <Icon
          icon={icon}
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
        />
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-md border bg-secondary/40 ${icon ? 'pl-9' : 'pl-4'} pr-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none transition-colors ${
          error
            ? 'border-rose-500/60 focus:border-rose-500'
            : 'border-border focus:border-primary'
        }`}
      />
    </div>
  )
}

// --- Página principal ---

export default function CheckoutPage() {
  const router = useRouter()
  const { items, cartTotal, clearCart } = useCart()

  const [form, setForm] = useState<CheckoutFormData>(INITIAL_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (key: keyof CheckoutFormData) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(form)

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // Scroll al primer error
      const firstKey = Object.keys(errs)[0]
      document.getElementById(firstKey)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setLoading(true)
    // Simula procesamiento — aquí va la lógica de Wompi
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 600)
  }

  // Si el carrito está vacío, redirigir
  if (items.length === 0 && !submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-border bg-secondary">
          <Icon icon="lucide:shopping-cart" className="h-8 w-8 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-mono text-foreground">Tu carrito está vacío</h1>
          <p className="mt-2 text-sm text-muted-foreground">Agrega productos antes de continuar al checkout.</p>
        </div>
        <Link
          href="/tienda"
          className="inline-flex items-center gap-2 rounded-sm border-2 border-primary bg-primary px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-transparent hover:text-primary"
        >
          <Icon icon="lucide:store" className="h-4 w-4" />
          Ir a la tienda
        </Link>
      </div>
    )
  }

  // Pantalla de confirmación post-submit
  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
          <Icon icon="lucide:check-circle-2" className="h-9 w-9 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-mono text-foreground">¡Pedido confirmado!</h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            Hemos recibido tu información. El equipo de KAILAB se comunicará contigo en breve para coordinar el pago y el envío.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-sm border border-border bg-secondary px-5 py-2.5 text-sm font-mono font-semibold text-foreground transition-colors hover:bg-secondary/70"
          >
            <Icon icon="lucide:home" className="h-4 w-4" />
            Inicio
          </Link>
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 rounded-sm border-2 border-primary bg-primary px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-transparent hover:text-primary"
          >
            <Icon icon="lucide:store" className="h-4 w-4" />
            Seguir comprando
          </Link>
        </div>
      </div>
    )
  }

  const subtotal = cartTotal
  const shipping = 0 // El cobro de envío lo gestiona el equipo KAILAB

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="Volver al inicio KAILAB">
            <Image src="/kailab-logo.png" alt="KAILAB" width={110} height={32} className="h-7 w-auto" />
          </Link>

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <span>Carrito</span>
            <Icon icon="lucide:chevron-right" className="h-3 w-3" />
            <span className="text-foreground font-bold">Datos de Contacto</span>
            <Icon icon="lucide:chevron-right" className="h-3 w-3" />
            <span>Pago</span>
          </div>

          <Link
            href="/tienda"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon icon="lucide:arrow-left" className="h-4 w-4" />
            <span className="hidden sm:inline">Volver a la tienda</span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-12 items-start">

          {/* ========== FORMULARIO (izquierda en desktop) ========== */}
          <section aria-labelledby="contact-form-heading">
            <div className="mb-6">
              <h1 id="contact-form-heading" className="text-2xl font-bold font-mono tracking-tight text-foreground">
                Datos de Contacto y Envío
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Completa el formulario para procesar tu pedido. Los campos marcados con <span className="text-rose-400">*</span> son obligatorios.
              </p>
            </div>

            <form id="checkout-form" onSubmit={handleSubmit} noValidate className="space-y-8">

              {/* Sección 1 — Datos personales */}
              <fieldset className="rounded-xl border border-border/60 bg-card/40 p-5 sm:p-6 space-y-5 backdrop-blur-sm">
                <legend className="flex items-center gap-2 px-1 font-mono text-xs font-bold text-primary uppercase tracking-widest">
                  <Icon icon="lucide:user" className="h-3.5 w-3.5" />
                  Información Personal
                </legend>

                {/* Nombre + Apellidos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <FieldLabel required>Nombre</FieldLabel>
                    <InputField
                      id="firstName"
                      placeholder="Ej. Carlos"
                      value={form.firstName}
                      onChange={set('firstName')}
                      error={errors.firstName}
                      icon="lucide:user"
                    />
                    <FieldError message={errors.firstName} />
                  </div>
                  <div>
                    <FieldLabel required>Apellidos</FieldLabel>
                    <InputField
                      id="lastName"
                      placeholder="Ej. Rodríguez"
                      value={form.lastName}
                      onChange={set('lastName')}
                      error={errors.lastName}
                    />
                    <FieldError message={errors.lastName} />
                  </div>
                </div>

                {/* Email + Teléfono */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <FieldLabel required>Correo Electrónico</FieldLabel>
                    <InputField
                      id="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={form.email}
                      onChange={set('email')}
                      error={errors.email}
                      icon="lucide:mail"
                    />
                    <FieldError message={errors.email} />
                  </div>
                  <div>
                    <FieldLabel required>Teléfono / Celular</FieldLabel>
                    <InputField
                      id="phone"
                      type="tel"
                      placeholder="+57 300 000 0000"
                      value={form.phone}
                      onChange={set('phone')}
                      error={errors.phone}
                      icon="lucide:phone"
                    />
                    <FieldError message={errors.phone} />
                  </div>
                </div>

                {/* Tipo documento + Número */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <FieldLabel required>Tipo de Documento</FieldLabel>
                    <div className="relative">
                      <Icon icon="lucide:id-card" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <select
                        id="documentType"
                        value={form.documentType}
                        onChange={(e) => set('documentType')(e.target.value)}
                        className={`w-full rounded-md border bg-secondary/40 pl-9 pr-4 py-2.5 font-mono text-sm text-foreground focus:outline-none transition-colors appearance-none cursor-pointer ${
                          errors.documentType ? 'border-rose-500/60' : 'border-border focus:border-primary'
                        }`}
                      >
                        {DOCUMENT_TYPES.map((dt) => (
                          <option key={dt.value} value={dt.value} className="bg-[#17294F]">
                            {dt.label}
                          </option>
                        ))}
                      </select>
                      <Icon icon="lucide:chevron-down" className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                    <FieldError message={errors.documentType} />
                  </div>
                  <div>
                    <FieldLabel required>Número de Documento</FieldLabel>
                    <InputField
                      id="documentNumber"
                      placeholder="Ej. 1234567890"
                      value={form.documentNumber}
                      onChange={set('documentNumber')}
                      error={errors.documentNumber}
                      icon="lucide:hash"
                    />
                    <FieldError message={errors.documentNumber} />
                  </div>
                </div>
              </fieldset>

              {/* Sección 2 — Dirección de envío */}
              <fieldset className="rounded-xl border border-border/60 bg-card/40 p-5 sm:p-6 space-y-5 backdrop-blur-sm">
                <legend className="flex items-center gap-2 px-1 font-mono text-xs font-bold text-primary uppercase tracking-widest">
                  <Icon icon="lucide:map-pin" className="h-3.5 w-3.5" />
                  Dirección de Entrega
                </legend>

                {/* País (fijo Colombia) + Ciudad */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <FieldLabel>País</FieldLabel>
                    <div className="relative">
                      <Icon icon="lucide:globe" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <input
                        id="country"
                        type="text"
                        value="Colombia"
                        readOnly
                        className="w-full rounded-md border border-border bg-secondary/20 pl-9 pr-4 py-2.5 font-mono text-sm text-muted-foreground cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div>
                    <FieldLabel required>Ciudad / Municipio</FieldLabel>
                    <div className="relative">
                      <Icon icon="lucide:building-2" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <select
                        id="city"
                        value={form.city}
                        onChange={(e) => set('city')(e.target.value)}
                        className={`w-full rounded-md border bg-secondary/40 pl-9 pr-4 py-2.5 font-mono text-sm text-foreground focus:outline-none transition-colors appearance-none cursor-pointer ${
                          errors.city ? 'border-rose-500/60' : 'border-border focus:border-primary'
                        }`}
                      >
                        <option value="" className="bg-[#17294F]">Selecciona tu ciudad...</option>
                        {COLOMBIA_CITIES.map((c) => (
                          <option key={c} value={c} className="bg-[#17294F]">{c}</option>
                        ))}
                      </select>
                      <Icon icon="lucide:chevron-down" className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                    <FieldError message={errors.city} />
                  </div>
                </div>

                {/* Dirección principal */}
                <div>
                  <FieldLabel required>Dirección de Entrega</FieldLabel>
                  <InputField
                    id="address"
                    placeholder="Ej. Calle 100 # 15-30, Barrio Chicó"
                    value={form.address}
                    onChange={set('address')}
                    error={errors.address}
                    icon="lucide:map-pin"
                  />
                  <FieldError message={errors.address} />
                </div>

                {/* Barrio / Apto */}
                <div>
                  <FieldLabel>Barrio / Apartamento / Piso <span className="font-normal text-muted-foreground">(opcional)</span></FieldLabel>
                  <InputField
                    id="addressExtra"
                    placeholder="Ej. Apto 301, Torre B"
                    value={form.addressExtra}
                    onChange={set('addressExtra')}
                  />
                </div>
              </fieldset>

              {/* Sección 3 — Nota al pedido */}
              <fieldset className="rounded-xl border border-border/60 bg-card/40 p-5 sm:p-6 space-y-4 backdrop-blur-sm">
                <legend className="flex items-center gap-2 px-1 font-mono text-xs font-bold text-primary uppercase tracking-widest">
                  <Icon icon="lucide:message-square" className="h-3.5 w-3.5" />
                  Nota al Pedido
                </legend>
                <div>
                  <FieldLabel>Instrucciones especiales <span className="font-normal text-muted-foreground">(opcional)</span></FieldLabel>
                  <textarea
                    id="orderNote"
                    rows={3}
                    placeholder="Ej. Entregar en la portería. No llamar antes de las 9am..."
                    value={form.orderNote}
                    onChange={(e) => set('orderNote')(e.target.value)}
                    className="w-full rounded-md border border-border bg-secondary/40 px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>
              </fieldset>

              {/* CTA Mobile — Botón pagar (solo en mobile, debajo del form) */}
              <div className="lg:hidden">
                <WompiButton loading={loading} total={subtotal} />
              </div>
            </form>
          </section>

          {/* ========== RESUMEN DEL PEDIDO (derecha en desktop, arriba en mobile lo omitimos) ========== */}
          <aside aria-label="Resumen del pedido" className="lg:sticky lg:top-24 space-y-4">

            {/* Card resumen */}
            <div className="rounded-xl border border-border/60 bg-card/50 p-5 sm:p-6 backdrop-blur-sm space-y-4">
              <h2 className="font-mono text-sm font-bold text-foreground flex items-center gap-2">
                <Icon icon="lucide:receipt" className="h-4 w-4 text-primary" />
                Resumen del pedido
              </h2>

              {/* Lista de productos */}
              <ul className="divide-y divide-border/50 space-y-0">
                {items.map(({ product, variant, qty }) => {
                  const itemImage = variant?.image || product.image
                  const itemPrice = variant?.priceCOP ?? product.priceCOP ?? 0
                  const itemName = variant ? `${product.title} · ${variant.name}` : product.title

                  return (
                    <li key={`${product.id}-${variant?.id ?? 'nv'}`} className="flex items-center gap-3 py-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-border bg-white">
                        {itemImage ? (
                          <Image
                            src={itemImage}
                            alt={product.title}
                            fill
                            sizes="48px"
                            className="object-contain p-1"
                          />
                        ) : (
                          <span className="flex h-full w-full items-center justify-center font-mono text-xs text-muted-foreground">
                            {product.title.slice(0, 2)}
                          </span>
                        )}
                        {/* Badge cantidad */}
                        <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                          {qty}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{itemName}</p>
                        <p className="font-mono text-xs text-muted-foreground">{product.lot}</p>
                      </div>
                      <span className="font-mono text-sm tabular-nums shrink-0">
                        {formatCOP(itemPrice * qty)}
                      </span>
                    </li>
                  )
                })}
              </ul>

              {/* Línea divisora */}
              <div className="border-t border-border/50 pt-3 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">{formatCOP(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Envío</span>
                  <span className="font-mono text-emerald-400 font-semibold">
                    {shipping === 0 ? 'A coordinar' : formatCOP(shipping)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-border/50">
                  <span className="font-mono text-sm font-bold text-foreground">Total</span>
                  <span className="font-mono text-xl font-bold tabular-nums text-foreground">
                    {formatCOP(subtotal + shipping)}
                  </span>
                </div>
              </div>

              {/* Editar carrito */}
              <Link
                href="/tienda"
                className="flex items-center justify-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon icon="lucide:pencil" className="h-3 w-3" />
                Editar carrito
              </Link>
            </div>

            {/* Badge seguridad */}
            <div className="rounded-xl border border-border/40 bg-card/30 px-4 py-3 flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
                <Icon icon="lucide:shield-check" className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <p className="font-mono text-xs font-bold text-foreground">Compra Segura · Wompi</p>
                <p className="font-mono text-[11px] text-muted-foreground">Transacción cifrada SSL 256-bit</p>
              </div>
            </div>

            {/* Métodos de pago aceptados */}
            <div className="rounded-xl border border-border/40 bg-card/30 px-4 py-3 space-y-2">
              <p className="font-mono text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Métodos aceptados</p>
              <div className="flex flex-wrap gap-2">
                {['Tarjeta crédito', 'Tarjeta débito', 'Nequi', 'Bancolombia', 'PSE'].map((m) => (
                  <span
                    key={m}
                    className="rounded border border-border/50 bg-secondary/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Botón Wompi Desktop */}
            <div className="hidden lg:block">
              <WompiButton loading={loading} total={subtotal} />
            </div>
          </aside>
        </div>
      </main>

      {/* Footer mínimo */}
      <footer className="border-t border-border mt-12 py-6 text-center font-mono text-xs text-muted-foreground space-y-1">
        <p>© {new Date().getFullYear()} KAILAB · Uso Exclusivo para Investigación (RUO)</p>
        <a
          href="https://www.kytcode.lat"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          Desarrollado por K&T
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </a>
      </footer>
    </div>
  )
}

// --- Botón Wompi (placeholder listo para conectar) ---
function WompiButton({ loading, total }: { loading: boolean; total: number }) {
  return (
    <button
      type="submit"
      form="checkout-form"
      disabled={loading}
      className="w-full flex items-center justify-center gap-3 rounded-lg border-2 border-[#7B2FBE] bg-[#7B2FBE] py-3.5 font-mono text-sm font-bold text-white shadow-lg shadow-[#7B2FBE]/20 transition-all duration-300 hover:bg-[#6b25aa] hover:shadow-[#7B2FBE]/30 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
      aria-label="Continuar al pago con Wompi"
    >
      {loading ? (
        <>
          <Icon icon="lucide:loader-2" className="h-5 w-5 animate-spin" />
          <span>Procesando...</span>
        </>
      ) : (
        <>
          <Icon icon="lucide:lock" className="h-5 w-5" />
          <span>Continuar al pago</span>
          <span className="ml-1 rounded bg-white/15 px-2 py-0.5 text-[11px] font-bold">
            {formatCOP(total)}
          </span>
        </>
      )}
    </button>
  )
}
