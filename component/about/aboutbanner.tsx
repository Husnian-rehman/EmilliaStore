"use client";

import { AboutBannerType } from "@/types";

interface Props {
  data: AboutBannerType | null;
}

export default function AboutBanner({ data }: Props) {
  if (!data) {
    return <div>Loading or no data available...</div>;
  }

  return (
    <section className="">
      <div className="about-banner w-full grid grid-cols-1 md:grid-cols-2 ">
        {/* Left Side Image */}
      <div className="">
        <img
          src={data.bannerImage}
          alt={data.title}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Right Side Video */}
      <div className=" h-full">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          controls={false}
        >
          <source src={data.bannerVideo} type="video/mp4" />
          Your browser does not support video playback.
        </video>
      </div>
      </div>
    </section>
  );
}
