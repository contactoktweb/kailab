import { defineField, defineType } from 'sanity'
import React from 'react'

const ShieldIcon = () =>
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
    React.createElement('path', { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10' })
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

export const qualityPageType = defineType({
  name: 'qualityPage',
  title: 'Calidad',
  type: 'document',
  icon: ShieldIcon,
  fields: [
    defineField({
      name: 'headerTag',
      title: 'Etiqueta de Cabecera (ej. Laboratorio Analítico)',
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
      rows: 4,
    }),
    defineField({
      name: 'reportName',
      title: 'Nombre del Reporte (Caja Derecha)',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Estado (ej. VERIFICADO)',
      type: 'string',
    }),
    defineField({
      name: 'statsList',
      title: 'Lista de Estadísticas (Caja Derecha)',
      type: 'array',
      of: [
        {
          type: 'object',
          icon: ListIcon,
          fields: [
            defineField({ name: 'label', title: 'Etiqueta (ej. Pureza Analizada)', type: 'string' }),
            defineField({ name: 'value', title: 'Valor (ej. ≥ 99.1%)', type: 'string' }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'value',
            }
          }
        }
      ]
    })
  ],
})
