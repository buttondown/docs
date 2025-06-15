"use client";

import React from "react";

export default function ExpandableCodeBlock({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = React.useState(false);

  if (expanded) return children;

  return (
    <div className="max-h-[320px]">
      {children}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-24 items-end justify-center bg-linear-to-t from-[#1E1E1E] pb-3 group-data-[collapsed=false]/code-wrapper:bg-none">
        <button
          type="button"
          className="group/button data-[focus-visible]:outline-focus pointer-events-auto flex gap-x-1 rounded-full bg-white/10 py-1 pl-1.5 pr-3 text-xs/4 font-book text-white outline-hidden ring-1 ring-inset ring-white/10 backdrop-blur-[2px] transition [--focus-outline:var(--color-white)] hover:bg-white/15 hover:ring-white/15"
          onClick={() => setExpanded(true)}
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="size-4 flex-none stroke-gray-400 transition-colors group-hover/button:stroke-gray-300 group-data-[collapsed=false]/code-wrapper:rotate-180"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M5.75 8.75 8 11.25m0 0 2.25-2.5M8 11.25v-6.5"
            />
          </svg>
          Show code
        </button>
      </div>
    </div>
  );
}
