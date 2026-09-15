import { type SchemaTypeDefinition } from 'sanity'
import { siteSettingsType } from './siteSettings'
import { categoryType } from './category'
import { productType } from './product'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettingsType, categoryType, productType],
}
