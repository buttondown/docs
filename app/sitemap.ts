import type { MetadataRoute } from "next";
import cms from "@/lib/cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = cms.list();

  return slugs.map((slug) => ({
    url: `https://docs.buttondown.com/${slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.5,
  }));
}
