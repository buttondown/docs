import Layout from "../components/Layout";
import { MDXProvider } from "@mdx-js/react";

const components = {};

export default function Post(props) {
  return (
    <Layout>
      <MDXProvider components={components}>
        <main {...props} />
      </MDXProvider>
    </Layout>
  );
}
