import BreadcrumbContact from "../../component/BreadcrumbContact";
import { getFaqBreadcrumb } from "../../sanity/queries/faq/getFaqBreadcrumb";
import FAQAccordion from "../../component/FAQAccordion";
import { getFAQPageSectionQuery } from "@/sanity/queries/faq/faqPageQueries";
import { sanityClient } from "@/lib/sanity";
import { FAQPageSectionType } from "@/types";
export default async function FAQPage() {
  const breadcrumb = await getFaqBreadcrumb();
// Fetch FAQ Sections
  // Fetch new FAQ Page Section
  const faqPageData: FAQPageSectionType = await sanityClient.fetch(
    getFAQPageSectionQuery
  );

  return (
    <main>
      <BreadcrumbContact data={breadcrumb} pageTitle="FAQ" />

        {/* New: FAQ Page Section */}
      {faqPageData?.faqs?.length > 0 && (
        <FAQAccordion data={faqPageData} />
      )}
      {/* FAQ content here */}
    </main>
  );
}
