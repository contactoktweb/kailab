'use client'

import { useCart } from './cart-context'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { formatCOP, shipping, shippingRules } from './data'

export function CarritoClient() {
  const { items, removeFromCart, updateQty, cartTotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-border bg-secondary">
          <Icon icon="lucide:shopping-cart" className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
          Tu carrito
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Tu carrito está vacío.
        </p>
        <Link
          href="/tienda"
          className="inline-flex items-center gap-2 rounded-sm border-2 border-primary bg-primary px-6 py-3 text-sm font-bold text-white transition-all hover:bg-transparent hover:text-primary"
        >
          <Icon icon="lucide:store" className="h-4 w-4" />
          Ver productos
        </Link>
      </div>
    )
  }

  const subtotal = cartTotal
  const envio = 0
  const total = subtotal + envio

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-2">
        Tu carrito
      </h1>
      <p className="text-muted-foreground mb-8">
        Revisa los productos, las presentaciones y las cantidades antes de continuar.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="hidden sm:grid grid-cols-12 gap-4 border-b border-border pb-4 mb-4 text-xs font-mono text-muted-foreground">
            <div className="col-span-6">Presentación</div>
            <div className="col-span-3 text-center">Cantidad</div>
            <div className="col-span-3 text-right">Precio</div>
          </div>

          <ul className="divide-y divide-border/50">
            {items.map((item) => {
              const { product, variant, qty } = item
              const itemImage = variant?.image || product.image
              const itemPrice = variant?.priceCOP ?? product.priceCOP ?? 0
              const itemName = variant ? `${product.title} · ${variant.name}` : product.title
              const itemUrl = `/tienda/${product.categorySlug}/${product.slug}${variant ? `/${variant.slug}` : ''}`

              return (
                <li key={`${product.id}-${variant?.id ?? 'nv'}`} className="py-6 sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center flex flex-col gap-4">
                  <div className="sm:col-span-6 flex gap-4">
                    <Link href={itemUrl} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-border bg-white transition-opacity hover:opacity-80">
                      {itemImage ? (
                        <Image
                          src={itemImage}
                          alt={product.title}
                          fill
                          sizes="80px"
                          className="object-contain p-2"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center font-mono text-xs text-brand-soft">
                          {product.title.slice(0, 2)}
                        </span>
                      )}
                    </Link>
                    <div className="flex flex-col justify-center">
                      <Link href={itemUrl} className="text-base font-semibold hover:text-primary transition-colors">
                        {itemName}
                      </Link>
                      <button
                        onClick={() => removeFromCart(product.id, variant?.id)}
                        className="text-xs text-rose-500 font-mono mt-2 self-start hover:underline flex items-center gap-1"
                      >
                        <Icon icon="lucide:trash-2" className="h-3 w-3" />
                        Eliminar
                      </button>
                    </div>
                  </div>

                  <div className="sm:col-span-3 flex sm:justify-center items-center">
                    <div className="inline-flex items-center rounded-md border border-border">
                      <button
                        onClick={() => updateQty(product.id, variant?.id, -1)}
                        className="px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
                        aria-label="Disminuir cantidad"
                      >
                        <Icon icon="lucide:minus" className="h-3 w-3" />
                      </button>
                      <span className="w-10 text-center font-mono text-sm tabular-nums">{qty}</span>
                      <button
                        onClick={() => updateQty(product.id, variant?.id, 1)}
                        className="px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
                        aria-label="Aumentar cantidad"
                      >
                        <Icon icon="lucide:plus" className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  <div className="sm:col-span-3 text-left sm:text-right font-mono font-bold tabular-nums">
                    {formatCOP(itemPrice * qty)}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-card/30 p-6 shadow-sm flex flex-col justify-between h-full">
            <div className="space-y-4">
              <h2 className="font-mono text-base font-bold text-foreground">Resumen de compra</h2>
              
              <div className="flex justify-between text-muted-foreground text-sm">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">{formatCOP(subtotal)}</span>
              </div>
              
              <div className="flex justify-between text-muted-foreground text-sm">
                <span>Envío</span>
                <span className="font-mono tabular-nums uppercase text-xs font-bold text-emerald-500">Gratis</span>
              </div>
              
              <div className="border-t border-border pt-4 flex justify-between items-baseline">
                <span className="font-mono font-bold text-foreground">Total</span>
                <span className="font-mono text-2xl font-bold tabular-nums text-foreground">
                  {formatCOP(total)}
                </span>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <Link
                href="/checkout"
                className="w-full flex justify-center items-center gap-2 rounded-sm border-2 border-primary bg-primary px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-transparent hover:text-primary"
              >
                Continuar
              </Link>
              <Link
                href="/tienda"
                className="w-full flex justify-center items-center rounded-sm border border-border bg-transparent px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-secondary"
              >
                Seguir comprando
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card/30 p-6 shadow-sm h-full">
              <h3 className="font-mono text-sm font-bold text-foreground flex items-center gap-2 mb-3">
                <Icon icon="lucide:truck" className="h-4 w-4 text-primary" />
                Tiempos de envío
              </h3>
              <div className="text-xs text-muted-foreground space-y-2">
                {shipping.map((row) => (
                  <p key={row.city}><strong className="text-foreground">{row.city}:</strong> aproximadamente {row.time}.</p>
                ))}
                <div className="pt-2 border-t border-border/50 space-y-1">
                  <p>{shippingRules.cutoff}</p>
                  <p>{shippingRules.delivery}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
  )
}
