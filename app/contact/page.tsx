import BreadcrumbContact from "../../component/BreadcrumbContact";
import { getBreadcrumbContact } from "../../sanity/queries/getBreadcrumbContact";

export default async function ContactPage() {
  const breadcrumb = await getBreadcrumbContact();
  return (
    <main className="">
      <BreadcrumbContact data={breadcrumb} pageTitle="Contact" />
    </main>
  );
}
