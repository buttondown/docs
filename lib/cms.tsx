import Markdoc, { type Config } from "@markdoc/markdoc";
import fs from "fs";
import path from "path";
import React from "react";
import yaml from "yaml";
import PRICES from "@/autogen/prices-v2.json";
import Code from "@/components/code";
import FAQ, { type FAQItem } from "@/components/faq";
import { BUTTONDOWN_CLI_STRUCTURE, FileExplorer } from "@/components/file-explorer";
import IframeComponent from "@/components/iframe";
import ImageWithLightbox from "@/components/image-with-lightbox";
import LiveCodeBlock from "@/components/live-code-block";
import PlaygroundEmbed from "@/components/playground-embed";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { marked } from "marked";
import { GeneratedCodeSnippets } from "@/app/[slug]/CodeSnippets";

function filterNullish<T>(arr: (T | null | undefined)[]): T[] {
  return arr.filter((x): x is T => x != null);
}

// Markdoc node definitions for customizing built-in elements
const nodes: Config["nodes"] = {
  fence: {
    render: "CodeBlock",
    attributes: {
      language: { type: String },
      content: { type: String },
    },
  },
  image: {
    render: "ImageWithLightbox",
    attributes: {
      src: { type: String, required: true },
      alt: { type: String, required: true },
      title: { type: String },
      width: { type: Number },
      height: { type: Number },
    },
  },
  heading: {
    render: "Heading",
    attributes: {
      level: { type: Number, required: true },
    },
  },
};

const noticeContainer = cva("p-4 border rounded-lg text-sm max-w-prose mb-6", {
  variants: {
    variant: {
      info: "bg-green-50 border-green-300 text-green-600 **:text-green-600",
      warning:
        "bg-yellow-50 border-yellow-300 text-yellow-600 **:text-yellow-600",
      danger: "bg-red-50 border-red-300 text-red-600 **:text-red-600",
    },
  },
});

const Notice = ({
  children,
  type,
}: {
  children: React.ReactNode;
  type: VariantProps<typeof noticeContainer>["variant"];
}) => (
  <div className={noticeContainer({ variant: type })}>
    <div className="lg:mx-auto flex items-start">
      <div className="text-sm">
        <div className="uppercase text-xs font-semibold mb-1">{type}</div>
        {children}
      </div>
    </div>
  </div>
);

