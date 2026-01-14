import { promises as fs } from "node:fs";
import { transformerNotationDiff } from "@shikijs/transformers";
import { createHighlighter } from "shiki";
import CodeInteractive from "./client";
import {
  type HandwrittenBlock,
  type IntermediateBlock,
  type ProcessedBlock,
  PYTHON_API_KEY_CODE,
  PYTHON_API_KEY_CODE_REPLACEMENT,
  type SingletonLanguageBlockList,
  shikiWithoutWrapper,
} from "./lib";

const THEME = "dark-plus";

const HIGHLIGHTER = createHighlighter({
  themes: [THEME],
  langs: ["python", "json", "html", "ruby", "jinja", "markdown"],
});

export default async function Code({
  blocks,
}: {
  blocks: HandwrittenBlock[] | SingletonLanguageBlockList;
}) {
  const intermediateProcessedBlocks: IntermediateBlock[] = blocks;
  const highlighter = await HIGHLIGHTER;

  for (const block of intermediateProcessedBlocks) {
    if (block.code.startsWith("public")) {
      block.code = await fs.readFile(block.code, "utf-8");
    }

    if (block.language === "mermaid") {
      // For mermaid diagrams, create a proper pre class that will be processed by client-side mermaid
      block.html = `<pre class="mermaid">${block.code}</pre>`;
      // Skip the regular highlighting process
      continue;
    }

    const html = highlighter.codeToHtml(block.code, {
      lang: block.language,
      theme: THEME,
      transformers: [transformerNotationDiff()],
      cssVariablePrefix: "--shiki-",
    });

    block.html = html;
  }

  const processedBlocks: ProcessedBlock[] = intermediateProcessedBlocks.map(
    (block) => ({
      name: "name" in block ? block.name : undefined,
      html: block.html ?? "",
      language: block.language,
    }),
  );

  return (
    <div className="not-prose">
      <CodeInteractive
        blocks={processedBlocks}
        apiKeyReplacements={{
          python: {
            from: shikiWithoutWrapper(
              highlighter.codeToHtml(PYTHON_API_KEY_CODE, {
                lang: "python",
                theme: THEME,
              }),
            ),
            to: shikiWithoutWrapper(
              highlighter.codeToHtml(PYTHON_API_KEY_CODE_REPLACEMENT, {
                lang: "python",
                theme: THEME,
              }),
            ),
          },
        }}
      />
    </div>
  );
}
