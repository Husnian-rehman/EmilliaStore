import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import CheckoutButton from "./CheckoutButton";
import { getProductsByCollection } from "@/lib/shopify";

export default async function CollectionSection({
  collectionHandle,
  title,
  description,
}: {
  collectionHandle: string;
  title?: string;
  description?: string;
}) {
  // normalize handle
  const handle = String(collectionHandle || "").trim();
  console.info("CollectionSection: fetching collection handle:", handle);
  const products = await getProductsByCollection(handle);
  if (!products || products.length === 0) {
    return (
      <section>
        <div className="max-w-[1500px] mx-auto pt-12 pb-12 px-5">
          {title && <h2 className="text-2xl font-bold mb-2">{title}</h2>}
          {description && <p className="text-gray-600 mb-6">{description}</p>}
          <div className="text-gray-500">No products found for this collection: {handle || "(empty handle)"}.</div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="max-w-[1500px] mx-auto pt-20 pb-12 px-5">
        {title && <h2 className="text-3xl  font-bold mb-3 text-black">{title}</h2>}
        {description && <p className="text-gray-600 mb-6">{description}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.handle} className="border rounded-lg p-4">
              <Link href={`/allproducts/${product.handle}`}>
                <div className="w-full h-64 relative mb-4 cursor-pointer">
                  <Image
                    src={product.featuredImage?.url || "/placeholder.png"}
                    alt={product.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </Link>

              <h2 className="text-lg font-semibold mb-2">
                <Link href={`/allproducts/${product.handle}`}>{product.title}</Link>
              </h2>

              <div className="mb-4">
                <span className="text-xl font-bold">${product.price}</span>
                {product.compareAtPrice && (
                  <span className="line-through text-gray-500 ml-2">${product.compareAtPrice}</span>
                )}
              </div>

              <div className="mt-4 flex gap-2">
                <AddToCartButton
                  variantId={product.variantId}
                  title={product.title}
                  price={product.price}
                  image={product.featuredImage?.url || "/placeholder.png"}
                  handle={product.handle}
                />
                {/* <CheckoutButton variantId={product.variantId} quantity={1} /> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
