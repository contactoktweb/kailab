'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'
import {
  SanityProduct,
  SanityPresentation,
  SanityContentBlock,
  SanityLot,
  SanityCOA,
  SupabaseCustomer,
  SupabaseOrder,
  SupabasePayment,
  PaymentAttempt,
  CommercialSummary,
  formatCOP,
} from '@/lib/admin-data'
import { AdminService } from '@/lib/admin-service'

// ─────────────────────────────────────────────────────────────
// PAGES CONFIG
// ─────────────────────────────────────────────────────────────
const SANITY_BASE = '/admin'

const CONTENT_PAGES = [
  {
    label: 'Inicio',
    description: 'Hero, secciones principales y llamadas a la acción del home.',
    icon: 'lucide:house',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    href: `${SANITY_BASE}/intent/edit/id=homePage;type=homePage`,
    tag: 'Singleton',
  },
  {
    label: 'Tienda / Productos',
    description: 'Configuración de la página de tienda, catálogo de péptidos y categorías.',
    icon: 'lucide:shopping-bag',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    href: `${SANITY_BASE}/intent/edit/id=storePage;type=storePage`,
    tag: 'Singleton',
  },
  {
    label: 'Guía',
    description: 'Contenido educativo, protocolos y guías de uso de productos.',
    icon: 'lucide:book-open',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    href: `${SANITY_BASE}/intent/edit/id=guidesPage;type=guidesPage`,
    tag: 'Singleton',
  },
  {
    label: 'Calidad',
    description: 'Página de calidad, certificaciones y estándares del laboratorio.',
    icon: 'lucide:shield-check',
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
    href: `${SANITY_BASE}/intent/edit/id=qualityPage;type=qualityPage`,
    tag: 'Singleton',
  },
  {
    label: 'Ayuda',
    description: 'Preguntas frecuentes, soporte y recursos de ayuda para clientes.',
    icon: 'lucide:circle-help',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    href: `${SANITY_BASE}/intent/edit/id=helpPage;type=helpPage`,
    tag: 'Singleton',
  },
  {
    label: 'Configuración Global',
    description: 'Información de contacto, marca, redes sociales y datos generales del sitio.',
    icon: 'lucide:settings-2',
    iconBg: 'bg-gray-50',
    iconColor: 'text-gray-600',
    href: `${SANITY_BASE}/intent/edit/id=siteSettings;type=siteSettings`,
    tag: 'Global',
  },
]

