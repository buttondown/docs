"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

interface PlaygroundEmbedProps {
  initialContent?: string;
  height?: string;
  title?: string;
  editorMode?: "plaintext" | "fancy";
}

// URL compression utilities using browser-native compression
const compressToBase64 = async (text: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  if ("CompressionStream" in window) {
    try {
      const stream = new CompressionStream("gzip");
      const writer = stream.writable.getWriter();
      const reader = stream.readable.getReader();

      writer.write(data);
      writer.close();

      const chunks: Uint8Array[] = [];
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) chunks.push(value);
      }

      const compressed = new Uint8Array(
        chunks.reduce((acc, chunk) => acc + chunk.length, 0),
      );
      let offset = 0;
      for (const chunk of chunks) {
        compressed.set(chunk, offset);
        offset += chunk.length;
      }

      return btoa(String.fromCharCode(...compressed));
    } catch (e) {
      console.warn("Compression failed, using uncompressed:", e);
    }
  }

  // Fallback to base64 encoding without compression
  return btoa(encodeURIComponent(text));
};

export default function PlaygroundEmbed({
  initialContent = "",
  height = "600px",
  title = "Buttondown Playground",
  editorMode = "fancy",
}: PlaygroundEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [compressed, setCompressed] = useState("");

  // Get the appropriate playground URL based on environment
  const playgroundUrl =
    process.env.NODE_ENV === "development"
      ? "https://application-playground.bd"
      : "https://playground.buttondown.com";

  useEffect(() => {
    const compress = async () => {
      const compressed = await compressToBase64(
        JSON.stringify({
          title: "Test",
          content: initialContent,
        }),
      );
      setCompressed(encodeURIComponent(compressed));
    };
    compress();
  }, [initialContent]);

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
          playgroundUrl,
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
              href={`${playgroundUrl}?c=${compressed}&editor_mode=${editorMode}`}
              className="text-xs text-gray-500 flex items-center gap-1"
            >
              View in editor <ArrowRightIcon className="w-4 h-4" />
            </a>
          )}
        </div>
        <div className="relative" style={{ height: height || "600px" }}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div className="text-gray-400">Loading editor...</div>
            </div>
          )}
          <iframe
            ref={iframeRef}
            src={`${playgroundUrl}?hide_chrome=1&show_preview=${
              editorMode === "plaintext" ? "true" : "false"
            }&c=${compressed}&editor_mode=${editorMode}`}
            className="w-full h-full border-0 bg-white pointer-events-none"
            title={title}
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </div>
      </div>
    </div>
  );
}
