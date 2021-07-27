type Anchor = {
  depth: Number;
  text: string;
  url: string;
};

type Props = {
  anchors: Anchor[];
};

export default function TableOfContents({ anchors }: Props) {
  return (
    <div className="ml-8 w-40 mt-8 flex-shrink-0 hidden xl:block">
      <div className="sticky top-8">
        {anchors.length > 0 && (
          <div className="font-bold text-xs uppercase pb-2 text-gray-600">
            On this page
          </div>
        )}
        {anchors.map((anchor, i) => {
          return anchor.text === "FAQs" ? (
            <div
              key={i}
              className="py-1 pt-3 text-gray-500 text-xs uppercase font-semibold"
            >
              FAQs
            </div>
          ) : (
            <div
              key={i}
              className="py-1 text-gray-500 text-sm hover:text-gray-700"
            >
              <a href={anchor.url}>{anchor.text}</a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
