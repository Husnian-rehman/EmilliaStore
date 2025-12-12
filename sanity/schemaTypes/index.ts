import { type SchemaTypeDefinition } from 'sanity'
import banner from './banner'
import header from './header'
import breadcrumbcontact from './breadcrumbContact'
import cartBreadcrumb from './cartBreadcrumb'
import wishlistBreadcrumb from './wishlistBreadcrumb'
import cardSection from './cardSection'
import faqSection from './faqSection'
import { footer } from './footer'
import services from './services'
import popup from './popup'
import contact from './contact/contact'
import aboutbreadcrumb from './about/aboutbreadcrumb'
import aboutbanner from './about/aboutbanner'
import aboutUsSection from './aboutus'
import aboutDetailSection from './about/aboutdetail'
import faqBreadcrumb from './faq/faqBreadcrumb'
import homeVideo from './video'
import faqPageSection from './faq/faqPageSection'
import marqueeBar from './marqueeBar'



export const schema: { types: SchemaTypeDefinition[] } = {
  types: [contact, marqueeBar, faqPageSection, homeVideo,  aboutDetailSection, aboutUsSection, aboutbreadcrumb,aboutbanner, popup, header, footer, banner, breadcrumbcontact, cartBreadcrumb, wishlistBreadcrumb, cardSection, faqSection,  faqBreadcrumb, services,], 
}
