import { Dialog, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/outline";
import Fuse, { FuseResultWithMatches } from "fuse.js";
import Link from "next/link";
import { Fragment, useState } from "react";

import SEARCH_RESULTS from "../public/search-results.json";

type SearchResult = {
  path: string;
  description?: string;
  title?: string;
};

export default function Search() {
  const [isSearching, setSearching] = useState(false);
  const [results, setResults] = useState([]);

  const search = async (e: any) => {
    const { value } = e.currentTarget;
    const fuse = new Fuse(SEARCH_RESULTS, {
      includeMatches: true,
      keys: ["title", "path", "text"],
      distance: 10000,
      ignoreLocation: true,
    });
    const results = fuse.search(value);
    results.length = 5;
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
                        <div key={i}>
                          <Link href={result.item.path}>
                            <div className="p-1 hover:bg-blue-100 rounded cursor-pointer border-transparent hover:border-blue-300 border-2">
                              <div className="font-semibold">
                                {result.item.title}
                              </div>
                              {result.matches[0] &&
                                result.matches[0].indices &&
                                result.matches[0].key &&
                                result.matches[0].key === "text" && (
                                  <div>
                                    <div>
                                      {result.matches[0].value.slice(
                                        ...result.matches[0].indices[
                                          result.matches[0].indices.length - 1
                                        ]
                                      )}
                                    </div>
                                  </div>
                                )}
                              <div className="font-mono text-gray-600 text-sm">
                                {result.item.path}
                              </div>
                            </div>
                          </Link>
                        </div>
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
