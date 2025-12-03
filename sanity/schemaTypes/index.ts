import { type SchemaTypeDefinition } from 'sanity'
import banner from './banner'
import header from './header'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [header, banner],
}
