import type { LoaderFunction } from "remix";
import { useLoaderData, Link } from "remix";
import { sendGraphQLRequest } from "remix-graphql";
import { CATALOGUE_API_ENDPOINT } from "~/utils/crystallize.server";

const GET_PRODUCTS_QUERY = /* GraphQL */ `
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

export const loader: LoaderFunction = (args) =>
  sendGraphQLRequest({
    args,
    endpoint: CATALOGUE_API_ENDPOINT,
    query: GET_PRODUCTS_QUERY,
  });

export const handle = {
  hydrate: () => false,
};

export default function ProductsRoute() {
  const {
    data: {
      catalogue: { products },
    },
  } = useLoaderData();

  return (
    <ul>
      {products.map((product: any) => (
        <li key={product.id}>
          <Link to={`/script${product.path}`}>{product.name}</Link>
        </li>
      ))}
    </ul>
  );
}
