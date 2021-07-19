import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { Fragment } from "react";

import classNames from "../lib/classNames";
import icon from "../public/images/icon@72.png";
import NAVIGATION, { NavigationItem } from "./Navigation";
import Search from "./Search/Search";

function NavigationLink(router: NextRouter, item: NavigationItem) {
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
                </a>
              </Link>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

type Props = {
  setSidebarOpen: (arg0: boolean) => void;
  sidebarOpen: boolean;
  setSearchOpen: (arg0: boolean) => void;
  searchOpen: boolean;
};

export default function Sidebar({
  setSidebarOpen,
  sidebarOpen,
  searchOpen,
  setSearchOpen,
}: Props) {
  const router = useRouter();

  return (
    <>
      <div className="h-screen flex overflow-hidden bg-gray-100">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            static
            className="fixed inset-0 flex z-40 md:hidden"
            open={sidebarOpen}
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pb-4 bg-gray-800">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4 bg-gray-900">
                  <div className="flex items-center h-16 flex-shrink-0 text-white font-bold">
                    <Image
                      src={icon}
                      width={30}
                      height={30}
                      alt="Buttondown logo"
                    />
                    &nbsp; Buttondown
                  </div>
                </div>
                <div className="bg-gray-800 px-2 space-y-1 pt-4 text-gray-400">
                  <Search
                    setSearchOpen={setSearchOpen}
                    searchOpen={searchOpen}
                  />
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {NAVIGATION.map((i) => NavigationLink(router, i))}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>
      </div>

      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1">
            <div className="flex-1 flex flex-col overflow-y-auto">
              <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900 text-white font-bold">
                <Image
                  src={icon}
                  width={30}
                  height={30}
                  alt="Buttondown logo"
                />
                &nbsp; Buttondown
              </div>
              <div className="bg-gray-800 px-2 space-y-1 pt-4 text-gray-400">
                <Search setSearchOpen={setSearchOpen} searchOpen={searchOpen} />
              </div>
              <nav className="flex-1 px-2 py-4 bg-gray-800 space-y-1">
                {NAVIGATION.map((i) => NavigationLink(router, i))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
