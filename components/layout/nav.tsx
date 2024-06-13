"use client";

import { ChevronRightIcon } from "@heroicons/react/20/solid";
import * as Accordion from "@radix-ui/react-accordion";
import * as Tabs from "@radix-ui/react-tabs";
import Link from "next/link";
import {
  NAVIGATION_GROUPS,
  NAVIGATION_GROUP_LABELS,
  type NavData,
} from "./lib";

export default function Nav({ data, slug }: { data: NavData; slug: string }) {
  let currentNavigationGroup: keyof NavData | null = null;
  let currentFolderName: string | null = null;

  for (const [navigationGroup, folders] of Object.entries(data)) {
    for (const folder of folders) {
      for (const page of folder.items) {
        if (page.type === "page" && page.slug === slug) {
          currentNavigationGroup = navigationGroup as keyof NavData;
          currentFolderName = folder.name;
        }
      }
    }
  }

  if (!currentNavigationGroup || !currentFolderName) {
    throw new Error(
      `Can’t find current navigation group and/or folder name for "${slug}". (Has it been added to the navigation hierarchy?) `,
    );
  }

  return (
    <Tabs.Root
      defaultValue={currentNavigationGroup}
      className="h-full overflow-hidden grid grid-rows-[max-content,1fr]"
    >
      <Tabs.List className="flex gap-x-4 sm:gap-x-3 border-b border-gray-200">
        {NAVIGATION_GROUPS.map((group) => (
          <Tabs.Trigger
            key={group}
            value={group}
            className="block pb-1 border-b border-transparent data-[state=active]:border-blue-500 -mb-px font-medium text-gray-500 data-[state=active]:text-blue-700 hover:border-gray-300 hover:text-gray-700 transition-colors"
          >
            {NAVIGATION_GROUP_LABELS[group]}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <div className="overflow-y-scroll no-scrollbar pt-4">
        {NAVIGATION_GROUPS.map((group) => (
          <Tabs.Content key={group} value={group}>
            <Accordion.Root
              type="multiple"
              defaultValue={[currentFolderName as string]}
              className="space-y-1"
            >
              {data[group].map((folder) => (
                <Accordion.Item key={folder.name} value={folder.name}>
                  <Accordion.Header>
                    <Accordion.Trigger className="group">
                      <div className="flex items-center gap-x-1.5">
                        <ChevronRightIcon className="block h-4 w-4 text-gray-400 group-data-[state=open]:rotate-90 transition-transform" />
                        <p className="text-gray-800 font-medium">
                          {folder.name}
                        </p>
                      </div>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="pb-3 pt-1 space-y-1">
                    {folder.items.map((item) => {
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
                          className={`block ml-[1.4rem] max-w-max text-sm tabular-nums ${
                            item.slug === slug
                              ? "text-blue-600"
                              : "text-gray-500 hover:text-gray-800 transition-colors"
                          }`}
                        >
                          {item.navigationTitle || item.title}
                        </Link>
                      );
                    })}
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </Tabs.Content>
        ))}
      </div>
    </Tabs.Root>
  );
}
