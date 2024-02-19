import Layout from "../components/Layout";
import { H1 } from "../components/Markdown";

export default function Custom404() {
  return (
    <Layout>
      <H1>Page not found</H1>
      <p>
        Oh no — I can't find what you're looking for! Maybe check out something
        on the sidebar?
      </p>
    </Layout>
  );
}
