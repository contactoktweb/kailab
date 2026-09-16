import React from 'react'
import { defineField, defineType } from 'sanity'

// GearIcon sin JSX para compatibilidad con archivos .ts
const GearIcon = () =>
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
    React.createElement('path', {
      d: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z',
    }),
    React.createElement('circle', { cx: '12', cy: '12', r: '3' })
  )

const LinkIcon = () =>
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
    React.createElement('path', {
      d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71',
    }),
    React.createElement('path', {
      d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
    })
  )

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Configuración Global del Sitio',
  type: 'document',
  icon: GearIcon,
  fields: [
    defineField({
      name: 'siteName',
      title: 'Nombre de la Marca / Empresa',
      description: 'Nombre visible de la plataforma (Ej: KAILAB Research Labs)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo Principal',
      description: 'Imagen del logo oficial en formato PNG o SVG con fondo transparente',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'email',
      title: 'Correo Electrónico de Contacto',
      description: 'Email de atención a clientes y solicitudes técnicas (Ej: contacto@kailab.co)',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Teléfono / WhatsApp de Contacto',
      description: 'Número oficial de atención (Ej: +57 300 000 0000)',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Dirección Física u Oficina',
      description: 'Ubicación de la sede principal o ciudad (Ej: Medellín, Colombia)',
      type: 'string',
    }),
    defineField({
      name: 'workingHours',
      title: 'Horario de Atención',
      description: 'Horario comercial visible para clientes (Ej: Lunes a Viernes 8:00 AM - 5:00 PM)',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Redes Sociales y Canales de Comunicación',
      description: 'Enlaces directos a perfiles sociales (WhatsApp, Instagram, LinkedIn, etc.)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialItem',
          title: 'Red Social',
          icon: LinkIcon,
          fields: [
            defineField({
              name: 'platform',
              title: 'Plataforma / Red',
              description: 'Nombre de la red (Ej: Instagram, WhatsApp, LinkedIn)',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'Enlace / URL',
              description: 'URL completa al perfil o enlace wa.me',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'footerNotice',
      title: 'Aviso Legal del Pie de Página',
      description: 'Texto legal de exención (Ej: Productos de Uso Exclusivo para Investigación - RUO)',
      type: 'text',
      rows: 2,
    }),
  ],
})
