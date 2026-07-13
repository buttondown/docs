import fs from "node:fs";
import path from "node:path";
import Code from "@/components/code";
import type { HandwrittenBlock, ResponseBlock } from "@/components/code/lib";
import {
  type generateSnippets,
  generateSnippetsWithSpecifiedBody,
  type SnippetDefinition,
} from "./oas";

type SnippetsFile = {
  python?: string;
  ruby?: string;
  javascript?: string;
  curl?: string;
};

function resolveSnippetPath(relativePath: string): string {
  const cwd = process.cwd();
  const candidates = [
    path.join(cwd, relativePath),
    path.join(cwd, "docs", relativePath),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  throw new Error(
    `Snippet file not found. Tried: ${candidates.join(", ")} (cwd=${cwd})`,
  );
}

function loadSnippetsFromFile(file: string): SnippetsFile {
  return JSON.parse(
    fs.readFileSync(resolveSnippetPath(file), "utf-8"),
  ) as SnippetsFile;
}

function snippetsFileToBlocks(snippets: SnippetsFile): HandwrittenBlock[] {
  return [
    snippets.python && {
      name: "Python",
      code: snippets.python,
      language: "python",
    },
    snippets.ruby && {
      name: "Ruby",
      code: snippets.ruby,
      language: "ruby",
    },
    snippets.javascript && {
      name: "JavaScript",
      code: snippets.javascript,
      language: "javascript",
    },
    snippets.curl && {
      name: "cURL",
      code: snippets.curl,
      language: "shell",
    },
  ].filter((block): block is HandwrittenBlock => Boolean(block));
}

export function CodeSnippets({
  snippets,
  response,
}: {
  snippets: Awaited<ReturnType<typeof generateSnippets>>;
  response?: ResponseBlock;
}) {
  return (
    <Code
      response={response}
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

export function GeneratedCodeSnippets({
  response,
  ...def
}: SnippetDefinition & { response?: ResponseBlock }) {
  const snippets = generateSnippetsWithSpecifiedBody(def);
  return (
    <div className="not-prose">
      <CodeSnippets snippets={snippets} response={response} />
    </div>
  );
}

export function FileBasedCodeSnippets({
  file,
  response,
}: {
  file: string;
  response?: ResponseBlock;
}) {
  const blocks = snippetsFileToBlocks(loadSnippetsFromFile(file));
  return (
    <div className="not-prose">
      <Code blocks={blocks} response={response} />
    </div>
  );
}
