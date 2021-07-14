import Header from "./Header";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Image from "next/image";
import { MDXProvider } from "@mdx-js/react";
import {
  A,
  H2,
  H1,
  P,
  H3,
  H4,
  Pre,
  Code,
  Ul,
  Li,
  Img,
  Ol,
  Blockquote,
} from "./Markdown";

import Head from "next/head";

export default function Layout({ meta, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100 ">
      <Head>
        <title>
          {meta && meta.title
            ? `${meta.title} • Buttondown documentation`
            : "Buttondown documentation"}
        </title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <div className="flex flex-col w-0 flex-1 overflow-hidden min-h-screen">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 relative overflow-y-auto focus:outline-none flex flex-col">
          <div className="px-8 py-4 flex-grow">
            <MDXProvider
              components={{
                a: A,
                p: P,
                h1: H1,
                h2: H2,
                h3: H3,
                h4: H4,
                pre: Pre,
                code: Code,
                ul: Ul,
                ol: Ol,
                li: Li,
                blockquote: Blockquote,
                img: Img,
              }}
            >
              {children}
            </MDXProvider>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
