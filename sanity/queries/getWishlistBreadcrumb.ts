import { sanityClient } from "@/lib/sanity";
import { WishlistBreadcrumbType } from "@/types";

export async function getWishlistBreadcrumb(): Promise<WishlistBreadcrumbType> {
  return sanityClient.fetch(`
    *[_type == "wishlistBreadcrumb"][0]{
      heading,
      image{ asset->{_id,url} }
    }
  `);
}
