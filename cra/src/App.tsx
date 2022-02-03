import { useQuery } from "react-query";
import { Routes, Route, Link, useParams } from "react-router-dom";
import { getProducts, getProduct } from "./utils/crystallize";

export function App() {
  const productsQuery = useQuery("products", () => getProducts());

  if (productsQuery.isLoading) return <p>Loading...</p>;
  if (!productsQuery.data) return <p>No data :(</p>;

  const products = productsQuery.data.catalogue?.products || [];

  return (
    <div style={{ display: "flex", gap: 64, padding: "0 32px" }}>
      <div>
        <ul style={{ margin: 0, padding: 0 }}>
          {products.map((product: any) => (
            <li key={product.id}>
              <Link to={`${product.path}`}>{product.name}</Link>
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
      <h1>{product.name}</h1>
      <p>{product.summary.content.plainText[0]}</p>
    </div>
  );
}
