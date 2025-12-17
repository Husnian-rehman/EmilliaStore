
import BreadcrumbContact from "../../component/BreadcrumbContact";
import { getAllProductsBreadcrumb } from "../../sanity/queries/allproducts/getAllProductsBreadcrumb";
import { getAllProducts, getAllCollections, getAllProductTags, getProductsByCollection } from "@/lib/shopify";
import Image from "next/image";
import Link from "next/link"; // <-- Import Link
import AddToCartButton from "../../component/AddToCartButton";
import CheckoutButton from "../../component/CheckoutButton";
import FiltersSidebar from "@/component/FiltersSidebar";

export default async function AllProductsPage(props: any) {
  const searchParams = (props && props.searchParams) || {};
  const breadcrumb = await getAllProductsBreadcrumb();
  const collections = await getAllCollections();
  const tags = await getAllProductTags();

  // normalize selected filters from search params (support singular or plural param names)
  const rawCollections = (searchParams?.collections ?? searchParams?.collection) as string | string[] | undefined;
  const rawTags = (searchParams?.tags ?? searchParams?.tag) as string | string[] | undefined;
  const normalizeRaw = (r?: string | string[]) => {
    if (!r) return [] as string[];
    if (Array.isArray(r)) return r;
    // handle comma-separated values sometimes produced by client
    if (typeof r === 'string' && r.includes(',')) return r.split(',').map((s) => s.trim()).filter(Boolean);
    return [String(r).trim()].filter(Boolean);
  };

  const selectedCollections = normalizeRaw(rawCollections);
  const selectedTags = normalizeRaw(rawTags);
  const min = searchParams?.min ? Number(searchParams.min) : undefined;
  const max = searchParams?.max ? Number(searchParams.max) : undefined;

  // Build product list as UNION of selected collections and selected tags (OR logic)
  // Debug log of incoming filters
  try {
    console.info('AllProductsPage filters - collections:', selectedCollections, 'tags:', selectedTags, 'min:', min, 'max:', max);
  } catch (e) {}
  const allProducts = await getAllProducts();
  const productsMap = new Map<string, any>();
  let collectionMatchesTotal = 0;
  let tagMatchesTotal = 0;
  const collectionMatchedHandles: string[] = [];
  const tagMatchedHandles: string[] = [];

  // Add products from selected collections
  if (selectedCollections.length > 0) {
    const lists = await Promise.all(selectedCollections.map((h) => getProductsByCollection(String(h))));
    const merged = lists.flat();
    collectionMatchesTotal = merged.length;
    merged.forEach((p: any) => {
      productsMap.set(p.handle, p);
      collectionMatchedHandles.push(p.handle);
    });
  }

  // Add products that match selected tags
  if (selectedTags.length > 0) {
    const tagMatched = allProducts.filter((p: any) => (p.tags || []).some((t: string) => selectedTags.includes(t)));
    tagMatchesTotal = tagMatched.length;
    tagMatched.forEach((p: any) => {
      productsMap.set(p.handle, p);
      tagMatchedHandles.push(p.handle);
    });
  }

  // If no collection or tag filters are provided, show all products
  if (selectedCollections.length === 0 && selectedTags.length === 0) {
    allProducts.forEach((p: any) => productsMap.set(p.handle, p));
  }

  // Final products array
  let products = Array.from(productsMap.values());
  const finalCount = products.length;
  const collectionMatchedPreview = collectionMatchedHandles.slice(0, 10);
  const tagMatchedPreview = tagMatchedHandles.slice(0, 10);
  const finalHandlesPreview = products.slice(0, 10).map((p: any) => p.handle);

  // Apply price filter
  if (typeof min === 'number' && !Number.isNaN(min)) {
    products = products.filter((p: any) => Number(p.price) >= min);
  }
  if (typeof max === 'number' && !Number.isNaN(max)) {
    products = products.filter((p: any) => Number(p.price) <= max);
  }

  return (
    <main>
 
      {/* allproductbreadcrumb */}
      <BreadcrumbContact data={breadcrumb} pageTitle="Collection" />
      {/* all products section */}
      <section>
        <div className="max-w-[1500px] mx-auto pt-20 pb-20 flex gap-3 px-5">
          {/* filtersidebar */}
          <FiltersSidebar
            collections={collections}
            tags={tags}
            initialCollections={selectedCollections}
            initialTags={selectedTags}
            initialMin={searchParams?.min || ''}
            initialMax={searchParams?.max || ''}
          />

          {/* allproducts here */}
          {products.length === 0 && (selectedCollections.length > 0 || selectedTags.length > 0) ? (
            <div className="p-6">No products match the selected filters: {selectedCollections.length > 0 ? 'Collections(' + selectedCollections.join(',') + ') ' : ''}{selectedTags.length > 0 ? 'Tags(' + selectedTags.join(',') + ')' : ''}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-8">
              {products.map((product) => (
              <div key={product.handle} className="border rounded-lg p-4">
                
                {/* Image Link */}
                <Link href={"/allproducts/" + product.handle}>
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
                  <Link href={"/allproducts/" + product.handle}>
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
                
                
                  <div className="mt-4 flex gap-2">
                    <AddToCartButton
                      variantId={product.variantId}
                      title={product.title}
                      price={product.price}
                      image={product.featuredImage?.url || "/placeholder.png"}
                      handle={product.handle}
                    />
                    <CheckoutButton variantId={product.variantId} quantity={1} />
                  </div>


                {/* form removed */}

              </div>
            ))}
          </div>
          )}
        </div>
      </section>
    </main>
  );
}
