import { GetStaticPropsContext, NextPage } from "next";
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

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const data = await catalogueClient.request(GET_PRODUCTS_QUERY);
  return { props: { data } };
};

const StaticPage: NextPage<
  Awaited<ReturnType<typeof getStaticProps>>["props"]
> = ({ data }) => {
  const {
    catalogue: { products },
  } = data;

  return (
    <Layout nav={<ProductNav basePath="static" products={products} />}>
      <h1>Choose a product</h1>
    </Layout>
  );
};

export default StaticPage;
