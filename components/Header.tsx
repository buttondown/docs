import { MenuAlt2Icon } from "@heroicons/react/outline";

type Props = {
  setSidebarOpen: (arg0: boolean) => void
}

export default function Header({ setSidebarOpen }: Props) {
  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200">
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex items-center">
          <a
            href="https://buttondown.email/login"
            target="_blank"
            className="mr-2 hover:bg-gray-200 px-4 py-2 rounded-md"
            rel="noreferrer"
          >
            About
          </a>
          <a
            href="https://buttondown.email/login"
            target="_blank"
            className="mr-2 hover:bg-gray-200 px-4 py-2 rounded-md"
            rel="noreferrer"
          >
            Guides
          </a>
          <a
            href="https://buttondown.email/login"
            target="_blank"
            className="mr-2 hover:bg-gray-200 px-4 py-2 rounded-md"
            rel="noreferrer"
          >
            Status
          </a>
        </div>
        <div className="ml-4 flex items-center lg:ml-6">
          <a
            href="https://buttondown.email/login"
            target="_blank"
            className="mr-2 hover:bg-gray-200 px-4 py-2 rounded-md"
            rel="noreferrer"
          >
            Log in
          </a>
          <a
            href="https://buttondown.email/register"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-buttondown-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            Sign up for an account
          </a>
        </div>
      </div>
    </div>
  );
}
