export type Variant = {
  id: string
  name: string // e.g., '5 mg', '10 mg'
  sku: string
  priceCOP: number
  stock: number
  coaStatus: 'pending' | 'available'
  image: string
  slug: string // e.g., '5mg', '10mg'
}

export type Product = {
  id: string
  slug: string
  categorySlug: string
  category: string
  title: string
  description?: string
  lot: string
  purity: string
  formula: string
  badges: string[]
  variants?: Variant[] // Optional for backward compatibility with old mocks
  // --- Legacy properties for BPC-157 etc ---
  priceCOP?: number
  presentation?: string
  concentration?: string
  stock?: number
  image?: string
}

export const products: Product[] = [
  {
    id: 'PROD-RETATRUTIDE',
    slug: 'retatrutida',
    categorySlug: 'metabolico',
    category: 'Metabólico',
    title: 'Retatrutida',
    description: 'Compuesto liofilizado de alta pureza, sintetizado para investigación y análisis de laboratorio (RUO). No apto para uso humano o veterinario.',
    lot: 'LOT-RT-2410',
    purity: '≥ 99.0%',
    formula: 'C221H342N46O68',
    badges: ['RUO', 'COA'],
    variants: [
      {
        id: 'RT5',
        name: '5 mg',
        sku: 'RT-5MG-01',
        priceCOP: 100000,
        stock: 50,
        coaStatus: 'pending',
        image: 'https://drive.google.com/uc?export=view&id=1_jfUqdMl7dslMCk7qmQ_33KrZG-cx8iJ',
        slug: '5mg'
      },
      {
        id: 'RT10',
        name: '10 mg',
        sku: 'RT-10MG-01',
        priceCOP: 100000,
        stock: 50,
        coaStatus: 'available',
        image: 'https://drive.google.com/uc?export=view&id=1aofdZSq9Gedt1hcbIWFZayq7pbeczjtX',
        slug: '10mg'
      }
    ]
  },
  // Legacy products for backward compatibility
  {
    id: 'kl-001',
    slug: 'bpc-157',
    categorySlug: 'peptidos',
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
    image: '/kailab-images/bpc-157-1024x1024.png',
  }
]

export type CartItem = { product: Product; variant?: Variant; qty: number }

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
]

export type ShippingRow = {
  city: string
  time: string
  coverage: string
}

export const shipping: ShippingRow[] = [
  { city: 'Bogotá', time: '24–48 h', coverage: 'Cobertura total' },
  { city: 'Medellín', time: '48–72 h', coverage: 'Área metropolitana' },
  { city: 'Resto del país', time: '3–6 días', coverage: 'Transportadora nacional' },
]

export const payments = ['Wompi', 'Nequi', 'Bancolombia', 'Contra entrega', 'USDT']

export const formatCOP = (value: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value)
