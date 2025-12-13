import { sanityClient } from "@/lib/sanity";
import { AllProductsBreadcrumbType } from "@/types";

export async function getAllProductsBreadcrumb(): Promise<AllProductsBreadcrumbType> {
  return sanityClient.fetch(`
    *[_type == "allProductsBreadcrumb"][0]{
      heading,
      "image": image.asset->url
    }
  `);
}
