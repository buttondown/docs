const DOMAIN = "buttondown.com";
export default function Iframe({ src }: { src: string }) {
  if (src.includes("loom.com")) {
    const url = new URL(src);
    url.searchParams.set("hideEmbedTopBar", "true");
    url.searchParams.set("hide_share", "true");
    url.searchParams.set("hide_title", "true");
    url.searchParams.set("hide_owner", "true");
    src = url.toString();
  }

  // Grab the path from the src.
  const path = new URL(src).pathname;
  const title = path.split("/").pop();
  return (
    <div className=" bg-gray-100 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-300 h-full flex flex-col">
      <div className="rounded-t-lg bg-gray-200 px-4 py-1 flex items-center gap-2 border-b border-gray-300">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white px-4 py-1 w-full rounded-full text-xs my-0.5 border text-center border-gray-300 text-gray-600 flex justify-center items-center gap-2">
            <div>
              {DOMAIN}/{title}
            </div>
          </div>
        </div>
      </div>
      <iframe
        src={src}
        className="w-full aspect-video rounded-b-lg h-[300px] pointer-events-none"
        title={src}
      />
    </div>
  );
}
