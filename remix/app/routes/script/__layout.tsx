import type { LoaderFunction } from "remix";
import { useLoaderData, Link, Outlet } from "remix";
import { getProducts } from "~/utils/crystallize.server";

export const loader: LoaderFunction = async (args) => {
  const data = await getProducts();
  return { products: data?.catalogue?.products || [] };
};

export default function ProductsRoute() {
  const { products } = useLoaderData();
  if (!products) return null;

  return (
    <div style={{ display: "flex", gap: 64, padding: "0 32px" }}>
      <div>
        <ul style={{ margin: 0, padding: 0 }}>
          {products.map((product: any) => (
            <li key={product.id}>
              <Link to={`/script${product.path}`}>{product.name}</Link>
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
