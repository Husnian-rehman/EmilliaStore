import { sanityClient } from "@/lib/sanity";
import { VideoType } from "@/types";

export const getVideo = async (): Promise<VideoType> => {
  const query = `*[_type == "homeVideo"][0]{
    "videoUrl": videoFile.asset->url,
    "thumbnailUrl": thumbnail.asset->url
  }`;

  return sanityClient.fetch(query);
};
