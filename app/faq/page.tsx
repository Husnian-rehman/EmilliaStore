import BreadcrumbContact from "../../component/BreadcrumbContact";
import { getFaqBreadcrumb } from "../../sanity/queries/faq/getFaqBreadcrumb";

export default async function FAQPage() {
  const breadcrumb = await getFaqBreadcrumb();

  return (
    <main>
      <BreadcrumbContact data={breadcrumb} pageTitle="FAQ" />
      {/* FAQ content here */}
    </main>
  );
}
