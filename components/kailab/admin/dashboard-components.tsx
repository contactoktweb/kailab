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
  formatCOP
} from '@/lib/admin-data'
import { AdminService } from '@/lib/admin-service'

// --- BADGE DE ORIGEN ARQUITECTÓNICO ---
export function SourceBadge({ source }: { source: 'Sanity' | 'Supabase' }) {
  if (source === 'Sanity') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-bold text-emerald-400">
        <Icon icon="lucide:layers" className="h-3.5 w-3.5" />
        Sanity CMS
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 font-mono text-[11px] font-bold text-purple-400">
      <Icon icon="lucide:database" className="h-3.5 w-3.5" />
      PostgreSQL / Supabase
    </span>
  )
}

// --- TARJETAS KPI SUPERIORES ---
export function AdminKpiCards({
  summary,
  ordersCount,
  lotsCount,
  coasCount,
  customersCount
}: {
  summary: CommercialSummary
  ordersCount: number
  lotsCount: number
  coasCount: number
  customersCount: number
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      
      <div className="relative overflow-hidden rounded-md border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">Ventas Totales</span>
          <SourceBadge source="Supabase" />
        </div>
        <div className="mt-3 text-2xl font-bold font-mono text-foreground">
          {formatCOP(summary.totalSalesCOP)}
        </div>
        <div className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
          <Icon icon="lucide:trending-up" className="h-3.5 w-3.5" />
          <span>+14.2% este mes</span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-md border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">Pedidos Activos</span>
          <SourceBadge source="Supabase" />
        </div>
        <div className="mt-3 text-2xl font-bold font-mono text-foreground">
          {ordersCount}
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          Ticket Promedio: <span className="font-mono font-semibold text-foreground">{formatCOP(summary.averageTicketCOP)}</span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-md border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">Clientes</span>
          <SourceBadge source="Supabase" />
        </div>
        <div className="mt-3 text-2xl font-bold font-mono text-foreground">
          {customersCount}
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          Tasa Conversión: <span className="font-mono font-semibold text-primary">{summary.conversionRate}%</span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-md border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">Lotes de Productos</span>
          <SourceBadge source="Sanity" />
        </div>
        <div className="mt-3 text-2xl font-bold font-mono text-foreground">
          {lotsCount}
        </div>
        <div className="mt-1 text-xs text-emerald-400 flex items-center gap-1">
          <Icon icon="lucide:check-circle" className="h-3.5 w-3.5" />
          <span>Trazabilidad Activa</span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-md border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">Certificados COA</span>
          <SourceBadge source="Sanity" />
        </div>
        <div className="mt-3 text-2xl font-bold font-mono text-foreground">
          {coasCount}
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          Ensayos HPLC-MS validados
        </div>
      </div>

    </div>
  )
}

