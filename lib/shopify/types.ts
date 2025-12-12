export interface ShopifyImage {
  url: string;
  altText?: string;
}

export interface ShopifyVariant {
  id: string;
  title?: string;
  price: { amount: string };
  compareAtPrice?: { amount: string };
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  featuredImage?: ShopifyImage;
  images?: ShopifyImage[];
  description?: string;
  variantId: string;
  price: string;
  compareAtPrice?: string | null;
  variants?: ShopifyVariant[];
}
