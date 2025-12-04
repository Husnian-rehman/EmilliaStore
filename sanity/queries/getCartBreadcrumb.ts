import { sanityClient } from "@/lib/sanity";
import { CartBreadcrumbType } from "@/types";

export async function getCartBreadcrumb(): Promise<CartBreadcrumbType> {
  return sanityClient.fetch(`
    *[_type == "cartBreadcrumb"][0]{
      heading,
      image{ asset->{_id,url} }
    }
  `);
}
