"use client";

import Image from "next/image";
import { ContactType } from "@/types";

const Contact = ({
  formTitle,
  formDescription,
  namePlaceholder,
  emailPlaceholder,
  phonePlaceholder,
  messagePlaceholder,
  buttonText,

  contactHeading,
  address,
  email,
  phone,
  openingTime,
  socialLinks,
}: ContactType) => {
  return (
    <section className="contact-wrapper w-full md:py-12 py-6 px-5">

      {/* Left Form Side */}
      <div className="flex lg:flex-row flex-col md:gap-20 gap-10">
        
        <div className="lg:w-[70%]">
          <h2 className="text-[20px] font-bold mb-1">{formTitle}</h2>
          <p className="mb-6 text-gray-400 md:w-[70%]">{formDescription}</p>

          <form className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text " placeholder={namePlaceholder} className="border-gray-600 border p-3 rounded-md text-gray-400 uppercase text-[14px]  " />
              <input type="email" placeholder={emailPlaceholder} className="border-gray-600 border p-3 rounded-md text-gray-400 uppercase text-[14px]  " />
          </div>
            <input type="text" placeholder={phonePlaceholder} className="border-gray-600 border p-3 rounded-md text-gray-400 uppercase text-[14px]  " />
            <textarea placeholder={messagePlaceholder} className="border-gray-600 border p-3 rounded-md min-h-[160px] text-gray-400 uppercase text-[14px] " />
            <button className="bg-black text-white border border-black rounded-full overflow-hidden px-8 py-3 w-fit cursor-pointer transition-all ease-in-out duration-500 relative group">
              <span className="relative z-[5] font-[600] group-hover:text-black transition-all ease-in-out duration-500">{buttonText}</span>
              <span className="absolute top-0  w-full h-full right-[-115px] group-hover:right-0 bg-white z-[2] transition-all ease-in-out duration-500"></span>
            </button>
          </form>
        </div>

        {/* Right Contact Info Side */}
        <div className="lg:pt-20 pt-5">
          <h3 className="text-xl font-semibold mb-4">{contactHeading}</h3>
          <p className="text-gray-500 mb-4"><strong className="font-bold text-xl text-black" >Address:</strong> {address}</p>
          <p className="text-gray-500 mb-4"><strong className="font-bold text-xl text-black">Email:</strong> {email}</p>
          <p className="text-gray-500 mb-4"><strong className="font-bold text-xl text-black">Phone:</strong> {phone}</p>
          <p className="text-gray-500 mb-4" ><strong className="font-bold text-xl text-black">Opening Time:</strong> {openingTime}</p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            {socialLinks?.map((item, i) => (
              <a key={i} href={item.url} target="_blank" className="border rounded-full overflow-hidden p-1">
                <Image 
                  src={item.icon?.asset?.url} 
                  alt={item.name} 
                  width={20}
                  height={20}
                />
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
