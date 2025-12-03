// header 
// types.ts
export interface MegaMenuItem {
  title: string
  megaContent?: {
    links: { title: string; url: string }[]
    featuredProduct?: {
      title: string
      price: number
      image: any
    }
  }[]
}

export interface Menu {
  title: string
  items: MegaMenuItem[]
}

export interface RightLink {
  title: string
  url: string
  icon: any
}

export interface HeaderProps {
  logo: any
  menus: Menu[]
  rightLinks: RightLink[]
}


// banner type
export interface BannerType {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  image: any;
}


