import { marked } from "marked";
import cms from "@/lib/cms";

export const dynamic = "force-static";

const CHANNEL_METADATA = {
  title: "Buttondown's API changelog",
  description: "Buttondown's API changelog",
  link: "https://docs.buttondown.com/api-changelog",
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
  const items = sortedPostData.map((post) => ({
    title: post.title,
    description: post.description,
    link: `https://docs.buttondown.com/${post.slug}`,
    pubDate: new Date(post.title || "").toUTCString(),
    content: marked(post.bodyText),
  }));
  const rssFeed = `<rss version="2.0">
        <channel>
            <title>${CHANNEL_METADATA.title}</title>
            <description>${CHANNEL_METADATA.description}</description>
            <link>${CHANNEL_METADATA.link}</link>
            ${items
              .map(
                (item) => `<item>
                <title>${item.title}</title>
                <description>${item.description}</description>
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
