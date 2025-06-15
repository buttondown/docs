"use client";

import type { Result } from "@/app/api/offline-search/lib";
import Icon from "@/components/Icon";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useCommandState } from "cmdk";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

// Set this to true to use "dumb" substring search.
const DISABLE_AI_EMBEDDINGS = process.env.DISABLE_AI_EMBEDDINGS === "true";

const SearchResult = ({
  result,
  icon,
}: {
  result: Result;
  icon: ReactNode;
}) => {
  const router = useRouter();
  const url = `/${result.slug}`;

  return (
    <CommandItem onSelect={() => router.push(url)}>
      <div className="ml-2 mr-4 text-gray-600">{icon}</div>
      <Link href={url}>
        <div>
          <p>
            <span className="font-medium">{result.display.title}</span>
            {result.display.subtitle && (
              <>
                <span className="ml-1 text-gray-400">·</span>
                <span className="ml-1 text-gray-400">
                  {result.display.subtitle}
                </span>
              </>
            )}
          </p>
          {result.display.description && (
            <p className="text-gray-400 text-sm">
              {result.display.description}
            </p>
          )}
        </div>
      </Link>
    </CommandItem>
  );
};

const generateIcon = (slug: string) => {
  if (slug.startsWith("api-")) {
    return <Icon.Code />;
  }
  if (slug.startsWith("glossary-")) {
    return <Icon.Book />;
  }
  return <Icon.Document />;
};

export function Search({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [offlineResults, setOfflineResults] = useState<Result[]>([]);
  const [offlineLoading, setOfflineLoading] = useState(false);
  const [onlineResults, setOnlineResults] = useState<Result[]>([]);
  const [onlineLoading, setOnlineLoading] = useState(false);
  const controller = useRef<AbortController | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  // Anecdotally, it feels like the first search request is sometimes slow.
  // I wonder if this is because of cold starts on Vercel serverless functions,
  // exacerbated by how large the vectors JSON file is when loaded into memory.
  // This tries to warm up the serverless function as soon as the search modal
  // is opened.

  const hasWarmedColdStart = useRef(false);

  useEffect(() => {
    if (hasWarmedColdStart.current) {
      return;
    }

    if (open) {
      fetch("/api/online-search?query=_");
      fetch("/api/offline-search?query=_");
      hasWarmedColdStart.current = true;
    }
  }, [open]);

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: this is a search input
    <div className="relative bg-white" onClick={() => setOpen(true)}>
      <button
        className="w-full select-none border shadow-xs flex items-center gap-x-2 px-2 py-1.5 rounded-md hover:bg-gray-100 hover:border-gray-300 transition-colors"
        type="button"
      >
        <div className="text-gray-500">
          <Icon.Search />
        </div>
        <div className="text-sm text-gray-400">Search</div>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen} shouldFilter={false}>
        <CommandInput
          placeholder="Search..."
          loading={offlineLoading || onlineLoading}
          onValueChange={(value) => {
            if (!value) {
              setOfflineResults([]);
              setOnlineResults([]);
              return;
            }

            setOfflineLoading(true);
            setOnlineLoading(true);

            if (controller.current) {
              controller.current.abort();
            }

            clearTimeout(timeout.current);

            timeout.current = setTimeout(() => {
              controller.current = new AbortController();

              if (!DISABLE_AI_EMBEDDINGS) {
                fetch(`/api/online-search?query=${encodeURIComponent(value)}`, {
                  signal: controller.current.signal,
                })
                  .then((res) => res.json())
                  .then((json) => {
                    setOnlineResults(json);
                    setOnlineLoading(false);
                  });
              }

              fetch(`/api/offline-search?query=${encodeURIComponent(value)}`, {
                signal: controller.current.signal,
              })
                .then((res) => res.json())
                .then((json) => {
                  setOfflineResults(json);
                  setOfflineLoading(false);
                });
            }, 300);
          }}
        />
        <CommandList>
          <SearchEmptyState loading={offlineLoading || onlineLoading} />
          {offlineResults.map((result) => {
            return (
              <SearchResult
                key={result.slug}
                result={result}
                icon={generateIcon(result.slug)}
              />
            );
          })}
          {onlineResults
            .filter(
              (result) => !offlineResults.some((r) => r.slug === result.slug)
            )
            .map((result) => {
              return (
                <SearchResult
                  key={result.slug}
                  result={result}
                  icon={generateIcon(result.slug)}
                />
              );
            })}
        </CommandList>
      </CommandDialog>
    </div>
  );
}

const SearchEmptyState = ({ loading }: { loading: boolean }) => {
  const value = useCommandState((state) => state.value) ?? "";
  return (
    <CommandEmpty>
      {!loading && value.trim() !== "" && (
        <div className="py-6 text-center text-sm space-y-1">
          <p className="text-gray-700">No results found.</p>
          <p className="text-gray-500">
            Contact
            <a
              href="https://buttondown.com/support"
              className="underline decoration-gray-500"
            >
              our support team
            </a>{" "}
            for assistance.
          </p>
        </div>
      )}
    </CommandEmpty>
  );
};
