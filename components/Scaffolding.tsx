import Head from "next/head";
import { createContext, useState } from "react";
import { GlobalHotKeys } from "react-hotkeys";

import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar/Sidebar";

const keyMap = {
  TRIGGER_SEARCH: "/",
};

const useCookieState = (
  key: string,
  defaultValue: string
): [string, (value: string) => void] => {
  const getInitialValue = () => {
    if (typeof window === "undefined") {
      return defaultValue;
    }
    const item = window.localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item);
  };
  const [value, setValue] = useState(getInitialValue);
  const setNextValue = (value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  };

  return [value, setNextValue];
};

export const Context = createContext<{
  preferredLanguage: string;
  setPreferredLanguage: (language: string) => void;
}>({
  preferredLanguage: "python",
  setPreferredLanguage: () => {},
});

export default function Layout({ meta, children }: any) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [preferredLanguage, setPreferredLanguage] = useCookieState(
    "preferredLanguage",
    "python"
  );

  const title =
    meta && meta.title
      ? `${meta.title} • Buttondown documentation`
      : "Buttondown documentation";

  return (
    <>
      <GlobalHotKeys
        keyMap={keyMap}
        handlers={{
          TRIGGER_SEARCH: (e) => {
            e?.preventDefault();
            setSearchOpen(true);
          },
        }}
      />
      <div className="h-screen flex overflow-hidden max-w-full">
        <Head>
          <title>{title}</title>
          <meta property="og:title" content={title} />
          {meta && meta.description && (
            <>
              <meta property="og:description" content={meta.description} />
              <meta name="description" content={meta.description} />
            </>
          )}
          <meta
            property="og:image"
            content="https://buttondown.email/next-assets/img/banner.png"
          />
          <link
            rel="shortcut icon"
            href="https://buttondown.email/static/images/icons/icon@72.png"
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=optional"
            rel="stylesheet"
          />
        </Head>
        <Sidebar
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          setSearchOpen={setSearchOpen}
          searchOpen={searchOpen}
        />
        <div className="flex flex-col w-0 flex-1 overflow-hidden min-h-screen">
          <main className="flex-1 relative overflow-y-auto focus:outline-none flex flex-col">
            <Header setSidebarOpen={setSidebarOpen} />
            <div className="px-8 py-4 grid grid-cols-[1fr,max-content]">
              <Context.Provider
                value={{ preferredLanguage, setPreferredLanguage }}
              >
                {children}
              </Context.Provider>
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
}
