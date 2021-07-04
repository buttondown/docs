import { useEffect } from "react";
import { useRouter } from "next/router";
import * as Fathom from "fathom-client";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    Fathom.load("FEFRJKHH", {
      includedDomains: ["demo.buttondown.email"],
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
