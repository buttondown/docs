import { promises as fs } from "node:fs";
import Code from "@/components/code";
import { MantineProvider } from "@mantine/core";
import React from "react";
import type { Lang } from "shiki";
import ExpandableCodeBlock from "./expandable-code-block";
import SelfResizingIframe from "./self-resizing-iframe";

const REGISTRY: {
  [key: string]: { [key: string]: { component: React.ComponentType } };
} = {
  shadcn: {
    basic: {
      component: React.lazy(() => import("@/public/code/shadcn/basic")),
    },
    dropdown: {
      component: React.lazy(() => import("@/public/code/shadcn/dropdown")),
    },
  },
  daisyui: {
    basic: {
      component: React.lazy(() => import("@/public/code/daisyui/basic")),
    },
    dropdown: {
      component: React.lazy(() => import("@/public/code/daisyui/dropdown")),
    },
  },
  mantine: {
    basic: {
      component: React.lazy(() => import("@/public/code/mantine/basic")),
    },
  },
};

export default async function LiveCodeBlock({ path }: { path: string }) {
  const code = await fs.readFile(path, "utf-8");

  const language = path.split(".").pop() as Lang;

  // If the language is JSX, load the `.html` file to put into the iframe.
  const html = code;

  const decomposedPath = path.split("/");
  const componentName = decomposedPath.pop()?.replace(".tsx", "");
  const groupName = decomposedPath.pop();

  const Component =
    componentName && groupName
      ? REGISTRY[groupName]?.[componentName]
        ? REGISTRY[groupName]?.[componentName].component
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
            {Component ? (
              groupName === "mantine" ? (
                <MantineProvider>
                  <link
                    rel="stylesheet"
                    href="https://unpkg.com/@mantine/core@7.12.1/styles.css"
                  />
                  <link
                    rel="stylesheet"
                    href="https://unpkg.com/@mantine/forms@7.12.1/styles.css"
                  />
                  <Component />
                </MantineProvider>
              ) : groupName === "daisyui" ? (
                <>
                  <link
                    rel="stylesheet"
                    href="https://unpkg.com/daisyui@4.12.14/dist/styled.css"
                  />
                  <Component />
                </>
              ) : (
                <Component />
              )
            ) : (
              <SelfResizingIframe srcDoc={html} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
