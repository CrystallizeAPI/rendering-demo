import { Link } from "remix";

interface ProductNavProps {
  basePath: "script" | "no-script";
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
            <Link to={`/${basePath}${product.path}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/" style={{ marginTop: 4, display: "block", color: "#373567" }}>
        Back home
      </Link>
    </div>
  );
}
