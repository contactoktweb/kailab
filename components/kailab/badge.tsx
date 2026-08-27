import { cn } from '@/lib/utils'

type MicroBadgeProps = {
  children: React.ReactNode
  variant?: 'default' | 'brand' | 'muted' | 'outline'
  className?: string
}

export function MicroBadge({ children, variant = 'default', className }: MicroBadgeProps) {
  const variants: Record<NonNullable<MicroBadgeProps['variant']>, string> = {
    default: 'border-border bg-secondary text-secondary-foreground',
    brand: 'border-primary/40 bg-primary/10 text-brand-soft',
    muted: 'border-border bg-transparent text-muted-foreground',
    outline: 'border-border bg-transparent text-foreground',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded border px-2 py-0.5 font-mono text-xs leading-none tracking-tight',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
