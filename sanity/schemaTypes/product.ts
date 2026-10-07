import { defineField, defineType } from 'sanity'
import React from 'react'

const AccordionIcon = () =>
  React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '1em',
    height: '1em',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  },
    React.createElement('line', { x1: '21', x2: '3', y1: '6', y2: '6' }),
    React.createElement('line', { x1: '15', x2: '3', y1: '12', y2: '12' }),
    React.createElement('line', { x1: '17', x2: '3', y1: '18', y2: '18' })
  )

const VariantIcon = () =>
  React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '1em',
    height: '1em',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  },
    React.createElement('path', { d: 'M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a2.533 2.533 0 0 0 2.28 3.45h10a2.533 2.533 0 0 0 2.28-3.45l-5.069-10.127A2 2 0 0 1 14 9.527V2' }),
    React.createElement('path', { d: 'M8.5 2h7' }),
    React.createElement('path', { d: 'M6 16h12' })
  )

const BookOpenIcon = () =>
  React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '1em',
    height: '1em',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#10B981',
    strokeWidth: '1.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  },
    React.createElement('path', { d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20' }),
    React.createElement('path', { d: 'M8 7h8' }),
    React.createElement('path', { d: 'M8 11h8' })
  )

const MicroscopeIcon = () =>
  React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '1em',
    height: '1em',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#3B82F6',
    strokeWidth: '1.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  },
    React.createElement('path', { d: 'M6 18h8' }),
    React.createElement('path', { d: 'M3 22h18' }),
    React.createElement('path', { d: 'M14 22a7 7 0 1 0-14 0' }),
    React.createElement('path', { d: 'M9 14h2' }),
    React.createElement('path', { d: 'M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z' }),
    React.createElement('path', { d: 'M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3' }),
    React.createElement('circle', { cx: '17', cy: '6', r: '2', fill: '#3B82F6', opacity: '0.4', stroke: 'none' }),
    React.createElement('circle', { cx: '21', cy: '8', r: '1', fill: '#3B82F6', opacity: '0.4', stroke: 'none' })
  )

const LightbulbIcon = () =>
  React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '1em',
    height: '1em',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#F59E0B',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  },
    React.createElement('path', { d: 'M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5' }),
    React.createElement('path', { d: 'M9 18h6' }),
    React.createElement('path', { d: 'M10 22h4' })
  )

const HelpCircleIcon = () =>
  React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '1em',
    height: '1em',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#6366F1',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  },
    React.createElement('circle', { cx: '12', cy: '12', r: '10' }),
    React.createElement('path', { d: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' }),
    React.createElement('path', { d: 'M12 17h.01' })
  )

const ExternalLinkIcon = () =>
  React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '1em',
    height: '1em',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#0EA5E9',
    strokeWidth: '1.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  },
    React.createElement('path', { d: 'M15 3h6v6' }),
    React.createElement('path', { d: 'M10 14L21 3' }),
    React.createElement('path', { d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' })
  )

const TableIcon = () =>
  React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '1em',
    height: '1em',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#8B5CF6',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  },
    React.createElement('rect', { width: '18', height: '18', x: '3', y: '3', rx: '2' }),
    React.createElement('path', { d: 'M3 9h18' }),
    React.createElement('path', { d: 'M3 15h18' }),
    React.createElement('path', { d: 'M9 3v18' }),
    React.createElement('path', { d: 'M15 3v18' })
  )

const CalendarIcon = () =>
  React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '1em',
    height: '1em',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#EC4899',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  },
    React.createElement('rect', { width: '18', height: '18', x: '3', y: '4', rx: '2' }),
    React.createElement('path', { d: 'M16 2v4' }),
    React.createElement('path', { d: 'M8 2v4' }),
    React.createElement('path', { d: 'M3 10h18' })
  )

