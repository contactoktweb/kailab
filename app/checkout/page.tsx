'use client'

import { useState, FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useCart } from '@/components/kailab/cart-context'
import { formatCOP, type CheckoutFormData } from '@/components/kailab/data'

const COUNTRIES = [
  'Colombia',
  'México',
  'Chile',
  'Perú',
  'Argentina',
  'Ecuador',
  'Panamá',
  'Costa Rica',
  'Otro país',
]

const INITIAL_FORM: CheckoutFormData = {
  email: '',
  country: 'Colombia',
  firstName: '',
  lastName: '',
  address: '',
  addressExtra: '',
  city: '',
  state: '',
  zipCode: '',
  phone: '',
}

type FormErrors = Partial<Record<keyof CheckoutFormData, string>>

const REQUIRED: (keyof CheckoutFormData)[] = [
  'email',
  'country',
  'firstName',
  'lastName',
  'address',
  'city',
  'state',
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

  if (form.phone && form.phone.trim() && !/^[0-9+\s\-()]{7,15}$/.test(form.phone)) {
    errors.phone = 'Número de teléfono inválido.'
  }

  return errors
}

// --- Sub-componentes ---

function FieldLabel({ htmlFor, children, required }: { htmlFor?: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block font-mono text-xs font-semibold text-foreground mb-0.5">
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
}: {
  id: string
  type?: string
  placeholder?: string
  value: string
  onChange: (v: string) => void
  error?: string
}) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-md border bg-secondary/40 px-4 py-[7px] font-mono text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none transition-colors ${
          error
            ? 'border-rose-500/60 focus:border-rose-500'
            : 'border-border focus:border-primary'
        }`}
      />
    </div>
  )
}

export default function CheckoutPage() {
  const { items, cartTotal } = useCart()

  const [form, setForm] = useState<CheckoutFormData>(INITIAL_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [showExtraAddress, setShowExtraAddress] = useState(false)
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
      const firstKey = Object.keys(errs)[0]
      document.getElementById(firstKey)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setLoading(true)
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
          <h1 className="text-2xl font-bold font-mono text-foreground">¡Información de envío guardada!</h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            Hemos registrado tus datos de contacto y envío correctamente.
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="Volver al inicio KAILAB">
            <Image src="/kailab-logo.png" alt="KAILAB" width={110} height={32} className="h-7 w-auto" />
          </Link>

          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <span>Carrito</span>
            <Icon icon="lucide:chevron-right" className="h-3 w-3" />
            <span className="text-foreground font-bold">Información de envío</span>
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
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 pb-8 lg:pt-7 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* ========== FORMULARIO ========== */}
          <section aria-labelledby="checkout-form-heading">
            <h1 id="checkout-form-heading" className="sr-only">Proceso de Pago y Envío KAILAB</h1>
            <form id="checkout-form" onSubmit={handleSubmit} noValidate className="space-y-6">

              {/* SECCIÓN 1: Información de contacto */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold font-mono tracking-tight text-foreground">
                  Información de contacto
                </h2>
                <div>
                  <FieldLabel htmlFor="email" required>Dirección de correo electrónico</FieldLabel>
                  <InputField
                    id="email"
                    type="email"
                    placeholder="Dirección de correo electrónico"
                    value={form.email}
                    onChange={set('email')}
                    error={errors.email}
                  />
                  <FieldError message={errors.email} />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Actualmente estás realizando el pago como invitado.
                  </p>
                </div>
              </div>

              {/* SECCIÓN 2: Dirección de envío */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold font-mono tracking-tight text-foreground">
                  Dirección de envío
                </h2>

                {/* País / Región */}
                <div>
                  <FieldLabel htmlFor="country" required>País/Región</FieldLabel>
                  <div className="relative">
                    <select
                      id="country"
                      value={form.country}
                      onChange={(e) => set('country')(e.target.value)}
                      className={`w-full rounded-md border bg-secondary/40 px-4 py-[7px] font-mono text-sm text-foreground focus:outline-none transition-colors appearance-none cursor-pointer ${
                        errors.country ? 'border-rose-500/60' : 'border-border focus:border-primary'
                      }`}
                    >
                      <option value="" disabled className="bg-[#17294F]">Selecciona un país/región</option>
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c} className="bg-[#17294F]">
                          {c}
                        </option>
                      ))}
                    </select>
                    <Icon icon="lucide:chevron-down" className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                  <FieldError message={errors.country} />
                </div>

                {/* Nombre + Apellidos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <FieldLabel htmlFor="firstName" required>Nombre</FieldLabel>
                    <InputField
                      id="firstName"
                      placeholder="Nombre"
                      value={form.firstName}
                      onChange={set('firstName')}
                      error={errors.firstName}
                    />
                    <FieldError message={errors.firstName} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="lastName" required>Apellidos</FieldLabel>
                    <InputField
                      id="lastName"
                      placeholder="Apellidos"
                      value={form.lastName}
                      onChange={set('lastName')}
                      error={errors.lastName}
                    />
                    <FieldError message={errors.lastName} />
                  </div>
                </div>

                {/* Dirección */}
                <div>
                  <FieldLabel htmlFor="address" required>Dirección</FieldLabel>
                  <InputField
                    id="address"
                    placeholder="Dirección"
                    value={form.address}
                    onChange={set('address')}
                    error={errors.address}
                  />
                  <FieldError message={errors.address} />
                </div>

                {/* Apartamento / Habitación (con opción toggleable o input directo) */}
                <div>
                  {showExtraAddress || form.addressExtra ? (
                    <div>
                      <FieldLabel htmlFor="addressExtra">Apartamento, habitación, etc. (opcional)</FieldLabel>
                      <InputField
                        id="addressExtra"
                        placeholder="Apartamento, habitación, etc."
                        value={form.addressExtra || ''}
                        onChange={set('addressExtra')}
                      />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowExtraAddress(true)}
                      className="text-xs font-mono text-primary hover:underline flex items-center gap-1"
                    >
                      + Add apartamento, habitación, etc.
                    </button>
                  )}
                </div>

                {/* Ciudad + Estado / Municipio */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <FieldLabel htmlFor="city" required>Ciudad</FieldLabel>
                    <InputField
                      id="city"
                      placeholder="Ciudad"
                      value={form.city}
                      onChange={set('city')}
                      error={errors.city}
                    />
                    <FieldError message={errors.city} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="state" required>Estado/Municipio</FieldLabel>
                    <InputField
                      id="state"
                      placeholder="Estado/Municipio"
                      value={form.state}
                      onChange={set('state')}
                      error={errors.state}
                    />
                    <FieldError message={errors.state} />
                  </div>
                </div>

                {/* Código postal + Teléfono (opcional) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <FieldLabel htmlFor="zipCode">Código postal</FieldLabel>
                    <InputField
                      id="zipCode"
                      placeholder="Código postal"
                      value={form.zipCode || ''}
                      onChange={set('zipCode')}
                      error={errors.zipCode}
                    />
                    <FieldError message={errors.zipCode} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="phone">Teléfono (opcional)</FieldLabel>
                    <InputField
                      id="phone"
                      type="tel"
                      placeholder="Teléfono (opcional)"
                      value={form.phone || ''}
                      onChange={set('phone')}
                      error={errors.phone}
                    />
                    <FieldError message={errors.phone} />
                  </div>
                </div>

              </div>

              {/* CTA Mobile */}
              <div className="lg:hidden">
                <WompiButton loading={loading} total={subtotal} />
              </div>
            </form>
          </section>

          {/* ========== RESUMEN DEL PEDIDO ========== */}
          <aside aria-label="Resumen del pedido" className="lg:sticky lg:top-24 space-y-5 lg:pt-10">

            <div className="rounded-xl border border-border/60 bg-card/50 p-6 sm:p-7 backdrop-blur-sm space-y-5">
              <h2 className="font-mono text-base font-bold text-foreground flex items-center gap-2">
                <Icon icon="lucide:receipt" className="h-5 w-5 text-primary" />
                Resumen del pedido
              </h2>

              <ul className="divide-y divide-border/50 space-y-0">
                {items.map(({ product, variant, qty }) => {
                  const itemImage = variant?.image || product.image
                  const itemPrice = variant?.priceCOP ?? product.priceCOP ?? 0
                  const itemName = variant ? `${product.title} · ${variant.name}` : product.title

                  return (
                    <li key={`${product.id}-${variant?.id ?? 'nv'}`} className="flex items-center gap-4 py-3.5">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md border border-border bg-white">
                        {itemImage ? (
                          <Image
                            src={itemImage}
                            alt={product.title}
                            fill
                            sizes="56px"
                            className="object-contain p-1"
                          />
                        ) : (
                          <span className="flex h-full w-full items-center justify-center font-mono text-xs text-muted-foreground">
                            {product.title.slice(0, 2)}
                          </span>
                        )}
                        <span className="absolute -right-1.5 -top-1.5 flex h-5.5 w-5.5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                          {qty}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-base font-semibold">{itemName}</p>
                        <p className="font-mono text-xs text-muted-foreground">{product.lot}</p>
                      </div>
                      <span className="font-mono text-base font-bold tabular-nums shrink-0">
                        {formatCOP(itemPrice * qty)}
                      </span>
                    </li>
                  )
                })}
              </ul>

              <div className="border-t border-border/50 pt-4 space-y-2.5">
                <div className="flex justify-between text-base text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">{formatCOP(subtotal)}</span>
                </div>
                <div className="flex justify-between items-baseline pt-3 border-t border-border/50">
                  <span className="font-mono text-base font-bold text-foreground">Total</span>
                  <span className="font-mono text-2xl font-bold tabular-nums text-foreground">
                    {formatCOP(subtotal)}
                  </span>
                </div>
              </div>

              <Link
                href="/tienda"
                className="flex items-center justify-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors pt-1"
              >
                <Icon icon="lucide:pencil" className="h-3.5 w-3.5" />
                Editar carrito
              </Link>
            </div>

            <div className="rounded-xl border border-border/40 bg-card/30 px-5 py-4 flex items-center gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
                <Icon icon="lucide:shield-check" className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="font-mono text-xs font-bold text-foreground">Compra Segura · Wompi</p>
                <p className="font-mono text-[11px] text-muted-foreground">Transacción cifrada SSL 256-bit</p>
              </div>
            </div>

            {/* Botón Wompi Desktop */}
            <div className="hidden lg:block">
              <WompiButton loading={loading} total={subtotal} />
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
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
