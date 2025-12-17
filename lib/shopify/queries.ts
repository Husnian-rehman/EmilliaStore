export const GET_ALL_PRODUCTS_QUERY = `
  {
    products(first: 100) {
      edges {
        node {
          id
          title
          handle
          tags
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
    images(first: 20) {
      edges {
        node {
          url
          altText
        }
      }
    }
    variants(first: 50) {
      edges {
        node {
          id
          title
          price: priceV2 { amount }
          compareAtPrice: compareAtPriceV2 { amount }
          image {
            url
            altText
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
}
`;

export const GET_PRODUCTS_BY_COLLECTION_QUERY = `
query productsByCollection($handle: String!) {
  collectionByHandle(handle: $handle) {
    title
    products(first: 100) {
      edges {
        node {
          id
          title
          handle
          tags
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
}
`;

export const GET_ALL_COLLECTIONS_QUERY = `
{
  collections(first: 250) {
    edges {
      node {
        handle
        title
      }
    }
  }
}
`;

export const GET_ALL_PRODUCT_TAGS_QUERY = `
{
  products(first: 250) {
    edges {
      node {
        tags
      }
    }
  }
}
`;
