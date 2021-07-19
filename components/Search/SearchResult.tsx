import { Menu } from "@headlessui/react";
import { Index } from "lunr";

import classNames from "../../lib/classNames";
import SEARCH_RESULTS from "../../public/search-results.json";
import NextLink from "../NextLink";
import { SearchableItem } from "./types";

const SEARCH_DATA: SearchableItem[] = SEARCH_RESULTS;

type SnippetData = {
  text: string;
  position: [number, number][];
};

function SearchResultSnippet(props: SnippetData) {
  const [startPosition, length] = props.position[0];
  const snippetLength = 20;
  return (
    <div>
      <span className="text-gray-700">
        ...
        {props.text.slice(startPosition - snippetLength, startPosition)}
      </span>
      <span className="bg-blue-200">
        {props.text.slice(startPosition, startPosition + length)}
      </span>
      <span className="text-gray-700">
        {props.text.slice(
          startPosition + length,
          startPosition + length + snippetLength
        )}
        ...
      </span>
    </div>
  );
}

type Props = {
  result: Index.Result;
};

export default function SearchResult({ result }: Props) {
  const fullResult = SEARCH_DATA.filter((r) => r.path === result.ref)[0];
  const snippet: SnippetData =
    result.matchData &&
    result.matchData.metadata &&
    Object.values(result.matchData.metadata)[0] &&
    Object.values(result.matchData.metadata)[0].text;
  return (
    <Menu.Item>
      {({ active }) => (
        <NextLink href={fullResult.path}>
          <div
            className={classNames(
              "p-2 rounded-lg cursor-pointer border-transparent border-2",
              active ? "bg-blue-100 border-blue-300" : ""
            )}
          >
            <div className="font-semibold">{fullResult.title}</div>
            <div>
              {snippet && (
                <SearchResultSnippet
                  text={fullResult.text}
                  position={snippet.position}
                />
              )}
            </div>
            <div className="font-mono text-gray-600 text-sm">
              {fullResult.path}
            </div>
          </div>
        </NextLink>
      )}
    </Menu.Item>
  );
}
