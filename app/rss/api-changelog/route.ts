import { marked } from "marked";
import cms from "@/lib/cms";

export const dynamic = "force-static";

const CHANNEL_METADATA = {
  title: "Buttondown's API changelog",
  description: "Buttondown's API changelog",
  link: "https://docs.buttondown.com/api-changelog",
};

const escapeXml = (str: string): string => {
  return str
    .replace(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[\da-f]+;)/gi, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
};

export async function GET() {
  const slugs = cms.list().filter((slug) => slug.startsWith("api-changelog-"));

  const rawPostData = slugs
    .map((slug) => {
      const raw = cms.getRaw(slug);
      if (!raw) return null;
      return {
        slug,
        title: raw.title,
        description: raw.description,
        bodyText: raw.bodyText,
      };
    })
    .filter(Boolean) as Array<{
    slug: string;
    title: string;
    description?: string;
    bodyText: string;
  }>;

  const sortedPostData = rawPostData.sort((a, b) => {
    const coercedADate = new Date(a.title || "");
    const coercedBDate = new Date(b.title || "");
    return coercedBDate.getTime() - coercedADate.getTime();
  });
  const items = sortedPostData.map((post) => {
    const content = marked(post.bodyText) as string;
    return {
      title: post.title,
      content,
      link: `https://docs.buttondown.com/${post.slug}`,
      pubDate: new Date(post.title || "").toUTCString(),
    };
  });
  const rssFeed = `<rss version="2.0">
        <channel>
            <title>${escapeXml(CHANNEL_METADATA.title)}</title>
            <description>${escapeXml(CHANNEL_METADATA.description)}</description>
            <link>${CHANNEL_METADATA.link}</link>
            ${items
              .map(
                (item) => `<item>
                <title>${escapeXml(item.title)}</title>
                <description><![CDATA[${item.content}]]></description>
                <link>${item.link}</link>
                <pubDate>${item.pubDate}</pubDate>
                <content type="html"><![CDATA[${item.content}]]></content>
            </item>`,
              )
              .join("\n")}
        </channel>
    </rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
