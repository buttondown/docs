"use client";

import { useEffect } from "react";

// Enum values live inside a <details>, which the browser won't scroll to while
// it's collapsed — and hydration lands the page back at the top regardless. Open
// the disclosure around whatever the URL points at, then scroll to it ourselves.
export default function RevealHashTarget() {
  useEffect(() => {
    const reveal = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      let disclosure = target.closest("details");
      while (disclosure) {
        disclosure.open = true;
        disclosure = disclosure.parentElement?.closest("details") ?? null;
      }
      requestAnimationFrame(() => target.scrollIntoView());
    };

    reveal();
    window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, []);

  return null;
}
