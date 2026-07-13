import type { Page } from "./types";

type Navigation = Record<
  string,
  { name: string; items: { discriminant: string; value: string }[] }[]
>;

const ORIGIN = "https://docs.buttondown.com";

export const generateBreadcrumbJSONLD = (page: Page, navigation: Navigation) => {
  const section = Object.values(navigation)
    .flat()
    .find((s) => s.items.some((i) => i.value === page.slug));
  const sectionFirstPage = section?.items.find(
    (i) => i.discriminant === "page",
  )?.value;

  const crumbs: { name: string; url: string }[] = [{ name: "Docs", url: ORIGIN }];
  if (section && sectionFirstPage && sectionFirstPage !== page.slug) {
    crumbs.push({ name: section.name, url: `${ORIGIN}/${sectionFirstPage}` });
  }
  crumbs.push({ name: page.title, url: `${ORIGIN}/${page.slug}` });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
};

export const generateJSONLDMetadata = (page: Page) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://docs.buttondown.com/${page.slug}`,
    },
    headline: page.title,
    description: page.description,
    author: {
      "@type": "Organization",
      name: "Buttondown",
      url: "https://buttondown.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Buttondown",
      logo: {
        "@type": "ImageObject",
        url: "https://buttondown.com/static/images/icons/icon@400.png",
      },
    },
    datePublished: page.date,
  };
};
