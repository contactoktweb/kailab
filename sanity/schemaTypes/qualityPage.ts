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

const CheckIcon = () =>
  React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '1em', height: '1em', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('polyline', { points: '20 6 9 17 4 12' })
  )

const MicroscopeIcon = () =>
  React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '1em', height: '1em', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('path', { d: 'M6 18h8' }),
    React.createElement('path', { d: 'M3 22h18' }),
    React.createElement('path', { d: 'M14 22a7 7 0 1 0 0-14h-1' }),
    React.createElement('path', { d: 'M9 14h2' }),
    React.createElement('path', { d: 'M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z' }),
    React.createElement('path', { d: 'M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3' })
  )

const ChartIcon = () =>
  React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '1em', height: '1em', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('line', { x1: '18', y1: '20', x2: '18', y2: '10' }),
    React.createElement('line', { x1: '12', y1: '20', x2: '12', y2: '4' }),
    React.createElement('line', { x1: '6', y1: '20', x2: '6', y2: '14' }),
    React.createElement('line', { x1: '3', y1: '20', x2: '21', y2: '20' })
  )

const CardIcon = () =>
  React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '1em', height: '1em', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('rect', { x: '3', y: '5', width: '18', height: '14', rx: '2', ry: '2' }),
    React.createElement('line', { x1: '3', y1: '10', x2: '21', y2: '10' })
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
      name: 'searchSection',
      title: 'Sección: Encuentra un certificado',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Título (ej. Encuentra un certificado)', type: 'string' }),
        defineField({ name: 'label', title: 'Etiqueta del buscador', type: 'string' }),
        defineField({ name: 'placeholder', title: 'Placeholder del buscador', type: 'string' }),
        defineField({ name: 'buttonLabel', title: 'Texto del botón', type: 'string' }),
        defineField({ name: 'helpText', title: 'Texto de ayuda (debajo del buscador)', type: 'string' }),
      ]
    }),
    defineField({
      name: 'listSection',
      title: 'Sección: Certificados disponibles',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 2 }),
        defineField({ name: 'loteLabel', title: 'Etiqueta: Lote', type: 'string' }),
        defineField({ name: 'labLabel', title: 'Etiqueta: Laboratorio', type: 'string' }),
        defineField({ name: 'dateLabel', title: 'Etiqueta: Fecha Análisis', type: 'string' }),
        defineField({ name: 'btnDetail', title: 'Botón: Ver detalle', type: 'string' }),
        defineField({ name: 'btnProduct', title: 'Botón: Ver producto', type: 'string' }),
        defineField({
          name: 'certificates',
          title: 'Certificados (Tarjetas)',
          type: 'array',
          of: [
            {
              type: 'object',
              icon: CardIcon,
              fields: [
                defineField({ name: 'id', title: 'Identificador único (ej. janoshik-223529)', type: 'string' }),
                defineField({ name: 'product', title: 'Producto', type: 'string' }),
                defineField({ name: 'lote', title: 'Lote', type: 'string' }),
                defineField({ name: 'laboratorio', title: 'Laboratorio', type: 'string' }),
                defineField({ name: 'fecha', title: 'Fecha', type: 'string' }),
                defineField({ name: 'estado', title: 'Estado (ej. Lote vigente)', type: 'string' }),
                defineField({ name: 'informe', title: 'Número de informe', type: 'string' }),
                defineField({ name: 'enlaceProducto', title: 'Enlace al producto', type: 'string' }),
                
                // Datos para el panel de detalles (derecha)
                defineField({ name: 'cantidadMedida', title: 'Cantidad Medida (ej. 10,74 mg)', type: 'string' }),
                defineField({ name: 'pureza', title: 'Pureza por HPLC (ej. 99,191 %)', type: 'string' }),
                defineField({ name: 'alcance', title: 'Texto: Alcance del análisis', type: 'text', rows: 3 }),
                defineField({ name: 'pdfUrl', title: 'URL del PDF', type: 'string' }),
              ],
              preview: {
                select: { title: 'product', subtitle: 'lote' }
              }
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'detailSection',
      title: 'Sección: Certificados y lotes',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Título Principal', type: 'string' }),
        defineField({ name: 'description', title: 'Descripción Principal', type: 'text', rows: 2 }),
        defineField({ name: 'resultsTitle', title: 'Subtítulo: Resultados del análisis', type: 'string' }),
        defineField({ name: 'amountLabel', title: 'Etiqueta: Cantidad medida', type: 'string' }),
        defineField({ name: 'purityLabel', title: 'Etiqueta: Pureza por HPLC', type: 'string' }),
        defineField({ name: 'scopeTitle', title: 'Subtítulo: Alcance del análisis', type: 'string' }),
        defineField({ name: 'btnProduct', title: 'Botón: Ver producto', type: 'string' }),
        defineField({ name: 'btnOpen', title: 'Botón: Abrir certificado', type: 'string' }),
        defineField({ name: 'btnPdf', title: 'Botón: Ver cromatograma', type: 'string' }),
        defineField({ name: 'emptyStateText', title: 'Texto vacío (cuando no hay selección)', type: 'string' }),
      ]
    }),
    defineField({
      name: 'verificationSection',
      title: 'Sección: Proceso de Verificación',
      type: 'object',
      fields: [
        defineField({ name: 'tag', title: 'Etiqueta (ej. Proceso de Verificación)', type: 'string' }),
        defineField({ name: 'title', title: 'Título Principal', type: 'string' }),
        defineField({ name: 'description', title: 'Descripción Principal', type: 'text', rows: 2 }),
        defineField({
          name: 'steps',
          title: 'Pasos de verificación',
          type: 'array',
          of: [
            {
              type: 'object',
              icon: CheckIcon,
              fields: [
                defineField({ name: 'stepLabel', title: 'Etiqueta de paso (ej. PASO 1 / 3)', type: 'string' }),
                defineField({ name: 'title', title: 'Título del paso', type: 'string' }),
                defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 3 }),
                
                // Widget fields
                defineField({ name: 'widgetMainText', title: 'Texto principal del widget (ej. LOTE #317558)', type: 'string' }),
                defineField({ name: 'widgetBadgeText', title: 'Texto badge del widget (ej. 100% MATCH)', type: 'string' }),
                
                // Footer fields
                defineField({ name: 'footerText', title: 'Texto inferior (ej. Etiqueta vs Informe)', type: 'string' }),
              ],
              preview: {
                select: { title: 'title', subtitle: 'stepLabel' }
              }
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'metricsSection',
      title: 'Sección: Métricas Analíticas',
      type: 'object',
      fields: [
        defineField({ name: 'tag', title: 'Etiqueta', type: 'string' }),
        defineField({ name: 'title', title: 'Título Principal', type: 'string' }),
        defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 2 }),
        defineField({
          name: 'metrics',
          title: 'Métricas',
          type: 'array',
          of: [
            {
              type: 'object',
              icon: ChartIcon,
              fields: [
                defineField({ name: 'tag', title: 'Etiqueta de la métrica (ej. LC-MS)', type: 'string' }),
                defineField({ name: 'title', title: 'Título de la métrica (ej. Identidad)', type: 'string' }),
                defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 3 }),
                
                // Widget fields
                defineField({ name: 'widgetTitle', title: 'Título del widget (ej. ESTRUCTURA MS)', type: 'string' }),
                defineField({ name: 'widgetBadge', title: 'Badge del widget (ej. COINCIDENTE)', type: 'string' }),
                
                // Additional widget text for "Cantidad"
                defineField({ 
                  name: 'widgetSubtext1', 
                  title: 'Subtexto 1 (ej. Objetivo: 10.0 mg)', 
                  type: 'string',
                  hidden: ({ parent }) => parent?.title !== 'Cantidad'
                }),
                defineField({ 
                  name: 'widgetSubtext2', 
                  title: 'Subtexto 2 (ej. +0.74 mg)', 
                  type: 'string',
                  hidden: ({ parent }) => parent?.title !== 'Cantidad'
                }),
              ],
              preview: {
                select: { title: 'title', subtitle: 'tag' }
              }
            }
          ]
        }),
        defineField({ name: 'guideLinkLabel', title: 'Etiqueta del enlace de la guía', type: 'string' }),
        defineField({ name: 'guideLinkUrl', title: 'URL del enlace de la guía', type: 'string' }),
      ]
    }),
    defineField({
      name: 'identificationSection',
      title: 'Sección: Cómo identifica el laboratorio',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Título Principal', type: 'string' }),
        defineField({ name: 'description', title: 'Descripción Principal', type: 'text', rows: 3 }),
        defineField({
          name: 'methods',
          title: 'Métodos (Tarjetas derecha)',
          type: 'array',
          of: [
            {
              type: 'object',
              icon: MicroscopeIcon,
              fields: [
                defineField({ name: 'tag', title: 'Etiqueta (ej. HPLC o UHPLC)', type: 'string' }),
                defineField({ name: 'title', title: 'Título', type: 'string' }),
                defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 3 }),
              ],
              preview: {
                select: { title: 'title', subtitle: 'tag' }
              }
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'interpretationSection',
      title: 'Sección: Qué significa el resultado',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Título Principal', type: 'string' }),
        defineField({ name: 'description', title: 'Descripción Principal', type: 'text', rows: 3 }),
        defineField({
          name: 'cards',
          title: 'Tarjetas explicativas',
          type: 'array',
          of: [
            {
              type: 'object',
              icon: CardIcon,
              fields: [
                defineField({ name: 'title', title: 'Título de la tarjeta', type: 'string' }),
                defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 4 }),
              ],
              preview: {
                select: { title: 'title', subtitle: 'description' }
              }
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'faqSection',
      title: 'Sección: Preguntas Frecuentes',
      type: 'object',
      fields: [
        defineField({ name: 'tag', title: 'Etiqueta superior', type: 'string' }),
        defineField({ name: 'title', title: 'Título Principal', type: 'string' }),
        defineField({ name: 'description', title: 'Descripción Principal', type: 'text', rows: 3 }),
        defineField({ name: 'contactTitle', title: 'Título Caja Contacto', type: 'string' }),
        defineField({ name: 'contactDesc', title: 'Descripción Caja Contacto', type: 'string' }),
        defineField({ name: 'contactBtnLabel', title: 'Botón de Contacto', type: 'string' }),
        defineField({ name: 'contactBtnUrl', title: 'Enlace de WhatsApp', type: 'string' }),
        defineField({
          name: 'faqs',
          title: 'Preguntas y Respuestas',
          type: 'array',
          of: [
            {
              type: 'object',
              icon: ListIcon,
              fields: [
                defineField({ name: 'q', title: 'Pregunta', type: 'string' }),
                defineField({ name: 'a', title: 'Respuesta', type: 'text', rows: 4 }),
              ],
              preview: {
                select: { title: 'q', subtitle: 'a' }
              }
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'catalogSection',
      title: 'Sección: Catálogo',
      type: 'object',
      fields: [
        defineField({ name: 'tag', title: 'Etiqueta', type: 'string' }),
        defineField({ name: 'titleNormal', title: 'Título (Parte Normal)', type: 'string' }),
        defineField({ name: 'titleHighlight', title: 'Título (Parte Resaltada Azul)', type: 'string' }),
        defineField({ name: 'titleEnd', title: 'Título (Parte Final)', type: 'string' }),
        defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 3 }),
        defineField({ name: 'btnLabel', title: 'Texto del Botón', type: 'string' }),
        defineField({ name: 'btnUrl', title: 'URL del Botón', type: 'string' }),
      ]
    }),
  ],
})
