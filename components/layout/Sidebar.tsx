"use client";

import { TITLE } from "@/lib/constants";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";
import Footer from "./footer";
import type { NavData } from "./lib";
import Nav from "./nav";
import { Search } from "./search";

const Sidebar = ({ slug, nav }: { slug: string; nav: NavData }) => {
  const [openOnMobile, setOpenOnMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 inset-x-0 md:hidden p-4 bg-gray-100 flex items-center gap-x-2 z-30">
        <button
          className="p-1"
          onClick={() => setOpenOnMobile(true)}
          type="button"
        >
          <Bars3Icon className="h-4 w-4" />
        </button>
        <p className="text font-extrabold text-gray-800 flex-1">{TITLE}</p>
        <button
          className="p-1"
          onClick={() => setSearchOpen(true)}
          type="button"
        >
          <MagnifyingGlassIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="md:w-[320px] order-last md:order-first">
        <div
          className={clsx(
            "fixed top-0 left-0",
            "h-screen w-full md:w-[320px] grid grid-rows-[max-content,max-content,1fr]",
            "px-5 py-4 border-r border-gray-200 bg-gray-50 display transition-all",
            openOnMobile && "z-40",
            !openOnMobile && "max-md:-ml-[100vw]",
          )}
        >
          <div className="flex items-center">
            <p className="text font-bold text-gray-800 flex-1">{TITLE}</p>
            <button
              className="p-1 md:hidden"
              onClick={() => setOpenOnMobile(false)}
              type="button"
            >
              <XMarkIcon className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <div className="mt-4">
            <Search open={searchOpen} setOpen={setSearchOpen} />
          </div>

          <div className="mt-4 overflow-hidden transition-opacity">
            <Nav data={nav} slug={slug} />
          </div>

          <div className="border-t border-gray-200 pt-3">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
