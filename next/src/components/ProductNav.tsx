import Link from "next/link";

interface ProductNavProps {
  basePath: "static" | "dynamic";
  products: any[];
}

export function ProductNav({ basePath, products }: ProductNavProps) {
  return (
    <div>
      <ul style={{ margin: 0, padding: 0 }}>
        {products.map((product: any) => (
          <li key={product.id}>
            <Link href={`/${basePath}${product.path}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
      <Link href="/">Back home</Link>
    </div>
  );
}
