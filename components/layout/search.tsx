import Icon from "@/components/Icon";
import { buildSearchIndex } from "@/lib/search/client";
import { ContentArray } from "@/lib/search/server";
import { Highlight } from "@orama/highlight";
import { search } from "@orama/orama";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const highlighter = new Highlight({
  CSSClass: "bg-amber-100 text-amber-900",
});

export default function Search({
  open,
  setOpen,
  contentArray,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  contentArray: ContentArray;
}) {
  const [query, setQuery] = useState("");
  const index = useMemo(() => buildSearchIndex(contentArray), [contentArray]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setOpen]);

  const results = useMemo(() => {
    if (!index) return [];
    if (!query) return [];

    return search(index, {
      term: query,
      limit: 15,
    });
  }, [query, index]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <button
        className="w-full select-none bg-white border shadow-xs flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-gray-100 hover:border-gray-300 transition-colors"
        onClick={() => setOpen(true)}
        type="button"
      >
        <div className="flex items-center gap-x-2">
          <div className="text-gray-500">
            <Icon.Search />
          </div>
          <p className="text-sm text-gray-400">Search</p>
        </div>
        <kbd className="text-xs text-gray-400 border border-gray-300 px-1.5 py-0.5 rounded">
          ⌘K
        </kbd>
      </button>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 grid sm:place-items-center p-2">
          <Dialog.Content className="max-w-xl w-full rounded-md p-4 pt-0 border bg-gray-50 h-96 overflow-scroll">
            <Dialog.Title className="sr-only">Search</Dialog.Title>

            <div className="flex items-center gap-x-3 sticky top-0 bg-gray-50 pt-4">
              <div className="text-gray-500 -translate-y-0.5">
                <Icon.Search />
              </div>
              <input
                type="text"
                placeholder="Search&hellip;"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full focus:outline-none border-b border-gray-200 pb-1 placeholder:text-gray-400"
              />
            </div>

            <div className="mt-1.5 divide-y divide-gray-200">
              {"hits" in results &&
                results.hits.map((hit) => {
                  return (
                    <SearchResultRow
                      key={hit.id}
                      title={hit.document.title}
                      body={hit.document.body}
                      href={`/${hit.document.slug}`}
                      query={query}
                    />
                  );
                })}

              {"hits" in results &&
                results.hits.length === 0 &&
                query.trim().length !== 0 && <NoResultsFound />}
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function SearchResultRow({
  title,
  body,
  href,
  query,
}: {
  title: string;
  body?: string;
  href: string;
  query: string;
}) {
  const LinkComponent = href.startsWith("/") ? Link : "a";

  return (
    <LinkComponent href={href} className="block py-2">
      <p
        dangerouslySetInnerHTML={{
          __html: highlighter.highlight(title, query).HTML,
        }}
      />
      {body && (
        <p
          dangerouslySetInnerHTML={{
            __html: highlighter.highlight(body, query).trim(100),
          }}
          className="text-sm text-gray-500"
        />
      )}
    </LinkComponent>
  );
}

function NoResultsFound() {
  return (
    <>
      <div className="py-2 text-sm text-gray-400">No results found</div>
      <SearchResultRow
        title="Email support@buttondown.com"
        href="mailto:support@buttondown.com"
        query=""
      />
    </>
  );
}
