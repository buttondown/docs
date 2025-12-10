import keystaticConfig, { localBaseURL } from "@/keystatic.config";
import { buildContentArray } from "@/lib/search/server";
import {
  BookOpenIcon,
  CodeBracketIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";
import { createReader } from "@keystatic/core/reader";
import clsx from "clsx";
import Link from "next/link";
import AccountButtons from "./account-buttons";
import {
  type KeystaticNavigationFile,
  type KeystaticPage,
  type NavData,
  assembleNavData,
} from "./lib";
import MobileNav from "./mobile-nav";
import Search from "./search";
import Sidebar from "./Sidebar";

export default async function Layout({
  slug,
  title,
  children,
}: {
  slug: string;
  title: string;
  children: React.ReactNode;
}) {
  const reader = createReader(localBaseURL, keystaticConfig);
  const navigation = await reader.singletons.navigation.read();
  const pages = await reader.collections.pages.all();

  if (!navigation) {
    throw new Error("Navigation couldn't be loaded from Keystatic");
  }

  const nav = assembleNavData(
    navigation as KeystaticNavigationFile,
    pages as KeystaticPage[],
  );

  if ("errors" in nav) {
    throw new Error(nav.errors.join("\n"));
  }

  let currentNavigationGroup: string | null = null;
  for (const [group, folders] of Object.entries(nav as NavData)) {
    for (const folder of folders) {
      for (const page of folder.items) {
        if (
          (page.type === "page" || page.type === "hidden_page") &&
          page.slug === slug
        ) {
          currentNavigationGroup = group;
        }
      }
    }
  }

  const contentArray = buildContentArray();

  return (
    <>
      {/* Desktop */}
      <div className="max-lg:hidden grid grid-cols-[320px_1fr]">
        <div className="h-screen overflow-hidden grid grid-rows-[max-content_1fr] sticky top-0">
          <DesktopLogo />
          <div className="overflow-scroll no-scrollbar">
            <Sidebar slug={slug} nav={nav} className="px-5 py-4" />
          </div>
        </div>
        <div>
          <Nav activeGroup={currentNavigationGroup} />
          <div className="p-8 lg:pb-24 flex-1 overflow-hidden">
            <div className="max-w-[650px]">
              <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
                {title}
              </h1>

              <Prose>{children}</Prose>
            </div>
          </div>

          <div className="sticky bottom-0">
            <Footer />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <MobileNav
          slug={slug}
          nav={nav}
          contentArray={contentArray}
          activeGroup={currentNavigationGroup}
        />

        <div className="max-w-[650px] mx-auto p-4 pb-16">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
            {title}
          </h1>
          <Prose>{children}</Prose>
        </div>

        <Footer />
      </div>
    </>
  );
}

const DesktopLogo = () => {
  return (
    <div className="px-5 border-r border-b h-[50px] flex items-center">
      <a href="https://buttondown.com">
        <img src="/icon.svg" alt="Buttondown logo" className="h-8" />
      </a>
    </div>
  );
};

const Nav = ({ activeGroup }: { activeGroup: string | null }) => {
  const contentArray = buildContentArray();

  return (
    <nav
      className={clsx(
        "border-b px-5 h-[50px] sticky top-0 bg-white z-50",
        "flex items-center justify-between",
      )}
    >
      <div className="flex items-center gap-x-6">
        <NavItem
          label="Getting started"
          href="/introduction"
          icon={PlayCircleIcon}
          isActive={activeGroup === "guides"}
        />
        <NavItem
          label="Reference"
          href="/home"
          icon={BookOpenIcon}
          isActive={activeGroup === "reference"}
        />
        <NavItem
          label="API"
          href="/api-introduction"
          icon={CodeBracketIcon}
          isActive={activeGroup === "api"}
        />
      </div>

      <div className="flex items-center gap-x-3">
        <Search contentArray={contentArray} defaultCategory="general" />
        <AccountButtons />
      </div>
    </nav>
  );
};

const NavItem = ({
  label,
  href,
  icon: Icon,
  isActive,
}: {
  label: string;
  href: string;
  icon: React.ComponentType<React.ComponentProps<"svg">>;
  isActive?: boolean;
}) => {
  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center gap-x-1.5 transition-colors",
        isActive ? "text-blue-700" : "text-gray-500 hover:text-gray-600",
      )}
    >
      <Icon className="size-5 flex-shrink-0" />
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const Footer = () => {
  return (
    <footer className="flex items-center justify-center bg-white z-50 border-t pb-3 pt-2.5 px-4">
      <p className="text-gray-400 text-sm max-lg:text-center">
        <span>&copy; 2016–{new Date().getFullYear()} Buttondown LLC.</span>

        <span className="max-lg:hidden inline-block w-3" />
        <br className="lg:hidden" />

        <a href="TODO" target="_blank" className="underline">
          Accessibility
        </a>
        <span> &middot; </span>
        <a
          href="https://buttondown.com/blog"
          target="_blank"
          className="underline"
        >
          Blog
        </a>
        <span> &middot; </span>
        <a
          href="https://buttondown.com/changelog"
          target="_blank"
          className="underline"
        >
          Changelog
        </a>
        <span> &middot; </span>
        <a href="https://buttondown.com" target="_blank" className="underline">
          Home
        </a>
      </p>
    </footer>
  );
};

const Prose = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="mt-4 prose prose-lg max-w-none prose-h2:text-2xl prose-h3:text-xl prose-img:border-[2px] prose-img:border-gray-100 prose-img:outline-1 prose-img:outline-gray-300 prose-img:mx-auto prose-img:block prose-img:my-0 [&_td>p]:my-0! [&_th>p]:my-0! glossary:prose-a:after:mask-[url('/book.svg')] github:prose-a:after:mask-[url('/github.svg')] github:prose-a:notable-link glossary:prose-a:notable-link app-link:prose-a:after:mask-[url('/icon.svg')] app-link:prose-a:notable-link
        pricing:prose-a:after:mask-[url('/dollar.svg')] pricing:prose-a:notable-link [&_a:hover]:bg-[color-mix(in_srgb,currentColor_10%,transparent)]
        [&_li>code]:bg-gray-100 [&_p>code]:bg-gray-100 [&_p>code]:before:hidden [&_p>code]:after:hidden [&_p>code]:border-b [&_li>code]:border-b-2 [&_li>code]:before:hidden [&_li>code]:after:hidden [&_p>code]:px-1 [&_li>code]:px-1
        [&_td:first-child>p]:whitespace-nowrap rss:prose-a:after:mask-[url('/rss.svg')] rss:prose-a:notable-link prose-td:last:nth-2:text-right prose-th:last:nth-2:text-right
      "
    >
      {children}
    </div>
  );
};
