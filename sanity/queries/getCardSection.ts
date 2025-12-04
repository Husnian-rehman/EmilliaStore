import { sanityClient } from "@/lib/sanity";
import { CardSectionType } from "@/types";

export async function getCardSection(): Promise<CardSectionType> {
  return sanityClient.fetch(`
    *[_type == "cardSection"][0]{
      sectionTitle,
      "cards": cards[]{
        heading,
        description,
        "image": image.asset->url
      }
    }
  `);
}
