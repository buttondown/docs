import {
  BookOpenIcon,
  CodeBracketIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";
import HeadingsMinimap from "@/components/headings-minimap";
import { buildContentArray } from "@/lib/search/server";
import cms from "@/lib/cms";
import { clsx } from "@/lib/utils";
import AccountButtons from "./account-buttons";
import {
  assembleNavData,
  getFirstPageSlug,
  type NavigationFile,
  type NavData,
} from "./lib";
import MobileNav from "./mobile-nav";
import { ShimmerLink } from "./ShimmerLink";
import Sidebar from "./Sidebar";
import Search from "./search";

export default async function Layout({
  slug,
  title,
  children,
}: {
  slug: string;
  title: string;
  children: React.ReactNode;
}) {
  const navigation = cms.readNavigation();
  const slugs = cms.list();
  const rawPages = cms.getManyRaw(slugs);
  const pages = rawPages.map((p) => ({
    slug: p.slug,
    title: p.title,
    navigationTitle: p.navigationTitle,
  }));

  if (!navigation) {
    throw new Error("Navigation couldn't be loaded");
  }

  const nav = assembleNavData(
    navigation as NavigationFile,
    pages,
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
      {/* Desktop sidebar */}
      <div className="max-lg:hidden fixed top-0 left-0 w-[320px] h-screen grid grid-rows-[max-content_1fr]">
        <DesktopLogo />
        <div className="overflow-scroll no-scrollbar">
          <Sidebar slug={slug} nav={nav} className="px-5 py-4" />
        </div>
      </div>

      {/* Mobile nav header */}
      <MobileNav
        slug={slug}
        nav={nav}
        contentArray={contentArray}
        activeGroup={currentNavigationGroup}
      />

      <div className="lg:ml-[320px]">
        {/* Desktop nav header */}
        <Nav activeGroup={currentNavigationGroup} nav={nav} />

        <div className="max-w-[650px] p-4 pb-16 lg:p-8 lg:pb-24 lg:mx-0 mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
            {title}
          </h1>
          <Prose>{children}</Prose>
        </div>

        <div className="max-xl:hidden">
          <HeadingsMinimap />
        </div>

        <div className="lg:sticky lg:bottom-0">
          <Footer />
        </div>
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

const Nav = ({
  activeGroup,
  nav,
}: {
  activeGroup: string | null;
  nav: NavData;
}) => {
  const contentArray = buildContentArray();

  const guidesHref = `/${getFirstPageSlug(nav, "guides")}`;
  const referenceHref = `/${getFirstPageSlug(nav, "reference")}`;
  const apiHref = `/${getFirstPageSlug(nav, "api")}`;

  return (
    <nav
      className={clsx(
        "max-lg:hidden border-b px-5 h-[50px] sticky top-0 bg-white z-50",
        "flex items-center justify-between",
      )}
    >
      <div className="flex items-center gap-x-6">
        <NavItem
          label="Getting started"
          href={guidesHref}
          icon={PlayCircleIcon}
          isActive={activeGroup === "guides"}
        />
        <NavItem
          label="Reference"
          href={referenceHref}
          icon={BookOpenIcon}
          isActive={activeGroup === "reference"}
        />
        <NavItem
          label="API"
          href={apiHref}
          icon={CodeBracketIcon}
          isActive={activeGroup === "api"}
        />
      </div>

      <div className="flex items-center gap-x-3">
        <Search contentArray={contentArray} defaultCategory="general" variant="inline" />
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
    <ShimmerLink
      href={href}
      className={clsx(
        "flex items-center gap-x-1.5 transition-colors",
        isActive ? "text-blue-700" : "text-gray-500 hover:text-gray-600",
      )}
    >
      <Icon className="size-5 flex-shrink-0" />
      <span className="font-medium">{label}</span>
    </ShimmerLink>
  );
};

const Footer = () => {
  return (
    <footer className="flex items-center justify-center bg-white z-50 border-t pb-3 pt-2.5 px-4">
      <p className="text-gray-400 text-sm max-lg:text-center">
        <span>&copy; 2016–{new Date().getFullYear()} Buttondown LLC.</span>

        <span className="max-lg:hidden inline-block w-3" />
        <br className="lg:hidden" />
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
