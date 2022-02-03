import type { LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import { getProduct } from "~/utils/crystallize.server";

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.product) return { product: null };
  const data = await getProduct(`/${params.product}`);
  return data;
};

export const handle = {
  hydrate: () => true,
};

export default function ProductRoute() {
  const { product } = useLoaderData();
  if (!product) return null;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.summary.content.plainText[0]}</p>
    </div>
  );
}
