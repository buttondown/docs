import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { removeMarkdown } from "../remove-markdown";

export type ContentArray = {
	title: string;
	body: string;
	slug: string;
	categories: ("general" | "api")[];
}[];

const buildSlugsSets = (): {
	apiSlugs: Set<string>;
	generalSlugs: Set<string>;
} => {
	const navigationPath = join(process.cwd(), "content", "navigation.json");
	const navigationContent = readFileSync(navigationPath, "utf-8");
	const navigation = JSON.parse(navigationContent);

	const apiSlugs = new Set<string>();
	for (const section of navigation.api ?? []) {
		for (const item of section.items ?? []) {
			if (item.discriminant === "page") {
				apiSlugs.add(item.value);
			}
		}
	}

	const nonApiCategories = Object.keys(navigation).filter(
		(key) => key !== "api",
	);

	const generalSlugs = new Set<string>();
	for (const category of nonApiCategories) {
		for (const section of navigation[category] ?? []) {
			for (const item of section.items ?? []) {
				if (item.discriminant === "page") {
					generalSlugs.add(item.value);
				}
			}
		}
	}

	return { apiSlugs, generalSlugs };
};

export const buildContentArray = (): ContentArray => {
	const pagesDir = join(process.cwd(), "content", "pages");
	const files = readdirSync(pagesDir).filter((file) => file.endsWith(".mdoc"));
	const { apiSlugs, generalSlugs } = buildSlugsSets();

	const index = files.map((file) => {
		const filePath = join(pagesDir, file);
		const fileContent = readFileSync(filePath, "utf-8");
		const { data, content } = matter(fileContent);
		const slug = file.replace(/\.mdoc$/, "");

		const categories: ("general" | "api")[] = [];
		if (generalSlugs.has(slug)) {
			categories.push("general");
		}
		if (apiSlugs.has(slug)) {
			categories.push("api");
		}

		return {
			title: data.title as string,
			body: removeMarkdown(content),
			slug,
			categories,
		};
	});

	return index;
};
