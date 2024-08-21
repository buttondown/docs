import { ReactNode } from "react";

function slugify(text: string): string {
  return (text || "")
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export default function Heading({
  level,
  children,
}: {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;

  // @ts-expect-error
  const slug = slugify(children[0].props.node.text);

  return (
    <a href={`#${slug}`} className="no-underline">
      <Component
        id={slug}
        className="scroll-mt-20 md:scroll-mt-4 target:bg-amber-200 max-w-max"
      >
        {children}
      </Component>
    </a>
  );
}
