

import { getProductByHandle } from "@/lib/shopify";
import ProductDetailClient from "@/component/ProductDetailClient";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;

  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  // Render a client component for interactive behavior (variants, thumbnails, image switching)
  return <ProductDetailClient product={product as any} />;
}
