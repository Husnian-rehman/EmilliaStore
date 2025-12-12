// lib/shopify/index.ts
import { GET_ALL_PRODUCTS_QUERY, GET_PRODUCT_BY_HANDLE_QUERY } from "./queries";
import { ShopifyProduct } from "./types";

const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

export async function shopifyFetch({ query, variables = {} }: any) {
  if (!domain || !token) {
    throw new Error("Shopify environment variables not configured (SHOPIFY_STORE_DOMAIN / SHOPIFY_STOREFRONT_ACCESS_TOKEN)");
  }

  const result = await fetch(`https://${domain}/api/2024-04/graphql.json`, {
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
    console.error("❌ Shopify GraphQL Errors:", json.errors);
    throw new Error("Shopify GraphQL error - see server logs");
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
      variantId: variant?.id,
      price: variant?.price.amount,
      compareAtPrice: variant?.compareAtPrice?.amount || null,
    };
  });
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
  const variant = p.variants.edges[0]?.node;

  return {
    id: p.id,
    title: p.title,
    handle: p.handle,
    description: p.description,
    featuredImage: p.featuredImage,
    variantId: variant?.id,
    price: variant?.price.amount,
    compareAtPrice: variant?.compareAtPrice?.amount || null,
  };
}
