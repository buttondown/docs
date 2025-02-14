import Code from "@/components/code";
import {
  generateSnippets,
  generateSnippetsWithSpecifiedBody,
  SnippetDefinition,
} from "./oas";
import { useEffect, useState } from "react";

export function CodeSnippets({
  snippets,
}: { snippets: Awaited<ReturnType<typeof generateSnippets>> }) {
  return (
    <Code
      blocks={[
        {
          name: "Python",
          code: snippets.python,
          language: "python",
        },
        {
          name: "Ruby",
          code: snippets.ruby,
          language: "ruby",
        },
        {
          name: "JavaScript",
          code: snippets.javascript,
          language: "javascript",
        },
        {
          name: "cURL",
          code: snippets.curl,
          language: "shell",
        },
      ]}
    />
  );
}

export function GeneratedCodeSnippets(def: SnippetDefinition) {
  const snippets = generateSnippetsWithSpecifiedBody(def);
  return (
    <div className="not-prose">
      <CodeSnippets snippets={snippets} />
    </div>
  );
}
