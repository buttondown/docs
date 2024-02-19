import { useContext, useState } from "react";

import { Method, Route } from "../../lib/openapi/types";
import { Code, H2 } from "../Markdown";
import { Context } from "../Scaffolding";
import ClosedBetaNotice from "./ClosedBetaNotice";

type Props<R extends Route> = {
  title: string;
  method: Method<R>;
  path: string;
  beta?: boolean;
};

export const MultiLanguageSnippet = ({ snippets }) => {
  const { preferredLanguage: language, setPreferredLanguage: setLanguage } =
    useContext(Context);
  const [copyText, setCopyText] = useState("Copy to clipboard");
  const sortedLanguages = Object.keys(snippets).sort();

  return (
    <div className="space-y-4 mb-8">
      <div className="bg-slate-800 rounded-lg">
        <div className="text-white py-3 bg-slate-600 px-4 rounded-t-lg uppercase font-bold text-xs flex space-x-2">
          {sortedLanguages.map((key) => (
            <div
              key={key}
              className={
                language == key
                  ? "opacity-100"
                  : "opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
              }
              onClick={() => setLanguage(key)}
            >
              {key}
            </div>
          ))}
          <div className="flex-1"></div>
          <div
            className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(snippets[language]);
              setCopyText("Copied!");
              setTimeout(() => {
                setCopyText("Copy to clipboard");
              }, 1000);
            }}
          >
            {copyText}
          </div>
        </div>
        <div className="w-full bg-[#011627] text-white font-mono whitespace-pre-wrap overflow-x-scroll rounded-b-lg">
          <Code
            className={language}
            style={{
              backgroundColor: "transparent",
            }}
          >
            {snippets[language]}
          </Code>
        </div>
      </div>
    </div>
  );
};

export default function Endpoint<R extends Route>({
  title,
  method,
  path,
  beta,
}: Props<R>) {
  const snippets = {
    python: `import requests
headers = {
    "Authorization": f"Token {BUTTONDOWN_API_KEY}",
}

BASE_URL = "https://api.buttondown.email"
ENDPOINT = "/v1${path}"

response = requests.${method}(f"{BASE_URL}{ENDPOINT}", headers=headers)`,
    ruby: `require 'net/http'
require 'json'

headers = { "Authorization" => "Token #{BUTTONDOWN_API_KEY}" }
base_url = "https://api.buttondown.email"
endpoint = "/v1${path}"

response = Net::HTTP.get_response(URI("#{base_url}#{endpoint}"), headers)
JSON.parse(response.body)`,
    curl: `curl -X ${method.toUpperCase()} https://api.buttondown.email/v1${path}`,
    typescript: `import axios from "axios";

const headers = {
    "Authorization": \`Token \${process.env.BUTTONDOWN_API_KEY}\`
};

const BASE_URL = "https://api.buttondown.email";
const ENDPOINT = "/v1${path}";

axios.${method}(\`\${BASE_URL}\${ENDPOINT}\`, { headers })
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
`,
  };

  return (
    <>
      <H2 mdxType={"h2"}>{title}</H2>
      {beta && (
        <>
          <ClosedBetaNotice />
          <br />
        </>
      )}
      <MultiLanguageSnippet snippets={snippets} />
    </>
  );
}