function slugify(text: string): string {
  return (text || "")
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

function Heading({ level, children }: { level: number; children: React.ReactNode }) {
  const Component = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  const childText =
    typeof children === "string"
      ? children
      : String(
          React.Children.toArray(children).find(
            (c): c is React.ReactElement =>
              React.isValidElement(c) && "props" in (c as object),
          ) ?? "",
        );
  const slug = slugify(childText);

  return (
    <a href={`#${slug}`} className="no-underline">
      <Component
        id={slug}
        className="scroll-mt-20 md:scroll-mt-16 target:bg-amber-200 max-w-max"
      >
        {children}
      </Component>
    </a>
  );
}

function Video({ src }: { src: string }) {
  return (
    <video
      src={src}
      controls
      className="bg-gray-100 rounded-lg"
      // biome-ignore lint/a11y/useMediaCaption: No captions
    />
  );
}

// Markdoc tag definitions for component blocks
const tags: Config["tags"] = {
  video: {
    render: "Video",
    selfClosing: true,
    attributes: {
      file: { type: String, required: true },
    },
  },
  iframe: {
    render: "Iframe",
    selfClosing: true,
    attributes: {
      src: { type: String, required: true },
      height: { type: Number },
      width: { type: String },
      variant: { type: String },
    },
  },
  noticeInfo: {
    render: "NoticeInfo",
    selfClosing: true,
    attributes: {
      text: { type: String, required: true },
    },
  },
  noticeWarn: {
    render: "NoticeWarn",
    selfClosing: true,
    attributes: {
      text: { type: String, required: true },
    },
  },
  paidFeature: {
    render: "PaidFeature",
    selfClosing: true,
    attributes: {
      feature: { type: String, required: true },
    },
  },
  supportSnippet: {
    render: "SupportSnippet",
    selfClosing: true,
  },
  faq: {
    render: "Faq",
    selfClosing: true,
  },
  automation: {
    render: "Automation",
    selfClosing: true,
    attributes: {
      url: { type: String, required: true },
      name: { type: String, required: true },
      description: { type: String, required: true },
      trigger: { type: String, required: true },
      action: { type: String, required: true },
    },
  },
  liveCodeBlock: {
    render: "LiveCodeBlock",
    selfClosing: true,
    attributes: {
      filename: { type: String, required: true },
    },
  },
  playgroundEmbed: {
    render: "PlaygroundEmbed",
    selfClosing: true,
    attributes: {
      initialContent: { type: String },
      height: { type: String },
      title: { type: String },
      editorMode: { type: String },
    },
  },
  generatedMultilanguageSnippets: {
    render: "GeneratedMultilanguageSnippets",
    selfClosing: true,
    attributes: {
      method: { type: String, required: true },
      endpoint: { type: String, required: true },
      body: { type: String },
      headers: { type: String },
      query: { type: String },
    },
  },
  fileExplorer: {
    render: "FileExplorer",
    selfClosing: true,
    attributes: {
      title: { type: String },
      structure: { type: String },
      customData: { type: String },
    },
  },
  table: {
    render: "Table",
    attributes: {},
  },
};

// CodeBlock component for syntax highlighting
function CodeBlock({
  language,
  content,
}: {
  language?: string;
  content: string;
}) {
  return (
    <Code
      blocks={[
        {
          language: language ?? "text",
          code: content,
        },
      ]}
    />
  );
}

// Component mapping for Markdoc React renderer
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Markdoc passes props from tag attributes
const components: Record<string, React.ComponentType<any>> = {
  CodeBlock,
  Video: (props: { file: string }) => <Video src={props.file} />,
  Iframe: (props: { src: string; height?: number; variant?: string; width?: string }) => (
    <IframeComponent
      src={props.src}
      height={props.height}
      variant={(props.variant as "page" | "email" | "subscriber") || "page"}
    />
  ),
  NoticeInfo: (props: { text: string }) => (
    <Notice type="info">
      <div
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Markdown from trusted content
        dangerouslySetInnerHTML={{ __html: marked(props.text) }}
        className="-my-4"
      />
    </Notice>
  ),
  NoticeWarn: (props: { text: string }) => (
    <Notice type="warning">
      <div
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Markdown from trusted content
        dangerouslySetInnerHTML={{ __html: marked(props.text) }}
        className="-my-4"
      />
    </Notice>
  ),
  PaidFeature: (props: { feature: string }) => {
    const price = PRICES.find((p) => p.features.includes(props.feature));
    return (
      <div className="text-sm text-green-700 -mt-6 bg-green-100 p-2 px-3 rounded-md flex items-center gap-1 w-fit">
        Available on the
        <a
          href={`https://buttondown.com/pricing?plan=${price?.id}`}
          target="_blank"
          className="text-inherit font-normal whitespace-nowrap"
          rel="noreferrer"
        >
          {price?.name}&nbsp;plan.
        </a>
      </div>
    );
  },
  SupportSnippet: () => (
    <div>
      <h3>Reach out to your friends at Buttondown</h3>
      <p>
        Our support team is always here to help. Just{" "}
        <a href="https://buttondown.com/support">send us a message</a> and
        we&#39;ll take a look!
      </p>
    </div>
  ),
  Faq: () => null, // Overridden in get() with faqItems
  Automation: (props: {
    url: string;
    name: string;
    description: string;
    trigger: string;
    action: string;
  }) => (
    <a
      href={props.url}
      className="text-inherit no-underline after:hidden!"
    >
      <div className="border border-gray-300 bg-gray-50 p-4 px-8 text-center hover:scale-105 transition-all cursor-pointer relative overflow-hidden hover:border-green-600 hover:bg-green-100">
        <div className="absolute right-0 top-0 h-12 w-12">
          <div className="absolute transform rotate-45 bg-linear-to-tr from-green-500 to-green-600 text-center text-white font-semibold py-1 right-[-50px] top-[25px] w-[170px] text-xs uppercase">
            Click to use
          </div>
        </div>
        <div className="font-bold">{props.name}</div>
        <div className="text-sm">{props.description}</div>
        <div className="flex mt-8 items-center text-sm">
          <div className="bg-gray-700 text-white px-5 py-1 rounded-full">
            {props.trigger}
          </div>
          <div className="border-t border-t-gray-300 flex-1" />
          <div className="bg-gray-300 text-xs rounded-full px-2 py-1 uppercase -mx-2">
            then
          </div>
          <div className="border-t border-t-gray-300 flex-1" />
          <div className="bg-blue-600 text-white px-5 py-1 rounded-full">
            {props.action}
          </div>
        </div>
      </div>
    </a>
  ),
  LiveCodeBlock: (props: { filename: string }) => (
    <LiveCodeBlock path={props.filename} />
  ),
  PlaygroundEmbed: (props: {
    initialContent?: string;
    height?: string;
    title?: string;
    editorMode?: string;
  }) => (
    <PlaygroundEmbed
      initialContent={props.initialContent}
      height={props.height}
      title={props.title}
      editorMode={
        props.editorMode as "plaintext" | "fancy" | undefined
      }
    />
  ),
  GeneratedMultilanguageSnippets: (props: {
    method: string;
    endpoint: string;
    body?: string;
    headers?: string;
    query?: string;
  }) => (
    <GeneratedCodeSnippets
      method={props.method}
      endpoint={props.endpoint}
      body={props.body ? JSON.parse(props.body) : undefined}
      headers={props.headers ? JSON.parse(props.headers) : undefined}
      query={props.query ? JSON.parse(props.query) : undefined}
    />
  ),
  FileExplorer: (props: {
    title?: string;
    structure?: string;
    customData?: string;
  }) => {
    let data = BUTTONDOWN_CLI_STRUCTURE;
    if (props.structure === "custom" && props.customData) {
      try {
        data = JSON.parse(props.customData);
      } catch (error) {
        console.error("Failed to parse custom file structure:", error);
      }
    }
    return (
      <FileExplorer
        data={data}
        className="not-prose my-6"
        title={props.title || "Directory Structure"}
      />
    );
  },
  Table: ({ children }: { children?: React.ReactNode }) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border border-gray-300">
        <tbody>{children}</tbody>
      </table>
    </div>
  ),
  ImageWithLightbox,
  Heading,
};

