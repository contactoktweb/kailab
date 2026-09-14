// --- MODELOS DE DATOS DE SANITY CMS ---

export type SanityProduct = {
  id: string
  title: string
  slug: string
  category: string
  purity: string
  lotNumber: string
  stockTotal: number
  coaStatus: 'Verificado' | 'Pendiente' | 'Sin Cargar'
  updatedAt: string
}

export type SanityPresentation = {
  id: string
  productId: string
  productTitle: string
  name: string // e.g. "5 mg", "10 mg", "50 mg"
  sku: string
  priceCOP: number
  stock: number
  status: 'Publicado' | 'Borrador'
}

export type SanityContentBlock = {
  id: string
  section: 'Banner Principal' | 'Aviso RUO' | 'Preguntas Frecuentes' | 'Protocolos'
  title: string
  excerpt: string
  publishedAt: string
  author: string
}

export type SanityLot = {
  id: string
  lotNumber: string
  compoundName: string
  synthesisDate: string
  purityPercentage: string
  vialsProduced: number
  status: 'Activo' | 'Agotado' | 'En Cuarentena'
}

export type SanityCOA = {
  id: string
  lotNumber: string
  compoundName: string
  labName: string
  method: string // e.g. "Cromatografía HPLC-MS"
  purity: string
  pdfFileUrl: string
  verifiedAt: string
  status: 'Verificado' | 'Pendiente' | 'Rechazado'
}

// --- MODELOS DE DATOS DE POSTGRESQL / SUPABASE ---

export type SupabaseCustomer = {
  id: string
  fullName: string
  email: string
  phone: string
  city: string
  totalOrders: number
  totalSpentCOP: number
  registeredAt: string
}

export type OrderItem = {
  productName: string
  presentation: string
  quantity: number
  unitPriceCOP: number
}

export type SupabaseOrder = {
  id: string
  orderNumber: string // e.g. "ORD-9482"
  customerId: string
  customerName: string
  customerEmail: string
  city: string
  items: OrderItem[]
  totalCOP: number
  paymentMethod: 'Wompi (Tarjeta)' | 'Wompi (PSE)' | 'Nequi Directo' | 'USDT (Blockchain)'
  status: 'Pendiente' | 'En Preparación' | 'Enviado' | 'Entregado' | 'Cancelado'
  createdAt: string
}

export type SupabasePayment = {
  id: string
  orderId: string
  orderNumber: string
  gateway: 'Wompi' | 'Nequi' | 'Bancolombia' | 'Blockchain USDT'
  transactionId: string
  amountCOP: number
  status: 'APPROVED' | 'PENDING' | 'DECLINED' | 'VOIDED'
  paidAt: string
}

export type PaymentAttempt = {
  id: string
  orderNumber: string
  customerEmail: string
  gateway: string
  ipAddress: string
  device: 'Escritorio' | 'Móvil' | 'Tablet'
  responseCode: string
  errorMessage?: string
  attemptedAt: string
  successful: boolean
}

export type CommercialSummary = {
  totalSalesCOP: number
  monthlySalesCOP: number
  ordersCount: number
  averageTicketCOP: number
  conversionRate: number
  topSellingProduct: string
}

// --- DATASETS INICIALES DE DEMOSTRACIÓN (SANITY CMS & SUPABASE DB) ---

export const initialSanityProducts: SanityProduct[] = [
  {
    id: 'sanity-prod-1',
    title: 'Retatrutida',
    slug: 'retatrutida',
    category: 'Metabólico',
    purity: '≥ 99.0%',
    lotNumber: 'LOT-RT-2410',
    stockTotal: 100,
    coaStatus: 'Verificado',
    updatedAt: '2026-09-12 14:30',
  },
  {
    id: 'sanity-prod-2',
    title: 'BPC-157',
    slug: 'bpc-157',
    category: 'Péptidos',
    purity: '≥ 99.1%',
    lotNumber: 'LOT-BPC-2409',
    stockTotal: 34,
    coaStatus: 'Verificado',
    updatedAt: '2026-09-10 09:15',
  },
  {
    id: 'sanity-prod-3',
    title: 'GHK-Cu',
    slug: 'ghk-cu',
    category: 'Péptidos',
    purity: '≥ 99.3%',
    lotNumber: 'LOT-GHK-2410',
    stockTotal: 25,
    coaStatus: 'Verificado',
    updatedAt: '2026-09-11 11:20',
  },
  {
    id: 'sanity-prod-4',
    title: 'Tesamorelina',
    slug: 'tesamorelin',
    category: 'Péptidos',
    purity: '≥ 98.8%',
    lotNumber: 'LOT-TES-2411',
    stockTotal: 18,
    coaStatus: 'Pendiente',
    updatedAt: '2026-09-13 16:45',
  },
  {
    id: 'sanity-prod-5',
    title: 'GLOW Blend',
    slug: 'glow-blend',
    category: 'Blends',
    purity: '≥ 99.0%',
    lotNumber: 'LOT-GLW-2412',
    stockTotal: 60,
    coaStatus: 'Verificado',
    updatedAt: '2026-09-14 08:00',
  },
]

