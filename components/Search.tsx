import { Dialog, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/outline";
import { FuseResultWithMatches } from "fuse.js";
import lunr from "lunr";
import Link from "next/link";
import { Fragment, useState } from "react";

import SEARCH_RESULTS from "../public/search-results.json";

const SEARCH_DATA: SearchResult[] = SEARCH_RESULTS;

type SearchResult = {
  path: string;
  description?: string;
  title?: string;
  text: string;
};

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

function SearchResult({ result }: any) {
  const fullResult = SEARCH_DATA.filter((r) => r.path === result.ref)[0];
  const snippet: SnippetData =
    result.matchData &&
    result.matchData.metadata &&
    Object.values(result.matchData.metadata)[0] &&
    Object.values(result.matchData.metadata)[0].text;
  return (
    <Link href={fullResult.path}>
      <div className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer border-transparent hover:border-blue-300 border-2">
        <div className="font-semibold">{fullResult.title}</div>
        <div>
          {snippet && (
            <SearchResultSnippet
              text={fullResult.text}
              position={snippet.position}
            />
          )}
        </div>
        <div className="font-mono text-gray-600 text-sm">{fullResult.path}</div>
      </div>
    </Link>
  );
}

export default function Search() {
  const [isSearching, setSearching] = useState(false);
  const [results, setResults] = useState([]);

  const search = async (e: any) => {
    const { value } = e.currentTarget;

    if (value === "") {
      setResults([]);
      return;
    }

    const index = lunr(function () {
      this.ref("path");
      this.field("text");
      this.field("title");
      this.metadataWhitelist = ["position"];

      SEARCH_RESULTS.forEach(function (doc) {
        this.add(doc);
      }, this);
    });

    const results = index.search(value);
    setResults(results);
  };

  return (
    <>
      <div
        onClick={() => setSearching(true)}
        className="flex mx-2 px-2 py-1 border-2 rounded border-gray-400 font-weight-bold text-gray-300 bg-gray-700 text-sm font-semibold cursor-pointer"
      >
        <SearchIcon className="h-5 w-4 mr-2" aria-hidden="true" />
        Search
      </div>

      <Transition appear show={isSearching} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setSearching(false)}
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-3 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <input
                  type="text"
                  className="w-full shadow-sm  sm:max-w-xs sm:text-lg border-gray-300 rounded-md px-1"
                  placeholder="Search Buttondown's documentation"
                  onChange={search}
                />
                {results.length > 0 && (
                  <div className="pt-2">
                    {results.map(
                      (result: FuseResultWithMatches<SearchResult>, i) => (
                        <SearchResult result={result} key={i} />
                      )
                    )}
                  </div>
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
