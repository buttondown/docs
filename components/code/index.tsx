import { promises as fs } from "node:fs";
import {
  transformerMetaHighlight,
  transformerNotationDiff,
} from "@shikijs/transformers";
import { createHighlighter } from "shiki";
import CodeInteractive from "./client";
import {
  type HandwrittenBlock,
  type IntermediateBlock,
  type ProcessedBlock,
  PYTHON_API_KEY_CODE,
  PYTHON_API_KEY_CODE_REPLACEMENT,
  type ResponseBlock,
  type SingletonLanguageBlockList,
  shikiWithoutWrapper,
} from "./lib";

const THEME = "dark-plus";

const HIGHLIGHTER = createHighlighter({
  themes: [THEME],
  langs: ["html", "http", "jinja", "json", "markdown", "python", "ruby"],
});

export default async function Code({
  blocks,
  response,
}: {
  blocks: HandwrittenBlock[] | SingletonLanguageBlockList;
  response?: ResponseBlock;
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
      transformers: [transformerNotationDiff(), transformerMetaHighlight()],
      meta: block.highlight ? { __raw: `{${block.highlight}}` } : undefined,
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

  const responseHtml = response
    ? highlighter.codeToHtml(response.code, {
        lang: response.language,
        theme: THEME,
        transformers: [transformerMetaHighlight()],
        meta: response.highlight
          ? { __raw: `{${response.highlight}}` }
          : undefined,
        cssVariablePrefix: "--shiki-",
      })
    : undefined;

  return (
    <div className="not-prose my-6">
      <CodeInteractive
        blocks={processedBlocks}
        responseHtml={responseHtml}
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