export const initialSanityPresentations: SanityPresentation[] = [
  { id: 'pres-1', productId: 'sanity-prod-1', productTitle: 'Retatrutida', name: '5 mg', sku: 'RT-5MG-01', priceCOP: 100000, stock: 50, status: 'Publicado' },
  { id: 'pres-2', productId: 'sanity-prod-1', productTitle: 'Retatrutida', name: '10 mg', sku: 'RT-10MG-01', priceCOP: 160000, stock: 50, status: 'Publicado' },
  { id: 'pres-3', productId: 'sanity-prod-2', productTitle: 'BPC-157', name: '5 mg', sku: 'BPC-5MG-01', priceCOP: 189000, stock: 34, status: 'Publicado' },
  { id: 'pres-4', productId: 'sanity-prod-3', productTitle: 'GHK-Cu', name: '50 mg', sku: 'GHK-50MG-01', priceCOP: 210000, stock: 25, status: 'Publicado' },
  { id: 'pres-5', productId: 'sanity-prod-4', productTitle: 'Tesamorelina', name: '10 mg', sku: 'TES-10MG-01', priceCOP: 275000, stock: 18, status: 'Publicado' },
  { id: 'pres-6', productId: 'sanity-prod-5', productTitle: 'GLOW Blend', name: 'GLOW 50mg', sku: 'GLW-50MG-01', priceCOP: 240000, stock: 30, status: 'Publicado' },
  { id: 'pres-7', productId: 'sanity-prod-5', productTitle: 'GLOW Blend', name: 'KLOW 50mg', sku: 'KLW-50MG-01', priceCOP: 240000, stock: 30, status: 'Publicado' },
]

export const initialSanityContentBlocks: SanityContentBlock[] = [
  { id: 'cnt-1', section: 'Banner Principal', title: 'Reactivos Liofilizados Grado Analítico RUO', excerpt: 'Péptidos y moléculas de investigación con certificado de pureza HPLC-MS por lote.', publishedAt: '2026-09-01', author: 'Equipo KAILAB' },
  { id: 'cnt-2', section: 'Aviso RUO', title: 'Uso Exclusivo en Investigación', excerpt: 'Compuestos liofilizados no aptos para consumo humano ni diagnóstico médico.', publishedAt: '2026-09-01', author: 'Comité Técnico' },
  { id: 'cnt-3', section: 'Preguntas Frecuentes', title: 'Base de Conocimiento y Garantía de Cadena de Frío', excerpt: 'Protocolos de transporte térmico y recepción de muestras.', publishedAt: '2026-09-05', author: 'Soporte Logístico' },
]

export const initialSanityLots: SanityLot[] = [
  { id: 'lot-1', lotNumber: 'LOT-RT-2410', compoundName: 'Retatrutida', synthesisDate: '2026-08-20', purityPercentage: '99.0%', vialsProduced: 250, status: 'Activo' },
  { id: 'lot-2', lotNumber: 'LOT-BPC-2409', compoundName: 'BPC-157', synthesisDate: '2026-08-15', purityPercentage: '99.1%', vialsProduced: 180, status: 'Activo' },
  { id: 'lot-3', lotNumber: 'LOT-GHK-2410', compoundName: 'GHK-Cu', synthesisDate: '2026-08-22', purityPercentage: '99.3%', vialsProduced: 120, status: 'Activo' },
  { id: 'lot-4', lotNumber: 'LOT-TES-2411', compoundName: 'Tesamorelina', synthesisDate: '2026-09-02', purityPercentage: '98.8%', vialsProduced: 100, status: 'En Cuarentena' },
  { id: 'lot-5', lotNumber: 'LOT-GLW-2412', compoundName: 'GLOW Blend', synthesisDate: '2026-09-05', purityPercentage: '99.0%', vialsProduced: 150, status: 'Activo' },
]

