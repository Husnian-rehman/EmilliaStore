import { sanityClient } from "@/lib/sanity";
import { AboutUsType } from "@/types";

export async function getAboutUs(): Promise<AboutUsType> {
  return sanityClient.fetch(`
    *[_type == "aboutUsSection"][0]{
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
