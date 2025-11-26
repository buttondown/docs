import { createReader } from "@keystatic/core/reader";
import type { MetadataRoute } from "next";
import keystaticConfig, { localBaseURL } from "@/keystatic.config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const reader = createReader(localBaseURL, keystaticConfig);
	const slugs = await reader.collections.pages.list();

	return slugs.map((slug) => ({
		url: `https://docs.buttondown.com/${slug}`,
		lastModified: new Date(),
		changeFrequency: "daily",
		priority: 0.5,
	}));
}
