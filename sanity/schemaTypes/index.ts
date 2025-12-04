import { type SchemaTypeDefinition } from 'sanity'
import banner from './banner'
import header from './header'
import breadcrumbcontact from './breadcrumbContact'
import cartBreadcrumb from './cartBreadcrumb'
import wishlistBreadcrumb from './wishlistBreadcrumb'
import cardSection from './cardSection'
import faqSection from './faqSection'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [header, banner, breadcrumbcontact, cartBreadcrumb, wishlistBreadcrumb, cardSection, faqSection], 
}
