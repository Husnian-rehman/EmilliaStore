export const GET_ALL_PRODUCTS_QUERY = `
  {
    products(first: 100) {
      edges {
        node {
          id
          title
          handle
          featuredImage {
            url
            altText
          }
          variants(first: 1) {
            edges {
              node {
                id
                price: priceV2 { amount }
                compareAtPrice: compareAtPriceV2 { amount }
              }
            }
          }
        }
      }
    }
  }
`;


export const GET_PRODUCT_BY_HANDLE_QUERY = `
query getProduct($handle: String!) {
  productByHandle(handle: $handle) {
    id
    title
    description
    handle
    featuredImage {
      url
      altText
    }
    variants(first: 10) {
      edges {
        node {
          id
          title
          price: priceV2 { amount }
          compareAtPrice: compareAtPriceV2 { amount }
        }
      }
    }
  }
}
`;
