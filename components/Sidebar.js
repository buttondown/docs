import { Disclosure } from "@headlessui/react";
import {
  BeakerIcon,
  EmojiHappyIcon,
  InboxInIcon,
  LightningBoltIcon,
  PresentationChartBarIcon,
  QuestionMarkCircleIcon,
  TerminalIcon,
} from "@heroicons/react/outline";
import icon from "../public/images/icon@72.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const navigation = [
  {
    name: "Welcome to Buttondown!",
    href: "/welcome",
    icon: EmojiHappyIcon,
  },
  {
    name: "Getting started",
    href: "/getting-started",
    icon: PresentationChartBarIcon,
    children: [
      { name: "Importing your data", href: "#" },
      { name: "Hosting from a custom domain", href: "#" },
      { name: "Sending from a custom domain", href: "#" },
    ],
  },
  {
    name: "Advanced features",
    href: "/features",
    icon: LightningBoltIcon,
    children: [
      { name: "Customizing your emails", href: "#" },
      { name: "Styling your web presence", href: "#" },
      { name: "Using template variables", href: "#" },
      { name: "Collecting and using metadata", href: "#" },
    ],
  },
  {
    name: "Migration guides",
    href: "/migrations",
    icon: InboxInIcon,
    children: [
      { name: "Substack", href: "#" },
      { name: "Mailchimp", href: "#" },
      { name: "Tinyletter", href: "#" },
      { name: "ConvertKit", href: "#" },
    ],
  },
  {
    name: "API reference",
    href: "/api-reference",
    icon: TerminalIcon,
    children: [
      { name: "Introduction", href: "/api-reference/introduction" },
      { name: "Authentication", href: "/api-reference/authentication" },
      {
        name: "Events and webhooks",
        href: "/api-reference/events-and-webhooks",
      },
      { name: "Changelog", href: "/api-reference/changelog" },
      { name: "Subscribers", href: "/api-reference/subscribers" },
      { name: "Emails", href: "/api-reference/emails" },
      { name: "Drafts", href: "/api-reference/drafts" },
      { name: "Tags", href: "/api-reference/tags" },
      { name: "Scheduled emails", href: "/api-reference/scheduled-emails" },
      { name: "Images", href: "/api-reference/images" },
      { name: "Newsletters", href: "/api-reference/newsletters" },
    ],
  },
  {
    name: "Integrations",
    href: "/integrations",
    icon: BeakerIcon,
    children: [
      { name: "Zapier", href: "#" },
      { name: "Fathom", href: "#" },
      { name: "Simple Analytics", href: "#" },
    ],
  },
  {
    name: "Need more help?",
    href: "/need-more-help",
    icon: QuestionMarkCircleIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1">
          <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900 text-white font-bold">
              <Image src={icon} width={30} height={30} alt="Buttondown logo" />
              &nbsp; Buttondown
            </div>
            <nav className="flex-1 px-2 py-4 bg-gray-800 space-y-1">
              {navigation.map((item) =>
                !item.children ? (
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
                              open
                                ? "text-gray-400 rotate-90"
                                : "text-gray-300",
                              "ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150"
                            )}
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                          </svg>
                        </Disclosure.Button>
                        <Disclosure.Panel className="space-y-1">
                          {item.children.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              passHref
                            >
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
                )
              )}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