export const initialSanityCOAs: SanityCOA[] = [
  { id: 'coa-1', lotNumber: 'LOT-RT-2410', compoundName: 'Retatrutida', labName: 'Analytical Lab USA ISO 17025', method: 'HPLC-MS Espectrometría de Masas', purity: '99.0%', pdfFileUrl: '/coa/REPORTE_RT-2410.pdf', verifiedAt: '2026-08-25', status: 'Verificado' },
  { id: 'coa-2', lotNumber: 'LOT-BPC-2409', compoundName: 'BPC-157', labName: 'Chromatography Europe B.V.', method: 'Cromatografía HPLC', purity: '99.1%', pdfFileUrl: '/coa/REPORTE_BPC-2409.pdf', verifiedAt: '2026-08-18', status: 'Verificado' },
  { id: 'coa-3', lotNumber: 'LOT-GHK-2410', compoundName: 'GHK-Cu', labName: 'Analytical Lab USA ISO 17025', method: 'HPLC-MS Espectrometría de Masas', purity: '99.3%', pdfFileUrl: '/coa/REPORTE_GHK-2410.pdf', verifiedAt: '2026-08-28', status: 'Verificado' },
  { id: 'coa-4', lotNumber: 'LOT-TES-2411', compoundName: 'Tesamorelina', labName: 'BioTesting Inc.', method: 'Cromatografía HPLC', purity: '98.8%', pdfFileUrl: '/coa/REPORTE_TES-2411.pdf', verifiedAt: '2026-09-10', status: 'Pendiente' },
]

export const initialSupabaseCustomers: SupabaseCustomer[] = [
  { id: 'cust-101', fullName: 'Dr. Alejandro Restrepo', email: 'a.restrepo@biomed-lab.co', phone: '+57 310 492 8812', city: 'Bogotá D.C.', totalOrders: 5, totalSpentCOP: 1250000, registeredAt: '2026-07-10' },
  { id: 'cust-102', fullName: 'Dra. Camila Henao', email: 'chenao@labsalud.org', phone: '+57 314 883 9920', city: 'Medellín', totalOrders: 3, totalSpentCOP: 740000, registeredAt: '2026-08-01' },
  { id: 'cust-103', fullName: 'Ing. Carlos Mendoza', email: 'cmendoza@research.unal.edu.co', phone: '+57 300 551 1234', city: 'Cali', totalOrders: 2, totalSpentCOP: 420000, registeredAt: '2026-08-18' },
  { id: 'cust-104', fullName: 'Dra. Valeria Gómez', email: 'vgomez@innovabiotech.co', phone: '+57 318 772 3344', city: 'Barranquilla', totalOrders: 4, totalSpentCOP: 980000, registeredAt: '2026-08-25' },
  { id: 'cust-105', fullName: 'Dr. Fernando Silva', email: 'fsilva@labquim.com.co', phone: '+57 312 990 4455', city: 'Bucaramanga', totalOrders: 1, totalSpentCOP: 160000, registeredAt: '2026-09-02' },
]

