'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { products, formatCOP } from './data'
import { MicroBadge } from './badge'

type CommandPaletteProps = {
  open: boolean
  onClose: () => void
  onAdd?: any // kept for backwards compatibility but we won't use it
}

type SearchResult = {
  id: string
  title: string
  category: string
  formula: string
  lot: string
  priceCOP: number
  image: string
  url: string
  searchTerms: string
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    
    const allItems: SearchResult[] = []
    
    for (const p of products) {
      if (!p.isPublic) continue

      // Alias explícitos solicitados por el cliente
      const aliasTitle = p.title.toLowerCase() === 'retatrutida' ? 'retatrutide' : ''

      if (p.variants && p.variants.length > 0) {
        for (const v of p.variants) {
          const skuLower = (v.sku || '').toLowerCase()
          allItems.push({
            id: `${p.id}-${v.id}`,
            title: `${p.title} ${v.name}`,
            category: p.category,
            formula: p.formula,
            lot: p.lot,
            priceCOP: v.priceCOP || 0,
            image: v.image || p.image || '',
            url: `/tienda/${p.categorySlug}/${p.slug}/${v.slug}`,
            searchTerms: [p.title, aliasTitle, p.slug, v.name, v.id, v.slug, skuLower, p.category, p.formula, p.lot].join(' ').toLowerCase()
          })
        }
      } else {
        allItems.push({
          id: p.id,
          title: p.title,
          category: p.category,
          formula: p.formula,
          lot: p.lot,
          priceCOP: p.priceCOP || 0,
          image: p.image || '',
          url: `/tienda/${p.categorySlug}/${p.slug}`,
          searchTerms: [p.title, aliasTitle, p.slug, p.category, p.formula, p.lot].join(' ').toLowerCase()
        })
      }
    }

    // Añadir estáticamente la guía si coincide con la búsqueda
    allItems.push({
      id: 'guia-certificado',
      title: 'Cómo leer un certificado de análisis',
      category: 'Guías',
      formula: 'Ayuda',
      lot: '-',
      priceCOP: 0,
      image: '',
      url: '/guias/#leer-certificado',
      searchTerms: 'guia guia certificado leer como'
    })

    if (!q) return allItems
    
    return allItems.filter(item => item.searchTerms.includes(q))
  }, [query])

  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {
      Productos: [],
      Guías: [],
      Certificados: []
    }
    
    results.forEach(item => {
      if (item.category === 'Guías') groups['Guías'].push(item)
      else if (item.category === 'Certificados') groups['Certificados'].push(item)
      else groups['Productos'].push(item)
    })
    
    return groups
  }, [results])

  const totalResults = results.length

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      const id = requestAnimationFrame(() => inputRef.current?.focus())
      return () => cancelAnimationFrame(id)
    }
  }, [open])

  useEffect(() => {
    setActive(0)
  }, [query])

  const handleSelect = (item: SearchResult) => {
    router.push(item.url)
    onClose()
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActive((a) => Math.min(a + 1, totalResults - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActive((a) => Math.max(a - 1, 0))
      }
      if (e.key === 'Enter' && results[active]) {
        e.preventDefault()
        handleSelect(results[active])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, results, active, onClose, totalResults])

  if (!open) return null

  // Aplanar resultados para navegar con teclado basado en `active` index
  let currentItemIndex = 0

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Búsqueda del sitio"
    >
      <button
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        aria-label="Cerrar búsqueda"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl overflow-hidden rounded-xl border border-border bg-popover shadow-2xl">
        <label htmlFor="kailab-search" className="sr-only">Buscar en KAILAB</label>
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Icon icon="lucide:search" className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <input
            id="kailab-search"
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Producto, guía o certificado"
            className="w-full bg-transparent py-4 text-sm text-foreground outline-none placeholder:text-muted-foreground"
            autoComplete="off"
            spellCheck="false"
          />
          <kbd className="hidden shrink-0 rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground sm:inline">
            ESC
          </kbd>
        </div>

        <div className="max-h-[52vh] overflow-y-auto p-2">
          {totalResults === 0 && (
            <div className="px-5 py-10 text-center flex flex-col items-center gap-3">
              <Icon icon="lucide:search-x" className="h-8 w-8 text-muted-foreground/50" />
              <p className="font-mono text-sm text-muted-foreground">
                No encontramos resultados para esta búsqueda. Prueba con otro nombre o consulta la tienda.
              </p>
              <Link
                href="/tienda"
                onClick={onClose}
                className="mt-2 inline-flex items-center gap-2 rounded-sm border border-primary bg-primary/10 px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/20"
              >
                Ver productos
                <Icon icon="lucide:arrow-right" className="h-4 w-4" />
              </Link>
            </div>
          )}
          
          {Object.entries(groupedResults).map(([groupName, groupItems]) => {
            if (groupItems.length === 0) return null
            return (
              <div key={groupName} className="mb-4 last:mb-0">
                <h3 className="px-3 py-1 font-mono text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                  {groupName}
                </h3>
                <ul className="mt-1 space-y-1">
                  {groupItems.map((item) => {
                    const globalIndex = currentItemIndex++
                    return (
                      <li key={item.id}>
                        <button
                          onMouseEnter={() => setActive(globalIndex)}
                          onClick={() => handleSelect(item)}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                            active === globalIndex ? 'bg-secondary' : 'hover:bg-secondary/60'
                          }`}
                        >
                          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-card overflow-hidden">
                            {item.image ? (
                              <Image src={item.image} alt={item.title} fill className="object-contain p-1" sizes="40px" />
                            ) : (
                              <span className="font-mono text-[11px] text-brand-soft">{item.title.slice(0, 2)}</span>
                            )}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-2">
                              <span className="truncate text-sm font-medium">{item.title}</span>
                            </span>
                            <span className="mt-0.5 block truncate font-mono text-xs text-muted-foreground">
                              {item.formula !== 'Ayuda' && `${item.formula} · `}{item.lot !== '-' ? item.lot : item.category}
                            </span>
                          </span>
                          {item.priceCOP > 0 && (
                            <span className="shrink-0 font-mono text-xs tabular-nums text-foreground font-bold">
                              {formatCOP(item.priceCOP)}
                            </span>
                          )}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="flex items-center justify-between border-t border-border px-4 py-2.5 font-mono text-[11px] text-muted-foreground">
          <span className="flex items-center gap-3">
            <span>↑↓ navegar</span>
            <span>↵ abrir</span>
          </span>
          <span>{totalResults} resultados</span>
        </div>
      </div>
    </div>
  )
}
