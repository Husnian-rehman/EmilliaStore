import { groq } from "next-sanity";
import { FAQPageSectionType } from "@/types";

export const getFAQPageSectionQuery = groq`
  *[_type == "faqPageSection"][0]{
    _id,
    title,
    subtitle,
    faqs[] {
      question,
      answer
    }
  }
`;
