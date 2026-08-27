export type Product = {
  id: string
  category: string
  title: string
  priceCOP: number
  presentation: string
  concentration: string
  lot: string
  purity: string
  formula: string
  stock: number
  badges: string[]
}

export const products: Product[] = [
  {
    id: 'kl-001',
    category: 'Péptidos',
    title: 'BPC-157',
    priceCOP: 189000,
    presentation: 'Vial liofilizado',
    concentration: '5 mg',
    lot: 'LOT-BPC-2409',
    purity: '≥ 99.1%',
    formula: 'C62H98N16O22',
    stock: 34,
    badges: ['RUO', 'COA'],
  },
  {
    id: 'kl-002',
    category: 'Péptidos',
    title: 'TB-500',
    priceCOP: 219000,
    presentation: 'Vial liofilizado',
    concentration: '5 mg',
    lot: 'LOT-TB5-2411',
    purity: '≥ 98.7%',
    formula: 'C212H350N56O78S',
    stock: 21,
    badges: ['RUO', 'COA'],
  },
  {
    id: 'kl-003',
    category: 'Nootrópicos',
    title: 'Semax',
    priceCOP: 165000,
    presentation: 'Solución nasal',
    concentration: '30 mg / 3 ml',
    lot: 'LOT-SMX-2410',
    purity: '≥ 98.9%',
    formula: 'C37H51N9O10',
    stock: 48,
    badges: ['RUO', 'COA'],
  },
  {
    id: 'kl-004',
    category: 'Péptidos',
    title: 'GHK-Cu',
    priceCOP: 142000,
    presentation: 'Vial liofilizado',
    concentration: '50 mg',
    lot: 'LOT-GHK-2408',
    purity: '≥ 99.4%',
    formula: 'C14H24N6O4Cu',
    stock: 62,
    badges: ['RUO', 'COA'],
  },
  {
    id: 'kl-005',
    category: 'Metabólico',
    title: 'MOTS-c',
    priceCOP: 248000,
    presentation: 'Vial liofilizado',
    concentration: '10 mg',
    lot: 'LOT-MTS-2412',
    purity: '≥ 98.5%',
    formula: 'C101H152N28O22',
    stock: 12,
    badges: ['RUO', 'COA'],
  },
  {
    id: 'kl-006',
    category: 'Nootrópicos',
    title: 'Selank',
    priceCOP: 158000,
    presentation: 'Solución nasal',
    concentration: '30 mg / 3 ml',
    lot: 'LOT-SLK-2410',
    purity: '≥ 99.0%',
    formula: 'C33H57N11O9',
    stock: 40,
    badges: ['RUO', 'COA'],
  },
]

export type CartItem = { product: Product; qty: number }

export type Evidence = {
  label: string
  metric: string
  value: number
  source: string
  sourceType: 'DOI' | 'NCT'
}

export const evidence: Evidence[] = [
  {
    label: 'Cierre de herida vs. control (modelo preclínico)',
    metric: '+62%',
    value: 62,
    source: '10.1016/j.jss.2018.03.012',
    sourceType: 'DOI',
  },
  {
    label: 'Marcadores de recuperación tendinosa',
    metric: '+48%',
    value: 48,
    source: 'NCT03984240',
    sourceType: 'NCT',
  },
  {
    label: 'Puntaje de función cognitiva (rango reportado)',
    metric: '+34%',
    value: 34,
    source: '10.1007/s11055-019-00745-9',
    sourceType: 'DOI',
  },
  {
    label: 'Reducción de biomarcadores inflamatorios',
    metric: '+27%',
    value: 27,
    source: 'NCT02632279',
    sourceType: 'NCT',
  },
]

export type ShippingRow = {
  city: string
  time: string
  coverage: string
}

export const shipping: ShippingRow[] = [
  { city: 'Bogotá', time: '24–48 h', coverage: 'Cobertura total' },
  { city: 'Medellín', time: '48–72 h', coverage: 'Área metropolitana' },
  { city: 'Cali', time: '48–72 h', coverage: 'Área metropolitana' },
  { city: 'Barranquilla', time: '72–96 h', coverage: 'Zona urbana' },
  { city: 'Bucaramanga', time: '72–96 h', coverage: 'Zona urbana' },
  { city: 'Resto del país', time: '3–6 días', coverage: 'Transportadora nacional' },
]

export const payments = ['Wompi', 'Nequi', 'Bancolombia', 'Contra entrega', 'USDT']

export const formatCOP = (value: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value)