export const productType = defineType({
  name: 'product',
  title: 'Producto / Péptido',
  type: 'document',
  fieldsets: [
    { name: 'general', title: '1. Clasificación e Identificación', options: { collapsible: true, collapsed: false } },
    { name: 'hero', title: '2. Encabezado y Descripción (Panel Superior)', options: { collapsible: true, collapsed: false } },
    { name: 'purchase', title: '3. Precios, Presentaciones e Ítems Incluidos', options: { collapsible: true, collapsed: false } },
    { name: 'media_tech', title: '4. Imágenes, Certificado COA y Ficha Técnica', options: { collapsible: true, collapsed: false } },
    { name: 'accordions', title: '5. Secciones de Información y Navegación (Reconstitución, Consejos, FAQ)', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    // --- 1. Clasificación e Identificación ---
    defineField({
      name: 'title',
      title: 'Nombre del Producto',
      type: 'string',
      fieldset: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      fieldset: 'general',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sku',
      title: 'SKU / Código Interno',
      type: 'string',
      fieldset: 'general',
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      fieldset: 'general',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'badges',
      title: 'Insignias / Badges (ej. RUO, COA)',
      type: 'array',
      fieldset: 'general',
      of: [{ type: 'string' }],
    }),

    // --- 2. Encabezado y Descripción ---
    defineField({
      name: 'subtitle',
      title: 'Subtítulo / Línea descriptiva bajo el título',
      type: 'string',
      fieldset: 'hero',
    }),
    defineField({
      name: 'description',
      title: 'Descripción Principal / Párrafo largo',
      type: 'text',
      fieldset: 'hero',
      rows: 4,
    }),
    defineField({
      name: 'features',
      title: 'Características Destacadas (Checklist con viñetas)',
      type: 'array',
      fieldset: 'hero',
      of: [{ type: 'string' }],
    }),

    // --- 3. Precios, Presentaciones e Ítems Incluidos ---
    defineField({
      name: 'priceCOP',
      title: 'Precio Principal (COP)',
      type: 'number',
      fieldset: 'purchase',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'inStock',
      title: 'En Stock / Disponibilidad',
      type: 'boolean',
      fieldset: 'purchase',
      initialValue: true,
    }),
    defineField({
      name: 'presentation',
      title: 'Presentación Principal (ej. Vial liofilizado)',
      type: 'string',
      fieldset: 'purchase',
    }),
    defineField({
      name: 'concentration',
      title: 'Concentración Principal',
      type: 'string',
      fieldset: 'purchase',
    }),
    defineField({
      name: 'variants',
      title: 'Variantes de Presentación (ej. 5 mg / 10 mg)',
      type: 'array',
      fieldset: 'purchase',
      of: [
        {
          type: 'object',
          name: 'variant',
          title: 'Variante',
          icon: VariantIcon,
          fields: [
            defineField({ name: 'name', title: 'Nombre Presentación (ej: 5mg Vial)', type: 'string' }),
            defineField({ name: 'slug', title: 'Slug URL (ej: 5mg)', type: 'string' }),
            defineField({ name: 'priceCOP', title: 'Precio COP', type: 'number' }),
            defineField({ name: 'sku', title: 'SKU Variante', type: 'string' }),
            defineField({ name: 'inStock', title: 'En Stock', type: 'boolean', initialValue: true }),
            defineField({ name: 'image', title: 'Imagen Variante', type: 'image' }),
            defineField({ 
              name: 'coaStatus', 
              title: 'Estado del COA', 
              type: 'string', 
              options: { list: [{title: 'Disponible', value: 'available'}, {title: 'Pendiente', value: 'pending'}] },
              initialValue: 'pending'
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'sku',
              media: 'image',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'shippingNotice',
      title: 'Nota de Envío (debajo de botones de compra)',
      type: 'string',
      fieldset: 'purchase',
      initialValue: 'Agua bacteriostática incluida · Envío gratis a toda Colombia',
    }),
    defineField({
      name: 'includedItems',
      title: 'Incluido con tu compra (Lista del recuadro azul)',
      type: 'array',
      fieldset: 'purchase',
      of: [{ type: 'string' }],
    }),

    // --- 4. Imágenes y Ficha Técnica / COA ---
    defineField({
      name: 'image',
      title: 'Imagen Principal',
      type: 'image',
      fieldset: 'media_tech',
    }),
    defineField({
      name: 'images',
      title: 'Imágenes Secundarias / Galería',
      type: 'array',
      fieldset: 'media_tech',
      of: [{ type: 'image' }],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'purity',
      title: 'Pureza Garantizada (ej. ≥99.0% HPLC)',
      type: 'string',
      fieldset: 'media_tech',
    }),
    defineField({
      name: 'formula',
      title: 'Fórmula Química',
      type: 'string',
      fieldset: 'media_tech',
    }),
    defineField({
      name: 'lot',
      title: 'Lote del Producto',
      type: 'string',
      fieldset: 'media_tech',
    }),

    // --- 5. Secciones de Información y Navegación ---
    defineField({
      name: 'fichaTecnica',
      title: 'Ficha Técnica (Introducción al Péptido)',
      type: 'object',
      fieldset: 'accordions',
      fields: [
        defineField({
          name: 'title',
          title: 'Título Principal de la Sección',
          type: 'string',
          initialValue: 'Introducción al péptido',
        }),
        defineField({
          name: 'items',
          title: 'Puntos Informativos (Preguntas y Respuestas)',
          type: 'array',
          of: [
            {
              type: 'object',
              title: 'Punto Informativo',
              icon: AccordionIcon,
              fields: [
                defineField({ name: 'question', title: 'Pregunta / Título (ej. ¿Qué es la retatrutida?)', type: 'string' }),
                defineField({ name: 'answer', title: 'Respuesta / Explicación', type: 'text', rows: 3 }),
              ],
              preview: {
                select: {
                  title: 'question',
                  subtitle: 'answer',
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'reconstitucionText',
      title: 'Texto de Reconstitución',
      type: 'text',
      fieldset: 'accordions',
      rows: 3,
      initialValue: 'Reconstituir significa agregar agua bacteriostática al polvo liofilizado (el polvo seco que viene dentro del vial) para convertirlo en una solución lista para usar. Los péptidos se venden en polvo porque así se mantienen estables por más tiempo.',
    }),
    defineField({
      name: 'lecturaCantidadesText',
      title: 'Texto de Lectura de Cantidades',
      type: 'string',
      fieldset: 'accordions',
      initialValue: 'mg: cantidad de péptido | mL: volumen de líquido | mg/mL: concentración resultante',
    }),
    defineField({
      name: 'dosisCalendarioText',
      title: 'Texto de Dosis y Calendario',
      type: 'text',
      fieldset: 'accordions',
      rows: 3,
      initialValue: 'Aplicación una vez por semana, siempre el mismo día. El esquema de referencia sigue el aumento gradual usado en el estudio clínico de fase 2 del retatrutide (NEJM, 2023). Subir la dosis poco a poco ayuda a reducir efectos como náuseas o malestar digestivo. Si aparecen molestias, lo recomendable es mantener la dosis actual más tiempo antes de subir.',
    }),
    defineField({
      name: 'dosisTables',
      title: 'Tablas de Dosis y Calendario por Presentación',
      type: 'array',
      fieldset: 'accordions',
      of: [
        {
          type: 'object',
          name: 'dosisTable',
          title: 'Tabla de Dosis (ej: 5 mg / 10 mg)',
          icon: TableIcon,
          fields: [
            defineField({ name: 'presentationId', title: 'ID o Slug de Presentación (ej. RT5, RT10, 5mg, 10mg)', type: 'string' }),
            defineField({ name: 'title', title: 'Título de la Presentación (ej. Retatrutida 5 mg (RT5))', type: 'string' }),
            defineField({ name: 'badge', title: 'Badge de Concentración (ej. 5 mg / mL)', type: 'string' }),
            defineField({ name: 'instruction', title: 'Instrucción de Reconstitución', type: 'text', rows: 2 }),
            defineField({
              name: 'rows',
              title: 'Filas del Calendario de Dosis',
              type: 'array',
              of: [
                {
                  type: 'object',
                  title: 'Fila de Dosis',
                  icon: CalendarIcon,
                  fields: [
                    defineField({ name: 'week', title: 'Semana (ej. 1 a 4)', type: 'string' }),
                    defineField({ name: 'dose', title: 'Dosis (ej. 2 mg)', type: 'string' }),
                    defineField({ name: 'units', title: 'Unidades en la Jeringa (ej. 40 unidades)', type: 'string' }),
                  ],
                  preview: {
                    select: {
                      title: 'week',
                      subtitle: 'dose',
                    },
                    prepare({ title, subtitle }) {
                      return {
                        title: title ? `Semana: ${title}` : 'Semana de dosis',
                        subtitle: subtitle ? `Dosis: ${subtitle}` : '',
                      }
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'badge',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'experienciaUso',
      title: 'Experiencia de Uso (Consejos Prácticos)',
      type: 'object',
      fieldset: 'accordions',
      fields: [
        defineField({
          name: 'badge',
          title: 'Etiqueta / Badge de la Sección',
          type: 'string',
          initialValue: 'Experiencia de uso',
        }),
        defineField({
          name: 'title',
          title: 'Título Principal de la Sección',
          type: 'string',
          initialValue: 'Consejos Prácticos',
        }),
        defineField({
          name: 'tips',
          title: 'Consejos / Tarjetas Informativas',
          type: 'array',
          of: [
            {
              type: 'object',
              title: 'Consejo Práctico',
              icon: LightbulbIcon,
              fields: [
                defineField({ name: 'title', title: 'Título del Consejo', type: 'string' }),
                defineField({ name: 'desc', title: 'Descripción / Explicación', type: 'text', rows: 3 }),
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'desc',
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'preguntasFrecuentes',
      title: 'Resolución de Dudas (Preguntas Frecuentes)',
      type: 'object',
      fieldset: 'accordions',
      fields: [
        defineField({
          name: 'badge',
          title: 'Etiqueta / Badge de la Sección',
          type: 'string',
          initialValue: 'Resolución de dudas',
        }),
        defineField({
          name: 'title',
          title: 'Título Principal de la Sección',
          type: 'string',
          initialValue: 'Preguntas Frecuentes',
        }),
        defineField({
          name: 'items',
          title: 'Preguntas y Respuestas',
          type: 'array',
          of: [
            {
              type: 'object',
              title: 'Pregunta Frecuente',
              icon: HelpCircleIcon,
              fields: [
                defineField({ name: 'q', title: 'Pregunta', type: 'string' }),
                defineField({ name: 'a', title: 'Respuesta', type: 'text', rows: 4 }),
              ],
              preview: {
                select: {
                  title: 'q',
                  subtitle: 'a',
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'evidenciaClinica',
      title: 'Evidencia Clínica (Estudios y Fuentes Científicas)',
      type: 'object',
      fieldset: 'accordions',
      fields: [
        defineField({
          name: 'badge',
          title: 'Etiqueta / Badge de la Sección',
          type: 'string',
          initialValue: 'Evidencia Clínica',
        }),
        defineField({
          name: 'title',
          title: 'Título Principal',
          type: 'string',
          initialValue: '¿Qué dicen los estudios?',
        }),
        defineField({
          name: 'description',
          title: 'Descripción / Párrafo Introductorio',
          type: 'text',
          rows: 2,
          initialValue: 'Los ensayos clínicos han observado reducciones de peso y de glucosa en sangre. Los resultados varían según la dosis, la población y la duración del estudio.',
        }),
        defineField({
          name: 'studies',
          title: 'Estudios Destacados',
          type: 'array',
          of: [
            {
              type: 'object',
              title: 'Estudio Clínico',
              icon: MicroscopeIcon,
              fields: [
                defineField({ name: 'tag', title: 'Etiqueta / Referencia (ej. TRIUMPH-1 · 2026)', type: 'string' }),
                defineField({ name: 'title', title: 'Título del Estudio', type: 'string' }),
                defineField({ name: 'description1', title: 'Párrafo Explicativo 1', type: 'text', rows: 2 }),
                defineField({ name: 'description2', title: 'Párrafo Explicativo 2', type: 'text', rows: 2 }),
                defineField({
                  name: 'links',
                  title: 'Enlaces de Referencia',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      title: 'Enlace',
                      icon: ExternalLinkIcon,
                      fields: [
                        defineField({ name: 'text', title: 'Texto del Enlace', type: 'string' }),
                        defineField({ name: 'url', title: 'URL de Destino', type: 'string' }),
                      ],
                      preview: {
                        select: {
                          title: 'text',
                          subtitle: 'url',
                        },
                      },
                    },
                  ],
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'tag',
                },
              },
            },
          ],
        }),
        defineField({
          name: 'disclaimerTitle',
          title: 'Título del Aviso de Interpretación',
          type: 'string',
          initialValue: 'Cómo interpretar estos datos',
        }),
        defineField({
          name: 'disclaimerPoints',
          title: 'Puntos del Aviso de Interpretación',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'sourcesTitle',
          title: 'Título de Fuentes Científicas',
          type: 'string',
          initialValue: 'Fuentes científicas',
        }),
        defineField({
          name: 'sourcesSubtitle',
          title: 'Subtítulo de Fuentes Científicas',
          type: 'string',
          initialValue: 'Consulta las publicaciones sobre la investigación de la retatrutida.',
        }),
        defineField({
          name: 'sources',
          title: 'Lista de Fuentes Científicas',
          type: 'array',
          of: [
            {
              type: 'object',
              title: 'Fuente Científica',
              icon: BookOpenIcon,
              fields: [
                defineField({ name: 'text', title: 'Título / Descripción de la Fuente', type: 'string' }),
                defineField({ name: 'url', title: 'URL del Sitio / Publicación', type: 'string' }),
              ],
              preview: {
                select: {
                  title: 'text',
                  subtitle: 'url',
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'isFeatured',
      title: 'Producto Destacado en Inicio',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'image',
    },
  },
})

