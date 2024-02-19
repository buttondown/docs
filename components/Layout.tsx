import { MDXProvider } from "@mdx-js/react";
import React from "react";

import slugify from "../lib/slugify";
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
import Scaffolding from "./Scaffolding";
import TableOfContents from "./TableOfContents";

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
    <Scaffolding meta={meta}>
      <div className="relative max-w-full overflow-hidden">
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
    </Scaffolding>
  );
}
