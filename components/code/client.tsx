"use client";

import useButtondownCookie, {
  USERNAME_COOKIE,
} from "@/hooks/useButtondownCookie";
import * as Tabs from "@radix-ui/react-tabs";
import clsx from "clsx";
import type { Lang } from "shiki";
import type { ProcessedBlock } from "./lib";

// apiKeyReplacements are used to insert the user's live API key into code blocks.
// We don't know whether that should be done until this component is run on the
// client, but we want to keep all shiki work on the server. So we render the
// logged-out and logged-in versions (logged-in with a placeholder value) and then
// replace the placeholder value with the actual API key if it's available in cookies.

export default function CodeInteractive({
  blocks,
  apiKeyReplacements,
}: {
  blocks: ProcessedBlock[];
  apiKeyReplacements: Partial<
    Record<
      Lang,
      {
        from: string;
        to: string;
      }
    >
  >;
}) {
  const hideTabs = blocks.length === 1 && blocks[0].name === undefined;

  const username = useButtondownCookie(USERNAME_COOKIE);

  return (
    <Tabs.Root defaultValue={blocks[0].name ?? "default"}>
      {!hideTabs && (
        <Tabs.List className="rounded-t-xl overflow-hidden bg-[hsl(0,0%,5%)] divide-x divide-[hsl(0,0%,5%)]">
          {blocks.map((block) => (
            <Tabs.Trigger
              value={block.name ?? "default"}
              key={block.name ?? "default"}
              className="group"
            >
              <div
                className={clsx(
                  "text-white text-sm font-medium py-2 px-4",
                  "bg-[hsl(0,0%,10%)] group-data-[state=active]:bg-[hsl(0,0%,14%)]",
                  "border-b border-[hsl(0,0%,5%)] group-data-[state=active]:border-cyan-500",
                )}
              >
                {block.name}
              </div>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      )}

      {blocks.map((block) => {
        let html = block.html;

        html = html.replace(
          "{username}",
          username ?? "YOUR-BUTTONDOWN-USERNAME",
        );

        return (
          <Tabs.Content
            value={block.name ?? "default"}
            key={block.name ?? "default"}
          >
            <div
              className={clsx(
                // Hide scroll bars in code block (ugly).
                "[&_pre::-webkit-scrollbar]:hidden [&_pre]:[-ms-overflow-style:none] [&_pre]:[scrollbar-width:none]",
                "[&_pre]:px-4 [&_pre]:py-3 [&_pre]:overflow-x-scroll",
                "[&_pre]:text-[0.9rem]",
                hideTabs ? "[&_pre]:rounded-xl" : "[&_pre]:rounded-b-xl",
              )}
              // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted content
              dangerouslySetInnerHTML={{
                __html: html,
              }}
            />
          </Tabs.Content>
        );
      })}
    </Tabs.Root>
  );
}
