"use client";

import type { ContentArray } from "@/lib/search/server";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import type { NavData } from "./lib";
import Search from "./search";

export default function MobileNav({
  slug,
  nav,
  contentArray,
  activeGroup,
}: {
  slug: string;
  nav: NavData;
  contentArray: ContentArray;
  activeGroup: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [tabValue, setTabValue] = useState<string>(activeGroup || "guides");

  useEffect(() => {
    if (open) {
      setMounted(true);
    } else if (mounted) {
      const timeout = setTimeout(() => setMounted(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [open, mounted]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <header className="bg-gray-50 border-b px-4 pt-3 pb-2.5 flex items-center justify-between">
        <div className="flex-1 flex items-center">
          <Dialog.Trigger asChild>
            <button aria-label="Open menu">
              <Bars3Icon className="size-5" />
            </button>
          </Dialog.Trigger>
        </div>

        <a href="https://buttondown.com">
          <img src="/icon.svg" alt="Buttondown logo" className="h-8" />
        </a>

        <div className="flex-1 flex items-center justify-end">
          <Search
            contentArray={contentArray}
            defaultCategory="general"
            enableKeyboardShortcut={false}
          />
        </div>
      </header>

      {mounted && (
        <Dialog.Portal forceMount>
          <Dialog.Overlay
            forceMount
            className="mobile-nav-overlay fixed inset-0 bg-black/50 z-40"
          />
          <Dialog.Content
            forceMount
            className="mobile-nav-content fixed top-0 left-0 h-full w-4/5 bg-gray-50 z-50 flex flex-col"
          >
            <Dialog.Title className="sr-only">Navigation menu</Dialog.Title>

            <div className="flex items-center justify-end px-4 h-[55px] border-b">
              <Dialog.Close asChild>
                <button aria-label="Close menu">
                  <XMarkIcon className="size-5" />
                </button>
              </Dialog.Close>
            </div>

            <Tabs.Root
              value={tabValue}
              onValueChange={setTabValue}
              className="flex flex-col flex-1 min-h-0"
            >
              <Tabs.List className="flex gap-x-2 px-4 py-2 border-b bg-gray-50 shrink-0">
                <Tabs.Trigger
                  value="guides"
                  className={clsx(
                    "px-2 py-1 text-sm rounded-md transition-colors",
                    tabValue === "guides"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300",
                  )}
                >
                  Getting started
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="reference"
                  className={clsx(
                    "px-2 py-1 text-sm rounded-md transition-colors",
                    tabValue === "reference"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300",
                  )}
                >
                  Reference
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="api"
                  className={clsx(
                    "px-2 py-1 text-sm rounded-md transition-colors",
                    tabValue === "api"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300",
                  )}
                >
                  API
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content
                value="guides"
                asChild
                className="flex-1 overflow-y-auto"
              >
                <Sidebar
                  key="sidebar-guides"
                  slug={slug}
                  nav={nav}
                  className="p-4 pb-20"
                  section="guides"
                />
              </Tabs.Content>
              <Tabs.Content
                value="reference"
                asChild
                className="flex-1 overflow-y-auto"
              >
                <Sidebar
                  key="sidebar-reference"
                  slug={slug}
                  nav={nav}
                  className="p-4 pb-20"
                  section="reference"
                />
              </Tabs.Content>
              <Tabs.Content
                value="api"
                asChild
                className="flex-1 overflow-y-auto"
              >
                <Sidebar
                  key="sidebar-api"
                  slug={slug}
                  nav={nav}
                  className="p-4 pb-20"
                  section="api"
                />
              </Tabs.Content>
            </Tabs.Root>
          </Dialog.Content>
        </Dialog.Portal>
      )}
    </Dialog.Root>
  );
}
