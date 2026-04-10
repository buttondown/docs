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

  const nav = assembleNavData(navigation as NavigationFile, pages);

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

  const guidesHref = `/${getFirstPageSlug(nav, "guides")}`;
  const referenceHref = `/${getFirstPageSlug(nav, "reference")}`;
  const apiHref = `/${getFirstPageSlug(nav, "api")}`;

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block z-50 bg-white">
        <div className="px-5 border-r border-b h-[50px] right-0 hidden lg:flex items-center fixed z-50 top-0 left-0 bg-white">
          <a href="https://buttondown.com">
            <img src="/icon.svg" alt="Buttondown logo" className="size-6" />
          </a>
          <nav
            className={clsx(
              "max-lg:hidden pl-4 sticky top-0 bg-white z-50",
              "flex items-center justify-between w-full",
            )}
          >
            <div className="flex items-center gap-x-6">
              <NavItem
                label="Getting started"
                href={guidesHref}
                icon={PlayCircleIcon}
                isActive={currentNavigationGroup === "guides"}
              />
              <NavItem
                label="Reference"
                href={referenceHref}
                icon={BookOpenIcon}
                isActive={currentNavigationGroup === "reference"}
              />
              <NavItem
                label="API"
                href={apiHref}
                icon={CodeBracketIcon}
                isActive={currentNavigationGroup === "api"}
              />
            </div>
            <div className="flex-1" />

            <div className="flex items-center gap-x-3">
              <Search
                contentArray={contentArray}
                defaultCategory="general"
                variant="inline"
              />
              <AccountButtons />
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile nav header */}
      <MobileNav
        slug={slug}
        nav={nav}
        contentArray={contentArray}
        activeGroup={currentNavigationGroup}
      />

      <div className="lg:grid lg:grid-cols-[320px_1fr] pt-12">
        {/* Desktop nav header */}
        <div className="overflow-scroll no-scrollbar w-[320px] h-screen hidden lg:flex">
          <Sidebar
            slug={slug}
            nav={nav}
            className="px-5 py-4 fixed top-12 left-0 bottom-0"
          />
        </div>

        <div className="max-w-full lg:max-w-4xl p-4 pb-16 lg:p-8 lg:pb-24 mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-0">
            {title}
          </h1>
          <div className="flex min-w-0">
            <div className="min-w-0">
              <Prose>{children}</Prose>
              <footer className="flex bg-white z-50">
                <p className="text-gray-400 text-sm">
                  <div>
                    &copy; 2016–{new Date().getFullYear()} Buttondown LLC.
                  </div>
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
                  <a
                    href="https://buttondown.com"
                    target="_blank"
                    className="underline"
                  >
                    Home
                  </a>
                </p>
              </footer>
            </div>

            <div className="max-xl:hidden z-10">
              <HeadingsMinimap />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

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
