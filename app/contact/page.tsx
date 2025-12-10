import BreadcrumbContact from "../../component/BreadcrumbContact";
import { getBreadcrumbContact } from "../../sanity/queries/getBreadcrumbContact";

import Contact from "../../component/Contact/Contact"; // ⬅ import contact component
import { getContact } from "../../sanity/queries/contact/getContact"; // ⬅ query file
import { ContactType } from "@/types"; // ⬅ types

export default async function ContactPage() {
  
  const breadcrumb = await getBreadcrumbContact();
  const contactData: ContactType = await getContact();

  return (
    <main className="">
      {/* Breadcrumb */}
      <BreadcrumbContact data={breadcrumb} pageTitle="Contact" />

      {/* Google Map */}
      <div className="max-w-[1500px] mx-auto px-5 h-[500px] mb-20 mt-20 overflow-hidden">
        <iframe
          className="w-full rounded-[20px] h-full object-cover"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d101737.95503586209!2d73.12506880000001!3d33.6297984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2s!4v1765252451012!5m2!1sen!2s"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Contact Section */}
      <div className="max-w-[1400px] mx-auto mb-20">
         <Contact {...contactData} />
      </div>
      
    </main>
  );
}

