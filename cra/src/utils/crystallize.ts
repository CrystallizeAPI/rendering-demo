import { GraphQLClient, gql } from "graphql-request";

export const CATALOGUE_API_ENDPOINT = `https://api.crystallize.com/${process.env.REACT_APP_CRYSTALLIZE_TENANT_ID}/catalogue`;

export const catalogueClient = new GraphQLClient(CATALOGUE_API_ENDPOINT, {
  mode: "cors",
});

const GET_INDIVIDUAL_PRODUCT_QUERY = gql`
  query ($path: String!) {
    product: catalogue(language: "en", path: $path) {
      id
      name
      summary: component(id: "summary") {
        id
        content {
          ... on RichTextContent {
            plainText
          }
        }
      }
    }
  }
`;

export function getProduct(path: string) {
  return catalogueClient.request(GET_INDIVIDUAL_PRODUCT_QUERY, { path });
}

const GET_PRODUCTS_QUERY = gql`
  query {
    catalogue(language: "en", path: "/") {
      id
      products: children {
        id
        name
        path
      }
    }
  }
`;

export function getProducts() {
  return catalogueClient.request(GET_PRODUCTS_QUERY);
}
