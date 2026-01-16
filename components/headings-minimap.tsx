"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type HeadingItem = {
  id: string;
  text: string;
  level: number;
};

export default function HeadingsMinimap() {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);
  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  const listRef = useRef<HTMLUListElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{
    top: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const extractHeadings = () => {
      const elements = document.querySelectorAll("h2[id], h3[id]");
      const items: HeadingItem[] = [];

      elements.forEach((el) => {
        const id = el.getAttribute("id");
        const text = el.textContent?.trim() || "";
        const level = el.tagName === "H2" ? 2 : 3;

        if (id && text) {
          items.push({ id, text, level });
        }
      });

      setHeadings(items);
    };

    extractHeadings();

    const observer = new MutationObserver(extractHeadings);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    const visibleSet = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          if (id) {
            if (entry.isIntersecting) {
              visibleSet.add(id);
            } else {
              visibleSet.delete(id);
            }
          }
        });
        setVisibleIds(new Set(visibleSet));
      },
      {
        rootMargin: "-100px 0px -100px 0px",
        threshold: 0,
      },
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  useEffect(() => {
    if (headings.length === 0) return;

    const updateCurrentSection = () => {
      const headerOffset = 100;
      let current: string | null = null;

      for (const { id } of headings) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= headerOffset) {
            current = id;
          }
        }
      }

      setCurrentSectionId(current);
    };

    updateCurrentSection();
    window.addEventListener("scroll", updateCurrentSection, { passive: true });

    return () => window.removeEventListener("scroll", updateCurrentSection);
  }, [headings]);

  useEffect(() => {
    if (!listRef.current) {
      setIndicatorStyle(null);
      return;
    }

    const idsToHighlight =
      visibleIds.size > 0
        ? visibleIds
        : currentSectionId
          ? new Set([currentSectionId])
          : new Set<string>();

    if (idsToHighlight.size === 0) {
      setIndicatorStyle(null);
      return;
    }

    const highlightIndices = headings
      .map((h, i) => (idsToHighlight.has(h.id) ? i : -1))
      .filter((i) => i !== -1);

    if (highlightIndices.length === 0) {
      setIndicatorStyle(null);
      return;
    }

    const firstVisibleId = headings[highlightIndices[0]].id;
    const lastVisibleId = headings[highlightIndices[highlightIndices.length - 1]].id;

    const firstEl = itemRefs.current.get(firstVisibleId);
    const lastEl = itemRefs.current.get(lastVisibleId);
    const listEl = listRef.current;

    if (firstEl && lastEl && listEl) {
      const listRect = listEl.getBoundingClientRect();
      const firstRect = firstEl.getBoundingClientRect();
      const lastRect = lastEl.getBoundingClientRect();

      const top = firstRect.top - listRect.top;
      const height = lastRect.bottom - firstRect.top;

      setIndicatorStyle({ top, height });
    }
  }, [visibleIds, currentSectionId, headings]);

  if (headings.length < 2) return null;

  return (
    <nav
      className="fixed right-8 top-[90px] w-[180px] max-h-[calc(100vh-150px)] overflow-y-auto no-scrollbar"
      aria-label="Table of contents"
    >
      <div className="relative">
        <div
          className="absolute left-0 w-px bg-gray-500 transition-all duration-200 ease-out"
          style={{
            top: indicatorStyle?.top ?? 0,
            height: indicatorStyle?.height ?? 0,
            opacity: indicatorStyle ? 1 : 0,
          }}
        />
        <ul ref={listRef} className="border-l border-gray-200">
          {headings.map(({ id, text, level }) => {
            const isHighlighted =
              visibleIds.size > 0
                ? visibleIds.has(id)
                : currentSectionId === id;
            return (
              <li
                key={id}
                ref={(el) => {
                  if (el) {
                    itemRefs.current.set(id, el);
                  } else {
                    itemRefs.current.delete(id);
                  }
                }}
              >
                <a
                  href={`#${id}`}
                  className={cn(
                    "block py-1.5 pl-4 text-[13px] leading-snug transition-colors duration-150",
                    level === 3 && "pl-6",
                    isHighlighted
                      ? "font-medium text-gray-700"
                      : "text-gray-400 hover:text-gray-600",
                  )}
                >
                  {text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
