import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { NextRouter } from "next/router";
import { Fragment } from "react";

import classNames from "../../lib/classNames";
import { NavigationItem } from "./NavigationHierarchy";

export default function NavigationLink(
  router: NextRouter,
  item: NavigationItem
) {
  return !item.children ? (
    <div key={item.name}>
      <Link href={item.href} passHref>
        <a
          className={classNames(
            router.pathname === item.href
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white",
            "group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md"
          )}
        >
          <item.icon
            className={classNames(
              router.pathname === item.href
                ? "text-gray-300"
                : "text-gray-400 group-hover:text-gray-300",
              "mr-3 flex-shrink-0 h-6 w-6"
            )}
            aria-hidden="true"
          />
          {item.name}
        </a>
      </Link>
    </div>
  ) : (
    <Disclosure
      as="div"
      key={item.name}
      className="space-y-1"
      defaultOpen={router.pathname.startsWith(item.href)}
    >
      {({ open }) => (
        <>
          <Disclosure.Button
            className={classNames(
              router.pathname === item.href
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white",
              "group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            )}
          >
            <item.icon
              className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-300"
              aria-hidden="true"
            />

            <span className="flex-1">{item.name}</span>
            <svg
              className={classNames(
                open ? "text-gray-400 rotate-90" : "text-gray-300",
                "ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150"
              )}
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
            </svg>
          </Disclosure.Button>
          <Disclosure.Panel className="space-y-1">
            {(item.children || []).map((subItem) => (
              <Link key={subItem.name} href={subItem.href} passHref>
                <a
                  className={classNames(
                    subItem.href === "#"
                      ? "text-gray-600"
                      : subItem.href === router.pathname
                      ? "text-gray-200"
                      : "text-gray-400",
                    "group w-full flex items-center pl-11 pr-2 py-1 text-sm font-medium  rounded-md hover:text-white hover:bg-gray-750"
                  )}
                >
                  {subItem.name}
                  {subItem.beta && (<span style={{fontSize: "0.5rem"}} className="font-bold uppercase ml-1 bg-green-600 text-white rounded px-2">Beta</span>)}
                </a>
              </Link>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
