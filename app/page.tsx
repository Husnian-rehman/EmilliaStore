import BannerSlider from "../component/Banner";
import CardSection from "../component/CardSection";
import FAQAccordion from "../component/FAQAccordion";
import Services from "../component/Services"; // default import
import AboutUs from "../component/AboutUs";
import { getAboutUs } from "../sanity/queries/getAboutUs";

import { sanityClient } from "@/lib/sanity";
import { BannerType, CardSectionType, FAQSection, ServicesType } from "@/types";

import { getCardSection } from "@/sanity/queries/getCardSection";
import { getAllFAQSectionsQuery } from "@/sanity/queries/faqQueries";

import { getServices } from "@/sanity/queries/getServices"; // ⬅ NEW

export default async function Home() {
  // Fetch banners
  const banners: BannerType[] = await sanityClient.fetch(`*[_type == "banner"]`);

  // Fetch Card Section
  const cardSection: CardSectionType = await getCardSection();

  // aboutus section
  const aboutSection = await getAboutUs();

  // Fetch FAQ Sections
  const faqSections: FAQSection[] = await sanityClient.fetch(getAllFAQSectionsQuery);

  // Fetch Services Section
  const services: ServicesType | null = await getServices(); // ⬅ NEW

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

      {/* ✔ Services Section Added Here */}
      {services && (
        <Services
          categories={services.categories}
          title={services.title}
          description={services.description}
        />
      )}
      {/* about us  */}
       <AboutUs data={aboutSection} />

      {/* FAQ Accordion Section */}
      {faqSections.length > 0 && (
        <FAQAccordion data={faqSections[0]} />
      )}
    </main>
  );
}
