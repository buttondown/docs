import remark from "remark";
import remarkHtml from "remark-html";

const render = (markdown: string): string => {
  return remark().use(remarkHtml).processSync(markdown).toString();
};

export default function MarkdownString({ text }: { text: string }) {
  return <div dangerouslySetInnerHTML={{ __html: render(text) }} />;
}
