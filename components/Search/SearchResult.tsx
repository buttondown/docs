import { Menu } from "@headlessui/react";
import { Index } from "lunr";

import classNames from "../../lib/classNames";
import SEARCH_RESULTS from "../../public/search-results.json";
import NextLink from "../NextLink";
import { SearchableItem } from "./types";

const SEARCH_DATA: SearchableItem[] = SEARCH_RESULTS;

type SnippetData = {
  text: string;
  active: boolean;
  position: [number, number][];
};

function SearchResultSnippet(props: SnippetData) {
  const [startPosition, length] = props.position[0];
  const snippetLength = 40;
  return (
    <div
      className={classNames(
        props.active ? "bg-blue-200" : "bg-gray-100",
        "p-2 text-sm rounded-lg my-2"
      )}
    >
      <span className="text-gray-600">
        {startPosition - snippetLength > 0 && "..."}
        {props.text.slice(startPosition - snippetLength, startPosition)}
      </span>
      <span className={props.active ? "bg-blue-300" : "bg-green-200"}>
        {props.text.slice(startPosition, startPosition + length)}
      </span>
      <span className="text-gray-600">
        {props.text.slice(
          startPosition + length,
          startPosition + length + snippetLength
        )}
        {startPosition + length + snippetLength < props.text.length && "..."}
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
            <div className="flex">
              <div className="font-bold flex-1">{fullResult.title}</div>
              <div className="mt-1 font-mono text-gray-400 text-xs rounded-lg flex font-semibold">
                {fullResult.path}
              </div>
            </div>
            {fullResult.description && (
              <div className="text-sm text-gray-800">
                {fullResult.description}
              </div>
            )}
            {snippet && (
              <SearchResultSnippet
                text={fullResult.text}
                position={snippet.position}
                active={active}
              />
            )}
          </div>
        </NextLink>
      )}
    </Menu.Item>
  );
}
