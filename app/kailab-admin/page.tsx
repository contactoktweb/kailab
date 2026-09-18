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
  ContentModule,
} from '@/components/kailab/admin/dashboard-components'

type ActiveTab = 'overview' | 'sanity' | 'supabase' | 'analytics'

const NAV_GROUPS = [
  {
    label: 'General',
    items: [
      {
        id: 'overview' as ActiveTab,
        label: 'Dashboard',
        icon: 'lucide:layout-dashboard',
        external: false,
        href: undefined,
        badge: undefined,
      },
    ],
  },
  {
    label: 'Operación',
    items: [
      {
        id: 'sanity' as ActiveTab,
        label: 'CMS',
        icon: 'lucide:package',
        external: true,
        href: `https://sanity.io/manage/project/gezrmjqh`,
        badge: 'CMS',
      },
      {
        id: 'supabase' as ActiveTab,
        label: 'DATABASE',
        icon: 'lucide:shopping-bag',
        external: true,
        href: 'https://supabase.com/dashboard',
        badge: 'DATABASE',
      },
      {
        id: 'analytics' as ActiveTab,
        label: 'Contenido',
        icon: 'lucide:file-text',
        external: false,
        href: undefined,
        badge: undefined,
      },
    ],
  },
]

const TAB_LABELS: Record<ActiveTab, string> = {
  overview: 'Dashboard',
  sanity: 'CMS',
  supabase: 'DATABASE',
  analytics: 'Contenido',
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserSession | null>(null)
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview')
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

  const refreshData = () => setRefreshState((prev) => prev + 1)

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
    ? orders.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          o.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : orders

  const filteredProducts = searchTerm
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.lotNumber.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* ──────────── SIDEBAR DESKTOP ──────────── */}
      <aside className="hidden lg:flex w-64 flex-col bg-gray-900 shrink-0">

        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-14 border-b border-gray-800 shrink-0">
          <Image
            src="/kailab-logo.png"
            alt="KAILAB Admin"
            width={110}
            height={32}
            className="h-7 w-auto brightness-0 invert"
          />
          <span className="rounded border border-gray-700 bg-gray-800 px-1.5 py-0.5 text-[10px] font-bold text-gray-400 tracking-widest">
            ADMIN
          </span>
        </div>

        {/* Nav groups */}
        <nav className="flex-1 px-3 py-5 space-y-6 overflow-y-auto">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = activeTab === item.id
                  const cls = `w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                  }`

                  if (item.external && item.href) {
                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setActiveTab(item.id)}
                        className={cls}
                      >
                        <span className="flex items-center gap-2.5">
                          <Icon icon={item.icon} className="h-4 w-4 shrink-0" />
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-gray-500 bg-gray-800 px-1.5 py-0.5 rounded">
                            {item.badge}
                            <Icon icon="lucide:external-link" className="h-2.5 w-2.5" />
                          </span>
                        )}
                      </a>
                    )
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={cls + ' text-left'}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon icon={item.icon} className="h-4 w-4 shrink-0" />
                        {item.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom: status + user */}
        <div className="px-3 py-4 border-t border-gray-800 space-y-3 shrink-0">
          <div className="px-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-gray-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Gestor de Contenido
              </span>
              <span className="text-emerald-500 font-bold text-[10px]">ON</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-gray-500">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                Base de Datos
              </span>
              <span className="text-blue-500 font-bold text-[10px]">ON</span>
            </div>
          </div>

          {user && (
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-800">
              <div className="h-7 w-7 rounded-full bg-gray-600 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-white">{user.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                <p className="text-[10px] text-gray-500 truncate">{user.role}</p>
              </div>
              <button
                onClick={handleLogout}
                title="Cerrar sesión"
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                <Icon icon="lucide:log-out" className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ──────────── MAIN COLUMN ──────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* ── TOP BAR ── */}
        <header className="flex items-center justify-between bg-white border-b border-gray-200 px-5 h-14 shrink-0">

          {/* Left: hamburger (mobile) + breadcrumb (desktop) */}
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon icon={mobileMenuOpen ? 'lucide:x' : 'lucide:align-justify'} className="h-5 w-5" />
            </button>

            {/* Breadcrumb */}
            <nav className="hidden lg:flex items-center gap-1.5 text-sm text-gray-400">
              <Icon icon="lucide:house" className="h-3.5 w-3.5" />
              <Icon icon="lucide:chevron-right" className="h-3 w-3" />
              <span className="text-gray-900 font-semibold">{TAB_LABELS[activeTab]}</span>
            </nav>

            {/* Mobile: logo */}
            <Image
              src="/kailab-logo.png"
              alt="KAILAB"
              width={90}
              height={26}
              className="h-6 w-auto lg:hidden"
            />
          </div>

          {/* Center: search */}
          <div className="hidden sm:flex flex-1 max-w-xs mx-6">
            <div className="relative w-full">
              <Icon
                icon="lucide:search"
                className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400"
              />
              <input
                type="text"
                placeholder="Buscar en la plataforma..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Right: user */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-white">{user.name.charAt(0)}</span>
                </div>
                <div className="hidden sm:block leading-none">
                  <p className="text-xs font-semibold text-gray-900">{user.name}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{user.role}</p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* ── MOBILE MENU ── */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-gray-900 border-b border-gray-800 px-4 py-4 space-y-4">
            {NAV_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="px-2 mb-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  {group.label}
                </p>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    if (item.external && item.href) {
                      return (
                        <a
                          key={item.id}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false) }}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all"
                        >
                          <Icon icon={item.icon} className="h-4 w-4" />
                          {item.label}
                          <Icon icon="lucide:external-link" className="h-3 w-3 ml-auto text-gray-600" />
                        </a>
                      )
                    }
                    return (
                      <button
                        key={item.id}
                        onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false) }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                          activeTab === item.id
                            ? 'bg-white/10 text-white'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <Icon icon={item.icon} className="h-4 w-4" />
                        {item.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
            <div className="pt-3 border-t border-gray-800 space-y-0.5">
              <Link
                href="/"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <Icon icon="lucide:arrow-left" className="h-4 w-4" />
                Volver a Tienda
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all"
              >
                <Icon icon="lucide:log-out" className="h-4 w-4" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}

        {/* ── PAGE CONTENT ── */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">

          {/* Page title */}
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-900">{TAB_LABELS[activeTab]}</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Consola unificada de control operativo KAILAB
            </p>
          </div>

          {/* KPI Cards */}
          <AdminKpiCards
            summary={summary}
            ordersCount={orders.length}
            lotsCount={lots.length}
            coasCount={coas.length}
            customersCount={customers.length}
          />

          {/* Tab content */}
          <div className="mt-6 space-y-6">
            {activeTab === 'overview' && (
              <>
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
              </>
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
              <ContentModule />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
