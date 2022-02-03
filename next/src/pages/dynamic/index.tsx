import { GetServerSidePropsContext, NextPage } from "next";
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const data = await catalogueClient.request(GET_PRODUCTS_QUERY);
  return { props: { data } };
};

const DynamicPage: NextPage<
  Awaited<ReturnType<typeof getServerSideProps>>["props"]
> = ({ data }) => {
  const {
    catalogue: { products },
  } = data;

  return (
    <Layout nav={<ProductNav basePath="dynamic" products={products} />}>
      <h1>Choose a product</h1>
    </Layout>
  );
};

export default DynamicPage;
