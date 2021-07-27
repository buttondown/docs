import { Code } from "../Markdown";

type Props = {
  html: string;
  css: string;
};

export default function Playground({ css, html }: Props) {
  const combinedHTML = `<style>${css}</style>${html}`;
  return (
    <div className="bg-gray-700 text-gray-100 p-4">
      <div className="flex items-stretch">
        <div className="w-2/4 mr-2 flex flex-col">
          <div className="uppercase font-black pb-4 text-sm">HTML</div>
          <Code language="html" classes="text-sm flex-grow">
            {html}
          </Code>
        </div>
        <div className="w-2/4 ml-2 flex flex-col">
          <div className="uppercase font-black pb-4 text-sm">CSS</div>
          <Code language="css" classes="text-sm flex-grow">
            {css}
          </Code>
        </div>
      </div>
      <div className="pt-4">
        <div className="uppercase font-black pb-4 text-sm">Result</div>
        <div className="bg-gray-900 rounded p-4 text-gray-200">
          <div dangerouslySetInnerHTML={{ __html: combinedHTML }} />
        </div>
      </div>
    </div>
  );
}
