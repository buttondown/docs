import keystaticConfig, { localBaseURL } from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";
import Sidebar from "./Sidebar";
import AccountButtons from "./account-buttons";
import Footer from "./footer";
import {
  type KeystaticNavigationFile,
  type KeystaticPage,
  assembleNavData,
} from "./lib";

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
    pages as KeystaticPage[]
  );

  if ("errors" in nav) {
    throw new Error(nav.errors.join("\n"));
  }

  return (
    <div className="grid grid-rows-[max-content_1fr_max-content] lg:flex min-h-screen">
      <Sidebar slug={slug} nav={nav} />

      <div className="p-4 pb-8 lg:p-8 lg:pt-12 lg:pb-24 flex-1 overflow-hidden">
        <div className="max-w-[650px] mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
            {title}
          </h1>

          <div
            className="mt-4 prose prose-lg prose-h2:text-2xl prose-h3:text-xl prose-img:border-[2px] prose-img:border-gray-100 prose-img:outline prose-img:outline-1 prose-img:outline-gray-300 prose-img:mx-auto prose-img:block prose-img:my-0 [&_td>p]:my-0! [&_th>p]:my-0! glossary:prose-a:after:mask-[url('/book.svg')] github:prose-a:after:mask-[url('/github.svg')] github:prose-a:notable-link glossary:prose-a:notable-link app-link:prose-a:after:mask-[url('/icon.svg')] app-link:prose-a:notable-link
            pricing:prose-a:after:mask-[url('/dollar.svg')] pricing:prose-a:notable-link [&_a:hover]:bg-[color-mix(in_srgb,currentColor_10%,transparent)]
            [&_li>code]:bg-gray-100 [&_p>code]:bg-gray-100 [&_p>code]:before:hidden [&_p>code]:after:hidden [&_p>code]:border-b [&_li>code]:border-b-2 [&_li>code]:before:hidden [&_li>code]:after:hidden [&_p>code]:px-1 [&_li>code]:px-1
            [&_td:first-child>p]:whitespace-nowrap rss:prose-a:after:mask-[url('/rss.svg')] rss:prose-a:notable-link prose-td:last:nth-2:text-right prose-th:last:nth-2:text-right
          "
          >
            {children}
          </div>
        </div>
      </div>

      <div className="lg:hidden p-4">
        <Footer />
      </div>

      <AccountButtons />
    </div>
  );
}
