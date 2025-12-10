import { groq } from "next-sanity";
import { sanityClient as client } from "@/lib/sanity";

export const getContact = async () => {
  return await client.fetch(
    groq`*[_type == "contact"][0]{
      formTitle,
      formDescription,
      namePlaceholder,
      emailPlaceholder,
      phonePlaceholder,
      messagePlaceholder,
      buttonText,

      contactHeading,
      address,
      email,
      phone,
      openingTime,

      socialLinks[]{
        name,
        url,
        icon{
          asset->{url}
        }
      }
    }`
  );
};
