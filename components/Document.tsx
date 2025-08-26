import { GeneratedCodeSnippets } from "@/app/[slug]/CodeSnippets";
import PRICES from "@/autogen/prices.json";
import Notice from "@/components/Notice";
import Code from "@/components/code";
import type { Page } from "@/lib/types";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { marked } from "marked";
import { BUTTONDOWN_CLI_STRUCTURE, FileExplorer } from "./file-explorer";
import Heading from "./heading";
import Iframe from "./iframe";
import ImageWithLightbox from "./image-with-lightbox";
import LiveCodeBlock from "./live-code-block";
import PlaygroundEmbed from "./playground-embed";
import Video from "./video";

type Props = {
  page: Page;
};

const Document = async ({ page }: Props) => (
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
                    block.code !== undefined && block.code.trim() !== ""
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
          price.features.includes(props.feature)
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
              <a href="https://buttondown.com/support">send us a message</a> and
              we&#39;ll take a look!
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
      snippetSpacer: () => {
        return <br />;
      },
      preview: (props) => {
        return (
          <div className="border border-gray-200 text-center p-8 mt-4 bg-gray-100">
            <div className="shadow-xs border border-gray-300 divide-y divide-gray-300">
              <div className="bg-white p-4 text-sm text-left border-b-0 overflow-x-scroll">
                <div className="font-mono whitespace-pre">{props.before}</div>
              </div>
              <div
                className="text-gray-800 bg-white p-4 text-left"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: It's fine
                dangerouslySetInnerHTML={{ __html: props.after }}
              />
            </div>
          </div>
        );
      },
      iframe: (props) => (
        <Iframe
          src={props.src}
          height={props.height}
          variant={props.variant}
          width={props.width}
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
        <a href={props.url} className="text-inherit no-underline after:hidden!">
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
            // Fallback to default structure
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
    }}
  />
);

export default Document;
