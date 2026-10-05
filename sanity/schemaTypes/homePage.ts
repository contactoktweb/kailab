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
  title: 'Home',
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
      title: '1. Sección Principal (Hero)',
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
      name: 'whatsIncluded',
      title: '2. Sección Equipamiento Incluido',
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
              ],
              preview: {
                select: {
                  title: 'name',
                }
              }
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'quality',
      title: '3. Sección Calidad y Certificados',
      type: 'object',
      fields: [
        defineField({ name: 'headerTag', title: 'Etiqueta Pequeña', type: 'string', description: 'Ej: Laboratorio Analítico' }),
        defineField({ name: 'title', title: 'Título', type: 'string', description: 'Ej: Calidad que puedes consultar' }),
        defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 3 }),
        defineField({ name: 'reportName', title: 'Nombre del Reporte (Ejemplo)', type: 'string', description: 'Ej: REPORTE_HPLC-MS.pdf' }),
        defineField({ name: 'status', title: 'Estado del Reporte', type: 'string', description: 'Ej: VERIFICADO' }),
        defineField({
          name: 'statsList',
          title: 'Lista de Estadísticas o Datos del Reporte',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'label', title: 'Etiqueta', type: 'string' }),
                defineField({ name: 'value', title: 'Valor', type: 'string' }),
              ]
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'featuredProducts',
      title: '4. Sección Productos',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Título', type: 'string', description: 'Ej: Nuestros productos' })
      ]
    }),
    defineField({
      name: 'guides',
      title: '5. Sección Guías Prácticas',
      type: 'object',
      fields: [
        defineField({ name: 'headerTag', title: 'Etiqueta Pequeña', type: 'string', description: 'Ej: Recursos Técnicos' }),
        defineField({ name: 'title', title: 'Título', type: 'string', description: 'Ej: Guías prácticas' }),
        defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 3 }),
        defineField({
          name: 'guidesList',
          title: 'Lista de Guías',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Título de la guía', type: 'string' }),
                defineField({ name: 'desc', title: 'Descripción breve', type: 'text', rows: 2 }),
              ]
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'commitment',
      title: '6. Sección Compromiso y Preguntas',
      type: 'object',
      fields: [
        defineField({ name: 'title1', title: 'Título Compromiso', type: 'string', description: 'Ej: Compromiso con la seriedad' }),
        defineField({ name: 'desc1', title: 'Descripción 1', type: 'text', rows: 3 }),
        defineField({ name: 'desc2', title: 'Descripción 2', type: 'text', rows: 3 }),
        defineField({ name: 'title2', title: 'Título Preguntas (Opcional)', type: 'string', description: 'Ej: Preguntas frecuentes' }),
        defineField({
          name: 'faq',
          title: 'Preguntas Frecuentes',
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
        }),
        defineField({ name: 'bannerPrefix', title: 'Prefijo Banner Inferior', type: 'string', description: 'Ej: Uso exclusivo para investigación.' }),
        defineField({ name: 'bannerText', title: 'Texto Banner Inferior', type: 'text', rows: 2 }),
        defineField({ name: 'bannerCtaText', title: 'Texto Botón Banner', type: 'string' }),
        defineField({ name: 'bannerCtaLink', title: 'Enlace Botón Banner', type: 'string' }),
      ]
    })
  ]
})
