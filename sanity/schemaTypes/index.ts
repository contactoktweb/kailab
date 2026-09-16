import { type SchemaTypeDefinition } from 'sanity'
import { homePageType } from './homePage'
import { siteSettingsType } from './siteSettings'
import { categoryType } from './category'
import { productType } from './product'
import storePage from './storePage'
import { guidesPageType } from './guidesPage'
import { qualityPageType } from './qualityPage'
import { helpPageType } from './helpPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettingsType, homePageType, storePage, categoryType, productType, guidesPageType, qualityPageType, helpPageType],
}
