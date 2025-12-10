import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanity";
import { PopupType } from "@/types";

export async function getPopup(): Promise<PopupType | null> {
  const query = groq`*[_type == "popup"][0]{
    _id,
    title,
    description,
    emailPlaceholder,
    buttonText,
    checkboxText,
    discountText,
    "image": {
      "url": image.asset->url,
      alt
    }
  }`;

  return await sanityClient.fetch(query);
}
