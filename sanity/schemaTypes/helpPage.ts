import { defineField, defineType } from 'sanity'
import React from 'react'

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

export const helpPageType = defineType({
  name: 'helpPage',
  title: 'Página de Ayuda',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título Interno', type: 'string' }),
    
    // PEDIDOS
    defineField({
      name: 'ordersSection',
      title: 'Sección: Pedidos',
      type: 'object',
      fields: [
        defineField({ name: 'tag', title: 'Etiqueta', type: 'string' }),
        defineField({ name: 'title', title: 'Título Principal', type: 'string' }),
        defineField({
          name: 'faqs',
          title: 'Preguntas',
          type: 'array',
          of: [{
            type: 'object',
            icon: ListIcon,
            fields: [
              defineField({ name: 'q', title: 'Pregunta', type: 'string' }),
              defineField({ 
                name: 'a', 
                title: 'Respuesta (Párrafo)', 
                type: 'text', 
                rows: 4,
                hidden: ({ parent }: any) => parent?.answerList?.length > 0
              }),
              defineField({ 
                name: 'answerList', 
                title: 'Respuesta (Lista de viñetas opcional)', 
                type: 'array', 
                of: [{ type: 'string' }],
                hidden: ({ parent }: any) => !!parent?.a
              }),
            ],
            preview: { select: { title: 'q', subtitle: 'a' } }
          }]
        })
      ]
    }),

    // ENVIOS
    defineField({
      name: 'shippingSection',
      title: 'Sección: Envíos',
      type: 'object',
      fields: [
        defineField({ name: 'tag', title: 'Etiqueta', type: 'string' }),
        defineField({ name: 'title', title: 'Título Principal', type: 'string' }),
        defineField({
          name: 'faqs',
          title: 'Preguntas',
          type: 'array',
          of: [{
            type: 'object',
            icon: ListIcon,
            fields: [
              defineField({ name: 'q', title: 'Pregunta', type: 'string' }),
              defineField({ name: 'a', title: 'Respuesta', type: 'text', rows: 4 }),
            ],
            preview: { select: { title: 'q', subtitle: 'a' } }
          }]
        })
      ]
    }),

    // PAGOS
    defineField({
      name: 'paymentsSection',
      title: 'Sección: Pagos',
      type: 'object',
      fields: [
        defineField({ name: 'tag', title: 'Etiqueta', type: 'string' }),
        defineField({ name: 'title', title: 'Título Principal', type: 'string' }),
        defineField({
          name: 'faqs',
          title: 'Preguntas',
          type: 'array',
          of: [{
            type: 'object',
            icon: ListIcon,
            fields: [
              defineField({ name: 'q', title: 'Pregunta', type: 'string' }),
              defineField({ name: 'a', title: 'Respuesta', type: 'text', rows: 4 }),
            ],
            preview: { select: { title: 'q', subtitle: 'a' } }
          }]
        })
      ]
    }),

    // CERTIFICADOS
    defineField({
      name: 'certificatesSection',
      title: 'Sección: Información y certificados',
      type: 'object',
      fields: [
        defineField({ name: 'tag', title: 'Etiqueta', type: 'string' }),
        defineField({ name: 'title', title: 'Título Principal', type: 'string' }),
        defineField({
          name: 'faqs',
          title: 'Preguntas',
          type: 'array',
          of: [{
            type: 'object',
            icon: ListIcon,
            fields: [
              defineField({ name: 'q', title: 'Pregunta', type: 'string' }),
              defineField({ name: 'a', title: 'Respuesta', type: 'text', rows: 4 }),
            ],
            preview: { select: { title: 'q', subtitle: 'a' } }
          }]
        })
      ]
    }),

    // CONTACTO
    defineField({
      name: 'contactSection',
      title: 'Sección: Contacto directo',
      type: 'object',
      fields: [
        defineField({ name: 'tag', title: 'Etiqueta', type: 'string' }),
        defineField({ name: 'title', title: 'Título Principal', type: 'string' }),
        defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 3 }),
        defineField({ name: 'whatsappBtnLabel', title: 'Botón WhatsApp', type: 'string' }),
        defineField({ name: 'whatsappUrl', title: 'URL WhatsApp', type: 'string' }),
        defineField({ name: 'emailBtnLabel', title: 'Botón Email', type: 'string' }),
        defineField({ name: 'emailAddress', title: 'Email', type: 'string' }),
      ]
    })
  ],
})
