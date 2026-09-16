import React from 'react'
import { defineField, defineType } from 'sanity'

const HomeIcon = () =>
  React.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '1em',
      height: '1em',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
    React.createElement('path', { d: 'm3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }),
    React.createElement('polyline', { points: '9 22 9 12 15 12 15 22' })
  )

const ListIcon = () =>
  React.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '1em',
      height: '1em',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
    React.createElement('line', { x1: '8', y1: '6', x2: '21', y2: '6' }),
    React.createElement('line', { x1: '8', y1: '12', x2: '21', y2: '12' }),
    React.createElement('line', { x1: '8', y1: '18', x2: '21', y2: '18' }),
    React.createElement('line', { x1: '3', y1: '6', x2: '3.01', y2: '6' }),
    React.createElement('line', { x1: '3', y1: '12', x2: '3.01', y2: '12' }),
    React.createElement('line', { x1: '3', y1: '18', x2: '3.01', y2: '18' })
  )

export const homePageType = defineType({
  name: 'homePage',
  title: 'Página de Inicio',
  type: 'document',
  icon: HomeIcon,
  preview: {
    prepare() {
      return {
        title: 'Contenido de la Página de Inicio',
      }
    }
  },
  fields: [
    defineField({
      name: 'hero',
      title: 'Sección Principal (Hero)',
      type: 'object',
      fields: [
        defineField({ name: 'titlePart1', title: 'Título Principal (Primera parte)', type: 'string', description: 'Ej: Péptidos de' }),
        defineField({ name: 'titlePart2', title: 'Título Principal (Segunda parte destacada)', type: 'string', description: 'Ej: Investigación' }),
        defineField({ name: 'subtitle', title: 'Subtítulo', type: 'text', rows: 2 }),
        defineField({ name: 'ctaText', title: 'Texto del Botón', type: 'string' }),
        defineField({ name: 'ctaLink', title: 'Enlace del Botón', type: 'string' }),
        defineField({ name: 'backgroundImage', title: 'Imagen de Fondo', type: 'image', options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: 'featuredProducts',
      title: 'Sección Productos Destacados',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Título', type: 'string', description: 'Ej: Productos Destacados' }),
        defineField({ name: 'subtitle', title: 'Subtítulo', type: 'string' }),
        defineField({
          name: 'products',
          title: 'Productos a Mostrar',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'product' }] }],
          description: 'Selecciona los productos que aparecerán destacados en el Home.'
        })
      ]
    }),
    defineField({
      name: 'whatsIncluded',
      title: 'Sección Equipamiento Incluido',
      type: 'object',
      fields: [
        defineField({ name: 'tag', title: 'Etiqueta Pequeña', type: 'string', description: 'Ej: Dotación de Envíos' }),
        defineField({ name: 'title', title: 'Título', type: 'string', description: 'Ej: Equipamiento Incluido' }),
        defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 3 }),
        defineField({
          name: 'items',
          title: 'Elementos Incluidos',
          type: 'array',
          of: [
            {
              type: 'object',
              icon: ListIcon,
              fields: [
                defineField({ name: 'name', title: 'Nombre', type: 'string' }),
                defineField({ name: 'desc', title: 'Descripción', type: 'text', rows: 2 }),
              ],
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'desc',
                }
              }
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'commitment',
      title: 'Sección Compromiso y Envíos',
      type: 'object',
      fields: [
        defineField({ name: 'title1', title: 'Título Compromiso', type: 'string', description: 'Ej: Compromiso con la seriedad' }),
        defineField({ name: 'desc1', title: 'Descripción 1', type: 'text', rows: 3 }),
        defineField({ name: 'desc2', title: 'Descripción 2', type: 'text', rows: 3 }),
        defineField({ name: 'title2', title: 'Título Envíos', type: 'string', description: 'Ej: Envíos rápidos y seguros' }),
        defineField({ name: 'subtitle2', title: 'Subtítulo Envíos', type: 'string' }),
        defineField({
          name: 'faq',
          title: 'Preguntas Frecuentes de Envíos',
          type: 'array',
          of: [
            {
              type: 'object',
              icon: ListIcon,
              fields: [
                defineField({ name: 'question', title: 'Pregunta', type: 'string' }),
                defineField({ name: 'answer', title: 'Respuesta', type: 'text', rows: 3 }),
              ],
              preview: {
                select: {
                  title: 'question',
                  subtitle: 'answer',
                }
              }
            }
          ]
        })
      ]
    })
  ]
})
