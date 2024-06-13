import { promises as fs } from "node:fs";
import shiki from "shiki";
import CodeInteractive from "./client";
import {
  type HandwrittenBlock,
  type IntermediateBlock,
  PYTHON_API_KEY_CODE,
  PYTHON_API_KEY_CODE_REPLACEMENT,
  type ProcessedBlock,
  type SingletonLanguageBlockList,
  shikiWithoutWrapper,
} from "./lib";

export default async function Code({
  blocks,
}: {
  blocks: HandwrittenBlock[] | SingletonLanguageBlockList;
}) {
  const intermediateProcessedBlocks: IntermediateBlock[] = blocks;
  const highlighter = await shiki.getHighlighter({ theme: "dark-plus" });

  for (const block of intermediateProcessedBlocks) {
    if (block.code.startsWith("public")) {
      block.code = await fs.readFile(block.code, "utf-8");
    }

    const html = highlighter.codeToHtml(block.code, { lang: block.language });

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
              }),
            ),
            to: shikiWithoutWrapper(
              highlighter.codeToHtml(PYTHON_API_KEY_CODE_REPLACEMENT, {
                lang: "python",
              }),
            ),
          },
        }}
      />
    </div>
  );
}