// ─────────────────────────────────────────────────────────────
// SOURCE BADGE
// ─────────────────────────────────────────────────────────────
export function SourceBadge({ source }: { source: 'Sanity' | 'Supabase' }) {
  if (source === 'Sanity') {
    return (
      <span className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
        <Icon icon="lucide:book-open" className="h-3 w-3" />
        Gestor de Contenido
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
      <Icon icon="lucide:server" className="h-3 w-3" />
      Base de Datos
    </span>
  )
}

// ─────────────────────────────────────────────────────────────
// KPI CARDS
// ─────────────────────────────────────────────────────────────
export function AdminKpiCards({
  summary,
  ordersCount,
  lotsCount,
  coasCount,
  customersCount,
}: {
  summary: CommercialSummary
  ordersCount: number
  lotsCount: number
  coasCount: number
  customersCount: number
}) {
  const cards = [
    {
      label: 'Ventas Totales',
      value: formatCOP(summary.totalSalesCOP),
      trend: '+14.2% este mes',
      trendUp: true as boolean | null,
      icon: 'lucide:banknote',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
    {
      label: 'Pedidos Activos',
      value: String(ordersCount),
      trend: `Ticket prom. ${formatCOP(summary.averageTicketCOP)}`,
      trendUp: null as boolean | null,
      icon: 'lucide:package',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Clientes',
      value: String(customersCount),
      trend: `Conversión: ${summary.conversionRate}%`,
      trendUp: true as boolean | null,
      icon: 'lucide:users-round',
      iconBg: 'bg-violet-50',
      iconColor: 'text-violet-600',
    },
    {
      label: 'Lotes de Productos',
      value: String(lotsCount),
      trend: 'Trazabilidad activa',
      trendUp: true as boolean | null,
      icon: 'lucide:flask-conical',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
    {
      label: 'Certificados COA',
      value: String(coasCount),
      trend: 'Ensayos HPLC-MS',
      trendUp: null as boolean | null,
      icon: 'lucide:file-check-2',
      iconBg: 'bg-teal-50',
      iconColor: 'text-teal-600',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`h-10 w-10 rounded-lg ${card.iconBg} flex items-center justify-center`}>
              <Icon icon={card.icon} className={`h-5 w-5 ${card.iconColor}`} />
            </div>
            <Icon icon="lucide:more-horizontal" className="h-4 w-4 text-gray-300" />
          </div>
          <p className="text-xs text-gray-500 mb-1">{card.label}</p>
          <p className="text-2xl font-bold text-gray-900 leading-none">{card.value}</p>
          <p
            className={`mt-2 text-xs flex items-center gap-1 ${
              card.trendUp === true
                ? 'text-emerald-600'
                : card.trendUp === false
                ? 'text-rose-500'
                : 'text-gray-400'
            }`}
          >
            {card.trendUp === true && <Icon icon="lucide:trending-up" className="h-3 w-3" />}
            {card.trendUp === false && <Icon icon="lucide:trending-down" className="h-3 w-3" />}
            {card.trendUp === null && <Icon icon="lucide:minus" className="h-3 w-3" />}
            {card.trend}
          </p>
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// GESTOR DE CONTENIDO (SANITY)
// ─────────────────────────────────────────────────────────────
export function SanityCmsModule({
  products,
  presentations,
  contentBlocks,
  lots,
  coas,
  onRefresh,
}: {
  products: SanityProduct[]
  presentations: SanityPresentation[]
  contentBlocks: SanityContentBlock[]
  lots: SanityLot[]
  coas: SanityCOA[]
  onRefresh: () => void
}) {
  const [subTab, setSubTab] = useState<'products' | 'presentations' | 'content' | 'lots' | 'coas'>('products')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleToggleCoa = (id: string, currentStatus: SanityCOA['status']) => {
    const nextStatus = currentStatus === 'Verificado' ? 'Pendiente' : 'Verificado'
    AdminService.updateCoaStatus(id, nextStatus)
    showToast(`Estado de COA ${id} actualizado a ${nextStatus}`)
    onRefresh()
  }

  const SUB_TABS = [
    { id: 'products' as const, label: 'Productos', count: products.length },
    { id: 'presentations' as const, label: 'Presentaciones', count: presentations.length },
    { id: 'content' as const, label: 'Contenido', count: contentBlocks.length },
    { id: 'lots' as const, label: 'Lotes', count: lots.length },
    { id: 'coas' as const, label: 'COAs', count: coas.length },
  ]

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-xl">
          <Icon icon="lucide:check-circle-2" className="h-4 w-4 text-emerald-500 shrink-0" />
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
            <Icon icon="lucide:book-open" className="h-4.5 w-4.5 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Gestor de Contenido &amp; Catálogo</h2>
            <p className="text-xs text-gray-500">Productos, presentaciones, lotes y certificados de análisis</p>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg shrink-0">
          {SUB_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                subTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              <span className={`ml-1.5 text-[10px] ${subTab === tab.id ? 'text-gray-500' : 'text-gray-400'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTOS */}
      {subTab === 'products' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Producto', 'Categoría', 'Pureza', 'Lote Asociado', 'Stock Total', 'Estado COA', ''].map((h) => (
                  <th key={h} className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-gray-900">{p.title}</td>
                  <td className="px-5 py-3.5 text-gray-500">{p.category}</td>
                  <td className="px-5 py-3.5 font-semibold text-emerald-600">{p.purity}</td>
                  <td className="px-5 py-3.5 text-xs font-mono text-gray-400">{p.lotNumber}</td>
                  <td className="px-5 py-3.5 text-gray-700">{p.stockTotal} viales</td>
                  <td className="px-5 py-3.5">
                    <StatusPill
                      active={p.coaStatus === 'Verificado'}
                      label={p.coaStatus}
                      activeColor="emerald"
                      inactiveColor="amber"
                    />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button className="text-xs font-semibold text-gray-400 hover:text-gray-700 transition-colors">
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PRESENTACIONES */}
      {subTab === 'presentations' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Producto', 'Presentación', 'SKU', 'Precio COP', 'Stock', 'Estado'].map((h) => (
                  <th key={h} className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {presentations.map((pres) => (
                <tr key={pres.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-gray-900">{pres.productTitle}</td>
                  <td className="px-5 py-3.5 font-semibold text-blue-600">{pres.name}</td>
                  <td className="px-5 py-3.5 text-xs font-mono text-gray-400">{pres.sku}</td>
                  <td className="px-5 py-3.5 font-bold text-gray-900">{formatCOP(pres.priceCOP)}</td>
                  <td className="px-5 py-3.5 text-gray-600">{pres.stock} unidades</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
                      {pres.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* CONTENIDO */}
      {subTab === 'content' && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-6">
          {contentBlocks.map((c) => (
            <div key={c.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                  {c.section}
                </span>
                <span className="text-[11px] text-gray-400">{c.publishedAt}</span>
              </div>
              <h3 className="text-sm font-bold text-gray-900">{c.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{c.excerpt}</p>
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span>{c.author}</span>
                <span className="font-semibold text-emerald-600 cursor-pointer hover:underline">Publicado</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LOTES */}
      {subTab === 'lots' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Nº Lote', 'Compuesto', 'Fecha Síntesis', 'Pureza HPLC', 'Viales', 'Estado'].map((h) => (
                  <th key={h} className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {lots.map((l) => (
                <tr key={l.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-bold text-blue-600">{l.lotNumber}</td>
                  <td className="px-5 py-3.5 font-semibold text-gray-900">{l.compoundName}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-400">{l.synthesisDate}</td>
                  <td className="px-5 py-3.5 font-bold text-emerald-600">{l.purityPercentage}</td>
                  <td className="px-5 py-3.5 text-gray-700">{l.vialsProduced}</td>
                  <td className="px-5 py-3.5">
                    <StatusPill
                      active={l.status === 'Activo'}
                      label={l.status}
                      activeColor="emerald"
                      inactiveColor="amber"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* COAs */}
      {subTab === 'coas' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Lote', 'Compuesto', 'Laboratorio', 'Método', 'Pureza', 'Estado', ''].map((h) => (
                  <th key={h} className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {coas.map((coa) => (
                <tr key={coa.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-bold text-blue-600">{coa.lotNumber}</td>
                  <td className="px-5 py-3.5 font-semibold text-gray-900">{coa.compoundName}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-500">{coa.labName}</td>
                  <td className="px-5 py-3.5 text-xs font-mono text-gray-700">{coa.method}</td>
                  <td className="px-5 py-3.5 font-bold text-emerald-600">{coa.purity}</td>
                  <td className="px-5 py-3.5">
                    <StatusPill
                      active={coa.status === 'Verificado'}
                      label={coa.status}
                      activeColor="emerald"
                      inactiveColor="amber"
                    />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => handleToggleCoa(coa.id, coa.status)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      {coa.status === 'Verificado' ? 'Marcar Pendiente' : 'Aprobar COA'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// GESTIÓN OPERATIVA (SUPABASE)
// ─────────────────────────────────────────────────────────────
export function SupabaseModule({
  customers,
  orders,
  payments,
  attempts,
  onRefresh,
}: {
  customers: SupabaseCustomer[]
  orders: SupabaseOrder[]
  payments: SupabasePayment[]
  attempts: PaymentAttempt[]
  onRefresh: () => void
}) {
  const [subTab, setSubTab] = useState<'orders' | 'customers' | 'payments' | 'attempts'>('orders')
  const [statusFilter, setStatusFilter] = useState<string>('Todos')

  const filteredOrders =
    statusFilter === 'Todos' ? orders : orders.filter((o) => o.status === statusFilter)

  const handleChangeOrderStatus = (id: string, status: SupabaseOrder['status']) => {
    AdminService.updateOrderStatus(id, status)
    onRefresh()
  }

  const SUB_TABS = [
    { id: 'orders' as const, label: 'Pedidos', count: orders.length },
    { id: 'customers' as const, label: 'Clientes', count: customers.length },
    { id: 'payments' as const, label: 'Pagos', count: payments.length },
    { id: 'attempts' as const, label: 'Intentos Wompi', count: attempts.length },
  ]

  const STATUS_FILTERS = ['Todos', 'Pendiente', 'En Preparación', 'Enviado', 'Entregado', 'Cancelado']

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <Icon icon="lucide:server" className="h-4.5 w-4.5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Gestión Operativa &amp; Comercial</h2>
            <p className="text-xs text-gray-500">Pedidos, clientes, pagos e intentos en tiempo real</p>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg shrink-0 flex-wrap">
          {SUB_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                subTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              <span className={`ml-1.5 text-[10px] ${subTab === tab.id ? 'text-gray-500' : 'text-gray-400'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* PEDIDOS */}
      {subTab === 'orders' && (
        <div>
          {/* Filtros */}
          <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-100 overflow-x-auto">
            <span className="text-xs text-gray-400 font-semibold shrink-0">Estado:</span>
            {STATUS_FILTERS.map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 ${
                  statusFilter === st
                    ? 'bg-gray-900 text-white'
                    : 'border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Pedido', 'Cliente', 'Ciudad', 'Productos', 'Total COP', 'Método Pago', 'Estado'].map((h) => (
                    <th key={h} className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 font-mono font-bold text-blue-600">{ord.orderNumber}</td>
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-gray-900">{ord.customerName}</div>
                      <div className="text-xs text-gray-400">{ord.customerEmail}</div>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-500">{ord.city}</td>
                    <td className="px-5 py-3.5">
                      <div className="space-y-0.5">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="text-xs text-gray-600">
                            <span className="font-semibold text-gray-800">{item.productName}</span>{' '}
                            ({item.presentation}) ×{item.quantity}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-bold text-gray-900">{formatCOP(ord.totalCOP)}</td>
                    <td className="px-5 py-3.5 text-xs text-gray-500">{ord.paymentMethod}</td>
                    <td className="px-5 py-3.5">
                      <select
                        value={ord.status}
                        onChange={(e) => handleChangeOrderStatus(ord.id, e.target.value as SupabaseOrder['status'])}
                        className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-700 focus:outline-none focus:border-gray-400 cursor-pointer shadow-sm"
                      >
                        {['Pendiente', 'En Preparación', 'Enviado', 'Entregado', 'Cancelado'].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CLIENTES */}
      {subTab === 'customers' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Investigador / Cliente', 'Contacto', 'Ubicación', 'Pedidos', 'Total Comprado', 'Registro'].map((h) => (
                  <th key={h} className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {customers.map((cust) => (
                <tr key={cust.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-gray-900">{cust.fullName}</td>
                  <td className="px-5 py-3.5 text-xs">
                    <div className="text-gray-700">{cust.email}</div>
                    <div className="text-gray-400 font-mono">{cust.phone}</div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-500">{cust.city}</td>
                  <td className="px-5 py-3.5 font-bold text-blue-600">{cust.totalOrders} pedidos</td>
                  <td className="px-5 py-3.5 font-bold text-gray-900">{formatCOP(cust.totalSpentCOP)}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-400">{cust.registeredAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PAGOS */}
      {subTab === 'payments' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Nº Pedido', 'Pasarela', 'ID Transacción', 'Monto COP', 'Estado Wompi', 'Fecha'].map((h) => (
                  <th key={h} className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-bold text-blue-600">{p.orderNumber}</td>
                  <td className="px-5 py-3.5 font-semibold text-gray-900">{p.gateway}</td>
                  <td className="px-5 py-3.5 font-mono text-xs text-gray-500">{p.transactionId}</td>
                  <td className="px-5 py-3.5 font-bold text-gray-900">{formatCOP(p.amountCOP)}</td>
                  <td className="px-5 py-3.5">
                    <StatusPill
                      active={p.status === 'APPROVED'}
                      label={p.status}
                      activeColor="emerald"
                      inactiveColor="amber"
                    />
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-400">{p.paidAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* INTENTOS DE PAGO */}
      {subTab === 'attempts' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Pedido', 'Cliente', 'Pasarela / Canal', 'Dispositivo / IP', 'Código Respuesta', 'Resultado'].map((h) => (
                  <th key={h} className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {attempts.map((att) => (
                <tr key={att.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-bold text-blue-600">{att.orderNumber}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-700 font-mono">{att.customerEmail}</td>
                  <td className="px-5 py-3.5 text-xs font-semibold text-gray-800">{att.gateway}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-500">
                    <div>{att.device}</div>
                    <div className="text-[11px] text-gray-400">{att.ipAddress}</div>
                  </td>
                  <td className="px-5 py-3.5 text-xs">
                    <div className="font-bold text-gray-800">{att.responseCode}</div>
                    {att.errorMessage && (
                      <div className="text-rose-500 text-[11px] mt-0.5">{att.errorMessage}</div>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusPill
                      active={att.successful}
                      label={att.successful ? 'EXITOSO' : 'FALLIDO'}
                      activeColor="emerald"
                      inactiveColor="rose"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// MÓDULO DE CONTENIDO (PÁGINAS)
// ─────────────────────────────────────────────────────────────
export function ContentModule() {
  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
          <Icon icon="lucide:file-text" className="h-4 w-4 text-violet-600" />
        </div>
        <div>
          <h2 className="text-base font-bold text-gray-900">Contenido del Sitio</h2>
          <p className="text-xs text-gray-500">Edita directamente cada página desde el gestor de contenido</p>
        </div>
        <a
          href="/admin"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-800 border border-gray-200 bg-white rounded-lg px-3 py-1.5 shadow-sm transition-colors"
        >
          <Icon icon="lucide:external-link" className="h-3.5 w-3.5" />
          Abrir Studio completo
        </a>
      </div>

      {/* Lista de páginas */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Página</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Descripción</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Tipo</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {CONTENT_PAGES.map((page) => (
              <tr key={page.label} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-lg ${page.iconBg} flex items-center justify-center shrink-0`}>
                      <Icon icon={page.icon} className={`h-4 w-4 ${page.iconColor}`} />
                    </div>
                    <span className="font-semibold text-gray-900">{page.label}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-xs text-gray-500 hidden sm:table-cell max-w-xs">
                  {page.description}
                </td>
                <td className="px-5 py-3.5 hidden md:table-cell">
                  <span className="text-[10px] font-bold text-gray-400 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-md">
                    {page.tag}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <a
                    href={page.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 border border-gray-200 bg-white rounded-lg px-3 py-1.5 shadow-sm transition-colors hover:border-gray-300"
                  >
                    <Icon icon="lucide:pencil" className="h-3 w-3" />
                    Editar
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// ANALÍTICA COMERCIAL
// ─────────────────────────────────────────────────────────────
export function CommercialAnalytics({ summary }: { summary: CommercialSummary }) {
  const bars = [
    { label: 'Péptidos Liofilizados', pct: 62, amount: '8.890.000 COP', color: 'bg-blue-500' },
    { label: 'Línea Metabólica', pct: 28, amount: '4.015.200 COP', color: 'bg-violet-500' },
    { label: 'Blends de Investigación', pct: 10, amount: '1.434.800 COP', color: 'bg-emerald-500' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
          <Icon icon="lucide:area-chart" className="h-4.5 w-4.5 text-violet-600" />
        </div>
        <div>
          <h2 className="text-base font-bold text-gray-900">Datos Comerciales &amp; Rendimiento</h2>
          <p className="text-xs text-gray-500">Métricas de conversión, volumen de ventas y demanda</p>
        </div>
        <div className="ml-auto flex gap-2">
          <SourceBadge source="Supabase" />
          <SourceBadge source="Sanity" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Distribución de ingresos */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            Distribución de Ingresos COP
          </h3>
          <div className="space-y-4">
            {bars.map((bar) => (
              <div key={bar.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-600">{bar.label}</span>
                  <span className="font-bold text-gray-900">
                    {bar.pct}% ({bar.amount})
                  </span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className={`h-full rounded-full ${bar.color}`} style={{ width: `${bar.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compuesto más solicitado */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            Compuesto Más Solicitado
          </h3>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
              <Icon icon="lucide:award" className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">{summary.topSellingProduct}</div>
              <div className="text-xs text-gray-500 mt-0.5">
                Lote activo:{' '}
                <span className="font-mono font-bold text-blue-600">LOT-RT-2410</span>
              </div>
            </div>
          </div>
          <div className="pt-3 border-t border-gray-100 text-xs text-gray-500">
            Representa el{' '}
            <span className="font-bold text-gray-900">34%</span> de los despachos totales de este trimestre.
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// HELPER: STATUS PILL
// ─────────────────────────────────────────────────────────────
type PillColor = 'emerald' | 'amber' | 'rose' | 'blue'

const PILL_CLASSES: Record<PillColor, string> = {
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  rose: 'bg-rose-50 text-rose-700 border-rose-200',
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
}

function StatusPill({
  active,
  label,
  activeColor,
  inactiveColor,
}: {
  active: boolean
  label: string
  activeColor: PillColor
  inactiveColor: PillColor
}) {
  const color = active ? activeColor : inactiveColor
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold ${PILL_CLASSES[color]}`}
    >
      {label}
    </span>
  )
}
