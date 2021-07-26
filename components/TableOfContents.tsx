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
    <div className="ml-8 w-40 mt-4 flex-shrink-0 hidden xl:block">
      <div className="sticky top-8">
        {anchors.length > 0 && (
          <div className="font-bold text-xs uppercase pb-2 text-gray-600">
            On this page
          </div>
        )}
        {anchors.map((anchor, i) => {
          return (
            <div key={i} className="py-1 text-gray-600 text-sm">
              <a href={anchor.url}>{anchor.text}</a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
