import type { LoaderFunction } from "remix";
import { useLoaderData, Link, Outlet } from "remix";
import { sendGraphQLRequest } from "~/libs/remix-graphql.server";
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

export default function ProductsRoute() {
  const {
    data: {
      catalogue: { products },
    },
  } = useLoaderData();

  return (
    <div style={{ display: "flex", gap: 64, padding: "0 32px" }}>
      <div>
        <ul style={{ margin: 0, padding: 0 }}>
          {products.map((product: any) => (
            <li key={product.id}>
              <Link to={`/no-script${product.path}`}>{product.name}</Link>
            </li>
          ))}
        </ul>
        <Link to="/">Back home</Link>
      </div>

      <div
        style={{
          padding: "4px 32px",
          flex: 1,
          background: "#eee",
          borderRadius: 4,
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
