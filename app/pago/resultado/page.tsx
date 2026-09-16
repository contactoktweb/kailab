'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'

type TransactionStatus = 'APPROVED' | 'DECLINED' | 'VOIDED' | 'ERROR' | 'PENDING' | null

interface TransactionData {
  status: TransactionStatus
  reference: string | null
  id: string | null
  amount: string | null
}

function ResultContent() {
  const params = useSearchParams()
  const [tx, setTx] = useState<TransactionData>({
    status: null,
    reference: null,
    id: null,
    amount: null,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Wompi redirige con ?id=<transaction_id> en la URL
    const id = params.get('id')
    const reference = params.get('ref') || params.get('reference')

    if (!id) {
      setLoading(false)
      setTx({ status: 'ERROR', reference: null, id: null, amount: null })
      return
    }

    // Consultar estado real de la transacción vía API pública de Wompi (sandbox o producción)
    const base = process.env.NEXT_PUBLIC_WOMPI_ENV === 'production'
      ? 'https://production.wompi.co/v1'
      : 'https://sandbox.wompi.co/v1'

    fetch(`${base}/transactions/${id}`)
      .then((r) => r.json())
      .then((data) => {
        const transaction = data?.data
        setTx({
          status: transaction?.status ?? 'ERROR',
          reference: transaction?.reference ?? reference,
          id: transaction?.id ?? id,
          amount: transaction?.amount_in_cents
            ? (transaction.amount_in_cents / 100).toLocaleString('es-CO', {
                style: 'currency',
                currency: 'COP',
                maximumFractionDigits: 0,
              })
            : null,
        })
      })
      .catch(() => {
        setTx({ status: 'ERROR', reference, id, amount: null })
      })
      .finally(() => setLoading(false))
  }, [params])

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-4">
        <Icon icon="lucide:loader-2" className="h-10 w-10 animate-spin text-primary" />
        <p className="font-mono text-sm text-muted-foreground">Verificando tu transacción...</p>
      </div>
    )
  }

  const config: Record<
    Exclude<TransactionStatus, null>,
    { icon: string; iconClass: string; ringClass: string; title: string; desc: string }
  > = {
    APPROVED: {
      icon: 'lucide:check-circle-2',
      iconClass: 'text-emerald-400',
      ringClass: 'border-emerald-500/30 bg-emerald-500/10',
      title: '¡Pago aprobado!',
      desc: 'Tu pedido ha sido confirmado. Recibirás un correo con los detalles y el número de guía al despachar.',
    },
    PENDING: {
      icon: 'lucide:clock',
      iconClass: 'text-yellow-400',
      ringClass: 'border-yellow-500/30 bg-yellow-500/10',
      title: 'Pago en proceso',
      desc: 'Tu transacción está siendo procesada. Te notificaremos por correo cuando sea confirmada.',
    },
    DECLINED: {
      icon: 'lucide:x-circle',
      iconClass: 'text-rose-400',
      ringClass: 'border-rose-500/30 bg-rose-500/10',
      title: 'Pago rechazado',
      desc: 'Tu banco rechazó la transacción. Puedes intentarlo de nuevo con otro método de pago.',
    },
    VOIDED: {
      icon: 'lucide:ban',
      iconClass: 'text-slate-400',
      ringClass: 'border-slate-500/30 bg-slate-500/10',
      title: 'Transacción anulada',
      desc: 'Esta transacción fue anulada. Si necesitas ayuda, contáctanos.',
    },
    ERROR: {
      icon: 'lucide:alert-triangle',
      iconClass: 'text-orange-400',
      ringClass: 'border-orange-500/30 bg-orange-500/10',
      title: 'No pudimos verificar el pago',
      desc: 'Ocurrió un error al consultar el estado de tu transacción. Si realizaste el pago, contáctanos con tu referencia.',
    },
  }

  const c = config[tx.status ?? 'ERROR']

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center gap-6 text-center"
    >
      <div className={`flex h-20 w-20 items-center justify-center rounded-full border ${c.ringClass}`}>
        <Icon icon={c.icon} className={`h-9 w-9 ${c.iconClass}`} />
      </div>

      <div>
        <h1 className="text-2xl font-bold font-mono text-foreground">{c.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm">{c.desc}</p>
      </div>

      {(tx.reference || tx.id || tx.amount) && (
        <div className="w-full max-w-xs rounded-xl border border-border/60 bg-card/50 p-5 space-y-2 text-left">
          {tx.reference && (
            <div className="flex justify-between text-xs font-mono">
              <span className="text-muted-foreground">Referencia</span>
              <span className="text-foreground font-bold">{tx.reference}</span>
            </div>
          )}
          {tx.id && (
            <div className="flex justify-between text-xs font-mono">
              <span className="text-muted-foreground">ID transacción</span>
              <span className="text-foreground truncate max-w-[140px]">{tx.id}</span>
            </div>
          )}
          {tx.amount && (
            <div className="flex justify-between text-xs font-mono">
              <span className="text-muted-foreground">Monto</span>
              <span className="text-foreground font-bold">{tx.amount}</span>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-3 flex-wrap justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-sm border border-border bg-secondary px-5 py-2.5 text-sm font-mono font-semibold text-foreground transition-colors hover:bg-secondary/70"
        >
          <Icon icon="lucide:home" className="h-4 w-4" />
          Inicio
        </Link>
        {(tx.status === 'DECLINED' || tx.status === 'ERROR') && (
          <Link
            href="/checkout"
            className="inline-flex items-center gap-2 rounded-sm border-2 border-[#7B2FBE] bg-[#7B2FBE] px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#6b25aa]"
          >
            <Icon icon="lucide:refresh-cw" className="h-4 w-4" />
            Intentar de nuevo
          </Link>
        )}
        {tx.status === 'APPROVED' && (
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 rounded-sm border-2 border-primary bg-primary px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-transparent hover:text-primary"
          >
            <Icon icon="lucide:store" className="h-4 w-4" />
            Seguir comprando
          </Link>
        )}
      </div>
    </motion.div>
  )
}

export default function PaymentResultPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header mínimo */}
      <header className="border-b border-border py-4 px-6">
        <Link href="/" aria-label="Volver al inicio KAILAB">
          <Image src="/KAILAB_Logo_White.png" alt="KAILAB" width={110} height={32} className="h-7 w-auto" />
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <Suspense
          fallback={
            <div className="flex flex-col items-center gap-4">
              <Icon icon="lucide:loader-2" className="h-10 w-10 animate-spin text-primary" />
              <p className="font-mono text-sm text-muted-foreground">Cargando...</p>
            </div>
          }
        >
          <ResultContent />
        </Suspense>
      </main>

      <footer className="border-t border-border py-5 text-center font-mono text-xs text-muted-foreground space-y-1">
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
