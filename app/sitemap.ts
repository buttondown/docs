import keystaticConfig, { contentBaseUrl } from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";

import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const reader = createReader(contentBaseUrl, keystaticConfig);
  const slugs = await reader.collections.pages.list();

  return slugs.map((slug) => ({
    url: `https://docs.buttondown.email/${slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.5,
  }));
}
