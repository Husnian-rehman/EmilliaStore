import BannerSlider from "../component/Banner";
import CardSection from "../component/CardSection";
import FAQAccordion from "../component/FAQAccordion"; 

import { sanityClient } from "@/lib/sanity";
import { BannerType, CardSectionType, FAQSection } from "@/types";

import { getCardSection } from "@/sanity/queries/getCardSection";
import { getAllFAQSectionsQuery } from "@/sanity/queries/faqQueries";

export default async function Home() {
  // Fetch banners
  const banners: BannerType[] = await sanityClient.fetch(`*[_type == "banner"]`);

  // Fetch Card Section
  const cardSection: CardSectionType = await getCardSection();

  // Fetch FAQ Sections
  const faqSections: FAQSection[] = await sanityClient.fetch(getAllFAQSectionsQuery);

  return (
    <main>
      {/* Banner Slider */}
      <BannerSlider banners={banners} />

      {/* Card Section */}
      {cardSection && (
        <CardSection
          sectionTitle={cardSection.sectionTitle}
          cards={cardSection.cards}
        />
      )}

      {/* FAQ Accordion Section */}
      {faqSections.length > 0 && (
        <FAQAccordion data={faqSections[0]} /> // You can choose which section to show
      )}
    </main>
  );
}

