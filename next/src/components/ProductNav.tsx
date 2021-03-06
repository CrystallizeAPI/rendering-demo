import Link from "next/link";

interface ProductNavProps {
  basePath: "static" | "dynamic";
  products: any[];
}

export function ProductNav({ basePath, products }: ProductNavProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <ul
        style={{
          margin: 0,
          padding: 0,
          listStyleType: "none",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          color: "#373567",
        }}
      >
        {products.map((product: any) => (
          <li key={product.id}>
            <Link href={`/${basePath}${product.path}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
      <Link href="/" passHref>
        <a style={{ marginTop: 4, display: "block", color: "#373567" }}>
          Back home
        </a>
      </Link>
    </div>
  );
}
