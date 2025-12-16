// popup file types.ts =======

export type PopupType = {
  _id: string;
  title: string;
  description: string;
  emailPlaceholder: string;
  buttonText: string;
  checkboxText: string;
  discountText: string;
  image: {
    url: string;
    alt?: string;
  };
};

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
  url?: string; // <--- add optional url here so code and types align
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
// faqBreadcrumb.types.ts=====
export interface FaqBreadcrumbType {
  heading: string;
  image: string;
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
// allproductsBreadcrumb.types.ts
export interface AllProductsBreadcrumbType {
  heading: string;
  image: string;
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


// footer type.ts=======================
export interface FooterLink {
  label: string;
  url: string;
}

export interface FooterMenu {
  title: string;
  links: FooterLink[];
}

export interface FooterData {
  logo?: string;
  address?: string;
  menus: FooterMenu[];
  newsletterText?: string;
  copyright?: string;
}

// services types.ts=======================
export interface ServiceItem {
  title: string;
  description: string;
  icon: string; // Sanity icon URL
  link: string; // URL from Sanity
  btnText: string; // Dynamic button text
}

export interface ServiceCategory {
  title: string;
  slug: string;
  services: ServiceItem[];
}

export interface ServicesData {
  title?: string;
  description?: string;
  categories: ServiceCategory[];
}

// alias expected by page.tsx
export type ServicesType = ServicesData;



// contact types.ts=======================
export interface SocialLink {
  name: string;
  icon: { asset: { url: string } };
  url: string;
}

export interface ContactType {
  formTitle: string;
  formDescription: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  messagePlaceholder: string;
  buttonText: string;

  contactHeading: string;
  address: string;
  email: string;
  phone: string;
  openingTime: string;

  socialLinks: SocialLink[];
}

// about page types.ts=======================

  export interface AboutBreadcrumbType {
    heading: string;
    image: any;
  }

  // about banner types.ts=======================
  export interface AboutBannerType {
    title: string;
    bannerImage: string;
    bannerVideo: string;
  }

  //Aboutus type.ts =======================
  export interface AboutUsType {
    mainHeading: string;
    leftImageOne: string;
    leftImageTwo: string;
    rightTitle: string;
    rightDescription: string;
    buttonText: string;
    buttonLink: string;
  }

  // About Detail Section types.ts =======================
  export interface AboutDetailType {
  mainHeading: string;
  leftImageOne: string;
  leftImageTwo: string;
  rightTitle: string;
  rightDescription: string;
  buttonText: string;
  buttonLink: string;
}

// video types.ts=======================

export interface VideoType {
  videoUrl: string;
  thumbnailUrl?: string;
}


// faqpage section types.ts=======================
export interface FAQPageItem {
  question: string;
  answer: string;
}

export interface FAQPageSectionType {
  _id: string;
  title: string;
  subtitle?: string;
  faqs: FAQPageItem[];
}

// marquee bar types.ts=======================
export interface MarqueeItem {
  heading: string;
  iconSvg: string; // raw SVG code
}

export interface MarqueeBarType {
  items: MarqueeItem[];
  speed?: number; // seconds it takes to scroll one full cycle (optional)
}

// Collection section type for frontpage sections
export interface CollectionSectionType {
  title?: string;
  collectionHandle: string;
}
                             