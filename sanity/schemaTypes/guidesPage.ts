import { defineField, defineType } from 'sanity'
import React from 'react'

const BookIcon = () =>
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
    React.createElement('path', { d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20' })
  )

const ListIcon = () =>
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
    React.createElement('line', { x1: '8', y1: '6', x2: '21', y2: '6' }),
    React.createElement('line', { x1: '8', y1: '12', x2: '21', y2: '12' }),
    React.createElement('line', { x1: '8', y1: '18', x2: '21', y2: '18' }),
    React.createElement('line', { x1: '3', y1: '6', x2: '3.01', y2: '6' }),
    React.createElement('line', { x1: '3', y1: '12', x2: '3.01', y2: '12' }),
    React.createElement('line', { x1: '3', y1: '18', x2: '3.01', y2: '18' })
  )

export const guidesPageType = defineType({
  name: 'guidesPage',
  title: 'Guía',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'headerTag',
      title: 'Etiqueta de Cabecera (ej. Recursos Técnicos)',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Título Principal (usa \n para saltos de línea)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'guidesList',
      title: 'Lista de Guías',
      type: 'array',
      of: [
        {
          type: 'object',
          icon: ListIcon,
          fields: [
            defineField({ name: 'title', title: 'Título de la Guía', type: 'string' }),
            defineField({ name: 'desc', title: 'Descripción', type: 'text', rows: 2 }),
            defineField({ name: 'link', title: 'Enlace (Opcional, ej. #guias)', type: 'string', initialValue: '#guias' }),
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
