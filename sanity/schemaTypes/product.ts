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
export const productType = defineType({
  name: 'product',
  title: 'Producto / Péptido',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre del Producto',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
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
    }),
    defineField({
      name: 'purity',
      title: 'Pureza Garantizada (ej. ≥99.4% HPLC)',
      type: 'string',
    }),
    defineField({
      name: 'priceCOP',
      title: 'Precio Principal (COP)',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
    }),
    defineField({
      name: 'presentation',
      title: 'Presentación',
      type: 'string',
    }),
    defineField({
      name: 'concentration',
      title: 'Concentración',
      type: 'string',
    }),
    defineField({
      name: 'lot',
      title: 'Lote',
      type: 'string',
    }),
    defineField({
      name: 'formula',
      title: 'Fórmula Química',
      type: 'string',
    }),
    defineField({
      name: 'badges',
      title: 'Insignias / Badges (ej. RUO, COA)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'features',
      title: 'Características Destacadas',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'infoAccordions',
      title: 'Secciones Desplegables de Información',
      type: 'array',
      of: [
        {
          type: 'object',
          icon: AccordionIcon,
          fields: [
            defineField({ name: 'title', title: 'Título de la Sección', type: 'string' }),
            defineField({ 
              name: 'contentHtml', 
              title: 'Contenido (Se guardará como HTML en la exportación o usar block)', 
              type: 'text',
              rows: 5
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Imagen Principal',
      type: 'image',
    }),
    defineField({
      name: 'images',
      title: 'Imágenes Secundarias',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'description',
      title: 'Descripción / Especificaciones',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'inStock',
      title: 'En Stock',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Producto Destacado en Inicio',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'variants',
      title: 'Variantes de Presentación (mg / viales)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'variant',
          title: 'Variante',
          icon: VariantIcon,
          fields: [
            defineField({ name: 'name', title: 'Nombre Presentación (ej: 5mg Vial)', type: 'string' }),
            defineField({ name: 'priceCOP', title: 'Precio COP', type: 'number' }),
            defineField({ name: 'sku', title: 'SKU Variante', type: 'string' }),
            defineField({ name: 'inStock', title: 'En Stock', type: 'boolean', initialValue: true }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'purity',
      media: 'image',
    },
  },
})
