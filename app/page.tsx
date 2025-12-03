import BannerSlider from "../component/Banner";
import { Header } from "../component/Header";
import { sanityClient } from "@/lib/sanity";
import { BannerType } from "@/types";

export default async function Home() {
  const banners: BannerType[] = await sanityClient.fetch(`*[_type == "banner"]`);


  return (
    <main>
      {/* Banner Slider */}
      <BannerSlider banners={banners} />
    </main>
  );
}

