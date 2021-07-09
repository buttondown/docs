import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { MDXProvider } from "@mdx-js/react";
import { H2, H1, P, H3, H4, Pre, Code } from "./Markdown";

import Head from "next/head";

export default function Layout({ meta, children }) {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Head>
        <title>
          {meta && meta.title
            ? `${meta.title} • Buttondown documentation`
            : "Buttondown documentation"}
        </title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Sidebar />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="px-4 py-4">
            <MDXProvider
              components={{
                p: P,
                h1: H1,
                h2: H2,
                h3: H3,
                h4: H4,
                pre: Pre,
                code: Code,
              }}
            >
              {children}
            </MDXProvider>
          </div>
        </main>
      </div>
    </div>
  );
}
