export default function Iframe({ src }: { src: string }) {
  if (src.includes("loom.com")) {
    const url = new URL(src);
    url.searchParams.set("hideEmbedTopBar", "true");
    url.searchParams.set("hide_share", "true");
    url.searchParams.set("hide_title", "true");
    url.searchParams.set("hide_owner", "true");
    src = url.toString();
  }
  return <iframe src={src} className="w-full aspect-video" title={src} />;
}
