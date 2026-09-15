import { defineField, defineType } from 'sanity'

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
      name: 'cas',
      title: 'Número CAS (ej. 137525-51-0)',
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
      name: 'image',
      title: 'Imagen Principal',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Descripción / Especificaciones',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'coaFile',
      title: 'Archivo COA (Certificado de Análisis PDF)',
      type: 'file',
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
