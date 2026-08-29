import { cn } from '@/lib/utils'

type MicroBadgeProps = {
  children: React.ReactNode
  variant?: 'default' | 'brand' | 'muted' | 'outline'
  className?: string
}

export function MicroBadge({ children, variant = 'default', className }: MicroBadgeProps) {
  const variants: Record<NonNullable<MicroBadgeProps['variant']>, string> = {
    default: 'border-l-secondary-foreground border-y-border border-r-border bg-secondary text-secondary-foreground',
    brand: 'border-l-blue-500 border-y-primary/30 border-r-primary/30 bg-primary/10 text-blue-400',
    muted: 'border-l-muted-foreground border-y-border border-r-border bg-transparent text-muted-foreground',
    outline: 'border-l-foreground border-y-border border-r-border bg-transparent text-foreground',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border-y border-r border-l-2 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
