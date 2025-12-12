import BannerSlider from "../component/Banner";
import CardSection from "../component/CardSection";
import FAQAccordion from "../component/FAQAccordion";
import Services from "../component/Services"; // default import
import AboutUs from "../component/AboutUs";
import { getAboutUs } from "../sanity/queries/getAboutUs";
import Video from "../component/Video";

import { sanityClient } from "@/lib/sanity";
import { BannerType, CardSectionType, FAQSection, ServicesType } from "@/types";

import { getCardSection } from "@/sanity/queries/getCardSection";
import { getAllFAQSectionsQuery } from "@/sanity/queries/faqQueries";

import { getServices } from "@/sanity/queries/getServices"; // ⬅ NEW

import { getVideo } from "@/sanity/queries/getVideo";

import { getMarqueeBar } from "@/sanity/queries/getMarqueeBar";
import MarqueeBar from "../component/MarqueeBar";


export default async function Home() {
  // Fetch banners
  const banners: BannerType[] = await sanityClient.fetch(`*[_type == "banner"]`);
 
  // Fetch marquee bar data
  const marquee = await getMarqueeBar();

  // Fetch Card Section
  const cardSection: CardSectionType = await getCardSection();

  // aboutus section
  const aboutSection = await getAboutUs();

  // Fetch FAQ Sections
  const faqSections: FAQSection[] = await sanityClient.fetch(getAllFAQSectionsQuery);

  // Fetch Services Section
  const services: ServicesType | null = await getServices(); // ⬅ NEW

  // Fetch Video Data
   const videoData = await getVideo();
  return (
    <main>
      {/* Banner Slider */}
      <BannerSlider banners={banners} />
       <MarqueeBar data={marquee} />
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

      {/* video section */}
        <Video data={videoData} />
    </main>
  );
}
