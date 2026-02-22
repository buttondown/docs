import { DocumentRenderer } from "@keystatic/core/renderer";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { marked } from "marked";
import type { JSX } from "react";
import { GeneratedCodeSnippets } from "@/app/[slug]/CodeSnippets";
import PRICES from "@/autogen/prices-v2.json";
import Code from "@/components/code";
import type { Page } from "@/lib/types";
import FAQ from "./faq";
import { BUTTONDOWN_CLI_STRUCTURE, FileExplorer } from "./file-explorer";
import Iframe from "./iframe";
import ImageWithLightbox from "./image-with-lightbox";
import LiveCodeBlock from "./live-code-block";
import PlaygroundEmbed from "./playground-embed";

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

function Heading({
  level,
  children,
}: {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;

  // @ts-expect-error - children array access for slug generation
  const slug = slugify(children[0].props.node.text);

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
  // biome-ignore lint/a11y/useMediaCaption: No captions
  return <video src={src} controls className="bg-gray-100 rounded-lg" />;
}

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
}) => {
  return (
    <div className={noticeContainer({ variant: type })}>
      <div className="lg:mx-auto flex items-start">
        <div className="text-sm">
          <div className="uppercase text-xs font-semibold mb-1">{type}</div>
          {children}
        </div>
      </div>
    </div>
  );
};

type Props = {
  page: Page;
};

const Document = async ({ page }: Props) => {
  // Parse FAQ items from page frontmatter
  let faqItems: Array<{ question: string; answer: string }> = [];
  if (page.faqItems) {
    try {
      faqItems = JSON.parse(page.faqItems);
    } catch (error) {
      console.error("Failed to parse FAQ items:", error);
    }
  }

  return (
    <DocumentRenderer
      document={await page.content()}
      renderers={{
        block: {
          heading: Heading,
          image: ImageWithLightbox,
          code: ({ children, language }) => (
            <Code
              blocks={[
                {
                  language: language ?? "text",
                  code: children,
                },
              ]}
            />
          ),
        },
      }}
      componentBlocks={{
        multilanguageSnippets: (props) => {
          return (
            <div className="not-prose">
              <Code
                blocks={
                  [
                    {
                      name: "Python",
                      code: props.python,
                      language: "python",
                    },
                    {
                      name: "Ruby",
                      code: props.ruby,
                      language: "ruby",
                    },
                    {
                      name: "cURL",
                      code: props.curl,
                      language: "bash",
                    },
                    {
                      name: "JavaScript",
                      code: props.javascript,
                      language: "javascript",
                    },
                  ].filter(
                    (block) =>
                      block.code !== undefined && block.code.trim() !== "",
                  ) as {
                    name: string;
                    code: string;
                    language: string;
                  }[]
                }
              />
            </div>
          );
        },
        generatedMultilanguageSnippets: (props) => {
          return (
            <GeneratedCodeSnippets
              method={props.method}
              endpoint={props.endpoint}
              body={
                props.body && typeof props.body === "string"
                  ? JSON.parse(props.body)
                  : props.body
              }
              headers={
                props.headers && typeof props.headers === "string"
                  ? JSON.parse(props.headers)
                  : props.headers
              }
              query={
                props.query && typeof props.query === "string"
                  ? JSON.parse(props.query)
                  : props.query
              }
            />
          );
        },

        paidFeature: (props) => {
          const price = PRICES.find((price) =>
            price.features.includes(props.feature),
          );
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
        supportSnippet: () => {
          return (
            <div>
              <h3>Reach out to your friends at Buttondown</h3>
              <p>
                Our support team is always here to help. Just{" "}
                <a href="https://buttondown.com/support">send us a message</a>{" "}
                and we&#39;ll take a look!
              </p>
            </div>
          );
        },

        noticeInfo: (props) => {
          return (
            <Notice type="info">
              <div
                // biome-ignore lint/security/noDangerouslySetInnerHtml: It's fine
                dangerouslySetInnerHTML={{
                  __html: marked(props.text),
                }}
                className="-my-4"
              />
            </Notice>
          );
        },
        noticeWarn: (props) => {
          return (
            <Notice type="warning">
              <div
                // biome-ignore lint/security/noDangerouslySetInnerHtml: It's fine
                dangerouslySetInnerHTML={{
                  __html: marked(props.text),
                }}
                className="-my-4"
              />
            </Notice>
          );
        },
        iframe: (props) => (
          <Iframe
            src={props.src}
            height={props.height}
            variant={props.variant}
          />
        ),
        video: (props) => <Video src={props.file} />,
        liveCodeBlock: (props) => <LiveCodeBlock path={props.filename} />,
        playgroundEmbed: (props) => (
          <PlaygroundEmbed
            initialContent={props.initialContent}
            height={props.height}
            title={props.title}
            editorMode={props.editorMode}
          />
        ),
        automation: (props) => (
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
        fileExplorer: (props) => {
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
        faq: () => {
          if (faqItems.length === 0) {
            return null;
          }
          return <FAQ items={faqItems} />;
        },
      }}
    />
  );
};

export default Document;
