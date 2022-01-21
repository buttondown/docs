import { MDXProvider } from "@mdx-js/react";
import Head from "next/head";
import { useState } from "react";
import React from "react";
import { GlobalHotKeys } from "react-hotkeys";

import slugify from "../lib/slugify";
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
  InlineCode,
  Li,
  Ol,
  P,
  Pre,
  Ul,
} from "./Markdown";
import Sidebar from "./Sidebar/Sidebar";
import TableOfContents from "./TableOfContents";

const keyMap = {
  TRIGGER_SEARCH: "/",
};

const extractAnchorFromHeader = (child: React.ReactElement) => ({
  url: "#" + slugify(child.props.children),
  depth:
    (child.props?.mdxType &&
      parseInt(child.props.mdxType.replace("h", ""), 0)) ??
    0,
  text: child.props.children,
});

const extractAnchorFromEndpoint = (child: React.ReactElement) => ({
  url: "#" + slugify(child.props.title),
  depth: 1,
  text: child.props.title,
});

export default function Layout({ meta, children }: any) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const title =
    meta && meta.title
      ? `${meta.title} • Buttondown documentation`
      : "Buttondown documentation";

  const anchors = React.Children.toArray(children)
    .filter(
      (child: any) =>
        child.props?.mdxType &&
        ["h2", "h3", "h4", "Endpoint"].includes(child.props.mdxType)
    )
    .map((child: any) => {
      return ["Endpoint"].includes(child.props.mdxType)
        ? extractAnchorFromEndpoint(child)
        : extractAnchorFromHeader(child);
    });

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
      <div className="h-screen flex overflow-hidden max-w-full">
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
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=optional"
            rel="stylesheet"
          />
        </Head>
        <Sidebar
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          setSearchOpen={setSearchOpen}
          searchOpen={searchOpen}
        />
        <div className="flex flex-col w-0 flex-1 overflow-hidden min-h-screen">
          <main className="flex-1 relative overflow-y-auto focus:outline-none flex flex-col">
            <Header setSidebarOpen={setSidebarOpen} />
            <div className="px-8 py-4 flex-grow flex">
              <div className="relative max-w-100">
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
                    inlineCode: InlineCode,
                  }}
                >
                  {children}
                </MDXProvider>
              </div>
              <TableOfContents anchors={anchors} />
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
}
