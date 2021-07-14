import "../styles/globals.css";

import * as Fathom from "fathom-client";
import { useRouter } from "next/router";
import { useEffect } from "react";

function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    Fathom.load("FEFRJKHH", {
      includedDomains: ["docs.buttondown.email"],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    router.events.on("routeChangeComplete", onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  });

  return <Component {...pageProps} />;
}

export default App;
