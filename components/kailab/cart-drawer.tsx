'use client'

import { useEffect } from 'react'
import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react'
import { formatCOP, type CartItem } from './data'
import { MicroBadge } from './badge'

type CartDrawerProps = {
  open: boolean
  onClose: () => void
  items: CartItem[]
  onQty: (id: string, delta: number) => void
  onRemove: (id: string) => void
}

const FREE_SHIPPING = 250000

export function CartDrawer({ open, onClose, items, onQty, onRemove }: CartDrawerProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const subtotal = items.reduce((sum, i) => sum + i.product.priceCOP * i.qty, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)
  const remaining = Math.max(0, FREE_SHIPPING - subtotal)
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100)

  return (
    <>
      <div
        className={`fixed inset-0 z-[90] bg-background/70 backdrop-blur-sm transition-opacity ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed right-0 top-0 z-[95] flex h-full w-full max-w-md flex-col border-l border-border bg-card shadow-2xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compra"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 text-brand-soft" aria-hidden="true" />
            <h2 className="text-sm font-medium">Carrito</h2>
            <MicroBadge variant="brand">{count} items</MicroBadge>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Cerrar carrito"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-secondary">
              <ShoppingCart className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
            </div>
            <p className="text-sm font-medium">Tu carrito está vacío</p>
            <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
              Agrega referencias desde el catálogo o usa la búsqueda rápida{' '}
              <kbd className="rounded border border-border bg-secondary px-1 font-mono text-[10px]">
                ⌘K
              </kbd>
              .
            </p>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
            {items.map(({ product, qty }) => (
              <li key={product.id} className="flex gap-3 py-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-secondary font-mono text-xs text-brand-soft">
                  {product.title.slice(0, 2)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{product.title}</p>
                      <p className="truncate font-mono text-xs text-muted-foreground">
                        {product.lot}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemove(product.id)}
                      className="rounded p-1 text-muted-foreground transition-colors hover:text-destructive"
                      aria-label={`Quitar ${product.title}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <div className="inline-flex items-center rounded-md border border-border">
                      <button
                        onClick={() => onQty(product.id, -1)}
                        className="px-2 py-1 text-muted-foreground transition-colors hover:text-foreground"
                        aria-label="Disminuir cantidad"
                      >
                        <Minus className="h-3 w-3" aria-hidden="true" />
                      </button>
                      <span className="w-8 text-center font-mono text-xs tabular-nums">{qty}</span>
                      <button
                        onClick={() => onQty(product.id, 1)}
                        className="px-2 py-1 text-muted-foreground transition-colors hover:text-foreground"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="h-3 w-3" aria-hidden="true" />
                      </button>
                    </div>
                    <span className="font-mono text-sm tabular-nums">
                      {formatCOP(product.priceCOP * qty)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {items.length > 0 && (
          <div className="border-t border-border px-5 py-4">
            <div className="mb-3">
              <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                <span>
                  {remaining > 0
                    ? `Faltan ${formatCOP(remaining)} para envío gratis`
                    : 'Envío gratis desbloqueado'}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="font-mono text-xl font-semibold tabular-nums">
                {formatCOP(subtotal)}
              </span>
            </div>
            <button className="mt-4 w-full rounded-md bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
              Continuar con la compra
            </button>
            <p className="mt-2 text-center font-mono text-[11px] text-muted-foreground">
              Uso exclusivo en investigación · RUO
            </p>
          </div>
        )}
      </aside>
    </>
  )
}
