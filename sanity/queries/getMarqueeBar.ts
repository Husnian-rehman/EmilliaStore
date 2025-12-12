import { sanityClient } from "@/lib/sanity";
import { MarqueeBarType } from "@/types";

export async function getMarqueeBar(): Promise<MarqueeBarType> {
  return sanityClient.fetch(`
    *[_type == "marqueeBar"][0]{
      items[]{ heading, iconSvg },
      "speed": coalesce(speed, 20)
    }
  `);
}
