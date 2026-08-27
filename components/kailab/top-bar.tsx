import { Command } from 'lucide-react'

export function TopBar() {
  return (
    <div className="w-full border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="font-mono">Operativo</span>
          <span className="hidden text-border sm:inline">·</span>
          <span className="hidden font-mono sm:inline">
            Lote actualizado <span className="text-foreground">27 AGO 2026</span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="hidden font-mono sm:inline">Buscar catálogo</span>
          <kbd className="inline-flex items-center gap-1 rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[11px] text-foreground">
            <Command className="h-3 w-3" aria-hidden="true" />K
          </kbd>
        </div>
      </div>
    </div>
  )
}
