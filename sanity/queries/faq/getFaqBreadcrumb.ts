import { sanityClient } from "@/lib/sanity";
import { FaqBreadcrumbType } from "@/types";

export async function getFaqBreadcrumb(): Promise<FaqBreadcrumbType> {
  return sanityClient.fetch(`
    *[_type == "faqBreadcrumb"][0]{
      heading,
      "image": image.asset->url
    }
  `);
}
