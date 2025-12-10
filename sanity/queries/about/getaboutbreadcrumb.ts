import { sanityClient } from "@/lib/sanity";
import { CartBreadcrumbType } from "@/types"; // same type works

export async function getaboutbreadcrumb(): Promise<CartBreadcrumbType> {
  return sanityClient.fetch(`
    *[_type == "aboutbreadcrumb"][0]{
      heading,
      image{ asset->{_id,url} }
    }
  `);
}