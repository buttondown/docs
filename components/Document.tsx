import type { Page } from "@/lib/types";

type Props = {
  page: Page;
};

/**
 * Renders page content. Content is pre-rendered by the CMS (Markdoc).
 */
export default function Document({ page }: Props) {
  return <>{page.content}</>;
}
