import { defineField, defineType, defineArrayMember } from 'sanity'
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

const LinkIcon = () =>
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
    React.createElement('path', { d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' }),
    React.createElement('path', { d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' })
  )

const TableIcon = () =>
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
    React.createElement('rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', ry: '2' }),
    React.createElement('line', { x1: '3', y1: '9', x2: '21', y2: '9' }),
    React.createElement('line', { x1: '9', y1: '3', x2: '9', y2: '21' })
  )

export const stepNormal = defineType({
  name: 'stepNormal',
  title: 'Paso Normal',
  type: 'object',
  icon: ListIcon,
  fields: [
    defineField({ name: 'title', title: 'Título del Paso', type: 'string' }),
    defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 3 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'description' }
  }
})

export const stepWithTable = defineType({
  name: 'stepWithTable',
  title: 'Paso con Tabla (Paso 3)',
  type: 'object',
  icon: ListIcon,
  fields: [
    defineField({ name: 'title', title: 'Título del Paso', type: 'string' }),
    defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 3 }),
    defineField({
      name: 'table',
      title: 'Tabla',
      type: 'array',
      of: [
        {
          type: 'object',
          icon: TableIcon,
          fields: [
            defineField({ name: 'label', title: 'Dato del informe', type: 'string' }),
            defineField({ name: 'value', title: 'Resultado', type: 'string' }),
            defineField({ name: 'explanation', title: 'Cómo leerlo', type: 'string' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' }
          }
        }
      ]
    }),
    defineField({ name: 'tableNote', title: 'Nota bajo la tabla', type: 'string' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'description' }
  }
})

export const stepWithButtons = defineType({
  name: 'stepWithButtons',
  title: 'Paso con Botones (Paso 5)',
  type: 'object',
  icon: ListIcon,
  fields: [
    defineField({ name: 'title', title: 'Título del Paso', type: 'string' }),
    defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 3 }),
    defineField({
      name: 'buttons',
      title: 'Botones',
      type: 'array',
      of: [
        {
          type: 'object',
          icon: LinkIcon,
          fields: [
            defineField({ name: 'label', title: 'Texto del botón', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'string' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'url' }
          }
        }
      ]
    })
  ],
  preview: {
    select: { title: 'title', subtitle: 'description' }
  }
})

export const guidesPageType = defineType({
  name: 'guidesPage',
  title: 'Guía',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'headerTag',
      title: 'Etiqueta de Cabecera (ej. Recursos)',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Título Principal',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descripción de la página',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'guideTitle',
      title: 'Título de la Guía Principal (ej. Cómo leer un certificado...)',
      type: 'string',
    }),
    defineField({
      name: 'guideDescription',
      title: 'Descripción de la Guía Principal',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'exampleBlock',
      title: 'Bloque de Ejemplo Real',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Título del Ejemplo', type: 'string' }),
        defineField({ name: 'description', title: 'Descripción del Ejemplo', type: 'text', rows: 2 }),
      ]
    }),
    defineField({
      name: 'steps',
      title: 'Pasos de la Guía',
      type: 'array',
      of: [
        defineArrayMember({ type: 'stepNormal' }),
        defineArrayMember({ type: 'stepWithTable' }),
        defineArrayMember({ type: 'stepWithButtons' })
      ]
    }),
    defineField({
      name: 'wantToKnowMore',
      title: 'Sección: ¿Quieres saber más?',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 2 }),
        defineField({ name: 'buttonLabel', title: 'Texto del botón', type: 'string' }),
        defineField({ name: 'buttonUrl', title: 'URL del botón', type: 'string' }),
      ]
    }),
    defineField({
      name: 'bottomLinks',
      title: 'Botones/Enlaces al final (Tienda, Ayuda)',
      type: 'array',
      of: [
        {
          type: 'object',
          icon: LinkIcon,
          fields: [
            defineField({ name: 'title', title: 'Título Principal', type: 'string' }),
            defineField({ name: 'description', title: 'Descripción (texto pequeño)', type: 'string' }),
            defineField({ name: 'url', title: 'URL de Destino', type: 'string' }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' }
          }
        }
      ]
    })
  ],
})
