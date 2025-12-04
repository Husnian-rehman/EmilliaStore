import { sanityClient } from "@/lib/sanity";
import { BreadcrumbContactType } from "@/types";

export async function getBreadcrumbContact(): Promise<any> {
  return sanityClient.fetch(`
    *[_type == "breadcrumbContact"][0]{
      heading,
      image{ asset->{_id,url} } // returns image.asset.url
    }
  `);
}
