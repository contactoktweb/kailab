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

export type InfoAccordion = {
  title: string
  contentHtml: string
}

export type Product = {
  id: string
  slug: string
  categorySlug: string
  category: string
  title: string
  subtitle?: string
  description?: string
  features?: string[]
  infoAccordions?: InfoAccordion[]
  lot: string
  purity: string
  formula: string
  badges: string[]
  variants?: Variant[] // Optional for backward compatibility with old mocks
  priceCOP?: number
  presentation?: string
  concentration?: string
  stock?: number
  image?: string
  images?: string[]
}

export const products: Product[] = [
  {
    id: 'kl-001',
    slug: 'bpc-157',
    categorySlug: 'peptidos',
    category: 'Péptidos',
    title: 'BPC-157 10 mg',
    subtitle: 'Pentadecapéptido de investigación',
    description: 'BPC-157 es un péptido sintético de investigación de 15 aminoácidos estudiado por su papel en la reparación de tejidos. Es objeto de estudio en áreas como la recuperación de tendones, ligamentos y músculos, y la salud del sistema digestivo. Se suministra como vial de polvo liofilizado de 10 mg, destinado exclusivamente a investigación científica.',
    features: ['COA disponibles', 'Empaque sellado', 'Péptido grado investigación', 'Polvo liofilizado'],
    infoAccordions: [
      {
        title: '¿Qué es?',
        contentHtml: '<p class="mb-3">BPC-157 (Body Protection Compound 157) es un péptido sintético de investigación compuesto por 15 aminoácidos, derivado de una secuencia identificada en el jugo gástrico. En la literatura se clasifica como pentadecapéptido.</p><p class="mb-3">Se estudia por su relación con los procesos de reparación y protección de tejidos, y se emplea como compuesto de referencia en modelos experimentales de recuperación.</p><p>En KaiLab se suministra como polvo liofilizado destinado exclusivamente a investigación científica. No está aprobado para uso humano ni veterinario.</p>'
      },
      {
        title: 'Aplicaciones en investigación',
        contentHtml: '<p class="mb-3">BPC-157 es objeto de estudio principalmente en áreas relacionadas con la reparación de tejidos:</p><ul class="list-none space-y-1 mb-4"><li>– Reparación de tendones, ligamentos y músculos</li><li>– Recuperación tras lesiones de tejidos blandos</li><li>– Salud del sistema digestivo y protección gástrica</li><li>– Formación de nuevos vasos sanguíneos (angiogénesis) en modelos de reparación</li><li>– Procesos inflamatorios asociados a la recuperación</li></ul><p>La información aquí presentada describe áreas de investigación y no constituye una indicación de uso en humanos. Este producto se emplea únicamente en entornos de investigación controlados.</p>'
      },
      {
        title: 'Manejo y almacenamiento',
        contentHtml: '<p class="mb-3">Estas recomendaciones aplican a todos los péptidos liofilizados de KaiLab.</p><p class="mb-3"><strong>En polvo liofilizado (sin reconstituir):</strong><br>– Conservar a –20 °C para almacenamiento prolongado.<br>– Proteger de la luz y mantener en ambiente seco.<br>– En estas condiciones conserva su estabilidad durante períodos prolongados.</p><p class="mb-3"><strong>Reconstituido (en solución):</strong><br>– Reconstituir habitualmente con agua bacteriostática, en condiciones de laboratorio.<br>– Conservar refrigerado (2 °C a 8 °C).<br>– Evitar ciclos repetidos de congelación y descongelación.<br>– Manipular con técnica aséptica y material de laboratorio apropiado.</p><p>Estas indicaciones corresponden al manejo de materiales de investigación.</p>'
      },
      {
        title: 'Especificaciones técnicas',
        contentHtml: '<ul class="list-none space-y-1"><li>Compuesto: BPC-157 (Body Protection Compound 157)</li><li>Número CAS: 137525-51-0</li><li>Clase molecular: Pentadecapéptido sintético</li><li>Secuencia: Péptido sintético de 15 aminoácidos</li><li>Presentación: Polvo liofilizado en vial</li><li>Cantidad: 10 mg por vial</li><li>Pureza reportada: ≥99% (HPLC)</li><li>Almacenamiento: –20 °C, ambiente seco y protegido de la luz</li><li>Reconstitución: Agua bacteriostática (condiciones de laboratorio)</li><li>Análisis de pureza: HPLC por laboratorio independiente</li></ul>'
      }
    ],
    priceCOP: 310000,
    presentation: 'Vial liofilizado',
    concentration: '10 mg',
    lot: 'LOT-BPC-2409',
    purity: '≥ 99.1%',
    formula: 'C62H98N16O22',
    stock: 34,
    badges: ['RUO', 'COA'],
    image: '/kailab-images/bpc-157.png',
  },
  {
    id: 'kl-004',
    slug: 'ghk-cu',
    categorySlug: 'peptidos',
    category: 'Péptidos',
    title: 'GHK-Cu 100 mg',
    subtitle: 'Tripéptido de cobre (Copper Tripeptide-1)',
    description: 'GHK-Cu es un tripéptido de cobre de investigación estudiado por su papel en la regeneración de la piel y la reparación de tejidos. Es objeto de estudio en áreas como la cicatrización, la síntesis de colágeno, el envejecimiento cutáneo y la salud del cabello. Se suministra como vial de polvo liofilizado de 100 mg, destinado exclusivamente a investigación científica.',
    features: ['COA disponibles', 'Empaque sellado', 'Péptido grado investigación', 'Polvo liofilizado'],
    infoAccordions: [
      {
        title: '¿Qué es?',
        contentHtml: '<p class="mb-3">GHK-Cu es un tripéptido formado por los aminoácidos glicina, histidina y lisina, unido a un ion de cobre. En la literatura se le conoce como tripéptido de cobre-1 (Copper Tripeptide-1). Es una molécula presente de forma natural en el organismo, cuya concentración se estudia en relación con los procesos de reparación de tejidos.</p><p class="mb-3">En investigación se emplea como compuesto de referencia para el estudio de la regeneración celular, la síntesis de colágeno y la señalización asociada al cobre.</p><p>En KaiLab se suministra como polvo liofilizado destinado exclusivamente a investigación científica. No está aprobado para uso humano ni veterinario.</p>'
      },
      {
        title: 'Aplicaciones en investigación',
        contentHtml: '<p class="mb-3">GHK-Cu es objeto de estudio principalmente en áreas relacionadas con la piel y la reparación de tejidos:</p><ul class="list-none space-y-1 mb-4"><li>– Regeneración de la piel y síntesis de colágeno</li><li>– Cicatrización y reparación de tejidos</li><li>– Envejecimiento cutáneo y firmeza de la piel</li><li>– Salud y crecimiento del cabello (folículo piloso)</li><li>– Señalización celular asociada al cobre</li></ul><p>La información aquí presentada describe áreas de investigación y no constituye una indicación de uso en humanos. Este producto se emplea únicamente en entornos de investigación controlados.</p>'
      },
      {
        title: 'Manejo y almacenamiento',
        contentHtml: '<p class="mb-3">Estas recomendaciones aplican a todos los péptidos liofilizados de KaiLab.</p><p class="mb-3"><strong>En polvo liofilizado (sin reconstituir):</strong><br>– Conservar a –20 °C para almacenamiento prolongado.<br>– Proteger de la luz y mantener en ambiente seco.<br>– En estas condiciones conserva su estabilidad durante períodos prolongados.</p><p class="mb-3"><strong>Reconstituido (en solución):</strong><br>– Reconstituir habitualmente con agua bacteriostática, en condiciones de laboratorio.<br>– Conservar refrigerado (2 °C a 8 °C).<br>– Evitar ciclos repetidos de congelación y descongelación.<br>– Manipular con técnica aséptica y material de laboratorio apropiado.</p><p>Estas indicaciones corresponden al manejo de materiales de investigación.</p>'
      },
      {
        title: 'Especificaciones técnicas',
        contentHtml: '<ul class="list-none space-y-1"><li>Compuesto: GHK-Cu (Tripéptido de cobre-1)</li><li>Número CAS: 89030-95-5</li><li>Clase molecular: Tripéptido de cobre</li><li>Secuencia: Glicina-Histidina-Lisina, complejado con cobre</li><li>Presentación: Polvo liofilizado en vial</li><li>Cantidad: 100 mg por vial</li><li>Pureza reportada: ≥99% (HPLC)</li><li>Almacenamiento: –20 °C, ambiente seco y protegido de la luz</li><li>Reconstitución: Agua bacteriostática (condiciones de laboratorio)</li><li>Análisis de pureza: HPLC por laboratorio independiente</li></ul>'
      }
    ],
    priceCOP: 350000,
    presentation: 'Vial liofilizado',
    concentration: '100 mg',
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
    title: 'Tesamorelin 10 mg',
    subtitle: 'Análogo de GHRH (factor liberador de hormona de crecimiento)',
    description: 'Tesamorelin es un péptido sintético de investigación de 44 aminoácidos, análogo del factor liberador de hormona de crecimiento (GHRH). Es objeto de estudio en áreas como la reducción de la grasa abdominal (visceral), el metabolismo de lípidos y el eje de la hormona de crecimiento. Se suministra como vial de polvo liofilizado de 10 mg, destinado exclusivamente a investigación científica.',
    features: ['COA disponibles', 'Empaque sellado', 'Péptido grado investigación', 'Polvo liofilizado'],
    infoAccordions: [
      {
        title: '¿Qué es?',
        contentHtml: '<p class="mb-3">Tesamorelin es un péptido sintético de investigación de 44 aminoácidos, análogo estabilizado del factor liberador de hormona de crecimiento (GHRH).</p><p class="mb-3">Se emplea como compuesto de referencia en modelos experimentales que estudian el eje de la hormona de crecimiento y el metabolismo de lípidos.</p><p>En KaiLab se suministra como polvo liofilizado destinado exclusivamente a investigación científica. No está aprobado para uso humano ni veterinario.</p>'
      },
      {
        title: 'Aplicaciones en investigación',
        contentHtml: '<p class="mb-3">Tesamorelin es objeto de estudio principalmente en áreas relacionadas con el metabolismo y el eje de la hormona de crecimiento:</p><ul class="list-none space-y-1 mb-4"><li>– Reducción de la grasa abdominal y visceral</li><li>– Regulación del eje de la hormona de crecimiento</li><li>– Metabolismo de lípidos</li><li>– Composición corporal</li><li>– Salud metabólica</li></ul><p>La información aquí presentada describe áreas de investigación y no constituye una indicación de uso en humanos. Este producto se emplea únicamente en entornos de investigación controlados.</p>'
      },
      {
        title: 'Manejo y almacenamiento',
        contentHtml: '<p class="mb-3">Estas recomendaciones aplican a todos los péptidos liofilizados de KaiLab.</p><p class="mb-3"><strong>En polvo liofilizado (sin reconstituir):</strong><br>– Conservar a –20 °C para almacenamiento prolongado.<br>– Proteger de la luz y mantener en ambiente seco.<br>– En estas condiciones conserva su estabilidad durante períodos prolongados.</p><p class="mb-3"><strong>Reconstituido (en solución):</strong><br>– Reconstituir habitualmente con agua bacteriostática, en condiciones de laboratorio.<br>– Conservar refrigerado (2 °C a 8 °C).<br>– Evitar ciclos repetidos de congelación y descongelación.<br>– Manipular con técnica aséptica y material de laboratorio apropiado.</p><p>Estas indicaciones corresponden al manejo de materiales de investigación.</p>'
      },
      {
        title: 'Especificaciones técnicas',
        contentHtml: '<ul class="list-none space-y-1"><li>Compuesto: Tesamorelin</li><li>Número CAS: 218949-48-5</li><li>Clase molecular: Análogo sintético de GHRH</li><li>Secuencia: Péptido sintético de 44 aminoácidos</li><li>Presentación: Polvo liofilizado en vial</li><li>Cantidad: 10 mg por vial</li><li>Pureza reportada: ≥99% (HPLC)</li><li>Almacenamiento: –20 °C, ambiente seco y protegido de la luz</li><li>Reconstitución: Agua bacteriostática (condiciones de laboratorio)</li><li>Análisis de pureza: HPLC por laboratorio independiente</li></ul>'
      }
    ],
    priceCOP: 380000,
    presentation: 'Vial liofilizado',
    concentration: '10 mg',
    lot: 'LOT-TES-2411',
    purity: '≥ 98.8%',
    formula: 'C221H366N72O67S',
    stock: 18,
    badges: ['RUO', 'COA'],
    image: '/kailab-images/tesamorelin-1024x1024.png.webp',
  },
  {
    id: 'PROD-GLOW',
    slug: 'glow-70mg',
    categorySlug: 'peptidos',
    category: 'Blends',
    title: 'GLOW 70 mg',
    subtitle: 'Blend regenerativo (GHK-Cu + BPC-157 + TB-500)',
    description: 'GLOW es una combinación de tres péptidos de investigación en un vial de 70 mg: GHK-Cu (50 mg), BPC-157 (10 mg) y TB-500 (10 mg). Es objeto de estudio en áreas como la regeneración de la piel, la recuperación de tejidos y la cicatrización. Se suministra como polvo liofilizado, destinado exclusivamente a investigación científica.',
    features: ['COA disponibles', 'Empaque sellado', 'Péptido grado investigación', 'Polvo liofilizado'],
    infoAccordions: [
      {
        title: '¿Qué es?',
        contentHtml: '<p class="mb-3">GLOW es una combinación de tres péptidos de investigación en un solo vial de 70 mg.</p><p class="mb-3"><strong>Composición (70 mg totales):</strong><br>– GHK-Cu: 50 mg<br>– BPC-157: 10 mg<br>– TB-500: 10 mg</p><p class="mb-3"><strong>Áreas de investigación de cada componente:</strong><br>– GHK-Cu: regeneración de la piel, síntesis de colágeno y cicatrización.<br>– BPC-157: reparación de tendones, ligamentos y músculos, y salud del sistema digestivo.<br>– TB-500: recuperación de tejidos, flexibilidad y cicatrización.</p><p class="mb-3">La combinación reúne compuestos con áreas de investigación complementarias, orientadas a la piel y a la recuperación.</p><p>En KaiLab se suministra como polvo liofilizado destinado exclusivamente a investigación científica. No está aprobado para uso humano ni veterinario.</p>'
      },
      {
        title: 'Aplicaciones en investigación',
        contentHtml: '<p class="mb-3">GLOW es objeto de estudio principalmente en áreas relacionadas con la piel y la reparación de tejidos:</p><ul class="list-none space-y-1 mb-4"><li>– Regeneración y salud de la piel</li><li>– Reparación y recuperación de tejidos</li><li>– Cicatrización</li><li>– Síntesis de colágeno</li><li>– Recuperación muscular y de tejidos blandos</li></ul><p>La información aquí presentada describe áreas de investigación y no constituye una indicación de uso en humanos. Este producto se emplea únicamente en entornos de investigación controlados.</p>'
      },
      {
        title: 'Manejo y almacenamiento',
        contentHtml: '<p class="mb-3">Estas recomendaciones aplican a todos los péptidos liofilizados de KaiLab.</p><p class="mb-3"><strong>En polvo liofilizado (sin reconstituir):</strong><br>– Conservar a –20 °C para almacenamiento prolongado.<br>– Proteger de la luz y mantener en ambiente seco.<br>– En estas condiciones conserva su estabilidad durante períodos prolongados.</p><p class="mb-3"><strong>Reconstituido (en solución):</strong><br>– Reconstituir habitualmente con agua bacteriostática, en condiciones de laboratorio.<br>– Conservar refrigerado (2 °C a 8 °C).<br>– Evitar ciclos repetidos de congelación y descongelación.<br>– Manipular con técnica aséptica y material de laboratorio apropiado.</p><p>Estas indicaciones corresponden al manejo de materiales de investigación.</p>'
      },
      {
        title: 'Especificaciones técnicas',
        contentHtml: '<ul class="list-none space-y-1"><li>Producto: Combinado (tres componentes en un mismo vial)</li><li>Composición: GHK-Cu 50 mg, BPC-157 10 mg, TB-500 10 mg (70 mg totales)</li><li>Componentes y CAS: GHK-Cu (89030-95-5), BPC-157 (137525-51-0), TB-500 (77591-33-4)</li><li>Clase molecular: Combinación de péptidos de investigación</li><li>Presentación: Polvo liofilizado en vial</li><li>Cantidad: 70 mg totales</li><li>Pureza reportada: ≥99% (HPLC)</li><li>Almacenamiento: –20 °C, ambiente seco y protegido de la luz</li><li>Reconstitución: Agua bacteriostática (condiciones de laboratorio)</li><li>Análisis de pureza: HPLC por laboratorio independiente</li></ul>'
      }
    ],
    lot: 'LOT-GLW-2412',
    purity: '≥ 99.0%',
    formula: 'Complejo Peptídico',
    badges: ['RUO', 'COA'],
    priceCOP: 630000,
    presentation: 'Vial liofilizado',
    concentration: '70 mg',
    stock: 30,
    image: '/kailab-images/glow-1024x1024.png.webp',
  },
  {
    id: 'PROD-KLOW',
    slug: 'klow-80mg',
    categorySlug: 'peptidos',
    category: 'Blends',
    title: 'KLOW 80 mg',
    subtitle: 'Blend regenerativo avanzado (KPV + GHK-Cu + BPC-157 + TB-500)',
    description: 'KLOW es una combinación de cuatro péptidos de investigación en un vial de 80 mg: GHK-Cu (50 mg), BPC-157 (10 mg), TB-500 (10 mg) y KPV (10 mg). Es objeto de estudio en áreas como la regeneración de la piel, la recuperación de tejidos, los procesos inflamatorios y la salud digestiva. Se suministra como polvo liofilizado, destinado exclusivamente a investigación científica.',
    features: ['COA disponibles', 'Empaque sellado', 'Péptido grado investigación', 'Polvo liofilizado'],
    infoAccordions: [
      {
        title: '¿Qué es?',
        contentHtml: '<p class="mb-3">KLOW amplía la base de GLOW con la adición de KPV. Reúne cuatro péptidos de investigación en un solo vial de 80 mg.</p><p class="mb-3"><strong>Composición (80 mg totales):</strong><br>– GHK-Cu: 50 mg<br>– BPC-157: 10 mg<br>– TB-500: 10 mg<br>– KPV: 10 mg</p><p class="mb-3"><strong>Áreas de investigación de cada componente:</strong><br>– GHK-Cu: regeneración de la piel, síntesis de colágeno y cicatrización.<br>– BPC-157: reparación de tendones, ligamentos y músculos, y salud del sistema digestivo.<br>– TB-500: recuperación de tejidos, flexibilidad y cicatrización.<br>– KPV: procesos inflamatorios y salud del sistema digestivo.</p><p class="mb-3">La combinación reúne compuestos con áreas de investigación complementarias, orientadas a la piel, la recuperación y los procesos inflamatorios.</p><p>En KaiLab se suministra como polvo liofilizado destinado exclusivamente a investigación científica. No está aprobado para uso humano ni veterinario.</p>'
      },
      {
        title: 'Aplicaciones en investigación',
        contentHtml: '<p class="mb-3">KLOW es objeto de estudio principalmente en áreas relacionadas con la piel, la reparación de tejidos y la inflamación:</p><ul class="list-none space-y-1 mb-4"><li>– Regeneración y salud de la piel</li><li>– Reparación y recuperación de tejidos</li><li>– Procesos inflamatorios</li><li>– Salud del sistema digestivo</li><li>– Cicatrización y síntesis de colágeno</li></ul><p>La información aquí presentada describe áreas de investigación y no constituye una indicación de uso en humanos. Este producto se emplea únicamente en entornos de investigación controlados.</p>'
      },
      {
        title: 'Manejo y almacenamiento',
        contentHtml: '<p class="mb-3">Estas recomendaciones aplican a todos los péptidos liofilizados de KaiLab.</p><p class="mb-3"><strong>En polvo liofilizado (sin reconstituir):</strong><br>– Conservar a –20 °C para almacenamiento prolongado.<br>– Proteger de la luz y mantener en ambiente seco.<br>– En estas condiciones conserva su estabilidad durante períodos prolongados.</p><p class="mb-3"><strong>Reconstituido (en solución):</strong><br>– Reconstituir habitualmente con agua bacteriostática, en condiciones de laboratorio.<br>– Conservar refrigerado (2 °C a 8 °C).<br>– Evitar ciclos repetidos de congelación y descongelación.<br>– Manipular con técnica aséptica y material de laboratorio apropiado.</p><p>Estas indicaciones corresponden al manejo de materiales de investigación.</p>'
      },
      {
        title: 'Especificaciones técnicas',
        contentHtml: '<ul class="list-none space-y-1"><li>Producto: Combinado (cuatro componentes en un mismo vial)</li><li>Composición: GHK-Cu 50 mg, BPC-157 10 mg, TB-500 10 mg, KPV 10 mg (80 mg totales)</li><li>Componentes y CAS: GHK-Cu (89030-95-5), BPC-157 (137525-51-0), TB-500 (77591-33-4), KPV (67727-97-3)</li><li>Clase molecular: Combinación de péptidos de investigación</li><li>Presentación: Polvo liofilizado en vial</li><li>Cantidad: 80 mg totales</li><li>Pureza reportada: ≥99% (HPLC)</li><li>Almacenamiento: –20 °C, ambiente seco y protegido de la luz</li><li>Reconstitución: Agua bacteriostática (condiciones de laboratorio)</li><li>Análisis de pureza: HPLC por laboratorio independiente</li></ul>'
      }
    ],
    lot: 'LOT-KLW-2412',
    purity: '≥ 99.0%',
    formula: 'Complejo Peptídico',
    badges: ['RUO', 'COA'],
    priceCOP: 780000,
    presentation: 'Vial liofilizado',
    concentration: '80 mg',
    stock: 30,
    image: '/kailab-images/klow-1024x1024.png.webp',
  },
  {
    id: 'kl-006',
    slug: 'epithalon',
    categorySlug: 'peptidos',
    category: 'Péptidos',
    title: 'Epithalon 50 mg',
    subtitle: 'Tetrapéptido sintético (AEDG)',
    description: 'Epithalon es un péptido sintético de investigación de cuatro aminoácidos (Ala-Glu-Asp-Gly), basado en una secuencia identificada en extractos de la glándula pineal. Es objeto de estudio en áreas como la actividad de la telomerasa, los ritmos circadianos y el envejecimiento celular. Se suministra como vial de polvo liofilizado de 50 mg, destinado exclusivamente a investigación científica.',
    features: ['COA disponibles', 'Empaque sellado', 'Péptido grado investigación', 'Polvo liofilizado'],
    infoAccordions: [
      {
        title: '¿Qué es?',
        contentHtml: '<p class="mb-3">Epithalon (también citado como Epitalon o péptido AEDG) es un péptido sintético de investigación compuesto por cuatro aminoácidos: alanina, ácido glutámico, ácido aspártico y glicina. Su secuencia deriva de la epitalamina, un extracto de la glándula pineal estudiado en la literatura sobre envejecimiento.</p><p class="mb-3">Se emplea como compuesto de referencia en modelos experimentales de senescencia celular, regulación de la telomerasa y ritmos biológicos.</p><p>En KaiLab se suministra como polvo liofilizado destinado exclusivamente a investigación científica. No está aprobado para uso humano ni veterinario.</p>'
      },
      {
        title: 'Aplicaciones en investigación',
        contentHtml: '<p class="mb-3">Epithalon es objeto de estudio principalmente en áreas relacionadas con el envejecimiento celular y la regulación biológica:</p><ul class="list-none space-y-1 mb-4"><li>– Actividad de la telomerasa y longitud telomérica</li><li>– Senescencia celular y envejecimiento</li><li>– Regulación de la glándula pineal y secreción de melatonina</li><li>– Ritmos circadianos</li><li>– Marcadores de estrés oxidativo</li></ul><p>La información aquí presentada describe áreas de investigación y no constituye una indicación de uso en humanos. Este producto se emplea únicamente en entornos de investigación controlados.</p>'
      },
      {
        title: 'Manejo y almacenamiento',
        contentHtml: '<p class="mb-3">Estas recomendaciones aplican a todos los péptidos liofilizados de KaiLab.</p><p class="mb-3"><strong>En polvo liofilizado (sin reconstituir):</strong><br>– Conservar a –20 °C para almacenamiento prolongado.<br>– Proteger de la luz y mantener en ambiente seco.<br>– En estas condiciones conserva su estabilidad durante períodos prolongados.</p><p class="mb-3"><strong>Reconstituido (en solución):</strong><br>– Reconstituir habitualmente con agua bacteriostática, en condiciones de laboratorio.<br>– Conservar refrigerado (2 °C a 8 °C).<br>– Evitar ciclos repetidos de congelación y descongelación.<br>– Manipular con técnica aséptica y material de laboratorio apropiado.</p><p>Estas indicaciones corresponden al manejo de materiales de investigación.</p>'
      },
      {
        title: 'Especificaciones técnicas',
        contentHtml: '<ul class="list-none space-y-1"><li>Compuesto: Epithalon (péptido AEDG)</li><li>Número CAS: 307297-39-8</li><li>Clase molecular: Tetrapéptido sintético</li><li>Secuencia: Ala-Glu-Asp-Gly</li><li>Presentación: Polvo liofilizado en vial</li><li>Cantidad: 50 mg por vial</li><li>Pureza reportada: ≥99% (HPLC)</li><li>Almacenamiento: –20 °C, ambiente seco y protegido de la luz</li><li>Reconstitución: Agua bacteriostática (condiciones de laboratorio)</li><li>Análisis de pureza: HPLC por laboratorio independiente</li></ul>'
      }
    ],
    priceCOP: 550000,
    presentation: 'Vial liofilizado',
    concentration: '50 mg',
    lot: 'LOT-EPI-2411',
    purity: '≥ 99.0%',
    formula: 'C14H22N4O9',
    stock: 20,
    badges: ['RUO', 'COA'],
    image: '/kailab-images/Epithalon-50mg-1536x1536.png',
  },
  {
    id: 'kl-007',
    slug: 'pt-141',
    categorySlug: 'peptidos',
    category: 'Péptidos',
    title: 'PT-141 10 mg',
    subtitle: 'Agonista de receptores de melanocortina (Bremelanotide)',
    description: 'PT-141 (bremelanotide) es un péptido cíclico sintético de investigación que actúa como agonista de los receptores de melanocortina. Es objeto de estudio en áreas como la señalización melanocortinérgica del sistema nervioso central, la conducta sexual y la regulación del apetito. Se suministra como vial de polvo liofilizado de 10 mg, destinado exclusivamente a investigación científica.',
    features: ['COA disponibles', 'Empaque sellado', 'Péptido grado investigación', 'Polvo liofilizado'],
    infoAccordions: [
      {
        title: '¿Qué es?',
        contentHtml: '<p class="mb-3">PT-141, también conocido como bremelanotide, es un péptido cíclico sintético de investigación derivado de la alfa-MSH (hormona estimulante de melanocitos). Actúa como agonista no selectivo de los receptores de melanocortina, con afinidad principal por los subtipos MC3R y MC4R.</p><p class="mb-3">A diferencia de otros compuestos de su familia, se estudia por su acción sobre vías del sistema nervioso central y no por su efecto sobre la pigmentación. Se emplea como compuesto de referencia en modelos experimentales de señalización melanocortinérgica.</p><p>En KaiLab se suministra como polvo liofilizado destinado exclusivamente a investigación científica. No está aprobado para uso humano ni veterinario.</p>'
      },
      {
        title: 'Aplicaciones en investigación',
        contentHtml: '<p class="mb-3">PT-141 es objeto de estudio principalmente en áreas relacionadas con la señalización melanocortinérgica:</p><ul class="list-none space-y-1 mb-4"><li>– Receptores de melanocortina MC3R y MC4R</li><li>– Vías del sistema nervioso central asociadas a la conducta sexual</li><li>– Regulación del apetito y del balance energético</li><li>– Señalización hipotalámica</li><li>– Respuestas hemodinámicas en modelos experimentales</li></ul><p>La información aquí presentada describe áreas de investigación y no constituye una indicación de uso en humanos. Este producto se emplea únicamente en entornos de investigación controlados.</p>'
      },
      {
        title: 'Manejo y almacenamiento',
        contentHtml: '<p class="mb-3">Estas recomendaciones aplican a todos los péptidos liofilizados de KaiLab.</p><p class="mb-3"><strong>En polvo liofilizado (sin reconstituir):</strong><br>– Conservar a –20 °C para almacenamiento prolongado.<br>– Proteger de la luz y mantener en ambiente seco.<br>– En estas condiciones conserva su estabilidad durante períodos prolongados.</p><p class="mb-3"><strong>Reconstituido (en solución):</strong><br>– Reconstituir habitualmente con agua bacteriostática, en condiciones de laboratorio.<br>– Conservar refrigerado (2 °C a 8 °C).<br>– Evitar ciclos repetidos de congelación y descongelación.<br>– Manipular con técnica aséptica y material de laboratorio apropiado.</p><p>Estas indicaciones corresponden al manejo de materiales de investigación.</p>'
      },
      {
        title: 'Especificaciones técnicas',
        contentHtml: '<ul class="list-none space-y-1"><li>Compuesto: PT-141 (Bremelanotide)</li><li>Número CAS: 189691-06-3</li><li>Clase molecular: Heptapéptido cíclico, agonista de receptores de melanocortina</li><li>Secuencia: Péptido cíclico derivado de alfa-MSH</li><li>Presentación: Polvo liofilizado en vial</li><li>Cantidad: 10 mg por vial</li><li>Pureza reportada: ≥99% (HPLC)</li><li>Almacenamiento: –20 °C, ambiente seco y protegido de la luz</li><li>Reconstitución: Agua bacteriostática (condiciones de laboratorio)</li><li>Análisis de pureza: HPLC por laboratorio independiente</li></ul>'
      }
    ],
    priceCOP: 310000,
    presentation: 'Vial liofilizado',
    concentration: '10 mg',
    lot: 'LOT-PT-2411',
    purity: '≥ 99.0%',
    formula: 'C50H68N14O10',
    stock: 20,
    badges: ['RUO', 'COA'],
    image: '/kailab-images/pt-141-10mg-1024x1024.png',
  },
  {
    id: 'kl-008',
    slug: 'selank',
    categorySlug: 'peptidos',
    category: 'Péptidos',
    title: 'Selank 10 mg',
    subtitle: 'Heptapéptido sintético derivado de la tuftsina',
    description: 'Selank es un péptido sintético de investigación de siete aminoácidos, derivado de la tuftsina, un fragmento peptídico de origen inmunológico. Es objeto de estudio en áreas como la señalización de neuropéptidos, la respuesta al estrés y la memoria en modelos experimentales. Se suministra como vial de polvo liofilizado de 10 mg, destinado exclusivamente a investigación científica.',
    features: ['COA disponibles', 'Empaque sellado', 'Péptido grado investigación', 'Polvo liofilizado'],
    infoAccordions: [
      {
        title: '¿Qué es?',
        contentHtml: '<p class="mb-3">Selank es un péptido sintético de investigación compuesto por siete aminoácidos (heptapéptido). Su estructura corresponde a la tuftsina, un fragmento peptídico presente de forma natural en el organismo, unida a una secuencia estabilizadora Pro-Gly-Pro que prolonga su permanencia en solución.</p><p class="mb-3">Se emplea como compuesto de referencia en modelos experimentales que estudian la señalización de neuropéptidos, la actividad GABAérgica y la expresión de factores neurotróficos.</p><p>En KaiLab se suministra como polvo liofilizado destinado exclusivamente a investigación científica. No está aprobado para uso humano ni veterinario.</p>'
      },
      {
        title: 'Aplicaciones en investigación',
        contentHtml: '<p class="mb-3">Selank es objeto de estudio principalmente en áreas relacionadas con la neurociencia y la señalización de neuropéptidos:</p><ul class="list-none space-y-1 mb-4"><li>– Respuesta al estrés y conducta de tipo ansioso en modelos animales</li><li>– Señalización GABAérgica y receptores asociados</li><li>– Expresión de factores neurotróficos (BDNF)</li><li>– Memoria y procesos de aprendizaje en modelos experimentales</li><li>– Modulación inmunitaria asociada a la tuftsina</li></ul><p>La información aquí presentada describe áreas de investigación y no constituye una indicación de uso en humanos. Este producto se emplea únicamente en entornos de investigación controlados.</p>'
      },
      {
        title: 'Manejo y almacenamiento',
        contentHtml: '<p class="mb-3">Estas recomendaciones aplican a todos los péptidos liofilizados de KaiLab.</p><p class="mb-3"><strong>En polvo liofilizado (sin reconstituir):</strong><br>– Conservar a –20 °C para almacenamiento prolongado.<br>– Proteger de la luz y mantener en ambiente seco.<br>– En estas condiciones conserva su estabilidad durante períodos prolongados.</p><p class="mb-3"><strong>Reconstituido (en solución):</strong><br>– Reconstituir habitualmente con agua bacteriostática, en condiciones de laboratorio.<br>– Conservar refrigerado (2 °C a 8 °C).<br>– Evitar ciclos repetidos de congelación y descongelación.<br>– Manipular con técnica aséptica y material de laboratorio apropiado.</p><p>Estas indicaciones corresponden al manejo de materiales de investigación.</p>'
      },
      {
        title: 'Especificaciones técnicas',
        contentHtml: '<ul class="list-none space-y-1"><li>Compuesto: Selank</li><li>Número CAS: 129954-34-3</li><li>Clase molecular: Heptapéptido sintético, análogo de tuftsina</li><li>Secuencia: Thr-Lys-Pro-Arg-Pro-Gly-Pro</li><li>Presentación: Polvo liofilizado en vial</li><li>Cantidad: 10 mg por vial</li><li>Pureza reportada: ≥99% (HPLC)</li><li>Almacenamiento: –20 °C, ambiente seco y protegido de la luz</li><li>Reconstitución: Agua bacteriostática (condiciones de laboratorio)</li><li>Análisis de pureza: HPLC por laboratorio independiente</li></ul>'
      }
    ],
    priceCOP: 310000,
    presentation: 'Vial liofilizado',
    concentration: '10 mg',
    lot: 'LOT-SEL-2411',
    purity: '≥ 99.0%',
    formula: 'C33H57N11O9',
    stock: 20,
    badges: ['RUO', 'COA'],
    image: '/kailab-images/Selank-10mg-1536x1536.png',
  },
  {
    id: 'kl-011',
    slug: 'cjc-1295-ipamorelin',
    categorySlug: 'peptidos',
    category: 'Péptidos',
    title: 'CJC-1295 No DAC + Ipamorelin 5 mg + 5 mg',
    subtitle: 'Combinación secretagoga de hormona de crecimiento (GHRH + GHRP)',
    description: 'Combinación de CJC-1295 sin DAC e Ipamorelin, dos péptidos de investigación estudiados por su papel en la secreción de la hormona de crecimiento. Es objeto de estudio en áreas como la recuperación de tejidos, la composición corporal y el metabolismo. Se suministra como vial de polvo liofilizado (5 mg + 5 mg), destinado exclusivamente a investigación científica.',
    features: ['COA disponibles', 'Empaque sellado', 'Péptido grado investigación', 'Polvo liofilizado'],
    infoAccordions: [
      {
        title: '¿Qué es?',
        contentHtml: '<p class="mb-3">Esta presentación combina dos péptidos de investigación que actúan sobre vías complementarias del eje de la hormona de crecimiento:</p><ul class="list-none space-y-1 mb-4"><li>– CJC-1295 sin DAC (también conocido como GRF modificado 1-29): análogo del factor liberador de hormona de crecimiento (GHRH).</li><li>– Ipamorelin: pentapéptido perteneciente a la clase de los secretagogos (GHRP).</li></ul><p class="mb-2">Áreas de investigación de cada componente:</p><ul class="list-none space-y-1 mb-4"><li>– CJC-1295 sin DAC: liberación sostenida de la hormona de crecimiento y regulación del eje somatotrópico.</li><li>– Ipamorelin: estímulo selectivo de la liberación de hormona de crecimiento con mínima interacción sobre otras hormonas.</li></ul><p class="mb-3">En investigación se estudian de forma conjunta por su acción complementaria en modelos experimentales.</p><p>En KaiLab se suministra como polvo liofilizado destinado exclusivamente a investigación científica. No está aprobado para uso humano ni veterinario.</p>'
      },
      {
        title: 'Aplicaciones en investigación',
        contentHtml: '<p class="mb-3">Esta combinación es objeto de estudio principalmente en áreas relacionadas con el eje de la hormona de crecimiento:</p><ul class="list-none space-y-1 mb-4"><li>– Secreción y liberación de la hormona de crecimiento</li><li>– Recuperación y reparación de tejidos</li><li>– Composición corporal (masa magra y tejido adiposo)</li><li>– Calidad del sueño y ritmos de secreción hormonal</li><li>– Metabolismo y gasto energético</li></ul><p>La información aquí presentada describe áreas de investigación y no constituye una indicación de uso en humanos. Este producto se emplea únicamente en entornos de investigación controlados.</p>'
      },
      {
        title: 'Manejo y almacenamiento',
        contentHtml: '<p class="mb-3">Estas recomendaciones aplican a todos los péptidos liofilizados de KaiLab.</p><p class="mb-3"><strong>En polvo liofilizado (sin reconstituir):</strong><br>– Conservar a –20 °C para almacenamiento prolongado.<br>– Proteger de la luz y mantener en ambiente seco.<br>– En estas condiciones conserva su estabilidad durante períodos prolongados.</p><p class="mb-3"><strong>Reconstituido (en solución):</strong><br>– Reconstituir habitualmente con agua bacteriostática, en condiciones de laboratorio.<br>– Conservar refrigerado (2 °C a 8 °C).<br>– Evitar ciclos repetidos de congelación y descongelación.<br>– Manipular con técnica aséptica y material de laboratorio apropiado.</p><p>Estas indicaciones corresponden al manejo de materiales de investigación.</p>'
      },
      {
        title: 'Especificaciones técnicas',
        contentHtml: '<ul class="list-none space-y-1"><li>Producto: Combinado (dos componentes en un mismo vial)</li><li>Componente 1: CJC-1295 sin DAC (GRF modificado 1-29), CAS 863288-34-0</li><li>Componente 2: Ipamorelin, CAS 170851-70-4</li><li>Clase molecular: Análogo de GHRH (CJC-1295) y secretagogo GHRP (Ipamorelin)</li><li>Presentación: Polvo liofilizado en vial</li><li>Cantidad: 5 mg + 5 mg (10 mg totales)</li><li>Pureza reportada: ≥99% (HPLC)</li><li>Almacenamiento: –20 °C, ambiente seco y protegido de la luz</li><li>Reconstitución: Agua bacteriostática (condiciones de laboratorio)</li><li>Análisis de pureza: HPLC por laboratorio independiente</li></ul>'
      }
    ],
    priceCOP: 450000,
    presentation: 'Vial liofilizado',
    concentration: '5 mg + 5 mg',
    lot: 'LOT-CJC-2411',
    purity: '≥ 99.0%',
    formula: 'C152H252N44O42',
    stock: 0,
    badges: ['RUO', 'COA'],
    image: '/kailab-images/cjc-1295.png.webp',
  },
  {
    id: 'kl-009',
    slug: 'semax',
    categorySlug: 'peptidos',
    category: 'Péptidos',
    title: 'Semax 10 mg',
    subtitle: 'Heptapéptido sintético análogo de ACTH (4-10)',
    description: 'Semax es un péptido sintético de investigación de siete aminoácidos, derivado de un fragmento de la hormona adrenocorticotrópica (ACTH 4-10) sin actividad hormonal. Es objeto de estudio en áreas como la neuroprotección, la expresión de factores neurotróficos y los procesos de atención y memoria en modelos experimentales. Se suministra como vial de polvo liofilizado de 10 mg, destinado exclusivamente a investigación científica.',
    features: ['COA disponibles', 'Empaque sellado', 'Péptido grado investigación', 'Polvo liofilizado'],
    infoAccordions: [
      {
        title: '¿Qué es?',
        contentHtml: '<p class="mb-3">Semax es un péptido sintético de investigación compuesto por siete aminoácidos (heptapéptido). Su estructura corresponde al fragmento 4-10 de la hormona adrenocorticotrópica (ACTH), unido a una secuencia estabilizadora Pro-Gly-Pro. Esta modificación elimina la actividad hormonal del fragmento original y prolonga su permanencia en solución.</p><p class="mb-3">Se emplea como compuesto de referencia en modelos experimentales que estudian la neuroprotección, la plasticidad sináptica y la expresión de factores neurotróficos.</p><p>En KaiLab se suministra como polvo liofilizado destinado exclusivamente a investigación científica. No está aprobado para uso humano ni veterinario.</p>'
      },
      {
        title: 'Aplicaciones en investigación',
        contentHtml: '<p class="mb-3">Semax es objeto de estudio principalmente en áreas relacionadas con la neurociencia y la función cognitiva:</p><ul class="list-none space-y-1 mb-4"><li>– Neuroprotección en modelos de isquemia e hipoxia</li><li>– Expresión de factores neurotróficos (BDNF y NGF)</li><li>– Atención, aprendizaje y memoria en modelos experimentales</li><li>– Plasticidad sináptica y señalización neuronal</li><li>– Respuesta al estrés oxidativo en tejido nervioso</li></ul><p>La información aquí presentada describe áreas de investigación y no constituye una indicación de uso en humanos. Este producto se emplea únicamente en entornos de investigación controlados.</p>'
      },
      {
        title: 'Manejo y almacenamiento',
        contentHtml: '<p class="mb-3">Estas recomendaciones aplican a todos los péptidos liofilizados de KaiLab.</p><p class="mb-3"><strong>En polvo liofilizado (sin reconstituir):</strong><br>– Conservar a –20 °C para almacenamiento prolongado.<br>– Proteger de la luz y mantener en ambiente seco.<br>– En estas condiciones conserva su estabilidad durante períodos prolongados.</p><p class="mb-3"><strong>Reconstituido (en solución):</strong><br>– Reconstituir habitualmente con agua bacteriostática, en condiciones de laboratorio.<br>– Conservar refrigerado (2 °C a 8 °C).<br>– Evitar ciclos repetidos de congelación y descongelación.<br>– Manipular con técnica aséptica y material de laboratorio apropiado.</p><p>Estas indicaciones corresponden al manejo de materiales de investigación.</p>'
      },
      {
        title: 'Especificaciones técnicas',
        contentHtml: '<ul class="list-none space-y-1"><li>Compuesto: Semax</li><li>Número CAS: 80714-61-0</li><li>Clase molecular: Heptapéptido sintético, análogo del fragmento ACTH (4-10)</li><li>Secuencia: Met-Glu-His-Phe-Pro-Gly-Pro</li><li>Presentación: Polvo liofilizado en vial</li><li>Cantidad: 10 mg por vial</li><li>Pureza reportada: ≥99% (HPLC)</li><li>Almacenamiento: –20 °C, ambiente seco y protegido de la luz</li><li>Reconstitución: Agua bacteriostática (condiciones de laboratorio)</li><li>Análisis de pureza: HPLC por laboratorio independiente</li></ul>'
      }
    ],
    priceCOP: 310000,
    presentation: 'Vial liofilizado',
    concentration: '10 mg',
    lot: 'LOT-SEM-2411',
    purity: '≥ 99.0%',
    formula: 'C37H51N9O10',
    stock: 20,
    badges: ['RUO', 'COA'],
    image: '/kailab-images/semax-10mg-1536x1536.png.avif',
  },
  {
    id: 'kl-010',
    slug: 'tb-500',
    categorySlug: 'peptidos',
    category: 'Péptidos',
    title: 'TB-500 10 mg',
    subtitle: 'Fragmento sintético de timosina beta-4',
    description: 'TB-500 es un péptido sintético de investigación derivado de la timosina beta-4, estudiado por su papel en la reparación de tejidos y la recuperación. Es objeto de estudio en áreas como la recuperación muscular, la flexibilidad y la cicatrización. Se suministra como vial de polvo liofilizado de 10 mg, destinado exclusivamente a investigación científica.',
    features: ['COA disponibles', 'Empaque sellado', 'Péptido grado investigación', 'Polvo liofilizado'],
    infoAccordions: [
      {
        title: '¿Qué es?',
        contentHtml: '<p class="mb-3">TB-500 es un péptido sintético de investigación basado en una región activa de la timosina beta-4, una proteína presente de forma natural en el organismo y relacionada con los procesos de reparación de tejidos.</p><p class="mb-3">Se emplea como compuesto de referencia en modelos experimentales de recuperación, movilidad celular y regeneración.</p><p>En KaiLab se suministra como polvo liofilizado destinado exclusivamente a investigación científica. No está aprobado para uso humano ni veterinario.</p>'
      },
      {
        title: 'Aplicaciones en investigación',
        contentHtml: '<p class="mb-3">TB-500 es objeto de estudio principalmente en áreas relacionadas con la reparación de tejidos:</p><ul class="list-none space-y-1 mb-4"><li>– Reparación y recuperación de tejidos</li><li>– Recuperación muscular y flexibilidad</li><li>– Cicatrización de heridas</li><li>– Formación de nuevos vasos sanguíneos (angiogénesis)</li><li>– Procesos inflamatorios asociados a la recuperación</li></ul><p>La información aquí presentada describe áreas de investigación y no constituye una indicación de uso en humanos. Este producto se emplea únicamente en entornos de investigación controlados.</p>'
      },
      {
        title: 'Manejo y almacenamiento',
        contentHtml: '<p class="mb-3">Estas recomendaciones aplican a todos los péptidos liofilizados de KaiLab.</p><p class="mb-3"><strong>En polvo liofilizado (sin reconstituir):</strong><br>– Conservar a –20 °C para almacenamiento prolongado.<br>– Proteger de la luz y mantener en ambiente seco.<br>– En estas condiciones conserva su estabilidad durante períodos prolongados.</p><p class="mb-3"><strong>Reconstituido (en solución):</strong><br>– Reconstituir habitualmente con agua bacteriostática, en condiciones de laboratorio.<br>– Conservar refrigerado (2 °C a 8 °C).<br>– Evitar ciclos repetidos de congelación y descongelación.<br>– Manipular con técnica aséptica y material de laboratorio apropiado.</p><p>Estas indicaciones corresponden al manejo de materiales de investigación.</p>'
      },
      {
        title: 'Especificaciones técnicas',
        contentHtml: '<ul class="list-none space-y-1"><li>Compuesto: TB-500 (fragmento de timosina beta-4)</li><li>Número CAS: 77591-33-4</li><li>Clase molecular: Fragmento peptídico sintético de timosina beta-4</li><li>Presentación: Polvo liofilizado en vial</li><li>Cantidad: 10 mg por vial</li><li>Pureza reportada: ≥99% (HPLC)</li><li>Almacenamiento: –20 °C, ambiente seco y protegido de la luz</li><li>Reconstitución: Agua bacteriostática (condiciones de laboratorio)</li><li>Análisis de pureza: HPLC por laboratorio independiente</li></ul>'
      }
    ],
    priceCOP: 310000,
    presentation: 'Vial liofilizado',
    concentration: '10 mg',
    lot: 'LOT-TB-2411',
    purity: '≥ 99.0%',
    formula: 'C212H350N56O78S',
    stock: 20,
    badges: ['RUO', 'COA'],
    image: '/kailab-images/tb500.png.webp',
  },

  {
    id: 'kl-012',
    slug: 'mots-c',
    categorySlug: 'peptidos',
    category: 'Péptidos',
    title: 'MOTS-c 10 mg',
    subtitle: 'Péptido derivado de la mitocondria (péptido metabólico)',
    description: 'MOTS-c es un péptido de investigación derivado de la mitocondria, estudiado por su papel en la regulación metabólica. Es objeto de estudio en áreas como la sensibilidad a la insulina, el rendimiento físico y la función mitocondrial. Se suministra como vial de polvo liofilizado de 10 mg, destinado exclusivamente a investigación científica.',
    features: ['COA disponibles', 'Empaque sellado', 'Péptido grado investigación', 'Polvo liofilizado'],
    infoAccordions: [
      {
        title: '¿Qué es?',
        contentHtml: '<p class="mb-3">MOTS-c es un péptido de investigación de 16 aminoácidos codificado en el ADN mitocondrial, por lo que se le conoce como péptido derivado de la mitocondria. Es una molécula presente de forma natural en el organismo, cuyo papel se estudia en relación con la regulación metabólica y la función celular.</p><p class="mb-3">Se emplea como compuesto de referencia en modelos experimentales de metabolismo y energía celular.</p><p>En KaiLab se suministra como polvo liofilizado destinado exclusivamente a investigación científica. No está aprobado para uso humano ni veterinario.</p>'
      },
      {
        title: 'Aplicaciones en investigación',
        contentHtml: '<p class="mb-3">MOTS-c es objeto de estudio principalmente en áreas relacionadas con el metabolismo y la función mitocondrial:</p><ul class="list-none space-y-1 mb-4"><li>– Regulación metabólica y homeostasis de la glucosa</li><li>– Sensibilidad a la insulina</li><li>– Rendimiento físico y ejercicio</li><li>– Función mitocondrial y energía celular</li><li>– Envejecimiento metabólico</li></ul><p>La información aquí presentada describe áreas de investigación y no constituye una indicación de uso en humanos. Este producto se emplea únicamente en entornos de investigación controlados.</p>'
      },
      {
        title: 'Manejo y almacenamiento',
        contentHtml: '<p class="mb-3">Estas recomendaciones aplican a todos los péptidos liofilizados de KaiLab.</p><p class="mb-3"><strong>En polvo liofilizado (sin reconstituir):</strong><br>– Conservar a –20 °C para almacenamiento prolongado.<br>– Proteger de la luz y mantener en ambiente seco.<br>– En estas condiciones conserva su estabilidad durante períodos prolongados.</p><p class="mb-3"><strong>Reconstituido (en solución):</strong><br>– Reconstituir habitualmente con agua bacteriostática, en condiciones de laboratorio.<br>– Conservar refrigerado (2 °C a 8 °C).<br>– Evitar ciclos repetidos de congelación y descongelación.<br>– Manipular con técnica aséptica y material de laboratorio apropiado.</p><p>Estas indicaciones corresponden al manejo de materiales de investigación.</p>'
      },
      {
        title: 'Especificaciones técnicas',
        contentHtml: '<ul class="list-none space-y-1"><li>Compuesto: MOTS-c</li><li>Número CAS: 1627580-64-6</li><li>Clase molecular: Péptido derivado de la mitocondria</li><li>Secuencia: Péptido de 16 aminoácidos</li><li>Presentación: Polvo liofilizado en vial</li><li>Cantidad: 10 mg por vial</li><li>Pureza reportada: ≥99% (HPLC)</li><li>Almacenamiento: –20 °C, ambiente seco y protegido de la luz</li><li>Reconstitución: Agua bacteriostática (condiciones de laboratorio)</li><li>Análisis de pureza: HPLC por laboratorio independiente</li></ul>'
      }
    ],
    priceCOP: 380000,
    presentation: 'Vial liofilizado',
    concentration: '10 mg',
    lot: 'LOT-MOT-2411',
    purity: '≥ 99.0%',
    formula: 'C101H152N28O22S2',
    stock: 20,
    badges: ['RUO', 'COA'],
    image: '/kailab-images/mots-c-1024x1024.png.webp',
  },
  {
    id: 'kl-013',
    slug: 'agua-bacteriostatica-3ml',
    categorySlug: 'insumos',
    category: 'Insumos',
    title: 'Agua bacteriostática 3 ml',
    subtitle: 'Diluyente para reconstitución (uso de laboratorio)',
    description: 'Agua bacteriostática (agua estéril con 0,9% de alcohol bencílico) utilizada como diluyente para la reconstitución de péptidos liofilizados en condiciones de laboratorio. Se suministra en vial de 3 ml, destinado exclusivamente a uso en investigación.',
    features: ['COA disponibles', 'Empaque sellado', 'Péptido grado investigación', 'Polvo liofilizado'],
    infoAccordions: [
      {
        title: '¿Qué es?',
        contentHtml: '<p class="mb-3">El agua bacteriostática es agua estéril que contiene 0,9% de alcohol bencílico como agente bacteriostático. Esta característica permite realizar múltiples extracciones del mismo vial en condiciones de laboratorio, manteniendo la esterilidad de la solución.</p><p class="mb-3">Se utiliza como diluyente estándar para reconstituir péptidos y compuestos liofilizados antes de su uso en investigación.</p><p>En KaiLab se suministra destinada exclusivamente a uso en investigación. No está aprobada para uso humano ni veterinario.</p>'
      },
      {
        title: 'Aplicaciones en investigación',
        contentHtml: '<p class="mb-3">Uso en laboratorio. El agua bacteriostática cumple una función de apoyo dentro del flujo de trabajo de laboratorio:</p><ul class="list-none space-y-1 mb-4"><li>– Reconstitución de péptidos liofilizados</li><li>– Preparación de soluciones para investigación</li><li>– Extracciones múltiples desde un mismo vial, gracias a su agente bacteriostático</li></ul><p>La información aquí presentada describe el uso del producto en un entorno de laboratorio y no constituye una indicación de uso en humanos.</p>'
      },
      {
        title: 'Manejo y almacenamiento',
        contentHtml: '<ul class="list-none space-y-1"><li>– Conservar a temperatura ambiente, protegida de la luz directa.</li><li>– Mantener el vial cerrado y en condiciones limpias entre extracciones.</li><li>– Manipular con técnica aséptica y material de laboratorio apropiado.</li><li>– Descartar si se observa turbidez, partículas o cualquier signo de contaminación.</li></ul>'
      },
      {
        title: 'Especificaciones técnicas',
        contentHtml: '<ul class="list-none space-y-1"><li>Producto: Agua bacteriostática</li><li>Composición: Agua estéril con 0,9% de alcohol bencílico</li><li>Número CAS (alcohol bencílico): 100-51-6</li><li>Presentación: Vial</li><li>Volumen: 3 ml</li><li>Almacenamiento: Temperatura ambiente, protegida de la luz directa</li><li>Uso: Diluyente para reconstitución en condiciones de laboratorio</li></ul>'
      }
    ],
    lot: 'LOT-BAC-2411',
    purity: 'N/A',
    formula: 'H2O + 0.9% Alcohol Bencílico',
    badges: ['RUO'],
    image: '/kailab-images/Bacteriostatic-1024x1024.png',
    variants: [
      { id: 'BAC3-1', name: 'x1', sku: 'BAC3-01', priceCOP: 60000, stock: 50, coaStatus: 'available', image: '/kailab-images/Bacteriostatic-1024x1024.png', slug: '1-unidad' },
      { id: 'BAC3-10', name: 'x10', sku: 'BAC3-10', priceCOP: 270000, stock: 50, coaStatus: 'available', image: '/kailab-images/Bacteriostatic-1024x1024.png', slug: 'pack-x10' },
      { id: 'BAC3-20', name: 'x20', sku: 'BAC3-20', priceCOP: 500000, stock: 50, coaStatus: 'available', image: '/kailab-images/Bacteriostatic-1024x1024.png', slug: 'pack-x20' },
      { id: 'BAC3-30', name: 'x30', sku: 'BAC3-30', priceCOP: 750000, stock: 50, coaStatus: 'available', image: '/kailab-images/Bacteriostatic-1024x1024.png', slug: 'pack-x30' },
      { id: 'BAC3-40', name: 'x40', sku: 'BAC3-40', priceCOP: 1000000, stock: 50, coaStatus: 'available', image: '/kailab-images/Bacteriostatic-1024x1024.png', slug: 'pack-x40' },
      { id: 'BAC3-50', name: 'x50', sku: 'BAC3-50', priceCOP: 1150000, stock: 50, coaStatus: 'available', image: '/kailab-images/Bacteriostatic-1024x1024.png', slug: 'pack-x50' },
      { id: 'BAC3-100', name: 'x100', sku: 'BAC3-100', priceCOP: 2100000, stock: 50, coaStatus: 'available', image: '/kailab-images/Bacteriostatic-1024x1024.png', slug: 'pack-x100' }
    ]
  },
  {
    id: 'kl-014',
    slug: 'agua-bacteriostatica-hospira',
    categorySlug: 'insumos',
    category: 'Insumos',
    title: 'Agua bacteriostática Hospira (Pfizer) 30 ml',
    subtitle: 'Diluyente para reconstitución, vial multidosis de fabricación Hospira / Pfizer',
    description: 'Agua bacteriostática de fabricación Hospira (Pfizer): agua estéril con 0,9% de alcohol bencílico, utilizada como diluyente para la reconstitución de péptidos liofilizados en condiciones de laboratorio. Vial multidosis sellado de 30 ml. KaiLab la comercializa exclusivamente como insumo de laboratorio para investigación.',
    features: ['COA disponibles', 'Empaque sellado', 'Péptido grado investigación', 'Polvo liofilizado'],
    infoAccordions: [
      {
        title: '¿Qué es?',
        contentHtml: '<p class="mb-3">El agua bacteriostática es agua estéril que contiene 0,9% de alcohol bencílico como agente bacteriostático. Esta característica permite realizar múltiples extracciones del mismo vial en condiciones de laboratorio, manteniendo la esterilidad de la solución.</p><p class="mb-3">Se utiliza como diluyente estándar para reconstituir péptidos y compuestos liofilizados antes de su uso en investigación.</p><p class="mb-3">Esta referencia corresponde a producto fabricado por Hospira, compañía del grupo Pfizer, en presentación de vial multidosis sellado de 30 ml. Hospira es uno de los fabricantes de referencia de esta solución a nivel internacional y su formulación se elabora conforme a estándares USP.</p><p class="mb-3">KaiLab no es distribuidor autorizado de Pfizer ni de Hospira, ni mantiene vínculo comercial con ninguna de las dos. Las marcas se citan únicamente para identificar al fabricante del producto y pertenecen a sus respectivos titulares.</p><p>KaiLab comercializa esta referencia exclusivamente como insumo de laboratorio para investigación. No cuenta con registro sanitario INVIMA en Colombia y no se comercializa para uso humano ni veterinario.</p>'
      },
      {
        title: 'Aplicaciones en investigación',
        contentHtml: '<p class="mb-3">Uso en laboratorio. El agua bacteriostática cumple una función de apoyo dentro del flujo de trabajo de laboratorio:</p><ul class="list-none space-y-1 mb-4"><li>– Reconstitución de péptidos liofilizados</li><li>– Preparación de soluciones para investigación</li><li>– Extracciones múltiples desde un mismo vial, gracias a su agente bacteriostático</li></ul><p>La información aquí presentada describe el uso del producto en un entorno de laboratorio y no constituye una indicación de uso en humanos.</p>'
      },
      {
        title: 'Manejo y almacenamiento',
        contentHtml: '<ul class="list-none space-y-1"><li>– Conservar a temperatura ambiente, protegida de la luz directa.</li><li>– Mantener el vial cerrado y en condiciones limpias entre extracciones.</li><li>– Manipular con técnica aséptica y material de laboratorio apropiado.</li><li>– Descartar si se observa turbidez, partículas o cualquier signo de contaminación.</li></ul>'
      },
      {
        title: 'Especificaciones técnicas',
        contentHtml: '<ul class="list-none space-y-1"><li>Producto: Agua bacteriostática</li><li>Fabricante: Hospira, Inc. (compañía del grupo Pfizer)</li><li>Composición: Agua estéril con 0,9% de alcohol bencílico</li><li>Número CAS (alcohol bencílico): 100-51-6</li><li>Estándar de formulación: USP</li><li>Presentación: Vial multidosis sellado</li><li>Volumen: 30 ml</li><li>Almacenamiento: Temperatura ambiente, protegida de la luz directa</li><li>Uso: Diluyente para reconstitución en condiciones de laboratorio</li><li>Marcas: Pfizer y Hospira son marcas de sus respectivos titulares. KaiLab no es distribuidor autorizado.</li></ul>'
      }
    ],
    priceCOP: 160000,
    presentation: 'Vial líquido',
    concentration: '30 ml',
    lot: 'LOT-HOS-2411',
    purity: 'N/A',
    formula: 'H2O + 0.9% Alcohol Bencílico',
    stock: 50,
    badges: ['RUO'],
    image: '/kailab-images/Hospira-30ml.png.webp',
    images: [
      '/kailab-images/Hospira-30ml.png.webp',
      '/kailab-images/BacWaterCoverPhoto.webp'
    ],
  },
  {
    id: 'PROD-RETATRUTIDE',
    slug: 'retatrutide',
    categorySlug: 'metabolico',
    category: 'Metabólico',
    title: 'Retatrutide 10 mg',
    subtitle: 'Agonista triple de receptores (GLP-1 / GIP / Glucagón)',
    description: 'Retatrutide (LY3437943) es un péptido sintético de investigación de 39 aminoácidos que actúa como agonista triple de los receptores GLP-1, GIP y glucagón. Es objeto de estudio en la investigación metabólica, principalmente en áreas como la regulación del peso corporal, la grasa hepática (hígado graso) y el control de la glucosa. Se suministra como vial de polvo liofilizado de 10 mg, destinado exclusivamente a investigación científica.',
    features: ['COA disponibles', 'Empaque sellado', 'Péptido grado investigación', 'Polvo liofilizado'],
    infoAccordions: [
      {
        title: '¿Qué es?',
        contentHtml: '<p class="mb-3">Retatrutide (código de desarrollo LY3437943) es un péptido sintético de investigación compuesto por 39 aminoácidos. Pertenece a una clase de compuestos conocidos como agonistas triples, ya que interactúa de forma simultánea con tres receptores metabólicos:</p><ul class="list-none space-y-1 mb-4"><li>– Receptor de GLP-1 (péptido similar al glucagón tipo 1)</li><li>– Receptor de GIP (polipéptido insulinotrópico dependiente de glucosa)</li><li>– Receptor de glucagón</li></ul><p class="mb-3">Esta combinación, descrita en la literatura científica como agonismo “triple G”, distingue a Retatrutide de los agonistas simples y duales. Por su mecanismo triple, se ha convertido en uno de los compuestos de referencia más estudiados dentro de la investigación metabólica actual.</p><p>En KaiLab se suministra como polvo liofilizado destinado exclusivamente a investigación científica. No está aprobado para uso humano ni veterinario.</p>'
      },
      {
        title: 'Aplicaciones en investigación',
        contentHtml: '<p class="mb-3">Retatrutide es objeto de estudio en la investigación metabólica gracias a su interacción simultánea con tres receptores hormonales. En la literatura se investiga principalmente en:</p><ul class="list-none space-y-1 mb-4"><li>– Regulación del peso corporal y del tejido adiposo (grasa corporal)</li><li>– Grasa hepática (hígado graso) y salud metabólica del hígado</li><li>– Regulación de la glucosa y sensibilidad a la insulina</li><li>– Balance y gasto energético</li><li>– Estudios comparativos frente a agonistas simples y duales</li></ul><p>La información aquí presentada describe áreas de investigación y no constituye una indicación de uso en humanos. Este producto se emplea únicamente en entornos de investigación controlados.</p>'
      },
      {
        title: 'Manejo y almacenamiento',
        contentHtml: '<p class="mb-3">Estas recomendaciones aplican a todos los péptidos liofilizados de KaiLab.</p><p class="mb-3"><strong>En polvo liofilizado (sin reconstituir):</strong><br>– Conservar a –20 °C para almacenamiento prolongado.<br>– Proteger de la luz y mantener en ambiente seco.<br>– En estas condiciones conserva su estabilidad durante períodos prolongados.</p><p class="mb-3"><strong>Reconstituido (en solución):</strong><br>– Reconstituir habitualmente con agua bacteriostática, en condiciones de laboratorio.<br>– Conservar refrigerado (2 °C a 8 °C).<br>– Evitar ciclos repetidos de congelación y descongelación.<br>– Manipular con técnica aséptica y material de laboratorio apropiado.</p><p>Estas indicaciones corresponden al manejo de materiales de investigación.</p>'
      },
      {
        title: 'Especificaciones técnicas',
        contentHtml: '<ul class="list-none space-y-1"><li>Compuesto: Retatrutide (LY3437943)</li><li>Número CAS: 2381089-83-2</li><li>Clase molecular: Análogo peptídico, agonista triple de receptores</li><li>Secuencia: Péptido sintético de 39 aminoácidos</li><li>Presentación: Polvo liofilizado en vial</li><li>Cantidad: 10 mg por vial</li><li>Pureza reportada: ≥99% (HPLC)</li><li>Almacenamiento: –20 °C, ambiente seco y protegido de la luz</li><li>Reconstitución: Agua bacteriostática (condiciones de laboratorio)</li><li>Análisis de pureza: HPLC por laboratorio independiente</li></ul>'
      }
    ],
    lot: 'LOT-RT-2410',
    purity: '≥ 99.0%',
    formula: 'C221H342N46O68',
    badges: ['RUO', 'COA'],
    image: '/kailab-images/Retatrutide-5mg-2048x2048.png.webp',
    images: [
      '/kailab-images/Retatrutide-5mg-2048x2048.png.webp',
      '/kailab-images/Retatrutide-10-MG-1024x1024.png.webp'
    ],
    variants: [
      {
        id: 'RT5',
        name: '5 mg',
        sku: 'RT-5MG-01',
        priceCOP: 380000,
        stock: 50,
        coaStatus: 'pending',
        image: '/kailab-images/Retatrutide-10-MG-1024x1024.png.webp',
        slug: '5mg'
      },
      {
        id: 'RT10',
        name: '10 mg',
        sku: 'RT-10MG-01',
        priceCOP: 490000,
        stock: 50,
        coaStatus: 'available',
        image: '/kailab-images/Retatrutide-10-MG-1024x1024.png.webp',
        slug: '10mg'
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

// --- Checkout Types ---

export type CheckoutFormData = {
  email: string
  country: string
  firstName: string
  lastName: string
  address: string
  addressExtra?: string
  city: string
  state: string
  zipCode?: string
  phone?: string
}


