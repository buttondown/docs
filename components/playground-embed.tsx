"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

interface PlaygroundEmbedProps {
  initialContent?: string;
  height?: string;
  title?: string;
}

export default function PlaygroundEmbed({
  initialContent = "",
  height = "600px",
  title = "Buttondown Playground",
}: PlaygroundEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get the appropriate playground URL based on environment
  const playgroundUrl =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8000/playground"
      : "https://buttondown.com/playground";
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      setIsLoading(false);

      // If we have initial content, try to pass it to the playground
      if (initialContent && iframe.contentWindow) {
        // Post message to the playground to set initial content
        iframe.contentWindow.postMessage(
          {
            type: "SET_EDITOR_CONTENT",
            content: initialContent,
          },
          playgroundUrl
        );
      }
    };

    iframe.addEventListener("load", handleLoad);
    return () => iframe.removeEventListener("load", handleLoad);
  }, [initialContent, playgroundUrl]);

  return (
    <div className="not-prose">
      <div className="bg-gray-100 border border-gray-200 rounded-xl hover:shadow-xl transition-all duration-300 overflow-hidden shadow-md">
        <div className="border-b border-gray-200 px-4 py-2 flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          {isLoading ? (
            <span className="text-xs text-gray-500">Loading playground...</span>
          ) : (
            <a
              href={`${playgroundUrl}?content=${encodeURIComponent(
                initialContent
              )}`}
              className="text-xs text-gray-500 flex items-center gap-1"
            >
              View in editor <ArrowRightIcon className="w-4 h-4" />
            </a>
          )}
        </div>
        <div className="relative" style={{ height }}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="text-gray-400">Loading editor...</div>
            </div>
          )}
          <iframe
            ref={iframeRef}
            src={playgroundUrl}
            className="w-full h-full border-0 bg-white"
            title={title}
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </div>
      </div>
    </div>
  );
}