// --- GESTOR DE CONTENIDO SANITY CMS ---
export function SanityCmsModule({
  products,
  presentations,
  contentBlocks,
  lots,
  coas,
  onRefresh
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

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-md border border-primary/40 bg-card p-4 font-mono text-sm font-semibold text-primary shadow-lg animate-in fade-in slide-in-from-bottom-5">
          <Icon icon="lucide:check-circle-2" className="h-5 w-5 text-primary" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header del Módulo Sanity */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-foreground">Gestor de Contenido & Catálogo</h2>
            <SourceBadge source="Sanity" />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Administración centralizada de productos, presentaciones, lotes y certificados de análisis.
          </p>
        </div>

        {/* Sub Pestañas */}
        <div className="flex flex-wrap gap-2 rounded-md border border-border bg-secondary/20 p-1">
          <button
            onClick={() => setSubTab('products')}
            className={`px-3 py-1.5 font-mono text-xs font-semibold rounded-sm transition-all ${subTab === 'products' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Productos ({products.length})
          </button>
          <button
            onClick={() => setSubTab('presentations')}
            className={`px-3 py-1.5 font-mono text-xs font-semibold rounded-sm transition-all ${subTab === 'presentations' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Presentaciones ({presentations.length})
          </button>
          <button
            onClick={() => setSubTab('content')}
            className={`px-3 py-1.5 font-mono text-xs font-semibold rounded-sm transition-all ${subTab === 'content' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Contenido ({contentBlocks.length})
          </button>
          <button
            onClick={() => setSubTab('lots')}
            className={`px-3 py-1.5 font-mono text-xs font-semibold rounded-sm transition-all ${subTab === 'lots' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Lotes ({lots.length})
          </button>
          <button
            onClick={() => setSubTab('coas')}
            className={`px-3 py-1.5 font-mono text-xs font-semibold rounded-sm transition-all ${subTab === 'coas' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            COAs ({coas.length})
          </button>
        </div>
      </div>

      {/* VISTA PRODUCTOS SANITY */}
      {subTab === 'products' && (
        <div className="overflow-x-auto rounded-md border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-secondary/30 font-mono text-xs text-muted-foreground uppercase">
              <tr>
                <th className="p-4">Producto</th>
                <th className="p-4">Categoría</th>
                <th className="p-4">Pureza</th>
                <th className="p-4">Lote Asociado</th>
                <th className="p-4">Stock Total</th>
                <th className="p-4">Estado COA</th>
                <th className="p-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-secondary/10 transition-colors">
                  <td className="p-4 font-semibold text-foreground font-mono">{p.title}</td>
                  <td className="p-4 text-muted-foreground">{p.category}</td>
                  <td className="p-4 font-mono font-medium text-emerald-400">{p.purity}</td>
                  <td className="p-4 font-mono text-xs text-muted-foreground">{p.lotNumber}</td>
                  <td className="p-4 font-mono">{p.stockTotal} viales</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 rounded-sm px-2 py-0.5 font-mono text-xs font-bold ${p.coaStatus === 'Verificado' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'}`}>
                      {p.coaStatus}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="font-mono text-xs text-primary hover:underline font-semibold">Editar en Sanity</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* VISTA PRESENTACIONES */}
      {subTab === 'presentations' && (
        <div className="overflow-x-auto rounded-md border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-secondary/30 font-mono text-xs text-muted-foreground uppercase">
              <tr>
                <th className="p-4">Producto</th>
                <th className="p-4">Presentación</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Precio COP</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {presentations.map((pres) => (
                <tr key={pres.id} className="hover:bg-secondary/10 transition-colors">
                  <td className="p-4 font-semibold text-foreground">{pres.productTitle}</td>
                  <td className="p-4 font-mono font-semibold text-primary">{pres.name}</td>
                  <td className="p-4 font-mono text-xs text-muted-foreground">{pres.sku}</td>
                  <td className="p-4 font-mono font-bold text-foreground">{formatCOP(pres.priceCOP)}</td>
                  <td className="p-4 font-mono">{pres.stock} unidades</td>
                  <td className="p-4">
                    <span className="rounded-sm bg-primary/10 border border-primary/30 px-2 py-0.5 font-mono text-xs text-primary">
                      {pres.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* VISTA CONTENIDO */}
      {subTab === 'content' && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contentBlocks.map((c) => (
            <div key={c.id} className="rounded-md border border-border bg-card p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">{c.section}</span>
                <span className="font-mono text-[11px] text-muted-foreground">{c.publishedAt}</span>
              </div>
              <h3 className="font-mono text-base font-bold text-foreground">{c.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{c.excerpt}</p>
              <div className="pt-2 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                <span>Autor: {c.author}</span>
                <span className="font-mono text-primary cursor-pointer hover:underline">Publicado</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VISTA LOTES */}
      {subTab === 'lots' && (
        <div className="overflow-x-auto rounded-md border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-secondary/30 font-mono text-xs text-muted-foreground uppercase">
              <tr>
                <th className="p-4">Número de Lote</th>
                <th className="p-4">Compuesto</th>
                <th className="p-4">Fecha Síntesis</th>
                <th className="p-4">Pureza HPLC</th>
                <th className="p-4">Viales Producidos</th>
                <th className="p-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {lots.map((l) => (
                <tr key={l.id} className="hover:bg-secondary/10 transition-colors">
                  <td className="p-4 font-mono font-bold text-primary">{l.lotNumber}</td>
                  <td className="p-4 font-semibold text-foreground">{l.compoundName}</td>
                  <td className="p-4 font-mono text-xs text-muted-foreground">{l.synthesisDate}</td>
                  <td className="p-4 font-mono font-bold text-emerald-400">{l.purityPercentage}</td>
                  <td className="p-4 font-mono">{l.vialsProduced}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 font-mono text-xs font-bold rounded-sm border ${l.status === 'Activo' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}>
                      {l.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* VISTA COAs */}
      {subTab === 'coas' && (
        <div className="overflow-x-auto rounded-md border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-secondary/30 font-mono text-xs text-muted-foreground uppercase">
              <tr>
                <th className="p-4">Lote</th>
                <th className="p-4">Compuesto</th>
                <th className="p-4">Laboratorio Ensayo</th>
                <th className="p-4">Método</th>
                <th className="p-4">Pureza Registrada</th>
                <th className="p-4">Estado COA</th>
                <th className="p-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {coas.map((coa) => (
                <tr key={coa.id} className="hover:bg-secondary/10 transition-colors">
                  <td className="p-4 font-mono font-bold text-primary">{coa.lotNumber}</td>
                  <td className="p-4 font-semibold text-foreground">{coa.compoundName}</td>
                  <td className="p-4 text-xs text-muted-foreground">{coa.labName}</td>
                  <td className="p-4 font-mono text-xs text-foreground">{coa.method}</td>
                  <td className="p-4 font-mono font-bold text-emerald-400">{coa.purity}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 font-mono text-xs font-bold rounded-sm border ${coa.status === 'Verificado' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}>
                      {coa.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleToggleCoa(coa.id, coa.status)}
                      className="px-3 py-1 font-mono text-xs font-bold rounded border border-primary/40 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
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

// --- GESTOR OPERATIVO POSTGRESQL / SUPABASE ---
export function SupabaseModule({
  customers,
  orders,
  payments,
  attempts,
  onRefresh
}: {
  customers: SupabaseCustomer[]
  orders: SupabaseOrder[]
  payments: SupabasePayment[]
  attempts: PaymentAttempt[]
  onRefresh: () => void
}) {
  const [subTab, setSubTab] = useState<'orders' | 'customers' | 'payments' | 'attempts'>('orders')
  const [statusFilter, setStatusFilter] = useState<string>('Todos')

  const filteredOrders = statusFilter === 'Todos' 
    ? orders 
    : orders.filter(o => o.status === statusFilter)

  const handleChangeOrderStatus = (id: string, status: SupabaseOrder['status']) => {
    AdminService.updateOrderStatus(id, status)
    onRefresh()
  }

  return (
    <div className="space-y-6">

      {/* Header Módulo Supabase */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-foreground">Gestión Operativa & Comercial</h2>
            <SourceBadge source="Supabase" />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Control de pedidos, base de clientes, registros de pasarela Wompi e intentos de pago en tiempo real.
          </p>
        </div>

        {/* Pestañas de Supabase */}
        <div className="flex flex-wrap gap-2 rounded-md border border-border bg-secondary/20 p-1">
          <button
            onClick={() => setSubTab('orders')}
            className={`px-3 py-1.5 font-mono text-xs font-semibold rounded-sm transition-all ${subTab === 'orders' ? 'bg-purple-600 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Pedidos ({orders.length})
          </button>
          <button
            onClick={() => setSubTab('customers')}
            className={`px-3 py-1.5 font-mono text-xs font-semibold rounded-sm transition-all ${subTab === 'customers' ? 'bg-purple-600 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Clientes ({customers.length})
          </button>
          <button
            onClick={() => setSubTab('payments')}
            className={`px-3 py-1.5 font-mono text-xs font-semibold rounded-sm transition-all ${subTab === 'payments' ? 'bg-purple-600 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Pagos ({payments.length})
          </button>
          <button
            onClick={() => setSubTab('attempts')}
            className={`px-3 py-1.5 font-mono text-xs font-semibold rounded-sm transition-all ${subTab === 'attempts' ? 'bg-purple-600 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Intentos Wompi ({attempts.length})
          </button>
        </div>
      </div>

      {/* VISTA PEDIDOS */}
      {subTab === 'orders' && (
        <div className="space-y-4">
          
          {/* Filtros de estado */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <span className="font-mono text-xs text-muted-foreground font-semibold">Filtrar Estado:</span>
            {['Todos', 'Pendiente', 'En Preparación', 'Enviado', 'Entregado', 'Cancelado'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-full font-mono text-xs font-semibold transition-all ${statusFilter === st ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:bg-secondary/40'}`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto rounded-md border border-border bg-card">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-secondary/30 font-mono text-xs text-muted-foreground uppercase">
                <tr>
                  <th className="p-4">Pedido</th>
                  <th className="p-4">Cliente</th>
                  <th className="p-4">Ciudad</th>
                  <th className="p-4">Productos</th>
                  <th className="p-4">Total COP</th>
                  <th className="p-4">Método Pago</th>
                  <th className="p-4">Estado Operativo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="p-4 font-mono font-bold text-purple-400">{ord.orderNumber}</td>
                    <td className="p-4">
                      <div className="font-semibold text-foreground">{ord.customerName}</div>
                      <div className="text-xs text-muted-foreground">{ord.customerEmail}</div>
                    </td>
                    <td className="p-4 text-xs font-mono">{ord.city}</td>
                    <td className="p-4">
                      <div className="space-y-1">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="text-xs font-mono">
                            <span className="font-semibold text-foreground">{item.productName}</span> ({item.presentation}) x{item.quantity}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 font-mono font-bold text-foreground">{formatCOP(ord.totalCOP)}</td>
                    <td className="p-4 font-mono text-xs text-muted-foreground">{ord.paymentMethod}</td>
                    <td className="p-4">
                      <select
                        value={ord.status}
                        onChange={(e) => handleChangeOrderStatus(ord.id, e.target.value as SupabaseOrder['status'])}
                        className="rounded border border-border bg-secondary/80 px-2.5 py-1.5 font-mono text-xs font-bold text-foreground focus:outline-none focus:border-primary cursor-pointer shadow-sm"
                      >
                        <option value="Pendiente" className="bg-[#17294F] text-white font-mono font-semibold">Pendiente</option>
                        <option value="En Preparación" className="bg-[#17294F] text-white font-mono font-semibold">En Preparación</option>
                        <option value="Enviado" className="bg-[#17294F] text-white font-mono font-semibold">Enviado</option>
                        <option value="Entregado" className="bg-[#17294F] text-white font-mono font-semibold">Entregado</option>
                        <option value="Cancelado" className="bg-[#17294F] text-white font-mono font-semibold">Cancelado</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VISTA CLIENTES */}
      {subTab === 'customers' && (
        <div className="overflow-x-auto rounded-md border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-secondary/30 font-mono text-xs text-muted-foreground uppercase">
              <tr>
                <th className="p-4">Investigador / Cliente</th>
                <th className="p-4">Contacto</th>
                <th className="p-4">Ubicación</th>
                <th className="p-4">Pedidos</th>
                <th className="p-4">Total Comprado</th>
                <th className="p-4">Fecha Registro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {customers.map((cust) => (
                <tr key={cust.id} className="hover:bg-secondary/10 transition-colors">
                  <td className="p-4 font-mono font-semibold text-foreground">{cust.fullName}</td>
                  <td className="p-4 text-xs">
                    <div className="text-foreground">{cust.email}</div>
                    <div className="text-muted-foreground font-mono">{cust.phone}</div>
                  </td>
                  <td className="p-4 font-mono text-xs text-muted-foreground">{cust.city}</td>
                  <td className="p-4 font-mono font-bold text-primary">{cust.totalOrders} pedidos</td>
                  <td className="p-4 font-mono font-bold text-foreground">{formatCOP(cust.totalSpentCOP)}</td>
                  <td className="p-4 font-mono text-xs text-muted-foreground">{cust.registeredAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* VISTA PAGOS */}
      {subTab === 'payments' && (
        <div className="overflow-x-auto rounded-md border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-secondary/30 font-mono text-xs text-muted-foreground uppercase">
              <tr>
                <th className="p-4">Nº Pedido</th>
                <th className="p-4">Pasarela</th>
                <th className="p-4">ID Transacción</th>
                <th className="p-4">Monto COP</th>
                <th className="p-4">Estado Wompi</th>
                <th className="p-4">Fecha Pago</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-secondary/10 transition-colors">
                  <td className="p-4 font-mono font-bold text-purple-400">{p.orderNumber}</td>
                  <td className="p-4 font-semibold text-foreground">{p.gateway}</td>
                  <td className="p-4 font-mono text-xs text-primary">{p.transactionId}</td>
                  <td className="p-4 font-mono font-bold text-foreground">{formatCOP(p.amountCOP)}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 font-mono text-xs font-bold rounded-sm border ${p.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-xs text-muted-foreground">{p.paidAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* VISTA INTENTOS DE PAGO */}
      {subTab === 'attempts' && (
        <div className="overflow-x-auto rounded-md border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-secondary/30 font-mono text-xs text-muted-foreground uppercase">
              <tr>
                <th className="p-4">Pedido</th>
                <th className="p-4">Cliente</th>
                <th className="p-4">Pasarela / Canal</th>
                <th className="p-4">Dispositivo / IP</th>
                <th className="p-4">Código Respuesta</th>
                <th className="p-4">Resultado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {attempts.map((att) => (
                <tr key={att.id} className="hover:bg-secondary/10 transition-colors">
                  <td className="p-4 font-mono font-bold text-purple-400">{att.orderNumber}</td>
                  <td className="p-4 text-xs text-foreground font-mono">{att.customerEmail}</td>
                  <td className="p-4 text-xs font-semibold">{att.gateway}</td>
                  <td className="p-4 font-mono text-xs text-muted-foreground">
                    <div>{att.device}</div>
                    <div className="text-[11px] text-muted-foreground/70">{att.ipAddress}</div>
                  </td>
                  <td className="p-4 font-mono text-xs">
                    <div className="font-bold text-foreground">{att.responseCode}</div>
                    {att.errorMessage && <div className="text-rose-400 text-[11px] mt-0.5">{att.errorMessage}</div>}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 font-mono text-xs font-bold rounded-sm border ${att.successful ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border-rose-500/30'}`}>
                      {att.successful ? 'EXITOSO' : 'FALLIDO'}
                    </span>
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

// --- ANALÍTICA COMERCIAL UNIFICADA ---
export function CommercialAnalytics({ summary }: { summary: CommercialSummary }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Datos Comerciales & Rendimiento</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Métricas clave de conversión, volumen de ventas y análisis de la demanda.
          </p>
        </div>
        <div className="flex gap-2">
          <SourceBadge source="Supabase" />
          <SourceBadge source="Sanity" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-md border border-border bg-card p-6 shadow-sm space-y-4">
          <h3 className="font-mono text-sm font-bold text-foreground uppercase tracking-wider">Distribución de Ingresos COP</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-muted-foreground">Péptidos Liofilizados</span>
                <span className="font-bold text-foreground">62% (8.890.000 COP)</span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '62%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-muted-foreground">Línea Metabólica</span>
                <span className="font-bold text-foreground">28% (4.015.200 COP)</span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-purple-500" style={{ width: '28%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-muted-foreground">Blends de Investigación</span>
                <span className="font-bold text-foreground">10% (1.434.800 COP)</span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-emerald-400" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-border bg-card p-6 shadow-sm space-y-4">
          <h3 className="font-mono text-sm font-bold text-foreground uppercase tracking-wider">Compuesto Más Solicitado</h3>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
              <Icon icon="lucide:award" className="h-6 w-6" />
            </div>
            <div>
              <div className="text-lg font-bold font-mono text-foreground">{summary.topSellingProduct}</div>
              <div className="text-xs text-muted-foreground">Lote activo: <span className="font-mono text-primary font-bold">LOT-RT-2410</span></div>
            </div>
          </div>
          <div className="pt-3 border-t border-border/50 text-xs text-muted-foreground">
            Representa el <span className="font-bold text-foreground font-mono">34%</span> de los despachos totales de este trimestre.
          </div>
        </div>
      </div>
    </div>
  )
}
