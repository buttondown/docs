import { MenuAlt2Icon } from "@heroicons/react/outline";
import { UserCircleIcon } from "@heroicons/react/solid";
import { getCookie } from "cookies-next";

type Props = {
  setSidebarOpen: (arg0: boolean) => void;
};

const USERNAME_KEY = "newsletter_username";

export default function Header({ setSidebarOpen }: Props) {
  const currentUsername = getCookie(USERNAME_KEY);

  return (
    <div className="px-8">
      <div className="relative z-10 flex-shrink-0 flex border-b border-gray-200 py-4">
        <button
          type="button"
          className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 flex justify-between">
          <div className="flex-1 flex items-center"></div>
          <div className="ml-4 flex items-center lg:ml-6">
            <a
              href="https://buttondown.email/register"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-buttondown-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              <UserCircleIcon className="h-5 w-5 mr-2" aria-hidden />
              {currentUsername
                ? `Logged in as ${currentUsername}`
                : "Log in or sign up for an account"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
