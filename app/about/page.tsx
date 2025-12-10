import BreadcrumbContact from "../../component/BreadcrumbContact";
import { getaboutbreadcrumb } from "../../sanity/queries/about/getaboutbreadcrumb";
import AboutBanner from "../../component/about/aboutbanner";
import AboutUs from "../../component/AboutUs";
import { getAboutBanner } from "../../sanity/queries/about/getAboutBanner";
import { getAboutDetail } from "@/sanity/queries/about/getAboutdetail";
export default async function AboutPage() {
  const breadcrumb = await getaboutbreadcrumb();
  const aboutData = await getAboutBanner();
  const aboutdetail = await getAboutDetail();
  return (
    <main>
        <BreadcrumbContact data={breadcrumb} pageTitle="About" />
        <AboutBanner data={aboutData} />
        <AboutUs data={aboutdetail} />
    </main>
  );
}