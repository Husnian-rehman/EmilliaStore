import { sanityClient } from "@/lib/sanity";

export const getAboutBanner = async () => {
  const query = `
    *[_type == "aboutbanner"][0]{
      title,
      "bannerImage": bannerImage.asset->url,
      "bannerVideo": bannerVideo.asset->url
    }
  `;

  return await sanityClient.fetch(query);
};
