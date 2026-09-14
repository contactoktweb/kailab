'use client'

import { useEffect } from 'react'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'
import { formatCOP, type CartItem } from './data'
import { MicroBadge } from './badge'

type CartDrawerProps = {
  open: boolean
  onClose: () => void
  items: CartItem[]
  onQty: (productId: string, variantId: string | undefined, delta: number) => void
  onRemove: (productId: string, variantId: string | undefined) => void
}

export function CartDrawer({ open, onClose, items, onQty, onRemove }: CartDrawerProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const subtotal = items.reduce((sum, i) => {
    const price = i.variant?.priceCOP ?? i.product.priceCOP ?? 0
    return sum + price * i.qty
  }, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)



  return (
    <>
      <div
        className={`fixed inset-0 z-[90] bg-black/60 transition-opacity ${open ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed right-0 top-0 z-[95] flex h-full w-full max-w-md flex-col border-l border-border bg-[#17294F] shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'
          }`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compra"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <Icon icon="lucide:shopping-cart" className="h-4 w-4 text-brand-soft" aria-hidden="true" />
            <h2 className="text-sm font-medium">Carrito</h2>
            <MicroBadge variant="brand">{count} {count === 1 ? 'ítem' : 'ítems'}</MicroBadge>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Cerrar carrito"
          >
            <Icon icon="lucide:x" className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-secondary">
              <Icon icon="lucide:shopping-cart" className="h-7 w-7 text-muted-foreground" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-medium">Tu carrito está vacío</p>
              <p className="mt-1 max-w-xs text-xs leading-relaxed text-muted-foreground">
                Agrega referencias desde el catálogo o usa la búsqueda rápida{' '}
                <kbd className="rounded border border-border bg-secondary px-1 font-mono text-[10px]">
                  ⌘K
                </kbd>
                .
              </p>
            </div>
            <Link
              href="/tienda"
              onClick={onClose}
              className="mt-2 inline-flex items-center gap-2 rounded-sm border-2 border-primary bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary active:scale-95"
            >
              <Icon icon="lucide:store" className="h-3.5 w-3.5" />
              Ver catálogo
            </Link>
          </div>
        ) : (
          /* Items list */
          <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
            {items.map(({ product, variant, qty }) => {
              const itemImage = variant?.image || product.image
              const itemPrice = variant?.priceCOP ?? product.priceCOP ?? 0
              const itemName = variant ? `${product.title} · ${variant.name}` : product.title

              return (
                <li key={`${product.id}-${variant?.id ?? 'no-variant'}`} className="flex gap-3 py-4">
                  {/* Thumbnail */}
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
                      <span className="flex h-full w-full items-center justify-center font-mono text-xs text-brand-soft">
                        {product.title.slice(0, 2)}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{itemName}</p>
                        <p className="truncate font-mono text-xs text-muted-foreground">
                          {product.lot}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemove(product.id, variant?.id)}
                        className="rounded p-1 text-muted-foreground transition-colors hover:text-destructive"
                        aria-label={`Quitar ${itemName}`}
                      >
                        <Icon icon="lucide:trash-2" className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="mt-2 flex items-center justify-between gap-2">
                      {/* Qty controls */}
                      <div className="inline-flex items-center rounded-md border border-border">
                        <button
                          onClick={() => onQty(product.id, variant?.id, -1)}
                          className="px-2 py-1 text-muted-foreground transition-colors hover:text-foreground"
                          aria-label="Disminuir cantidad"
                        >
                          <Icon icon="lucide:minus" className="h-3 w-3" aria-hidden="true" />
                        </button>
                        <span className="w-8 text-center font-mono text-xs tabular-nums">{qty}</span>
                        <button
                          onClick={() => onQty(product.id, variant?.id, 1)}
                          className="px-2 py-1 text-muted-foreground transition-colors hover:text-foreground"
                          aria-label="Aumentar cantidad"
                        >
                          <Icon icon="lucide:plus" className="h-3 w-3" aria-hidden="true" />
                        </button>
                      </div>
                      <span className="font-mono text-sm tabular-nums">
                        {formatCOP(itemPrice * qty)}
                      </span>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}

        {/* Footer / CTA */}
        {items.length > 0 && (
          <div className="border-t border-border px-5 py-4 space-y-3">
            {/* Subtotal */}
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="font-mono text-xl font-semibold tabular-nums">
                {formatCOP(subtotal)}
              </span>
            </div>

            {/* Info note */}
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Agua bacteriostática incluida. Envíos a todo Colombia.
            </p>

            {/* Checkout CTA — principal */}
            <Link
              href="/checkout"
              onClick={onClose}
              className="group relative inline-flex w-full items-center justify-center gap-2 rounded-sm border-2 border-primary bg-primary py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-transparent hover:text-primary active:scale-[0.98]"
            >
              <Icon icon="lucide:lock" className="h-4 w-4" aria-hidden="true" />
              Ir al Checkout
              <Icon icon="lucide:arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>

            {/* Continue shopping */}
            <button
              onClick={onClose}
              className="w-full text-center text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Seguir comprando
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
