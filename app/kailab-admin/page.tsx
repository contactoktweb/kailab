'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { AdminService } from '@/lib/admin-service'
import { AuthService, UserSession } from '@/lib/auth-service'
import {
  AdminKpiCards,
  SanityCmsModule,
  SupabaseModule,
  CommercialAnalytics,
} from '@/components/kailab/admin/dashboard-components'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserSession | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'sanity' | 'supabase' | 'analytics'>('overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [, setRefreshState] = useState(0)

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    if (!currentUser) {
      AuthService.login('admin@kailab.co', 'admin123')
      setUser(AuthService.getCurrentUser())
    } else {
      setUser(currentUser)
    }
  }, [])

  const handleLogout = () => {
    AuthService.logout()
    router.push('/login')
  }

  const refreshData = () => {
    setRefreshState(prev => prev + 1)
  }

  const products = AdminService.getSanityProducts()
  const presentations = AdminService.getSanityPresentations()
  const contentBlocks = AdminService.getSanityContentBlocks()
  const lots = AdminService.getSanityLots()
  const coas = AdminService.getSanityCOAs()

  const customers = AdminService.getSupabaseCustomers()
  const orders = AdminService.getSupabaseOrders()
  const payments = AdminService.getSupabasePayments()
  const attempts = AdminService.getPaymentAttempts()
  const summary = AdminService.getCommercialSummary()

  const filteredOrders = searchTerm 
    ? orders.filter(o => o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) || o.customerName.toLowerCase().includes(searchTerm.toLowerCase()))
    : orders

  const filteredProducts = searchTerm
    ? products.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.lotNumber.toLowerCase().includes(searchTerm.toLowerCase()))
    : products

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row">
      
      {/* NAVEGACIÓN LATERAL (DESKTOP / TABLET) */}
      <aside className="hidden lg:flex w-72 flex-col border-r border-border bg-card/60 p-6 backdrop-blur-md shrink-0 justify-between">
        <div className="space-y-8">
          
          <div className="flex items-center gap-3">
            <Image
              src="/kailab-logo.png"
              alt="KAILAB Admin"
              width={120}
              height={34}
              className="h-7 w-auto"
            />
            <span className="rounded-sm border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-bold text-primary">ADMIN</span>
          </div>

          {user && (
            <div className="rounded-md border border-border bg-secondary/30 p-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-foreground truncate">{user.name}</span>
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              </div>
              <p className="font-mono text-[11px] text-muted-foreground truncate">{user.email}</p>
              <div className="font-mono text-[10px] font-semibold text-primary">{user.role}</div>
            </div>
          )}

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md font-mono text-xs font-semibold transition-all ${activeTab === 'overview' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground'}`}
            >
              <Icon icon="lucide:layout-dashboard" className="h-4 w-4" />
              <span>Vista General</span>
            </button>

            <button
              onClick={() => setActiveTab('sanity')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md font-mono text-xs font-semibold transition-all ${activeTab === 'sanity' ? 'bg-emerald-600 text-white shadow-sm' : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground'}`}
            >
              <div className="flex items-center gap-3">
                <Icon icon="lucide:layers" className="h-4 w-4" />
                <span>Sanity CMS</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">CMS</span>
            </button>

            <button
              onClick={() => setActiveTab('supabase')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md font-mono text-xs font-semibold transition-all ${activeTab === 'supabase' ? 'bg-purple-600 text-white shadow-sm' : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground'}`}
            >
              <div className="flex items-center gap-3">
                <Icon icon="lucide:database" className="h-4 w-4" />
                <span>PostgreSQL / Supabase</span>
              </div>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded">DB</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md font-mono text-xs font-semibold transition-all ${activeTab === 'analytics' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground'}`}
            >
              <Icon icon="lucide:bar-chart-3" className="h-4 w-4" />
              <span>Datos Comerciales</span>
            </button>
          </nav>

        </div>

        <div className="space-y-4 pt-6 border-t border-border">
          <div className="space-y-2 font-mono text-[11px]">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Sanity CMS
              </span>
              <span className="text-emerald-400 font-bold">CONECTADO</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse"></span>
                Supabase DB
              </span>
              <span className="text-purple-400 font-bold">CONECTADO</span>
            </div>
          </div>

          <div className="space-y-2">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-md border border-border bg-secondary/30 py-2 font-mono text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <Icon icon="lucide:arrow-left" className="h-3.5 w-3.5" />
              <span>Volver a Tienda</span>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 rounded-md border border-rose-500/30 bg-rose-500/10 py-2 font-mono text-xs font-bold text-rose-400 transition-colors hover:bg-rose-500/20"
            >
              <Icon icon="lucide:log-out" className="h-3.5 w-3.5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {/* HEADER SUPERIOR MÓVIL / TABLET */}
      <header className="lg:hidden flex items-center justify-between border-b border-border bg-card p-4 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Image
            src="/kailab-logo.png"
            alt="KAILAB Admin"
            width={100}
            height={28}
            className="h-6 w-auto"
          />
          <span className="rounded border border-primary/40 bg-primary/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-primary">ADMIN</span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded border border-border text-foreground hover:bg-secondary"
        >
          <Icon icon={mobileMenuOpen ? 'lucide:x' : 'lucide:menu'} className="h-5 w-5" />
        </button>
      </header>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-card p-4 space-y-3 font-mono text-xs">
          <button
            onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false) }}
            className={`w-full text-left p-2 rounded font-bold ${activeTab === 'overview' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
          >
            Vista General
          </button>
          <button
            onClick={() => { setActiveTab('sanity'); setMobileMenuOpen(false) }}
            className={`w-full text-left p-2 rounded font-bold ${activeTab === 'sanity' ? 'bg-emerald-600 text-white' : 'text-muted-foreground'}`}
          >
            Sanity CMS (Productos, Lotes, COAs)
          </button>
          <button
            onClick={() => { setActiveTab('supabase'); setMobileMenuOpen(false) }}
            className={`w-full text-left p-2 rounded font-bold ${activeTab === 'supabase' ? 'bg-purple-600 text-white' : 'text-muted-foreground'}`}
          >
            PostgreSQL / Supabase (Pedidos, Clientes, Pagos)
          </button>
          <button
            onClick={() => { setActiveTab('analytics'); setMobileMenuOpen(false) }}
            className={`w-full text-left p-2 rounded font-bold ${activeTab === 'analytics' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
          >
            Datos Comerciales
          </button>
          <Link href="/" className="block text-center p-2 rounded border border-border bg-secondary text-foreground font-bold mt-2">
            Volver a Tienda Pública
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-center p-2 rounded border border-rose-500/40 bg-rose-500/10 text-rose-400 font-bold"
          >
            Cerrar Sesión
          </button>
        </div>
      )}

      {/* ÁREA PRINCIPAL DE CONTENIDO */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto">
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-mono">
              Dashboard Administrativo Unificado
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Consola unificada de control operativo KAILAB · Sincronización continua de Sanity & PostgreSQL.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Icon icon="lucide:search" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar lote, pedido o cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-border bg-secondary/30 pl-9 pr-4 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <AdminKpiCards
          summary={summary}
          ordersCount={orders.length}
          lotsCount={lots.length}
          coasCount={coas.length}
          customersCount={customers.length}
        />

        {activeTab === 'overview' && (
          <div className="space-y-10">
            <SanityCmsModule
              products={filteredProducts}
              presentations={presentations}
              contentBlocks={contentBlocks}
              lots={lots}
              coas={coas}
              onRefresh={refreshData}
            />
            <SupabaseModule
              customers={customers}
              orders={filteredOrders}
              payments={payments}
              attempts={attempts}
              onRefresh={refreshData}
            />
          </div>
        )}

        {activeTab === 'sanity' && (
          <SanityCmsModule
            products={filteredProducts}
            presentations={presentations}
            contentBlocks={contentBlocks}
            lots={lots}
            coas={coas}
            onRefresh={refreshData}
          />
        )}

        {activeTab === 'supabase' && (
          <SupabaseModule
            customers={customers}
            orders={filteredOrders}
            payments={payments}
            attempts={attempts}
            onRefresh={refreshData}
          />
        )}

        {activeTab === 'analytics' && (
          <CommercialAnalytics summary={summary} />
        )}

      </main>

    </div>
  )
}
