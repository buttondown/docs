import { MDXProvider } from "@mdx-js/react";
import Head from "next/head";
import { useState } from "react";
import { GlobalHotKeys } from "react-hotkeys";

import Footer from "./Footer";
import Header from "./Header";
import {
  A,
  Blockquote,
  Code,
  H1,
  H2,
  H3,
  H4,
  Img,
  Li,
  Ol,
  P,
  Pre,
  Ul,
} from "./Markdown";
import Sidebar from "./Sidebar";

const keyMap = {
  TRIGGER_SEARCH: "/",
};

export default function Layout({ meta, children }: any) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const title =
    meta && meta.title
      ? `${meta.title} • Buttondown documentation`
      : "Buttondown documentation";

  return (
    <>
      <GlobalHotKeys
        keyMap={keyMap}
        handlers={{
          TRIGGER_SEARCH: (e) => {
            e?.preventDefault();
            setSearchOpen(true);
          },
        }}
      />
      <div className="h-screen flex overflow-hidden bg-gray-100 ">
        <Head>
          <title>{title}</title>
          <meta property="og:title" content={title} />
          {meta && meta.description && (
            <meta property="og:description" content={meta.description} />
          )}
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Sidebar
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          setSearchOpen={setSearchOpen}
          searchOpen={searchOpen}
        />
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
    </>
  );
}
