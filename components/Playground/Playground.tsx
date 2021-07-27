import { Code } from "../Markdown";

type Props = {
  html: string;
};

const css = `
.playground p {
  margin-top: 1em;
  text-align: center;
}
.playground label {
  font-weight: bold;
}
.playground input[type="text"],
.playground input[type="email"] {
  display: block;
  background: #ffffff;
  width: 100%;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
}
.playground input[type="submit"] {
  display: block;
  background: #0069ff;
  width: 100%;
  border-radius: 1rem;
  padding: 0.5rem;
}
`;

export default function Playground(props: Props) {
  const combinedHTML = `<style>${css}</style>${props.html}`;
  return (
    <div className="bg-gray-200 text-gray-600 p-4 border border-gray-700 mt-4">
      <div className="flex items-stretch">
        <div className="w-2/4 mr-2 flex flex-col">
          <div className="uppercase font-bold pb-4 text-sm">HTML</div>
          <Code language="html" classes="text-sm flex-grow overflow-x-scroll">
            {props.html}
          </Code>
        </div>
        <div className="w-2/4 ml-2 flex flex-col">
          <div className="uppercase font-bold pb-4 text-sm">Result</div>
          <div className="bg-gray-900 rounded p-4 text-gray-200 playground flex-grow">
            <div dangerouslySetInnerHTML={{ __html: combinedHTML }} />
          </div>
        </div>
      </div>
    </div>
  );
}
