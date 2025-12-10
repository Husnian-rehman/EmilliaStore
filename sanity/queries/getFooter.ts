import { sanityClient } from "@/lib/sanity";
import { FooterData } from "@/types";

// GROQ Query
export const footerQuery = `
  *[_type == "footer"][0]{
    "logo": logo.asset->url,
    address,
    menus[]{
      title,
      links[]{
        label,
        url
      }
    },
    newsletterText,
    copyright
  }
`;

// Fetch function
export async function getFooter(): Promise<FooterData> {
  return await sanityClient.fetch(footerQuery);
}
