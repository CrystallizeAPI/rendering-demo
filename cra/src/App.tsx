import { useQuery } from "react-query";
import { Routes, Route, Link, useParams } from "react-router-dom";
import { getProducts, getProduct } from "./utils/crystallize";

export function App() {
  const productsQuery = useQuery("products", () => getProducts());

  if (productsQuery.isLoading) return <p>Loading...</p>;
  if (!productsQuery.data) return <p>No data :(</p>;

  const products = productsQuery.data.catalogue?.products || [];

  return (
    <div
      style={{
        display: "flex",
        gap: 64,
        padding: "0 32px",
        maxWidth: "48rem",
        margin: "64px auto",
      }}
    >
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
          }}
        >
          {products.map((product: any) => (
            <li key={product.id}>
              <Link to={`${product.path}`}>{product.name}</Link>
            </li>
          ))}
        </ul>
        <Link to="/" style={{ marginTop: 4, display: "block" }}>
          Back home
        </Link>
      </div>
      <div
        style={{
          height: "8rem",
          flex: 1,
          display: "flex",
          alignItems: "center",
          padding: "0 48px",
          background: "#BFF6F8",
          borderRadius: 8,
        }}
      >
        <Routes>
          <Route path="/" element={<h1>Choose a product</h1>} />
          <Route path=":product" element={<Product />} />
        </Routes>
      </div>
    </div>
  );
}

function Product() {
  const params = useParams();
  const productQuery = useQuery(["products", params.product], () =>
    getProduct(`/${params.product}`)
  );

  if (productQuery.isLoading) return <p>Loading...</p>;
  if (!productQuery.data) return <p>No data :(</p>;

  const product = productQuery.data.product;

  return (
    <div>
      <h1 style={{ margin: 0 }}>{product.name}</h1>
      <p style={{ margin: 0, marginTop: 12 }}>
        {product.summary.content.plainText[0]}
      </p>
    </div>
  );
}
