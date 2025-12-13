"use client";

import React from "react";
import { VideoType } from "@/types";

export default function Video({ data }: { data: VideoType }) {
  if (!data?.videoUrl) return null;

  return (
    <section className="h-[500px] overflow-hidden mb-10">
      <div className="max-w-[1400px] mx-auto h-full">
       <video
        className="w-full h-full object-cover rounded-[20px]"
        autoPlay
        muted
        loop
        controls={false}
        poster={data.thumbnailUrl}
      >
        <source src={data.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      </div>
    </section>
  );
}
