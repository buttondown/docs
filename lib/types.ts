import type { Entry } from "@keystatic/core/reader";
import type keystaticConfig from "@/keystatic.config";

export type Page = Omit<
  Entry<(typeof keystaticConfig)["collections"]["pages"]>,
  "relatedPages"
> & {
  slug: string;
  relatedPages: Array<{ slug: string; title: string | null }>;
};