export type Page = {
  slug: string;
  title: string;
  navigationTitle?: string;
  description?: string;
  content: React.ReactNode;
  schema?: string;
  enum?: string;
  endpoint?: string;
  method?: string;
  date?: string;
  faqItems?: string;
  relatedPages?: string[];
};

export type RawPage = Omit<Page, "content"> & {
  bodyText: string;
};

// Path resolution: Vercel may use .next as cwd; monorepo may use repo root
function resolvePagesDir() {
  const cwd = process.cwd();
  const candidates = [
    path.join(cwd, "content", "pages"),
    path.join(cwd, "..", "content", "pages"), // cwd is docs/.next
    path.join(cwd, "docs", "content", "pages"), // cwd is repo root
  ];
  for (const dir of candidates) {
    if (fs.existsSync(dir)) return dir;
  }
  throw new Error(
    `Content directory not found. Tried: ${candidates.join(", ")} (cwd=${cwd})`,
  );
}

const PAGES_DIR = resolvePagesDir();

function extractTextFromAst(node: ReturnType<typeof Markdoc.parse>): string {
  const texts: string[] = [];

  const walk = (n: unknown) => {
    if (typeof n === "string") {
      texts.push(n);
      return;
    }
    const node = n as { type?: string; attributes?: { content?: string }; children?: unknown[] };
    if (node?.type === "text" && node?.attributes?.content) {
      texts.push(node.attributes.content);
    }
    if (node?.children) {
      for (const child of node.children) {
        walk(child);
      }
    }
  };

  walk(node);
  return texts.join(" ").replace(/\s+/g, " ").trim();
}

function getRaw(slug: string): RawPage | null {
  const filePath = path.join(PAGES_DIR, `${slug}.mdoc`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const parsed = Markdoc.parse(fileContent);
  const frontmatter = yaml.parse(parsed.attributes?.frontmatter || "{}");
  const bodyText = extractTextFromAst(parsed);

  return {
    slug,
    ...frontmatter,
    bodyText,
  };
}

function getManyRaw(slugs: string[]): RawPage[] {
  return filterNullish(slugs.map((slug) => getRaw(slug)));
}

async function get(slug: string): Promise<Page | null> {
  const filePath = path.join(PAGES_DIR, `${slug}.mdoc`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const parsed = Markdoc.parse(fileContent);
  const transformed = Markdoc.transform(parsed, { tags, nodes });
  const frontmatter = yaml.parse(parsed.attributes?.frontmatter || "{}");
  const faqItems: FAQItem[] = frontmatter.faqItems
    ? JSON.parse(frontmatter.faqItems)
    : [];

  const componentsWithFaq = {
    ...components,
    Faq: () => (faqItems.length > 0 ? <FAQ items={faqItems} /> : null),
  };

  const content = Markdoc.renderers.react(transformed, React, {
    components: componentsWithFaq,
  });

  return {
    slug,
    ...frontmatter,
    content,
  };
}

async function getMany(slugs: string[]): Promise<Page[]> {
  const pages = await Promise.all(slugs.map((slug) => get(slug)));
  return filterNullish(pages);
}

function list(): string[] {
  if (!fs.existsSync(PAGES_DIR)) {
    return [];
  }

  return fs
    .readdirSync(PAGES_DIR)
    .filter((file) => file.endsWith(".mdoc"))
    .map((file) => file.replace(".mdoc", ""));
}

function readNavigation(): Record<
  string,
  { name: string; items: { discriminant: string; value: string }[] }[]
> {
  const cwd = process.cwd();
  const candidates = [
    path.join(cwd, "content", "navigation.json"),
    path.join(cwd, "..", "content", "navigation.json"),
    path.join(cwd, "docs", "content", "navigation.json"),
  ];
  const navPath = candidates.find((p) => fs.existsSync(p));
  if (!navPath) {
    throw new Error(
      `Navigation not found. Tried: ${candidates.join(", ")} (cwd=${cwd})`,
    );
  }
  return JSON.parse(fs.readFileSync(navPath, "utf-8"));
}

export default {
  get,
  getMany,
  getRaw,
  getManyRaw,
  list,
  readNavigation,
};

export {
  get,
  getMany,
  getRaw,
  getManyRaw,
  list,
  readNavigation,
};
