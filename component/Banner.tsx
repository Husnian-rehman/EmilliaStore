"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { urlForImage } from "@/lib/sanity";
import { BannerType } from "@/types";

interface BannerSliderProps {
  banners: BannerType[];
}

const BannerSlider: React.FC<BannerSliderProps> = ({ banners }) => {
  return (
    <Swiper
    className="banner"
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      loop
      // autoplay={{ delay: 5000 }}
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner._id}>
          <div
            className=" relative w-full md:min-h-screen min-h-[70vh] flex items-end justify-start bg-cover bg-center"
            style={{
              backgroundImage: `url(${urlForImage(banner.image).url()})`,
            }}
          >
            <div className="max-w-[1500px] mx-auto px-5 w-full">
              <div className=" md:pb-50 pb-30 max-w-[520px] text-white rounded">
                  <h2 className="text-[16px] uppercase tracking-wider mb-[15px]">{banner.subtitle}</h2>
                  <h1 className="sm:text-[40px] text-[30px] sm:leading-[60px] leading-[50px] font-bold mb-[15px]">{banner.title}</h1>
                  <p className="mb-[30px] text-[16px] font-[400]">{banner.description}</p>
                  {banner.buttonUrl && (
                    <a
                      href={banner.buttonUrl}
                      className="bg-white relative font-[700] text-black px-6 sm:py-5 py-4 overflow-hidden rounded-full flex w-fit hover:text-white group"
                    >
                     <span className="relative z-[2] transtion-all duration-600 ease-in-out flex justify-center items-center gap-3"> 
                      {banner.buttonText || "Shop Now"}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="w-5 h-5 inline-block rotate-[-44deg]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                      </span>
                      <span className="w-0 bg-black absolute h-full z-[1] top-0  right-[-1px]  group-hover:w-full group-hover:right-0  transtion-all duration-600 ease-in-out "></span>
                    </a>
                  )}
                </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerSlider;
