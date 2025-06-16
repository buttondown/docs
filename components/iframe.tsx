const EXTERNAL_DOMAIN =
  process.env.NODE_ENV === "development"
    ? "application.bd"
    : "demo.buttondown.com";

export default function Iframe({ src }: { src: string }) {
  if (src.includes("loom.com")) {
    const url = new URL(src);
    url.searchParams.set("hideEmbedTopBar", "true");
    url.searchParams.set("hide_share", "true");
    url.searchParams.set("hide_title", "true");
    url.searchParams.set("hide_owner", "true");
    src = url.toString();
  }

  // Grab the path from the src, and then replace all UUIDs with a placeholder.
  const path = new URL(src).pathname.replace(
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g,
    "<id>"
  );
  return (
    <div>
      <div className="relative p-8 -mx-8 bg-gray-100 pb-0 pt-8 rounded-lg border border-gray-200 group hover:p-4! transition-all duration-300 overflow-hidden">
        <div className="bg-gray-100 rounded-t-lg rounded-b-none group-hover:rounded-b-lg shadow-md hover:shadow-2xl m-0 border border-gray-300 h-full flex flex-col transition-all duration-300">
          <div className="rounded-t-lg bg-gray-200 px-4 py-1 flex items-center border-b border-gray-400 relative max-w-full">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 flex items-center justify-center ml-4 max-w-full">
              <div className="bg-white px-4 py-1 w-full rounded-full text-xs my-0.5 border text-center border-gray-300 text-gray-600 flex justify-center items-center gap-2  truncate overflow-x-clip break-words">
                <div className="truncate break-words">
                  {EXTERNAL_DOMAIN}
                  {path}
                </div>
              </div>
            </div>
            <a
              href={`https://${EXTERNAL_DOMAIN}${new URL(src).pathname}`}
              className="after:hidden! no-underline px-2 rounded-md hover:bg-gray-200 -mr-2 ml-2 block flex-0"
            >
              ↗
            </a>
          </div>
          <iframe
            src={src.replace("demo.buttondown.com", EXTERNAL_DOMAIN)}
            className="w-full aspect-video -mb-8 h-[calc(300px+2rem)] group-hover:h-[400px] transition-all duration-300 rounded-b-none group-hover:rounded-b-lg"
            title={src}
          />
        </div>
      </div>
      <div className="text-sm text-gray-500 p-4 text-center">
        This is a live demo. You can{" "}
        <a href={`https://${EXTERNAL_DOMAIN}${path}`} target="_blank">
          view this page on your account, too.
        </a>
      </div>
    </div>
  );
}
