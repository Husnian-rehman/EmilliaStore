// =======================
// Header / Mega Menu Types
// =======================

export interface MegaMenuItem {
  title: string;
  megaContent?: {
    links: { title: string; url: string }[];
    featuredProduct?: {
      title: string;
      price: number;
      image: any;
    };
  }[];
}

export interface Menu {
  title: string;
  items: MegaMenuItem[];
}

export interface RightLink {
  title: string;
  url: string;
  icon: any;
}

export interface HeaderProps {
  logo: any;
  menus: Menu[];
  rightLinks: RightLink[];
}

// =======================
// Banner Types
// =======================

export interface BannerType {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  image: any;
}

// =======================
// Breadcrumb / Contact Page Types
// =======================

export interface BreadcrumbContactType {
  heading: string;
  image: any; 
}


// cartBreadcrumb.types.ts
export interface CartBreadcrumbType {
  heading: string;
  image: any; 
}

// wishlistBreadcrumb.types.ts
export interface WishlistBreadcrumbType {
  heading: string;
  image: any; 
}


// cardsection.types.ts
export interface CardType {
  heading: string;
  description: string;
  image: any; // Sanity image object
}

export interface CardSectionType {
  sectionTitle?: string;
  cards: CardType[];
}



// faq section types
export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSection {
  _id: string;
  title: string;
  subtitle?: string;
  faqs: FAQItem[];
}


// =======================