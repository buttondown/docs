export const NAVIGATION_GROUPS = ["guides", "reference", "api"] as const;

export const NAVIGATION_GROUP_LABELS: Record<
  (typeof NAVIGATION_GROUPS)[number],
  string
> = {
  guides: "Guides",
  reference: "Reference",
  api: "API",
} as const;

type NavigationGroup = (typeof NAVIGATION_GROUPS)[number];

type NavItem =
  | {
      type: "page" | "hidden_page";
      title: string;
      slug: string;
      navigationTitle: string;
    }
  | { type: "divider"; title: string };

export type NavData = Record<
  NavigationGroup,
  {
    name: string;
    items: NavItem[];
  }[]
>;

export type NavigationFile = Record<
  string,
  {
    name: string;
    items: {
      discriminant: "page" | "divider" | "hidden_page";
      value: string;
    }[];
  }[]
>;

export type PageMetadata = {
  slug: string;
  title: string;
  navigationTitle?: string;
};

export const getFirstPageSlug = (
  nav: NavData,
  group: NavigationGroup,
): string => {
  const folders = nav[group];
  if (!folders || folders.length === 0) {
    throw new Error(`No folders found for navigation group: ${group}`);
  }

  for (const folder of folders) {
    for (const item of folder.items) {
      if (item.type === "page") {
        return item.slug;
      }
    }
  }
  throw new Error(`No pages found in navigation group: ${group}`);
};

export const assembleNavData = (
  navigation: NavigationFile,
  pages: PageMetadata[],
): NavData | { errors: string[] } => {
  const data = {} as NavData;
  const errors = [];

  for (const key in navigation) {
    const navigationGroup = key as NavigationGroup;
    for (const folder of navigation[navigationGroup]) {
      const newFolder: {
        name: string;
        items: NavItem[];
      } = {
        name: folder.name,
        items: [],
      };
      for (let i = 0; i < folder.items.length; i++) {
        const item = folder.items[i];
        if (
          item.discriminant === "page" ||
          item.discriminant === "hidden_page"
        ) {
          const slug = item.value;
          const page = pages.find((p) => p.slug === slug);

          if (!page) {
            errors.push(`Page not found: ${slug}`);
            continue;
          }

          newFolder.items.push({
            type: item.discriminant,
            title: page.title,
            navigationTitle: page.navigationTitle ?? page.title,
            slug,
          });
        } else if (item.discriminant === "divider") {
          newFolder.items.push({ type: "divider", title: item.value });
        }
      }

      if (!(navigationGroup in data)) {
        data[navigationGroup] = [];
      }

      data[navigationGroup].push(newFolder);
    }
  }

  if (errors.length > 0) {
    return { errors };
  }

  return data;
};
