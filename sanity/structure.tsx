import React from 'react'
import type { StructureResolver } from 'sanity/structure'

const GearIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)

const TagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2H2v10l11 11 10-10L12 2z"/>
    <circle cx="7" cy="7" r="1.5"/>
  </svg>
)
const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
  </svg>
)

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
  </svg>
)

const HelpCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

const PackageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m7.5 4.27 9 5.15"/>
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
    <path d="m3.3 7 8.7 5 8.7-5"/>
    <path d="M12 12v10"/>
  </svg>
)

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Gestión de Contenido KAILAB')
    .items([
      // Singleton de Configuración Global
      S.listItem()
        .title('Configuración Global')
        .icon(GearIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Información de Contacto y Marca')
        ),
      S.listItem()
        .title('Home')
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Contenido del Home')
        ),
      S.listItem()
        .title('Tienda')
        .icon(PackageIcon)
        .child(
          S.list()
            .title('Gestión de Tienda')
            .items([
              S.listItem()
                .title('Configuración')
                .icon(GearIcon)
                .child(
                  S.document()
                    .schemaType('storePage')
                    .documentId('storePage')
                    .title('Contenido de la Tienda')
                ),
              S.listItem()
                .title('Categorías de Productos')
                .icon(TagIcon)
                .child(S.documentTypeList('category').title('Categorías')),
              S.listItem()
                .title('Productos / Péptidos')
                .icon(PackageIcon)
                .child(S.documentTypeList('product').title('Productos')),
            ])
        ),
      S.listItem()
        .title('Guía')
        .icon(BookIcon)
        .child(
          S.document()
            .schemaType('guidesPage')
            .documentId('guidesPage')
            .title('Contenido de Guía')
        ),
      S.listItem()
        .title('Calidad')
        .icon(ShieldIcon)
        .child(
          S.document()
            .schemaType('qualityPage')
            .documentId('qualityPage')
            .title('Contenido de Calidad')
        ),
      S.listItem()
        .title('Ayuda')
        .icon(HelpCircleIcon)
        .child(
          S.document()
            .schemaType('helpPage')
            .documentId('helpPage')
            .title('Contenido de Ayuda')
        ),
    ])
