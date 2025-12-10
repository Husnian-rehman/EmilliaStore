"use client";

import Image from "next/image";
import { AboutUsType } from "@/types";

interface Props {
  data: AboutUsType;
}

export default function AboutUs({ data }: Props) {
  return (
    <section className="max-w-[1400px] mx-auto px-4 py-16">
      <div>
        {/* Top Main Heading */}
      <h2 className="text-4xl font-bold text-center mb-12">
        {data.mainHeading}
      </h2>

      <div className="flex md:flex-row flex-col gap-10 items-center">

        {/* Left Side Two Images */}
        <div className="relative md:w-[45%] pb-[80px] ">
          <Image
            src={data.leftImageOne}
            width={600}
            height={600}
            alt="About First Image"
            className="w-[60%] rounded-xl object-cover"
          />

          <Image
            src={data.leftImageTwo}
            width={600}
            height={600}
            alt="About Second Image"
            className="w-[60%] absolute  bottom-0 right-0 ml-auto rounded-xl object-cover"
          />
        </div>

        {/* Right Side Text */}
        <div className="md:w-[55%]">
          <h3 className="text-3xl font-semibold mb-4">{data.rightTitle}</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {data.rightDescription}
          </p>

          <a
            href={data.buttonLink}
            className="px-6 py-3 bg-black text-white rounded-lg inline-block hover:bg-gray-800 transition"
          >
             {data.buttonText}
          </a>
        </div>
      </div>
      </div>
    </section>
  );
}
