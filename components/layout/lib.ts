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
      type: "page";
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

export type KeystaticNavigationFile = Record<
  string,
  {
    name: string;
    items: {
      discriminant: "page" | "divider";
      value: string;
    }[];
  }[]
>;

export type KeystaticPage = {
  slug: string;
  entry: {
    title: string;
    navigationTitle: string;
    content: () => void;
    schema: string;
    enum: string;
    endpoint: string;
    method: string;
    relatedPages: readonly (string | null)[];
  };
};

export const assembleNavData = (
  navigation: KeystaticNavigationFile,
  pages: KeystaticPage[]
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
        if (item.discriminant === "page") {
          const slug = item.value;
          const page = pages.find((p) => p.slug === slug);

          if (!page) {
            errors.push(`Page not found in Keystatic: ${slug}`);
            continue;
          }

          newFolder.items.push({
            type: "page",
            title: page.entry.title,
            navigationTitle: page.entry.navigationTitle,
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
