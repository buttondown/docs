import { promises as fs } from "node:fs";
import nodePath from "node:path";
import React from "react";
import Code from "@/components/code";
import ExpandableCodeBlock from "./expandable-code-block";
import SelfResizingIframe from "./self-resizing-iframe";

export default async function LiveCodeBlock({ path }: { path: string }) {
  // Check if this is an external URL
  const isExternalUrl =
    path.startsWith("http://") || path.startsWith("https://");

  let code = "";
  let html = "";

  if (isExternalUrl) {
    // Fetch the external example at build time. GitHub's raw endpoint
    // intermittently times out (notably over IPv6 from CI), and a single
    // failed fetch would otherwise abort the entire docs prerender/deploy.
    // Retry a few times with a bounded timeout, and degrade to an empty
    // render rather than crashing the build if it stays unreachable.
    const MAX_ATTEMPTS = 3;
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        const response = await fetch(path, {
          signal: AbortSignal.timeout(15_000),
        });
        if (!response.ok) {
          throw new Error(`Unexpected status ${response.status}`);
        }
        html = await response.text();
        code = html;
        break;
      } catch (error) {
        if (attempt === MAX_ATTEMPTS) {
          console.error(
            `LiveCodeBlock: failed to fetch ${path} after ${MAX_ATTEMPTS} attempts; rendering an empty example.`,
            error,
          );
          code = `<!-- Unable to load example from ${path} -->`;
          html = "";
        } else {
          await new Promise((resolve) => setTimeout(resolve, attempt * 1_000));
        }
      }
    }
  } else {
    // For local files, resolve relative to the project root so this works
    // both at build time and at runtime on Vercel preview deployments
    const absolutePath = nodePath.join(process.cwd(), path);
    code = await fs.readFile(absolutePath, "utf-8");
    html = code;
  }

  const language = path.split(".").pop() as string;

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
            <SelfResizingIframe srcDoc={html} />
          </div>
        </div>
      </div>
    </div>
  );
}
