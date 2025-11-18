import Icon from "@/components/Icon";
import { buildSearchIndex } from "@/lib/search/client";
import { ContentArray } from "@/lib/search/server";
import { Highlight } from "@orama/highlight";
import { search } from "@orama/orama";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const highlighter = new Highlight({
  CSSClass: "bg-amber-100",
});

export default function Search({
  open,
  setOpen,
  contentArray,
  defaultCategory = "general",
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  contentArray: ContentArray;
  defaultCategory?: "general" | "api";
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"general" | "api">(defaultCategory);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectionSource, setSelectionSource] = useState<"keyboard" | "mouse">(
    "keyboard"
  );
  const index = useMemo(() => buildSearchIndex(contentArray), [contentArray]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCategory(defaultCategory);
  }, [defaultCategory]);

  useEffect(() => {
    if (open) {
      setSelectedIndex(0);
      setSelectionSource("keyboard");
    }
  }, [open]);

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
      where: { categories: category },
    });
  }, [query, index, category]);

  const resultsCount = "hits" in results ? results.hits.length : 0;

  // Slightly convoluted way of moving the currently selected index when hover state changes.
  // We do it this way, because using onMouseEnter requires the cursor to enter a box, which
  // isn't always the case: [Cursor on top of A] -> [Key down to B] -> [Shake cursor inside A].
  // This implementation watches any mouse movement at all, which is more robust.
  useEffect(() => {
    if (!open || !modalContentRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const elementUnderCursor = document.elementFromPoint(
        e.clientX,
        e.clientY
      );
      if (!elementUnderCursor) return;

      // Traverse up the DOM tree to find the hovered result row
      let currentElement: Element | null = elementUnderCursor;
      while (currentElement && currentElement !== modalContentRef.current) {
        const dataIndex = currentElement.getAttribute("data-result-index");
        if (dataIndex !== null) {
          const index = parseInt(dataIndex);
          if (!isNaN(index) && index >= 0 && index < resultsCount) {
            setSelectionSource("mouse");
            setSelectedIndex(index);
            return;
          }
        }
        currentElement = currentElement.parentElement;
      }
    };

    const modalElement = modalContentRef.current;
    modalElement.addEventListener("mousemove", handleMouseMove);

    return () => {
      modalElement.removeEventListener("mousemove", handleMouseMove);
    };
  }, [open, resultsCount]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectionSource("keyboard");
      setSelectedIndex((prev) => Math.min(prev + 1, resultsCount - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectionSource("keyboard");
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && resultsCount > 0) {
      e.preventDefault();
      const selectedHit = "hits" in results && results.hits[selectedIndex];
      if (selectedHit) {
        (
          document.querySelector(`[data-result-index="${selectedIndex}"]`) as
            | HTMLAnchorElement
            | undefined
        )?.click();
        setOpen(false);
      }
    }
  };

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
          <Dialog.Content
            ref={modalContentRef}
            className="max-w-xl w-full rounded-md border bg-gray-50 h-96 overflow-scroll"
          >
            <Dialog.Title className="sr-only">Search</Dialog.Title>

            <div className="sticky top-0 space-x-1 bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center">
              <Icon.Search />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search&hellip;"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                  setSelectionSource("keyboard");
                }}
                onKeyDown={handleKeyDown}
                className="w-full focus:outline-none ml-2 placeholder:text-gray-400 flex-1"
              />
              <CategoryButton
                label="General"
                isActive={category === "general"}
                onClick={() => setCategory("general")}
              />
              <CategoryButton
                label="API"
                isActive={category === "api"}
                onClick={() => setCategory("api")}
              />
            </div>

            <div className="divide-y divide-gray-200">
              {"hits" in results &&
                results.hits.map((hit, index) => {
                  return (
                    <SearchResultRow
                      key={hit.id}
                      title={hit.document.title}
                      body={hit.document.body}
                      href={`/${hit.document.slug}`}
                      query={query}
                      isSelected={index === selectedIndex}
                      resultIndex={index}
                      selectionSource={selectionSource}
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
  isSelected = false,
  resultIndex,
  selectionSource,
}: {
  title: string;
  body?: string;
  href: string;
  query: string;
  isSelected?: boolean;
  resultIndex?: number;
  selectionSource?: "keyboard" | "mouse";
}) {
  const LinkComponent = href.startsWith("/") ? Link : "a";
  const rowRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (isSelected && rowRef.current && selectionSource === "keyboard") {
      rowRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isSelected, selectionSource]);

  return (
    <LinkComponent
      ref={rowRef}
      href={href}
      data-result-index={resultIndex}
      className={clsx("block py-2.5 px-4", isSelected && "bg-gray-200")}
    >
      <p
        dangerouslySetInnerHTML={{
          __html: highlighter.highlight(title, query).HTML,
        }}
        className="font-medium"
      />
      {body && (
        <p
          dangerouslySetInnerHTML={{
            __html: highlighter.highlight(body, query).trim(100),
          }}
          className="mt-0.5 text-sm text-gray-500"
        />
      )}
    </LinkComponent>
  );
}

function CategoryButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-1 py-0.5 text-xs rounded border",
        isActive
          ? "bg-gray-900 text-white border-gray-900"
          : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
      )}
      type="button"
    >
      {label}
    </button>
  );
}

function NoResultsFound() {
  return (
    <>
      <div className="pt-2 pb-2.5 px-4 text-sm text-gray-400">
        No results found
      </div>
      <SearchResultRow
        title="Email support@buttondown.com"
        href="mailto:support@buttondown.com"
        query=""
      />
    </>
  );
}
