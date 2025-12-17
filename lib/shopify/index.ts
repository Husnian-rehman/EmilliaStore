// lib/shopify/index.ts
import { GET_ALL_PRODUCTS_QUERY, GET_PRODUCT_BY_HANDLE_QUERY, GET_ALL_PRODUCT_TAGS_QUERY } from "./queries";
import { GET_PRODUCTS_BY_COLLECTION_QUERY, GET_ALL_COLLECTIONS_QUERY } from "./queries";
import { ShopifyProduct } from "./types";

const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

export async function shopifyFetch({ query, variables = {} }: any) {
  if (!domain || !token) {
    throw new Error("Shopify environment variables not configured (SHOPIFY_STORE_DOMAIN / SHOPIFY_STOREFRONT_ACCESS_TOKEN)");
  }

  const result = await fetch(`https://${domain}/api/2023-10/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await result.json();

  // Throw on GraphQL errors so calling code fails loudly (helpful while debugging)
  if (json.errors) {
    console.error("❌ Shopify GraphQL Errors:", JSON.stringify(json.errors, null, 2));
    console.error("❌ Full response:", JSON.stringify(json, null, 2));
    throw new Error(`Shopify GraphQL error: ${json.errors.map((e: any) => e.message).join(', ')}`);
  }

  if (!json.data) {
    console.error("❌ No data returned from Shopify:", json);
    throw new Error("No data returned from Shopify - check store domain / token");
  }

  return json;
}

// ✅ Make sure this exists and is exported
export async function getAllProducts(): Promise<ShopifyProduct[]> {
  const res = await shopifyFetch({ query: GET_ALL_PRODUCTS_QUERY });

  if (!res.data || !res.data.products) {
    console.error("❌ Invalid Shopify data:", res);
    return [];
  }

  return res.data.products.edges.map((edge: any) => {
    const p = edge.node;
    const variant = p.variants.edges[0]?.node;

    return {
      id: p.id,
      title: p.title,
      handle: p.handle,
      featuredImage: p.featuredImage,
        tags: p.tags || [],
      variantId: variant?.id,
      price: variant?.price.amount,
      compareAtPrice: variant?.compareAtPrice?.amount || null,
    };
  });
}

export async function getProductsByCollection(handle: string): Promise<ShopifyProduct[]> {
  if (!handle) {
    console.warn("getProductsByCollection called without a collection handle");
    return [];
  }

  const variables = { handle };
  // first attempt: direct collectionByHandle
  let res = await shopifyFetch({ query: GET_PRODUCTS_BY_COLLECTION_QUERY, variables });

  // If not found, try slugifying the provided value (common case: Sanity stores title instead of handle)
  if (!res.data || !res.data.collectionByHandle) {
    const tryHandle = String(handle || "").trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
    if (tryHandle && tryHandle !== handle) {
      try {
        console.info(`getProductsByCollection: retrying with slugified handle: ${tryHandle}`);
        res = await shopifyFetch({ query: GET_PRODUCTS_BY_COLLECTION_QUERY, variables: { handle: tryHandle } });
      } catch (e) {
        console.warn("getProductsByCollection: slugified retry failed", e);
      }
    }
  }

  // If still not found, fetch all collections and attempt to match by title (case-insensitive)
  if (!res.data || !res.data.collectionByHandle) {
    try {
      console.info("getProductsByCollection: collectionByHandle not found, fetching collection list to match by title...");
      const listRes = await shopifyFetch({ query: GET_ALL_COLLECTIONS_QUERY });
      const collections = listRes.data?.collections?.edges?.map((e: any) => e.node) || [];
      const found = collections.find((c: any) => String(c.title || "").trim().toLowerCase() === String(handle || "").trim().toLowerCase());
      if (found && found.handle) {
        console.info(`getProductsByCollection: matched collection title -> handle: ${found.title} -> ${found.handle}`);
        res = await shopifyFetch({ query: GET_PRODUCTS_BY_COLLECTION_QUERY, variables: { handle: found.handle } });
      }
    } catch (e) {
      console.warn("getProductsByCollection: fallback title-match failed", e);
    }
  }

  if (!res.data || !res.data.collectionByHandle) {
    // Provide more context for debugging: variables and partial response
    try {
      console.error("❌ Collection not found or invalid Shopify data. variables:", variables, "response:", JSON.stringify(res));
    } catch (e) {
      console.error("❌ Collection not found. variables:", variables, "response object:", res);
    }
    return [];
  }

  const products = res.data.collectionByHandle.products?.edges || [];

  return products.map((edge: any) => {
    const p = edge.node;
    const variant = p.variants.edges[0]?.node;

    return {
      id: p.id,
      title: p.title,
      handle: p.handle,
      featuredImage: p.featuredImage,
      tags: p.tags || [],
      variantId: variant?.id,
      price: variant?.price.amount,
      compareAtPrice: variant?.compareAtPrice?.amount || null,
    };
  });
}

export async function getAllCollections(): Promise<{ handle: string; title: string }[]> {
  try {
    const res = await shopifyFetch({ query: GET_ALL_COLLECTIONS_QUERY });
    const collections = res.data?.collections?.edges?.map((e: any) => e.node) || [];
    return collections.map((c: any) => ({ handle: c.handle, title: c.title }));
  } catch (e) {
    console.error('getAllCollections failed', e);
    return [];
  }
}

export async function getAllProductTags(): Promise<string[]> {
  try {
    const res = await shopifyFetch({ query: GET_ALL_PRODUCT_TAGS_QUERY });
    const products = res.data?.products?.edges?.map((e: any) => e.node) || [];
    const tagsSet = new Set<string>();
    products.forEach((p: any) => {
      (p.tags || []).forEach((t: string) => tagsSet.add(t));
    });
    return Array.from(tagsSet).sort();
  } catch (e) {
    console.error('getAllProductTags failed', e);
    return [];
  }
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const res = await shopifyFetch({
    query: GET_PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
  });

  if (!res.data || !res.data.productByHandle) {
    console.error("❌ Product not found or invalid Shopify data:", res);
    return null;
  }

  const p = res.data.productByHandle;

  const variants = (p.variants?.edges || []).map((edge: any) => {
    const v = edge.node;
    return {
      id: v.id,
      title: v.title,
      price: v.price?.amount ?? (v.price ?? null),
      compareAtPrice: v.compareAtPrice?.amount ?? (v.compareAtPrice ?? null),
      image: v.image ?? null,
      selectedOptions: v.selectedOptions ?? [],
    };
  });

  const images = (p.images?.edges || []).map((e: any) => e.node);

  const featured = p.featuredImage || images[0] || null;

  return {
    id: p.id,
    title: p.title,
    handle: p.handle,
    description: p.description,
    featuredImage: featured,
    images,
    variants,
    variantId: variants[0]?.id,
    price: variants[0]?.price ?? null,
    compareAtPrice: variants[0]?.compareAtPrice ?? null,
  };
}
