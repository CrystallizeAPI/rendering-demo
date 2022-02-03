import type { LoaderFunction } from "remix";
import { useLoaderData, Outlet } from "remix";
import { getProducts } from "~/utils/crystallize.server";
import { Layout } from "~/components/Layout";
import { ProductNav } from "~/components/ProductNav";

export const loader: LoaderFunction = async (args) => {
  const data = await getProducts();
  return { products: data?.catalogue?.products || [] };
};

export default function ProductsRoute() {
  const { products } = useLoaderData();
  if (!products) return null;

  return (
    <Layout nav={<ProductNav basePath="no-script" products={products} />}>
      <Outlet />
    </Layout>
  );
}
