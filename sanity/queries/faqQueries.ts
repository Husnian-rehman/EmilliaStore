import { groq } from "next-sanity";
import { FAQSection } from "@/types";

/**
 * Fetch all FAQ sections from Sanity
 */
export const getAllFAQSectionsQuery = groq`
  *[_type == "faqSection"]{
    _id,
    title,
    subtitle,
    faqs[]{
      question,
      answer
    }
  }
`;

/**
 * Fetch a single FAQ section by ID
 */
export const getFAQSectionByIdQuery = (id: string) => groq`
  *[_type == "faqSection" && _id == "${id}"][0]{
    _id,
    title,
    subtitle,
    faqs[]{
      question,
      answer
    }
  }
`;
