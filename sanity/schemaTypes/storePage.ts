import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'storePage',
  title: 'Página de Tienda',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título Principal',
      type: 'string',
      description: 'El título que aparece en la parte superior de la tienda (ej. "Tienda" o "Catálogo de Productos")',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'text',
      description: 'Breve descripción debajo del título',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Configuración de Tienda',
      }
    },
  },
})
