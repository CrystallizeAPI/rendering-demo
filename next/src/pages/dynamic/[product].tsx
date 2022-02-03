import { GetServerSideProps, NextPage } from "next";
import { gql } from "graphql-request";
import { catalogueClient } from "../../utils/crystallize";
import { Layout } from "../../components/Layout";
import { ProductNav } from "../../components/ProductNav";

const GET_INDIVIDUAL_PRODUCT_QUERY = gql`
  query ($path: String!) {
    products: catalogue(language: "en", path: "/") {
      id
      products: children {
        id
        name
        path
      }
    }
    product: catalogue(language: "en", path: $path) {
      id
      name
      summary: component(id: "summary") {
        id
        content {
          ... on RichTextContent {
            plainText
          }
        }
      }
    }
  }
`;

interface DynamicProductPageProps {
  data: { products: { products: any[] }; product: any };
}

export const getServerSideProps: GetServerSideProps<
  DynamicProductPageProps
> = async ({ params }) => {
  const data = await catalogueClient.request(GET_INDIVIDUAL_PRODUCT_QUERY, {
    path: `/${params.product}`,
  });
  return { props: { data } };
};

const DynamicProductPage: NextPage<DynamicProductPageProps> = ({ data }) => {
  if (!data) return null;

  const {
    products: { products },
    product,
  } = data;

  return (
    <Layout nav={<ProductNav basePath="dynamic" products={products} />}>
      <div>
        <h1 style={{ margin: 0 }}>{product.name}</h1>
        <p style={{ margin: 0, marginTop: 12 }}>
          {product.summary.content.plainText[0]}
        </p>
      </div>
    </Layout>
  );
};

export default DynamicProductPage;
