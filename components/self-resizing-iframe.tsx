"use client";

import { useEffect, useRef } from "react";
import DEMO_NEWSLETTER_USERNAMES from "@/autogen/demo_newsletter_usernames.json";
import useButtondownCookie, {
  USERNAME_COOKIE,
} from "@/hooks/useButtondownCookie";

// Assume the default 8px margin on a body tag.
const GUTTER = 40;

const FALLBACK_USERNAME = "buttondown";
const DEMO_USERNAMES = new Set<string>(DEMO_NEWSLETTER_USERNAMES);

const resizeIframe = (iframe: HTMLIFrameElement) => {
  iframe.style.height = `${
    (iframe.contentWindow?.document.body?.scrollHeight || 0) + GUTTER
  }px`;
};

const SelfResizingIframe = ({ srcDoc }: { srcDoc: string }) => {
  const username = useButtondownCookie(USERNAME_COOKIE);
  // The cookie is set on `.buttondown.com`, so demo-only usernames from
  // `demo.buttondown.com` leak into docs. Those usernames don't exist on
  // production, so fall back to a known-good newsletter in that case.
  const resolvedUsername =
    username && !DEMO_USERNAMES.has(username) ? username : FALLBACK_USERNAME;
  srcDoc = srcDoc.replace("{username}", resolvedUsername);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // When the iFrame finishes loading, adjust its height to match its content.
  // This is a bit of a hack, but it works well enough.
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) {
      return;
    }
    resizeIframe(iframe);
  }, []);

  return (
    <iframe
      srcDoc={srcDoc}
      ref={iframeRef}
      className="w-full h-48"
      title="Live code block"
    />
  );
};

export default SelfResizingIframe;
