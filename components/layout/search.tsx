"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Highlight } from "@orama/highlight";
import { search } from "@orama/orama";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { buildSearchIndex } from "@/lib/search/client";
import { ContentArray } from "@/lib/search/server";
import { clsx } from "@/lib/utils";

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 text-gray-400 shrink-0"
  >
    <title>Search icon</title>
    <path
      fillRule="evenodd"
      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
      clipRule="evenodd"
    />
  </svg>
);

const highlighter = new Highlight({
  CSSClass: "bg-amber-100",
});

export default function Search({
  contentArray,
  defaultCategory = "general",
  enableKeyboardShortcut = true,
  variant = "modal",
}: {
  contentArray: ContentArray;
  defaultCategory?: "general" | "api";
  enableKeyboardShortcut?: boolean;
  variant?: "inline" | "modal";
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"general" | "api">(defaultCategory);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectionSource, setSelectionSource] = useState<"keyboard" | "mouse">(
    "keyboard",
  );
  const index = useMemo(() => buildSearchIndex(contentArray), [contentArray]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCategory(defaultCategory);
  }, [defaultCategory]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(-1);
      setSelectionSource("keyboard");
    }
  }, [open]);

  useEffect(() => {
    if (!enableKeyboardShortcut) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [enableKeyboardShortcut]);

  // Auto-focus input on open (inline variant)
  useEffect(() => {
    if (open && variant === "inline") {
      requestAnimationFrame(() => searchInputRef.current?.focus());
    }
  }, [open, variant]);

  const results = useMemo(() => {
    if (!index) return [];
    if (!query) return [];

    return search(index, {
      term: query,
      limit: 15,
      where: { categories: category },
    });
  }, [query, index, category]);

  const hitsCount = "hits" in results ? results.hits.length : 0;
  const noResults = hitsCount === 0 && query.trim().length > 0;
  const resultsCount = noResults ? 1 : hitsCount;

  // Mouse hover tracking for result selection
  useEffect(() => {
    if (!open || !panelRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const elementUnderCursor = document.elementFromPoint(
        e.clientX,
        e.clientY,
      );
      if (!elementUnderCursor) return;

      let currentElement: Element | null = elementUnderCursor;
      while (currentElement && currentElement !== panelRef.current) {
        const dataIndex = currentElement.getAttribute("data-result-index");
        if (dataIndex !== null) {
          const idx = parseInt(dataIndex);
          if (!isNaN(idx) && idx >= 0 && idx < resultsCount) {
            setSelectionSource("mouse");
            setSelectedIndex(idx);
            return;
          }
        }
        currentElement = currentElement.parentElement;
      }
    };

    const el = panelRef.current;
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [open, resultsCount]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      setCategory((prev) => (prev === "general" ? "api" : "general"));
      setSelectedIndex(0);
      setSelectionSource("keyboard");
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectionSource("keyboard");
      setSelectedIndex((prev) => Math.min(prev + 1, resultsCount - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectionSource("keyboard");
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && selectedIndex >= 0 && resultsCount > 0) {
      e.preventDefault();
      (
        document.querySelector(`[data-result-index="${selectedIndex}"]`) as
          | HTMLAnchorElement
          | undefined
      )?.click();
      setOpen(false);
    }
  };

  const searchPanel = (
    <>
      <div className={clsx("sticky top-0 space-x-1 bg-white px-4 py-3 flex items-center", query.trim() && "border-b border-gray-200")}>
        <SearchIcon />
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search&hellip;"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(-1);
            setSelectionSource("keyboard");
          }}
          onKeyDown={handleKeyDown}
          className="w-full focus:outline-none ml-2 placeholder:text-gray-400 flex-1 bg-transparent"
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
          results.hits.map((hit, hitIndex) => {
            return (
              <SearchResultRow
                key={hit.id}
                title={hit.document.title}
                body={hit.document.body}
                href={`/${hit.document.slug}`}
                query={query}
                isSelected={hitIndex === selectedIndex}
                resultIndex={hitIndex}
                selectionSource={selectionSource}
                onClick={() => setOpen(false)}
              />
            );
          })}

        {noResults && (
          <>
            <div className="py-3 px-4 text-sm text-gray-400">
              No results found
            </div>
            <SearchResultRow
              title="Email support@buttondown.com"
              href="mailto:support@buttondown.com"
              query=""
              isSelected={selectedIndex === 0}
              resultIndex={0}
              selectionSource={selectionSource}
              onClick={() => setOpen(false)}
            />
          </>
        )}
      </div>
    </>
  );

  if (variant === "inline") {
    return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <div className="relative" ref={containerRef}>
          <button
            onClick={() => setOpen(!open)}
            type="button"
            className={clsx(
              "bg-gray-100 hover:bg-gray-200 transition-colors rounded-full pl-3 pr-4 xl:pr-12 py-1 flex items-center gap-x-1.5",
              open && "bg-gray-200",
            )}
          >
            <MagnifyingGlassIcon className="size-4 text-gray-500" />
            <span className="text-sm">Search</span>
          </button>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/10 z-50 data-[state=open]:animate-overlay-in data-[state=closed]:animate-overlay-out" />
            <Dialog.Content
              ref={panelRef}
              onOpenAutoFocus={(e) => e.preventDefault()}
              className="w-[420px] rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden z-[51] data-[state=open]:animate-dropdown-in data-[state=closed]:animate-dropdown-out"
              style={{
                position: "fixed",
                top: containerRef.current
                  ? containerRef.current.getBoundingClientRect().bottom + 4
                  : 0,
                right: containerRef.current
                  ? window.innerWidth -
                    containerRef.current.getBoundingClientRect().right
                  : 0,
              }}
            >
              <Dialog.Title asChild><span className="sr-only">Search</span></Dialog.Title>
              <div className="max-h-[50vh] overflow-y-auto">
                {searchPanel}
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </div>
      </Dialog.Root>
    );
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <button onClick={() => setOpen(true)} type="button">
        <MagnifyingGlassIcon className="size-5" />
      </button>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 grid sm:place-items-center p-2 data-[state=open]:animate-overlay-in data-[state=closed]:animate-overlay-out">
          <Dialog.Content
            ref={panelRef}
            className="max-w-xl w-full rounded-md border bg-white h-96 overflow-scroll data-[state=open]:animate-modal-in data-[state=closed]:animate-modal-out"
          >
            <Dialog.Title asChild><span className="sr-only">Search</span></Dialog.Title>
            {searchPanel}
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
  onClick,
}: {
  title: string;
  body?: string;
  href: string;
  query: string;
  isSelected?: boolean;
  resultIndex?: number;
  selectionSource?: "keyboard" | "mouse";
  onClick?: () => void;
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
      onClick={onClick}
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
          : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100",
      )}
      type="button"
    >
      {label}
    </button>
  );
}


