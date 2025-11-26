import { marked } from "marked";

export default function Markdown({ children }: { children: string }) {
	// biome-ignore lint/security/noDangerouslySetInnerHtml: trust me bro
	return <div dangerouslySetInnerHTML={{ __html: marked(children || "") }} />;
}
