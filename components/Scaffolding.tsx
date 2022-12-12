import Head from "next/head";
import { useState } from "react";
import React from "react";
import { GlobalHotKeys } from "react-hotkeys";

import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar/Sidebar";

const keyMap = {
  TRIGGER_SEARCH: "/",
};

export default function Layout({ meta, children }: any) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
            <meta property="og:description" content={meta.description} />
          )}
          <link rel="shortcut icon" href="/favicon.ico" />
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
            <div className="px-8 py-4 flex-grow flex">{children}</div>
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
}
