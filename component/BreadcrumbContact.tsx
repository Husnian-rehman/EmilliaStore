import Image from "next/image";
import Link from "next/link";
import { BreadcrumbContactType } from "@/types";

interface BreadcrumbContactProps {
  data: BreadcrumbContactType;
  pageTitle: string;
}

export default function BreadcrumbContact({ data, pageTitle }: BreadcrumbContactProps) {
  // hide when no data or no image
  if (!data) return null;
  const imgUrl = data?.image?.asset?.url ?? null;
  if (!imgUrl && !data?.heading && !pageTitle) return null;

  return (
    <section className="relative h-[400px] flex items-center">
      {/* Background Image */}
      {imgUrl && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={imgUrl}
            alt={data.heading ?? pageTitle ?? "Breadcrumb background"}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>
      )}
      <div className="absolute top-0 right-0 bg-[#00000014]  w-full h-full"></div>

      <div className="relative z-10  text-center w-full px-4">
        <h1 className="text-[40px] font-bold text-white mb-4">{data.heading}</h1>
        {/* <h1 className="text-[40px] font-bold text-white mb-4">{pageTitle ?? data.heading}</h1> */}
          {/* Breadcrumb */}
        <div className="text-[18px] font-bold text-white">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="px-2">/</span>
          <span>{pageTitle}</span>
        </div>
      </div>
    
    </section>
  );
}
