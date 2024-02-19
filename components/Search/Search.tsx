import { Dialog, Menu, Transition } from "@headlessui/react";
import { Index } from "lunr";
import { Fragment, useRef, useState } from "react";

import search from "../../lib/search";
import SearchResult from "./SearchResult";

type Props = {
  setSearchOpen: (arg0: boolean) => void;
  searchOpen: boolean;
};

export default function Search(props: Props) {
  const [results, setResults] = useState<Index.Result[]>([]);

  const onSearchChange = async (e: any) => {
    const { value } = e.currentTarget;
    let searchResults = await search(value);
    setResults(searchResults);
  };

  const searchInputRef = useRef(null);

  return (
    <Transition appear show={props.searchOpen || false} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => props.setSearchOpen(false)}
        initialFocus={searchInputRef}
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
            <div className="inline-block w-full max-w-2xl p-3 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Menu>
                <Menu.Items static>
                  <Menu.Item>
                    <input
                      type="text"
                      className="focus:outline-none w-full shadow-sm sm:text-lg border-gray-300 rounded-lg px-3 border focus:border-blue-300"
                      placeholder="Search Buttondown's documentation"
                      onChange={onSearchChange}
                      onKeyDown={(event) => {
                        if (event.code === "Space") {
                          event.stopPropagation();
                        }
                      }}
                      ref={searchInputRef}
                    />
                  </Menu.Item>
                  {results.length > 0 && (
                    <div className="pt-2 focus:border-none border-none ring-transparent">
                      {results.map((result: Index.Result, i) => (
                        <SearchResult result={result} key={i} />
                      ))}
                    </div>
                  )}
                </Menu.Items>
              </Menu>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
