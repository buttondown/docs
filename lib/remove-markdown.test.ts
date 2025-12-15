import dotenv from "dotenv";
import { expect, test } from "vitest";
import { removeMarkdown } from "./remove-markdown";

dotenv.config();

test("Remove markdown", async () => {
	expect(removeMarkdown("## Hello, world!")).toBe("Hello, world!");

	expect(removeMarkdown("One __two__ **three** _four_ *five*")).toBe(
		"One two three four five",
	);

	expect(removeMarkdown("![](/image)").trim()).toBe("");

	expect(removeMarkdown("Here is [link](https://example.com) hi!")).toBe(
		"Here is link hi!",
	);

	expect(
		removeMarkdown(`| Input    | Example        | Description                                             |
|----------|----------------|--------------------------------------------------------|
| YYYY     | 2014           | 4 or 2 digit year                                      |
| YYYY     | 2014           | 4 or 2 digit year                                      |`),
	).toEqual(
		"YYYY\n\n2014\n\n4 or 2 digit year\n\n\n\nYYYY\n\n2014\n\n4 or 2 digit year",
	);

	expect(
		removeMarkdown(
			`{% noticeInfo text="Kit is a brand refresh for ConvertKit." /%}`,
		),
	).toBe("Kit is a brand refresh for ConvertKit.");

	expect(
		removeMarkdown(
			`Here is some text {% noticeWarn text="Warning message" /%} and more text`,
		),
	).toBe("Here is some text Warning message and more text");

	expect(
		removeMarkdown(`Here is a diagram:

\`\`\`mermaid
graph TD
    A[Start] --> B[End]
\`\`\`

And some text after.`),
	).toBe(`Here is a diagram:



And some text after.`);

	expect(
		removeMarkdown(
			`\`\`\`mermaid
sequenceDiagram
    Alice->>Bob: Hello
\`\`\`
Some content
\`\`\`mermaid
graph LR
    A --> B
\`\`\``,
		),
	).toBe("Some content");

	expect(
		removeMarkdown(
			`Intro

{% playgroundEmbed
   title="sample playground"
   initialContent="<p>Hello</p>" /%}

Outro`,
		),
	).toBe("Intro\n\n\n\nOutro");

	expect(
		removeMarkdown(
			`Before {% playgroundEmbed initialContent="Example" /%} after`,
		),
	).toBe("Before  after");
});
