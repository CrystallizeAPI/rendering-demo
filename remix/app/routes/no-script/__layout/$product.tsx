import type { LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import { sendGraphQLRequest } from "~/libs/remix-graphql.server";
import { CATALOGUE_API_ENDPOINT } from "~/utils/crystallize.server";

const GET_INDIVIDUAL_PRODUCT_QUERY = /* GraphQL */ `
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

export const loader: LoaderFunction = (args) =>
  sendGraphQLRequest({
    args,
    endpoint: CATALOGUE_API_ENDPOINT,
    query: GET_INDIVIDUAL_PRODUCT_QUERY,
    variables: { path: `/${args.params.product}` },
  });

export const handle = {
  hydrate: () => false,
};

export default function ProductRoute() {
  const {
    data: { product },
  } = useLoaderData();

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.summary.content.plainText[0]}</p>
    </div>
  );
}
