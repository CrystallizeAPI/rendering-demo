import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { gql } from "graphql-request";
import { catalogueClient } from "../../utils/crystallize";
import { Layout } from "../../components/Layout";
import { ProductNav } from "../../components/ProductNav";

const GET_PRODUCTS_QUERY = gql`
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

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await catalogueClient.request(GET_PRODUCTS_QUERY);
  return {
    paths: data.catalogue.products.map((product) => ({
      params: { product: product.path.substring(1) },
    })),
    fallback: true,
  };
};

interface StaticProductPageProps {
  data: { products: { products: any[] }; product: any };
}

export const getStaticProps: GetStaticProps<StaticProductPageProps> = async ({
  params,
}) => {
  const data = await catalogueClient.request(GET_INDIVIDUAL_PRODUCT_QUERY, {
    path: `/${params.product}`,
  });
  return { props: { data } };
};

const StaticProductPage: NextPage<StaticProductPageProps> = ({ data }) => {
  if (!data) return null;

  const {
    products: { products },
    product,
  } = data;

  return (
    <Layout nav={<ProductNav basePath="static" products={products} />}>
      <div>
        <h1 style={{ margin: 0 }}>{product.name}</h1>
        <p style={{ margin: 0, marginTop: 12 }}>
          {product.summary.content.plainText[0]}
        </p>
      </div>
    </Layout>
  );
};

export default StaticProductPage;
