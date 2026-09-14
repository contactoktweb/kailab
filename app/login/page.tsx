'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { AuthService } from '@/lib/auth-service'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@kailab.co')
  const [password, setPassword] = useState('admin123')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    setTimeout(() => {
      const res = AuthService.login(email, password)
      if (res.success) {
        router.push('/admin')
      } else {
        setError(res.error || 'Error de autenticación.')
        setLoading(false)
      }
    }, 400)
  }

  const handleFillDemo = () => {
    setEmail('admin@kailab.co')
    setPassword('admin123')
    setError(null)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      
      {/* Glow de fondo decorativo */}
      <div className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/15 blur-3xl pointer-events-none"></div>

      {/* Header superior */}
      <header className="relative z-10 mx-auto max-w-7xl w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/kailab-logo.png"
            alt="KAILAB"
            width={120}
            height={34}
            className="h-8 w-auto"
          />
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <Icon icon="lucide:arrow-left" className="h-4 w-4" />
          <span>Ir a la tienda</span>
        </Link>
      </header>

      {/* Tarjeta de Formulario Principal */}
      <main className="relative z-10 mx-auto w-full max-w-md my-auto pt-8 pb-12">
        <div className="rounded-xl border border-border/60 bg-card/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          
          {/* Encabezado del Login */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-xs font-bold text-primary">
              <Icon icon="lucide:shield-lock" className="h-4 w-4 text-primary" />
              <span>PORTAL ADMINISTRATIVO</span>
            </div>
            <h1 className="text-2xl font-bold font-mono tracking-tight text-foreground sm:text-3xl">
              Iniciar Sesión
            </h1>
            <p className="text-xs text-muted-foreground">
              Acceso exclusivo para personal autorizado e investigadores cualificados KAILAB.
            </p>
          </div>

          {/* Mensaje de Error */}
          {error && (
            <div className="flex items-center gap-2 rounded-md border border-rose-500/40 bg-rose-500/10 p-3 font-mono text-xs text-rose-300 animate-in fade-in">
              <Icon icon="lucide:alert-triangle" className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Campo Email */}
            <div className="space-y-1.5">
              <label className="font-mono text-xs font-semibold text-foreground">Correo Electrónico</label>
              <div className="relative">
                <Icon icon="lucide:mail" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kailab.co"
                  className="w-full rounded-md border border-border bg-secondary/40 pl-9 pr-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Campo Password */}
            <div className="space-y-1.5">
              <label className="font-mono text-xs font-semibold text-foreground">Contraseña</label>
              <div className="relative">
                <Icon icon="lucide:lock" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-md border border-border bg-secondary/40 pl-9 pr-10 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <Icon icon={showPassword ? 'lucide:eye-off' : 'lucide:eye'} className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Botón Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-md bg-primary py-3 font-mono text-sm font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Icon icon="lucide:loader-2" className="h-4 w-4 animate-spin" />
                  <span>Verificando...</span>
                </>
              ) : (
                <>
                  <Icon icon="lucide:log-in" className="h-4 w-4" />
                  <span>Ingresar a la Plataforma</span>
                </>
              )}
            </button>
          </form>

        </div>
      </main>

      {/* Footer de Firma */}
      <footer className="relative z-10 text-center font-mono text-xs text-muted-foreground space-y-2">
        <p>© {new Date().getFullYear()} KAILAB · Protocolos RUO & Gestión Operativa</p>
        <a
          href="https://www.kytcode.lat"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
        >
          Desarrollado por K&T
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </a>
      </footer>

    </div>
  )
}
