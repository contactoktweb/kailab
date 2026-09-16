import { defineField, defineType } from 'sanity'
import React from 'react'

const HelpCircleIcon = () =>
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
    React.createElement('circle', { cx: '12', cy: '12', r: '10' }),
    React.createElement('path', { d: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' }),
    React.createElement('line', { x1: '12', y1: '17', x2: '12.01', y2: '17' })
  )

const FolderIcon = () =>
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
    React.createElement('path', { d: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z' })
  )

const HelpCircleSmallIcon = () =>
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
    React.createElement('circle', { cx: '12', cy: '12', r: '10' }),
    React.createElement('path', { d: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' }),
    React.createElement('line', { x1: '12', y1: '17', x2: '12.01', y2: '17' })
  )

export const helpPageType = defineType({
  name: 'helpPage',
  title: 'Ayuda (FAQ)',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'headerTag',
      title: 'Etiqueta de Cabecera (ej. Base de Conocimiento)',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Título Principal',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'faqCategories',
      title: 'Categorías de Preguntas Frecuentes',
      type: 'array',
      of: [
        {
          type: 'object',
          icon: FolderIcon,
          fields: [
            defineField({ name: 'label', title: 'Nombre de Categoría (ej. Envíos)', type: 'string' }),
            defineField({
              name: 'items',
              title: 'Preguntas y Respuestas',
              type: 'array',
              of: [
                {
                  type: 'object',
                  icon: HelpCircleSmallIcon,
                  fields: [
                    defineField({ name: 'q', title: 'Pregunta', type: 'string' }),
                    defineField({ name: 'a', title: 'Respuesta', type: 'text', rows: 3 }),
                  ],
                  preview: {
                    select: {
                      title: 'q',
                      subtitle: 'a',
                    }
                  }
                }
              ]
            }),
          ],
          preview: {
            select: {
              title: 'label',
            }
          }
        }
      ]
    }),
    defineField({
      name: 'trustBadges',
      title: 'Insignias de Confianza (4 Cajas Inferiores)',
      type: 'array',
      of: [
        {
          type: 'object',
          icon: FolderIcon,
          fields: [
            defineField({ name: 'title', title: 'Título (ej. Entrega rápida)', type: 'string' }),
            defineField({ name: 'desc', title: 'Descripción corta', type: 'string' }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'desc',
            }
          }
        }
      ]
    })
  ],
})
