'use client'

import { useState, FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useCart } from '@/components/kailab/cart-context'
import { formatCOP, type CheckoutFormData } from '@/components/kailab/data'

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
      errors[key] = 'Completa este campo.'
    }
  })

  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Revisa el correo electrónico.'
  }

  if (form.phone && form.phone.trim() && !/^[0-9+\s\-()]{7,15}$/.test(form.phone)) {
    errors.phone = 'Número de teléfono inválido.'
  }

  return errors
}

// --- Sub-componentes ---

function FieldLabel({ htmlFor, children, required }: { htmlFor?: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block font-mono text-[11px] font-semibold text-slate-700 mb-0.5">
      {children}
      {required && <span className="ml-1 text-rose-500">*</span>}
    </label>
  )
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="mt-0.5 font-mono text-[10px] text-rose-500 flex items-center gap-1">
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
        className={`w-full rounded-md border bg-slate-50 px-3 py-1.5 font-mono text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none transition-colors ${
          error
            ? 'border-rose-500 focus:border-rose-600'
            : 'border-slate-300 focus:border-[#17294F]'
        }`}
      />
    </div>
  )
}

export default function CheckoutPage() {
  const { items, cartTotal } = useCart()

  const [form, setForm] = useState<CheckoutFormData>(INITIAL_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping')
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const set = (key: keyof CheckoutFormData) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handleContinueToPayment = (e: FormEvent) => {
    e.preventDefault()
    setPaymentError(null)
    const errs = validate(form)

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      setPaymentError('Completa los datos de envío para continuar.')
      const firstKey = Object.keys(errs)[0]
      document.getElementById(firstKey)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setStep('payment')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleWompiPayment = async () => {
    setLoading(true)
    setPaymentError(null)
    try {
      const reference = `KL-${Date.now()}`
      const amountInCents = cartTotal * 100
      const currency = 'COP'
      const redirectUrl = `${window.location.origin}/pago/resultado`
      const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY!

      const res = await fetch('/api/wompi/signature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference, amountInCents, currency }),
      })
      if (!res.ok) throw new Error('Error generando firma')
      const { signature } = await res.json()

      const existingForm = document.getElementById('wompi-hidden-form')
      if (existingForm) existingForm.remove()

      const wForm = document.createElement('form')
      wForm.id = 'wompi-hidden-form'
      wForm.style.display = 'none'
      wForm.setAttribute('data-wompi-public-key', publicKey)
      wForm.setAttribute('data-currency', currency)
      wForm.setAttribute('data-amount-in-cents', String(amountInCents))
      wForm.setAttribute('data-reference', reference)
      wForm.setAttribute('data-signature:integrity', signature)
      wForm.setAttribute('data-redirect-url', redirectUrl)
      wForm.setAttribute('data-customer-data:email', form.email)
      wForm.setAttribute('data-customer-data:full-name', `${form.firstName} ${form.lastName}`.trim())
      if (form.phone) wForm.setAttribute('data-customer-data:phone-number', form.phone)

      const submitBtn = document.createElement('input')
      submitBtn.type = 'submit'
      wForm.appendChild(submitBtn)
      document.body.appendChild(wForm)

      const loadScript = () =>
        new Promise<void>((resolve, reject) => {
          if (document.querySelector('script[src*="checkout.wompi.co/widget.js"]')) {
            setTimeout(resolve, 300)
            return
          }
          const script = document.createElement('script')
          script.src = 'https://checkout.wompi.co/widget.js'
          script.async = true
          script.onload = () => setTimeout(resolve, 300)
          script.onerror = reject
          document.body.appendChild(script)
        })

      await loadScript()

      const wompiBtn = wForm.querySelector<HTMLElement>('input[type=submit], button')
      wompiBtn?.click()
    } catch (err) {
      console.error('[Wompi Checkout]', err)
      setPaymentError('No pudimos abrir el pago. Tus datos siguen aquí. Inténtalo de nuevo.')
      setStep('shipping')
    } finally {
      setLoading(false)
    }
  }

  const handleCriptoPayment = async () => {
    setLoading(true)
    setPaymentError(null)
    setTimeout(() => {
      alert('Flujo de Criptomonedas en desarrollo')
      setLoading(false)
    }, 1000)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex flex-col items-center justify-center gap-5 px-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-slate-50">
          <Icon icon="lucide:shopping-cart" className="h-7 w-7 text-slate-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold font-mono text-slate-900">Tu carrito está vacío</h1>
          <p className="mt-1 text-xs text-slate-500">Agrega productos antes de continuar al checkout.</p>
        </div>
        <Link
          href="/tienda"
          className="inline-flex items-center gap-2 rounded-md bg-[#17294F] px-4 py-2 text-xs font-bold text-white transition-all hover:bg-[#101d38]"
        >
          <Icon icon="lucide:store" className="h-4 w-4" />
          Ir a la tienda
        </Link>
      </div>
    )
  }

  const subtotal = cartTotal

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {/* Header Compacto */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-xs">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 h-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="Volver al inicio KAILAB">
            <Image src="/KAILAB_Logo_Navy-Blue.png" alt="KAILAB" width={100} height={28} className="h-6 w-auto object-contain" />
          </Link>

          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-slate-500">
            <span className={step === 'shipping' ? 'text-slate-900 font-bold' : ''}>Información de envío</span>
            <Icon icon="lucide:chevron-right" className="h-3 w-3 text-slate-400" />
            <span className={step === 'payment' ? 'text-slate-900 font-bold' : ''}>Pago</span>
          </div>

          <Link
            href="/carrito"
            className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-slate-600 hover:text-[#17294F] transition-colors"
          >
            <Icon icon="lucide:arrow-left" className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Volver al carrito</span>
          </Link>
        </div>
      </header>

      {/* Main content Compacto */}
      <main className="mx-auto max-w-5xl w-full px-4 sm:px-6 py-4 flex-1">
        {step === 'shipping' ? (
          <div className="animate-in fade-in duration-300">
            <div className="mb-4">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mb-0.5">Información de envío</h1>
              <p className="text-xs text-slate-500">Completa tus datos y revisa el resumen para continuar.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* Left Column: Form */}
              <section className="lg:col-span-7 xl:col-span-7" aria-labelledby="checkout-form-heading">
                <h2 id="checkout-form-heading" className="sr-only">Proceso de Envío KAILAB</h2>
                <form id="checkout-form" onSubmit={handleContinueToPayment} noValidate className="space-y-4">
                  
                  {/* Contact Info */}
                  <div className="space-y-2.5 bg-slate-50/80 border border-slate-200 rounded-lg p-3.5 sm:p-4">
                    <h2 className="text-xs font-bold font-mono tracking-tight text-slate-900 uppercase border-b border-slate-200 pb-1.5">
                      Información de contacto
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
                      <div>
                        <FieldLabel htmlFor="email" required>Correo electrónico</FieldLabel>
                        <InputField id="email" type="email" placeholder="tudireccion@correo.com" value={form.email} onChange={set('email')} error={errors.email} />
                        <FieldError message={errors.email} />
                      </div>
                      <div>
                        <FieldLabel htmlFor="phone" required>Teléfono / Celular</FieldLabel>
                        <InputField id="phone" type="tel" placeholder="300 000 0000" value={form.phone || ''} onChange={set('phone')} error={errors.phone} />
                        <FieldError message={errors.phone} />
                      </div>
                    </div>
                  </div>

                  {/* Address Info */}
                  <div className="space-y-2.5 bg-slate-50/80 border border-slate-200 rounded-lg p-3.5 sm:p-4">
                    <h2 className="text-xs font-bold font-mono tracking-tight text-slate-900 uppercase border-b border-slate-200 pb-1.5">
                      Dirección de envío
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
                      <div>
                        <FieldLabel htmlFor="firstName" required>Nombre</FieldLabel>
                        <InputField id="firstName" placeholder="Nombre" value={form.firstName} onChange={set('firstName')} error={errors.firstName} />
                        <FieldError message={errors.firstName} />
                      </div>
                      <div>
                        <FieldLabel htmlFor="lastName" required>Apellidos</FieldLabel>
                        <InputField id="lastName" placeholder="Apellidos" value={form.lastName} onChange={set('lastName')} error={errors.lastName} />
                        <FieldError message={errors.lastName} />
                      </div>
                    </div>

                    <div>
                      <FieldLabel htmlFor="country" required>País</FieldLabel>
                      <select id="country" disabled value="Colombia" className="w-full rounded-md border border-slate-300 bg-slate-100 px-3 py-1.5 font-mono text-xs text-slate-700 opacity-90 cursor-not-allowed">
                        <option value="Colombia">Colombia</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <FieldLabel htmlFor="state" required>Departamento</FieldLabel>
                        <InputField id="state" placeholder="Ej. Cundinamarca" value={form.state} onChange={set('state')} error={errors.state} />
                        <FieldError message={errors.state} />
                      </div>
                      <div>
                        <FieldLabel htmlFor="city" required>Ciudad o municipio</FieldLabel>
                        <InputField id="city" placeholder="Ej. Bogotá" value={form.city} onChange={set('city')} error={errors.city} />
                        <FieldError message={errors.city} />
                      </div>
                    </div>

                    <div>
                      <FieldLabel htmlFor="address" required>Dirección completa</FieldLabel>
                      <InputField id="address" placeholder="Calle / Carrera / Avenida # - " value={form.address} onChange={set('address')} error={errors.address} />
                      <FieldError message={errors.address} />
                    </div>

                    <div>
                      <FieldLabel htmlFor="addressExtra">Apartamento, torre, habitación, etc. (opcional)</FieldLabel>
                      <InputField id="addressExtra" placeholder="Apto 101, Torre 2" value={form.addressExtra || ''} onChange={set('addressExtra')} />
                    </div>
                  </div>

                  {paymentError && (
                    <div className="rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-center">
                      <p className="font-mono text-xs text-rose-600 flex items-center justify-center gap-1.5 font-semibold">
                        <Icon icon="lucide:alert-circle" className="h-3.5 w-3.5 shrink-0" />
                        {paymentError}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row-reverse gap-2.5 pt-1">
                    <button
                      type="submit"
                      className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#17294F] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#101d38] active:scale-[0.99]"
                    >
                      <span>Continuar al pago</span>
                      <Icon icon="lucide:arrow-right" className="h-3.5 w-3.5" />
                    </button>
                    <Link
                      href="/carrito"
                      className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      Editar carrito
                    </Link>
                  </div>
                </form>
              </section>

              {/* Right Column: Entire column is STICKY as a single unit so Card 2 never overlaps Card 1 */}
              <aside className="lg:col-span-5 xl:col-span-5 lg:sticky lg:top-16 space-y-3">
                {/* Card 1: Resumen del pedido */}
                <div className="rounded-xl border border-slate-800 bg-[#17294F] p-4 text-white shadow-md space-y-3">
                  <h2 className="font-mono text-xs font-bold text-white flex items-center justify-between border-b border-slate-700/70 pb-2 uppercase tracking-wide">
                    <span>Resumen del pedido</span>
                    <span className="text-[11px] font-normal text-slate-300 normal-case">{items.length} {items.length === 1 ? 'producto' : 'productos'}</span>
                  </h2>

                  <div className="hidden sm:grid grid-cols-12 gap-2 text-[9px] uppercase tracking-wider text-slate-300 font-mono border-b border-slate-700/50 pb-1.5">
                    <div className="col-span-7">Presentación</div>
                    <div className="col-span-2 text-center">Cant.</div>
                    <div className="col-span-3 text-right">Precio</div>
                  </div>

                  <ul className="divide-y divide-slate-700/50 max-h-[220px] overflow-y-auto pr-1">
                    {items.map(({ product, variant, qty }) => {
                      const itemImage = variant?.image || product.image
                      const itemPrice = variant?.priceCOP ?? product.priceCOP ?? 0
                      const itemName = variant ? `${product.title} · ${variant.name}` : product.title
                      return (
                        <li key={`${product.id}-${variant?.id ?? 'nv'}`} className="py-2 sm:grid sm:grid-cols-12 sm:gap-2 sm:items-center flex flex-col gap-1.5">
                          <div className="sm:col-span-7 flex items-center gap-2.5">
                            <div className="relative h-9 w-9 shrink-0 rounded-md border border-slate-700 bg-white overflow-hidden">
                              {itemImage && <Image src={itemImage} alt={product.title} fill sizes="36px" className="object-contain p-0.5" />}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[11px] font-semibold leading-tight text-white">{itemName}</p>
                            </div>
                          </div>
                          <div className="sm:col-span-2 text-left sm:text-center font-mono text-[11px] text-slate-300">
                            x{qty}
                          </div>
                          <div className="sm:col-span-3 text-left sm:text-right font-mono text-[11px] font-bold tabular-nums text-white">
                            {formatCOP(itemPrice * qty)}
                          </div>
                        </li>
                      )
                    })}
                  </ul>

                  <div className="border-t border-slate-700/70 pt-2.5 space-y-1.5 font-mono">
                    <div className="flex justify-between text-[11px] text-slate-300">
                      <span>Subtotal</span>
                      <span className="tabular-nums text-white font-semibold">{formatCOP(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-300">
                      <span>Envío</span>
                      <span className="text-emerald-400 uppercase text-[11px] font-bold tabular-nums">Gratis</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2 border-t border-slate-700/70">
                      <span className="font-bold text-white text-xs font-sans">Total</span>
                      <span className="text-lg font-bold tabular-nums text-white">
                        {formatCOP(subtotal)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Tiempos de envío */}
                <div className="rounded-xl border border-slate-800 bg-[#17294F] p-4 text-white shadow-md space-y-2">
                  <h3 className="font-mono text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wide">
                    <Icon icon="lucide:truck" className="h-3.5 w-3.5 text-emerald-400" />
                    Tiempos de envío
                  </h3>
                  <div className="text-[11px] text-slate-300 space-y-1.5 leading-relaxed">
                    <p><strong className="text-white">Bogotá:</strong> Al día hábil siguiente.</p>
                    <p><strong className="text-white">Nacional:</strong> De 2 a 3 días hábiles en ciudades principales y secundarias; o hasta 5 días hábiles en poblaciones lejanas.</p>
                    <p className="pt-1.5 border-t border-slate-700/60 text-[10px] text-slate-400">
                      El cierre de despachos es a las 4 p. m. (L-V) y 12 m. (Sábados). 
                      Pedidos confirmados después de esa hora se entregan al día hábil siguiente.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        ) : (
          /* Payment Step Compacto */
          <div className="animate-in fade-in duration-300 max-w-md mx-auto py-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 mb-0.5 text-center">Elige cómo pagar</h1>
            <p className="text-xs text-slate-500 mb-4 text-center">Revisa el total y selecciona uno de los medios disponibles.</p>
            
            <div className="mb-4 rounded-xl border border-slate-800 bg-[#17294F] p-4 text-white text-center shadow-md space-y-0.5">
              <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest block">Total a pagar</span>
              <span className="font-mono text-2xl font-bold tabular-nums text-white block">{formatCOP(subtotal)}</span>
            </div>

            {paymentError && (
              <div className="rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-center mb-4">
                <p className="font-mono text-xs text-rose-600 flex items-center justify-center gap-1.5 font-semibold">
                  <Icon icon="lucide:alert-circle" className="h-3.5 w-3.5 shrink-0" />
                  {paymentError}
                </p>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={handleWompiPayment}
                disabled={loading}
                className="w-full relative overflow-hidden group flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-slate-200 bg-slate-50 p-4 transition-all hover:border-[#17294F] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#17294F]/30 disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
              >
                {loading ? (
                  <Icon icon="lucide:loader-2" className="h-6 w-6 animate-spin text-[#17294F] mb-0.5" />
                ) : (
                  <Icon icon="lucide:credit-card" className="h-6 w-6 text-[#17294F] mb-0.5 group-hover:scale-105 transition-transform" />
                )}
                <span className="font-bold text-sm text-slate-900">Tarjetas, PSE y billeteras</span>
                <span className="font-mono text-[11px] text-slate-500">Pago seguro procesado por Wompi</span>
              </button>

              <button
                onClick={handleCriptoPayment}
                disabled={loading}
                className="w-full relative overflow-hidden group flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-slate-200 bg-slate-50 p-4 transition-all hover:border-[#F3BA2F] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#F3BA2F]/30 disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
              >
                <Icon icon="lucide:bitcoin" className="h-6 w-6 text-[#F3BA2F] mb-0.5 group-hover:scale-105 transition-transform" />
                <span className="font-bold text-sm text-slate-900">Criptomonedas</span>
                <span className="font-mono text-[11px] text-slate-500">USDT · red TRC-20</span>
              </button>
            </div>

            <div className="mt-4 text-center">
              <button 
                onClick={() => {
                  setStep('shipping')
                  setPaymentError(null)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-600 hover:text-[#17294F] transition-colors"
              >
                <Icon icon="lucide:arrow-left" className="h-3.5 w-3.5" />
                Volver a la información de envío
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer Compacto */}
      <footer className="border-t border-slate-200 bg-white py-3 text-center font-mono text-[11px] text-slate-500">
        <p>© {new Date().getFullYear()} KAILAB · Uso Exclusivo para Investigación (RUO)</p>
      </footer>
    </div>
  )
}