export const initialSupabaseOrders: SupabaseOrder[] = [
  {
    id: 'ord-1001',
    orderNumber: 'ORD-9482',
    customerId: 'cust-101',
    customerName: 'Dr. Alejandro Restrepo',
    customerEmail: 'a.restrepo@biomed-lab.co',
    city: 'Bogotá D.C.',
    items: [
      { productName: 'Retatrutida', presentation: '10 mg', quantity: 2, unitPriceCOP: 160000 },
      { productName: 'GHK-Cu', presentation: '50 mg', quantity: 1, unitPriceCOP: 210000 }
    ],
    totalCOP: 530000,
    paymentMethod: 'Wompi (Tarjeta)',
    status: 'Enviado',
    createdAt: '2026-09-13 14:20'
  },
  {
    id: 'ord-1002',
    orderNumber: 'ORD-9483',
    customerId: 'cust-102',
    customerName: 'Dra. Camila Henao',
    customerEmail: 'chenao@labsalud.org',
    city: 'Medellín',
    items: [
      { productName: 'BPC-157', presentation: '5 mg', quantity: 1, unitPriceCOP: 189000 },
      { productName: 'GLOW Blend', presentation: 'GLOW 50mg', quantity: 1, unitPriceCOP: 240000 }
    ],
    totalCOP: 429000,
    paymentMethod: 'Wompi (PSE)',
    status: 'En Preparación',
    createdAt: '2026-09-14 09:10'
  },
  {
    id: 'ord-1003',
    orderNumber: 'ORD-9484',
    customerId: 'cust-103',
    customerName: 'Ing. Carlos Mendoza',
    customerEmail: 'cmendoza@research.unal.edu.co',
    city: 'Cali',
    items: [
      { productName: 'Retatrutida', presentation: '5 mg', quantity: 2, unitPriceCOP: 100000 }
    ],
    totalCOP: 200000,
    paymentMethod: 'Nequi Directo',
    status: 'Pendiente',
    createdAt: '2026-09-14 10:05'
  },
  {
    id: 'ord-1004',
    orderNumber: 'ORD-9485',
    customerId: 'cust-104',
    customerName: 'Dra. Valeria Gómez',
    customerEmail: 'vgomez@innovabiotech.co',
    city: 'Barranquilla',
    items: [
      { productName: 'Tesamorelina', presentation: '10 mg', quantity: 1, unitPriceCOP: 275000 }
    ],
    totalCOP: 275000,
    paymentMethod: 'USDT (Blockchain)',
    status: 'Entregado',
    createdAt: '2026-09-11 16:30'
  },
]

export const initialSupabasePayments: SupabasePayment[] = [
  { id: 'pay-1', orderId: 'ord-1001', orderNumber: 'ORD-9482', gateway: 'Wompi', transactionId: 'wompi_tx_998124', amountCOP: 530000, status: 'APPROVED', paidAt: '2026-09-13 14:21' },
  { id: 'pay-2', orderId: 'ord-1002', orderNumber: 'ORD-9483', gateway: 'Wompi', transactionId: 'wompi_pse_441209', amountCOP: 429000, status: 'APPROVED', paidAt: '2026-09-14 09:12' },
  { id: 'pay-3', orderId: 'ord-1003', orderNumber: 'ORD-9484', gateway: 'Nequi', transactionId: 'neq_ref_119283', amountCOP: 200000, status: 'PENDING', paidAt: '2026-09-14 10:05' },
  { id: 'pay-4', orderId: 'ord-1004', orderNumber: 'ORD-9485', gateway: 'Blockchain USDT', transactionId: '0x8f2a...91c3', amountCOP: 275000, status: 'APPROVED', paidAt: '2026-09-11 16:31' },
]

export const initialPaymentAttempts: PaymentAttempt[] = [
  { id: 'att-1', orderNumber: 'ORD-9482', customerEmail: 'a.restrepo@biomed-lab.co', gateway: 'Wompi (Visa)', ipAddress: '181.135.92.10', device: 'Escritorio', responseCode: 'APPROVED', attemptedAt: '2026-09-13 14:21', successful: true },
  { id: 'att-2', orderNumber: 'ORD-9483', customerEmail: 'chenao@labsalud.org', gateway: 'Wompi (PSE Bancolombia)', ipAddress: '190.158.12.44', device: 'Móvil', responseCode: 'APPROVED', attemptedAt: '2026-09-14 09:12', successful: true },
  { id: 'att-3', orderNumber: 'ORD-9484', customerEmail: 'cmendoza@research.unal.edu.co', gateway: 'Wompi (Mastercard)', ipAddress: '181.60.22.19', device: 'Tablet', responseCode: 'DECLINED', errorMessage: 'Fondos insuficientes en la tarjeta', attemptedAt: '2026-09-14 10:02', successful: false },
  { id: 'att-4', orderNumber: 'ORD-9484', customerEmail: 'cmendoza@research.unal.edu.co', gateway: 'Nequi Directo', ipAddress: '181.60.22.19', device: 'Tablet', responseCode: 'PENDING_USER_APPROVAL', attemptedAt: '2026-09-14 10:05', successful: true },
]

export const initialCommercialSummary: CommercialSummary = {
  totalSalesCOP: 14340000,
  monthlySalesCOP: 4890000,
  ordersCount: 38,
  averageTicketCOP: 377368,
  conversionRate: 4.2,
  topSellingProduct: 'Retatrutida (10 mg)',
}

export const formatCOP = (value: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value)

