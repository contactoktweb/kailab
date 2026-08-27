'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Search, CornerDownLeft, Plus } from 'lucide-react'
import { products, formatCOP, type Product } from './data'
import { MicroBadge } from './badge'

type CommandPaletteProps = {
  open: boolean
  onClose: () => void
  onAdd: (product: Product) => void
}

export function CommandPalette({ open, onClose, onAdd }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return products
    return products.filter((p) =>
      [p.title, p.category, p.formula, p.lot].some((f) => f.toLowerCase().includes(q)),
    )
  }, [query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      // focus after paint
      const id = requestAnimationFrame(() => inputRef.current?.focus())
      return () => cancelAnimationFrame(id)
    }
  }, [open])

  useEffect(() => {
    setActive(0)
  }, [query])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActive((a) => Math.min(a + 1, results.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActive((a) => Math.max(a - 1, 0))
      }
      if (e.key === 'Enter' && results[active]) {
        e.preventDefault()
        onAdd(results[active])
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, results, active, onAdd, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Buscar en el catálogo"
    >
      <button
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        aria-label="Cerrar búsqueda"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl overflow-hidden rounded-xl border border-border bg-popover shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar compuesto, categoría, fórmula o lote…"
            className="w-full bg-transparent py-4 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden shrink-0 rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground sm:inline">
            ESC
          </kbd>
        </div>

        <ul className="max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-8 text-center font-mono text-xs text-muted-foreground">
              Sin resultados para &ldquo;{query}&rdquo;
            </li>
          )}
          {results.map((p, i) => (
            <li key={p.id}>
              <button
                onMouseEnter={() => setActive(i)}
                onClick={() => {
                  onAdd(p)
                  onClose()
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                  active === i ? 'bg-secondary' : 'hover:bg-secondary/60'
                }`}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-card font-mono text-[11px] text-brand-soft">
                  {p.title.slice(0, 2)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium">{p.title}</span>
                    <MicroBadge variant="muted">{p.category}</MicroBadge>
                  </span>
                  <span className="mt-0.5 block truncate font-mono text-xs text-muted-foreground">
                    {p.formula} · {p.lot}
                  </span>
                </span>
                <span className="shrink-0 font-mono text-xs tabular-nums text-foreground">
                  {formatCOP(p.priceCOP)}
                </span>
                {active === i ? (
                  <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-brand-soft" aria-hidden="true" />
                ) : (
                  <Plus className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between border-t border-border px-4 py-2.5 font-mono text-[11px] text-muted-foreground">
          <span className="flex items-center gap-3">
            <span>↑↓ navegar</span>
            <span>↵ agregar</span>
          </span>
          <span>{results.length} refs</span>
        </div>
      </div>
    </div>
  )
}
