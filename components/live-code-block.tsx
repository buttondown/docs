import Code from "@/components/code";
import { promises as fs } from "node:fs";
import React from "react";
import ExpandableCodeBlock from "./expandable-code-block";
import SelfResizingIframe from "./self-resizing-iframe";

export default async function LiveCodeBlock({ path }: { path: string }) {
  // Check if this is an external URL
  const isExternalUrl = path.startsWith('http://') || path.startsWith('https://');
  
  let code = '';
  let html = '';
  
  if (isExternalUrl) {
    // For external URLs, fetch the content
    const response = await fetch(path);
    html = await response.text();
    code = html;
  } else {
    // For local files, read from filesystem
    code = await fs.readFile(path, "utf-8");
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
