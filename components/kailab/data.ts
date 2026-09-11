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
        image: '/kailab-images/Retatrutide-10-MG-1024x1024.png',
        slug: '5mg'
      },
      {
        id: 'RT10',
        name: '10 mg',
        sku: 'RT-10MG-01',
        priceCOP: 160000,
        stock: 50,
        coaStatus: 'available',
        image: '/kailab-images/Retatrutide-10-MG-1024x1024.png',
        slug: '10mg'
      }
    ]
  },
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
  },
  {
    id: 'kl-004',
    slug: 'ghk-cu',
    categorySlug: 'peptidos',
    category: 'Péptidos',
    title: 'GHK-Cu',
    priceCOP: 210000,
    presentation: 'Vial liofilizado',
    concentration: '50 mg',
    lot: 'LOT-GHK-2410',
    purity: '≥ 99.3%',
    formula: 'C14H24CuN6O4',
    stock: 25,
    badges: ['RUO', 'COA'],
    image: '/kailab-images/ghk-cu-1024x1024.png',
  },
  {
    id: 'kl-005',
    slug: 'tesamorelin',
    categorySlug: 'peptidos',
    category: 'Péptidos',
    title: 'Tesamorelina',
    priceCOP: 275000,
    presentation: 'Vial liofilizado',
    concentration: '10 mg',
    lot: 'LOT-TES-2411',
    purity: '≥ 98.8%',
    formula: 'C221H366N72O67S',
    stock: 18,
    badges: ['RUO', 'COA'],
    image: '/kailab-images/tesamorelin-1024x1024.png',
  },
  {
    id: 'PROD-GLOW-BLEND',
    slug: 'glow-blend',
    categorySlug: 'peptidos',
    category: 'Blends',
    title: 'GLOW Blend',
    description: 'Complejo peptídico liofilizado para investigación analítica y espectrometría (RUO).',
    lot: 'LOT-GLW-2412',
    purity: '≥ 99.0%',
    formula: 'Complejo Peptídico',
    badges: ['RUO', 'COA'],
    variants: [
      {
        id: 'GLOW-VAR',
        name: 'GLOW',
        sku: 'GLW-50MG-01',
        priceCOP: 240000,
        stock: 30,
        coaStatus: 'available',
        image: '/kailab-images/glow-1024x1024.png',
        slug: 'glow'
      },
      {
        id: 'KLOW-VAR',
        name: 'KLOW',
        sku: 'KLW-50MG-01',
        priceCOP: 240000,
        stock: 30,
        coaStatus: 'available',
        image: '/kailab-images/klow-1024x1024.png.webp',
        slug: 'klow'
      }
    ]
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
