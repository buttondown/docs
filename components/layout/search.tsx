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
      <div>
        <p>
          {result.display.title}
          {result.display.subtitle && (
            <>
              <span className="ml-1 text-gray-400">·</span>
              <span className="ml-1 text-gray-400">
                {result.display.subtitle}
              </span>
            </>
          )}
        </p>
      </div>
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

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: this is a search input
    <div className="relative bg-white" onClick={() => setOpen(true)}>
      <button
        className="w-full select-none border shadow-sm flex items-center gap-x-2 px-2 py-1.5 rounded-md hover:bg-gray-100 hover:border-gray-300 transition-colors"
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
            }, 350);
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
              (result) => !offlineResults.some((r) => r.slug === result.slug),
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
            Email{" "}
            <a
              href="mailto:support@buttondown.email"
              className="underline decoration-gray-500"
            >
              support@buttondown.email
            </a>
            {" or "}
            <a
              href="https://github.com/buttondown/roadmap/issues"
              target="_blank"
              className="underline decoration-gray-500"
              rel="noreferrer"
            >
              file a GitHub issue
            </a>
            ?
          </p>
        </div>
      )}
    </CommandEmpty>
  );
};
