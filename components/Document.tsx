import PRICES from "@/autogen/prices.json";
import Notice from "@/components/Notice";
import Code from "@/components/code";
import type { Page } from "@/lib/types";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { marked } from "marked";
import type { Lang } from "shiki";
import CustomizableContent from "./customizable-content";
import Heading from "./heading";
import Iframe from "./iframe";
import ImageWithLightbox from "./image-with-lightbox";
import LiveCodeBlock from "./live-code-block";
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
                language: (language as Lang) ?? "text",
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
                  language: Lang;
                }[]
              }
            />
          </div>
        );
      },
      customizableContent: (props) => (
        <CustomizableContent
          loggedInHtml={marked(props.loggedIn)}
          anonymousHtml={marked(props.anonymous)}
        />
      ),
      paidFeature: (props) => {
        const price = PRICES.find((price) =>
          price.features.includes(props.feature)
        );
        return (
          <Notice type="info">
            <div className="">
              This feature requires a{" "}
              <a
                href={`https://buttondown.com/pricing?count=${(price?.subscriber_count || 1) - 1}`}
                target="_blank"
                className="text-inherit font-normal whitespace-nowrap"
                rel="noreferrer"
              >
                {price?.name}&nbsp;plan.
              </a>
            </div>
          </Notice>
        );
      },
      supportSnippet: () => {
        return (
          <div>
            <h3>Reach out to your friends at Buttondown</h3>
            <p>
              As always, we’re happy to answer any questions you may have via{" "}
              <a href="mailto:support@buttondown.email">
                support@buttondown.email.
              </a>
            </p>
          </div>
        );
      },
      exportButtondownData: () => {
        return (
          <div>
            <h3>By the way</h3>
            <p>
              With Buttondown, it&#39;s easy to{" "}
              <a href="/data-exports">export</a> your subscribers, surveys,
              emails, and other data whenever you wish—no strings attached!
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
      renderable: (props) => {
        return (
          <div className="not-prose">
            <Code
              blocks={[
                {
                  name: "Before",
                  code: props.html,
                  language: "html",
                },
                {
                  name: "After",
                  code: props.html,
                  language: "html",
                },
              ]}
            />
          </div>
        );
      },
      preview: (props) => {
        return (
          <div className="border border-gray-200 text-center p-8 mt-4 bg-gray-100">
            <div className="shadow-sm border border-gray-300 divide-y divide-gray-300">
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
      iframe: (props) => <Iframe src={props.src} />,
      video: (props) => <Video src={props.file} />,
      liveCodeBlock: (props) => <LiveCodeBlock path={props.filename} />,
      automation: (props) => (
        <a href={props.url} className="text-inherit no-underline after:!hidden">
          <div className="border border-gray-300 bg-gray-50 p-4 px-8 text-center hover:scale-105 transition-all cursor-pointer relative overflow-hidden hover:border-green-600 hover:bg-green-100">
            <div className="absolute right-0 top-0 h-12 w-12">
              <div className="absolute transform rotate-45 bg-gradient-to-tr from-green-500 to-green-600 text-center text-white font-semibold py-1 right-[-50px] top-[25px] w-[170px] text-xs uppercase">
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
    }}
  />
);

export default Document;
