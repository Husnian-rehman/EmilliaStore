

import { getAllProducts } from "@/lib/shopify";
import Image from "next/image";
import Link from "next/link"; // <-- Import Link

export default async function AllProductsPage() {
  const products = await getAllProducts();

  return (
    <main>
      {/* all products section */}
      <section>
        <div className="max-w-[1500px] mx-auto pt-40 pb-20 flex gap-3 px-5">
          {/* filtersidebar */}
          <div className="max-w-[250px] w-full sticky top-40 h-full self-start border p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Filters</h2>
            {/* Add filter options here */}
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <button className="text-left font-[600]">All Products</button>
                <ul className="flex flex-col gap-1">
                  <li className="ml-1 text-gray-600 text-[14px]">Category 1</li>
                  <li className="ml-1 text-gray-600 text-[14px]">Category 2</li>
                  <li className="ml-1 text-gray-600 text-[14px]">Category 3</li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <button className="text-left font-[600]">Price</button>
                <ul className="flex flex-col gap-1">
                  <li className="ml-1 text-gray-600 text-[14px]"></li>
                  <li className="ml-1 text-gray-600 text-[14px]">Category 2</li>
                  <li className="ml-1 text-gray-600 text-[14px]">Category 3</li>
                </ul>
              </div>
            </div>
          </div>

          {/* allproducts here */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.handle} className="border rounded-lg p-4">
                
                {/* Image Link */}
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

                {/* Title Link */}
                <h2 className="text-lg font-semibold mb-2">
                  <Link href={`/allproducts/${product.handle}`}>
                    {product.title}
                  </Link>
                </h2>

                <div className="mb-4">
                  <span className="text-xl font-bold">${product.price}</span>
                  {product.compareAtPrice && (
                    <span className="line-through text-gray-500 ml-2">
                      ${product.compareAtPrice}
                    </span>
                  )}
                </div>

                <form action="/cart" method="POST">
                  <input type="hidden" name="variantId" value={product.variantId} />
                  <button className="w-full bg-black text-white py-2 rounded-md">
                    Add to Cart
                  </button>
                </form>

              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
