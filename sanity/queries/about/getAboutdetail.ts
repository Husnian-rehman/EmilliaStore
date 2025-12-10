import { sanityClient } from "@/lib/sanity";
import { AboutDetailType } from "@/types";

export async function getAboutDetail(): Promise<AboutDetailType> {
  return sanityClient.fetch(`
    *[_type == "aboutDetailSection"][0]{
      mainHeading,
      "leftImageOne": leftImageOne.asset->url,
      "leftImageTwo": leftImageTwo.asset->url,
      rightTitle,
      rightDescription,
      buttonText,
      buttonLink
    }
  `);
}
