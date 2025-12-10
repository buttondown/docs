"use client";

import { ChevronRightIcon } from "@heroicons/react/20/solid";
import * as Accordion from "@radix-ui/react-accordion";
import clsx from "clsx";
import Link from "next/link";
import { useEffect } from "react";
import type { NavData } from "./lib";

const Sidebar = ({
  slug,
  nav,
  className,
  section,
}: {
  slug: string;
  nav: NavData;
  className?: string;
  section?: keyof NavData;
}) => {
  // If section is provided, use it directly
  let currentNavigationGroup: keyof NavData = section || "guides";
  let currentFolderName: string | null = null;

  // If no section provided, determine from slug
  if (!section) {
    for (const [navigationGroup, folders] of Object.entries(nav)) {
      for (const folder of folders) {
        for (const page of folder.items) {
          if (
            (page.type === "page" || page.type === "hidden_page") &&
            page.slug === slug
          ) {
            currentNavigationGroup = navigationGroup as keyof NavData;
            currentFolderName = folder.name;
          }
        }
      }
    }
  } else {
    // When section is provided (mobile), find the current folder from slug within that section
    for (const folder of nav[section]) {
      for (const page of folder.items) {
        if (
          (page.type === "page" || page.type === "hidden_page") &&
          page.slug === slug
        ) {
          currentFolderName = folder.name;
        }
      }
    }
  }

  if (!section && (!currentNavigationGroup || !currentFolderName)) {
    throw new Error(
      `Can't find current navigation group and/or folder name for "${slug}". (Has it been added to the navigation hierarchy in 'navigation.json'?)`,
    );
  }

  // Auto-scroll to active link when component mounts or slug changes
  useEffect(() => {
    const activeLink = document.querySelector(`a[href="/${slug}"]`);
    if (activeLink) {
      activeLink.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [slug]);

  return (
    <div
      className={clsx(
        "h-full border-r border-gray-200 bg-gray-50 overflow-y-auto",
        className,
      )}
    >
      <Accordion.Root
        type="multiple"
        defaultValue={currentFolderName ? [currentFolderName] : []}
        key={currentFolderName}
        className="space-y-1"
      >
        {nav[currentNavigationGroup].map((folder) => (
          <Accordion.Item key={folder.name} value={folder.name}>
            <Accordion.Header>
              <Accordion.Trigger className="group text-left">
                <div className="flex items-center gap-x-1.5">
                  <ChevronRightIcon className="block h-4 w-4 text-gray-400 group-data-[state=open]:rotate-90 transition-transform" />
                  <p className="text-gray-800 font-medium">{folder.name}</p>
                </div>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="pb-3 pt-1 space-y-1">
              {folder.items.map((item) => {
                if (item.type === "hidden_page") {
                  return null;
                }

                if (item.type === "divider") {
                  return (
                    <div key={item.title} className="pt-1.5">
                      <p className="ml-[1.2rem] text-xs text-gray-500 w-max bg-gray-200 px-1 py-0.5 rounded-md">
                        {item.title}
                      </p>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.slug}
                    href={`/${item.slug}`}
                    className={clsx(
                      "block ml-[1.4rem] text-sm tabular-nums",
                      item.slug === slug
                        ? "text-blue-600"
                        : "text-gray-500 hover:text-gray-800 transition-colors",
                    )}
                  >
                    {item.navigationTitle || item.title}
                  </Link>
                );
              })}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
};

export default Sidebar;
