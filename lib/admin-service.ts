import {
  initialSanityProducts,
  initialSanityPresentations,
  initialSanityContentBlocks,
  initialSanityLots,
  initialSanityCOAs,
  initialSupabaseCustomers,
  initialSupabaseOrders,
  initialSupabasePayments,
  initialPaymentAttempts,
  initialCommercialSummary,
  SanityProduct,
  SanityPresentation,
  SanityContentBlock,
  SanityLot,
  SanityCOA,
  SupabaseCustomer,
  SupabaseOrder,
  SupabasePayment,
  PaymentAttempt,
  CommercialSummary
} from './admin-data'

export class AdminService {
  private static products: SanityProduct[] = [...initialSanityProducts]
  private static presentations: SanityPresentation[] = [...initialSanityPresentations]
  private static contentBlocks: SanityContentBlock[] = [...initialSanityContentBlocks]
  private static lots: SanityLot[] = [...initialSanityLots]
  private static coas: SanityCOA[] = [...initialSanityCOAs]

  private static customers: SupabaseCustomer[] = [...initialSupabaseCustomers]
  private static orders: SupabaseOrder[] = [...initialSupabaseOrders]
  private static payments: SupabasePayment[] = [...initialSupabasePayments]
  private static attempts: PaymentAttempt[] = [...initialPaymentAttempts]
  private static summary: CommercialSummary = { ...initialCommercialSummary }

  // --- GETTERS ---
  static getSanityProducts() { return this.products }
  static getSanityPresentations() { return this.presentations }
  static getSanityContentBlocks() { return this.contentBlocks }
  static getSanityLots() { return this.lots }
  static getSanityCOAs() { return this.coas }

  static getSupabaseCustomers() { return this.customers }
  static getSupabaseOrders() { return this.orders }
  static getSupabasePayments() { return this.payments }
  static getPaymentAttempts() { return this.attempts }
  static getCommercialSummary() { return this.summary }

  // --- ACCIONES DE UPDATE (MUTACIONES CLIENT-SIDE REACTIVAS) ---
  static updateOrderStatus(orderId: string, newStatus: SupabaseOrder['status']): SupabaseOrder | undefined {
    const order = this.orders.find(o => o.id === orderId)
    if (order) {
      order.status = newStatus
    }
    return order
  }

  static updateCoaStatus(coaId: string, newStatus: SanityCOA['status']): SanityCOA | undefined {
    const coa = this.coas.find(c => c.id === coaId)
    if (coa) {
      coa.status = newStatus
      // Sincronizar estado en el producto de Sanity correspondiente
      const prod = this.products.find(p => p.lotNumber === coa.lotNumber)
      if (prod) {
        prod.coaStatus = newStatus === 'Verificado' ? 'Verificado' : newStatus === 'Pendiente' ? 'Pendiente' : 'Sin Cargar'
      }
    }
    return coa
  }

  static addLot(newLot: Omit<SanityLot, 'id'>): SanityLot {
    const created: SanityLot = {
      ...newLot,
      id: `lot-${Date.now()}`
    }
    this.lots.unshift(created)
    return created
  }
}
