

import { getProductByHandle } from "@/lib/shopify";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ShopifyProduct } from "@/lib/shopify/types";

export default async function ProductDetailPage({ params }: { params: { handle: string } }) {
  const handle = params.handle;

  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const selectedImage = product.featuredImage?.url || "";

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      
      {/* Left: Images */}
      <div className="flex flex-col gap-4">
        <div className="w-full h-[500px] relative">
          <Image
            src={selectedImage || "/placeholder.png"}
            alt={product.title}
            fill
            className="object-cover rounded-md"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2">
          {/* Currently we have only one image from Shopify, add more if product.images exist */}
          {product.featuredImage && (
            <div className="w-20 h-20 border border-gray-200 rounded-md overflow-hidden">
              <Image
                src={product.featuredImage.url}
                alt={product.title}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>

        {/* Star rating placeholder */}
        <div className="flex items-center gap-2">
          <span>⭐⭐⭐⭐⭐</span>
          <span className="text-gray-500">(4.9)</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">{product.price ? `$${product.price}` : 'Price not available'}</span>
          {product.compareAtPrice && (
            <span className="text-gray-400 line-through">${product.compareAtPrice}</span>
          )}
        </div>

        {/* Variants (Size / Color placeholder) */}
        <div className="flex flex-col gap-2 mt-4">
          <div>
            <h3 className="font-medium">Available Size</h3>
            <div className="flex gap-2 mt-1">
              {["S", "M", "L"].map((size) => (
                <button
                  key={size}
                  className="border px-3 py-1 rounded-md hover:border-black"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium">Available Color</h3>
            <div className="flex gap-2 mt-1">
              {["black", "gray"].map((color) => (
                <button
                  key={color}
                  className={`w-6 h-6 rounded-full border ${
                    color === "black" ? "bg-black" : "bg-gray-400"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>

        {/* Add to Cart */}
        {product.variantId ? (
          <form action="/api/cart" method="POST" className="mt-4">
            <input type="hidden" name="variantId" value={product.variantId} />
            <input type="hidden" name="quantity" value="1" />
            <button type="submit" className="bg-black text-white px-6 py-2 rounded-md">
              Add to Cart
            </button>
          </form>
        ) : (
          <div className="mt-4 text-gray-500">This product is not available for purchase.</div>
        )}

        {/* Description */}
        <div className="mt-6">
          <h3 className="font-medium mb-1">Description</h3>
          <div dangerouslySetInnerHTML={{ __html: product.description || '' }} />
        </div>
      </div>
    </div>
  );
}
