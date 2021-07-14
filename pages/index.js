import { MDXProvider } from "@mdx-js/react";

import Layout from "../components/Layout";

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
