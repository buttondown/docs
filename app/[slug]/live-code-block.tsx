import { promises as fs } from "node:fs";
import Code from "@/components/code";
import React from "react";
import type { Lang } from "shiki";
import ExpandableCodeBlock from "./expandable-code-block";
import SelfResizingIframe from "./self-resizing-iframe";

const REGISTRY: {
  [key: string]: { component: React.ComponentType };
} = {
  // We will need to be more clever than here at some point in the future,
  // but this is a good proof-of-concept.
  basic: {
    component: React.lazy(() => import("@/public/code/shadcn/basic")),
  },
  dropdown: {
    component: React.lazy(() => import("@/public/code/shadcn/dropdown")),
  },
};

export default async function LiveCodeBlock({ path }: { path: string }) {
  const code = await fs.readFile(path, "utf-8");

  const language = path.split(".").pop() as Lang;

  // If the language is JSX, load the `.html` file to put into the iframe.
  const html = code;

  const componentName = path.split("/").pop()?.replace(".tsx", "");
  const Component = componentName
    ? REGISTRY[componentName]
      ? REGISTRY[componentName].component
      : null
    : null;

  return (
    <div className="not-prose">
      <div className="bg-[#1E1E1E] border border-gray-200 rounded-xl flex flex-col">
        <div className="border-t-0 overflow-hidden relative">
          <ExpandableCodeBlock>
            <Code blocks={[{ language, code }]} />
          </ExpandableCodeBlock>
        </div>
        <div className="p-4 pt-0">
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            {/* Use iframe to get that sweet default browser styling. */}
            {Component ? <Component /> : <SelfResizingIframe srcDoc={html} />}
          </div>
        </div>
      </div>
    </div>
  );
}
