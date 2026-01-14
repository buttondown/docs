import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import index from "@/autogen/index.json";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: { slug: string };
}) {
  const hex400 = fetch(
    new URL(
      "../../fonts/hex-franklin/hex-franklin-regular.otf",
      import.meta.url,
    ),
  ).then((res) => res.arrayBuffer());

  const hex700 = fetch(
    new URL("../../fonts/hex-franklin/hex-franklin-bold.otf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  const page = index.find((page) => page.url === params.slug);

  if (!page) {
    return notFound();
  }

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        background: "linear-gradient(to bottom, #0069ff, black)",
        height: "100%",
        width: "100%",
        color: "white",
        paddingLeft: 32,
        paddingRight: 32,
        paddingBottom: 48,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 72, fontWeight: "700" }}>{page.title}</div>
        {page.description && (
          <div
            style={{
              fontSize: 36,
              lineHeight: 1.3,
              marginTop: 12,
              opacity: 0.8,
            }}
          >
            {page.description}
          </div>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: page.description ? 24 : 16,
          }}
        >
          <ButtondownIcon />
          <div
            style={{
              marginLeft: 20,
              marginTop: 4,
              display: "flex",
              fontSize: 36,
              opacity: 0.8,
            }}
          >
            Buttondown documentation
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Hex Franklin",
          data: await hex400,
          style: "normal",
          weight: 400,
        },
        {
          name: "Hex Franklin",
          data: await hex700,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}

const ButtondownIcon = () => (
  <div style={{ display: "flex" }}>
    {/* White background inside logo */}
    <div
      style={{
        position: "absolute",
        top: 7,
        left: 7,
        backgroundColor: "white",
        height: 36,
        width: 36,
      }}
    />
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="512.000000pt"
      height="512.000000pt"
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Buttondown icon"
      style={{ height: 50, width: 50 }}
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path
          d="M2029 5110 c-9 -5 -63 -12 -120 -15 -256 -14 -553 -76 -729 -151 -19
-9 -44 -19 -55 -24 -204 -87 -390 -214 -551 -374 -164 -165 -285 -344 -378
-561 -10 -22 -21 -49 -26 -60 -14 -30 -55 -162 -73 -230 -34 -130 -63 -329
-72 -483 -3 -57 -10 -112 -15 -122 -14 -25 -14 -1035 0 -1060 5 -10 12 -65 15
-122 14 -255 76 -552 151 -728 9 -19 19 -44 24 -55 87 -204 214 -390 374 -551
165 -164 344 -285 561 -378 22 -10 49 -21 60 -26 30 -14 162 -55 230 -73 130
-34 329 -63 483 -72 57 -3 112 -10 122 -15 25 -14 1035 -14 1060 0 10 5 65 12
122 15 255 14 552 76 728 151 19 9 44 19 55 24 204 87 390 214 551 374 164
165 285 344 378 561 10 22 21 49 26 60 14 30 55 162 73 230 34 130 63 329 72
483 3 57 10 112 15 122 14 25 14 1035 0 1060 -5 10 -12 65 -15 122 -14 255
-76 552 -151 728 -9 19 -19 44 -24 55 -87 204 -214 390 -374 551 -165 164
-344 285 -561 378 -22 10 -49 21 -60 26 -30 14 -162 55 -230 73 -130 34 -329
63 -483 72 -57 3 -112 10 -122 15 -25 13 -1039 13 -1061 0z m1603 -1076 c208
-53 349 -194 402 -402 14 -56 16 -179 16 -1072 0 -893 -2 -1016 -16 -1072 -53
-208 -194 -349 -402 -402 -56 -14 -178 -16 -1059 -16 -861 0 -1003 2 -1057 15
-208 52 -342 183 -405 395 -14 49 -16 161 -16 1080 0 919 2 1031 16 1080 62
209 195 341 399 394 46 12 220 14 1057 15 889 1 1009 -1 1065 -15z"
          fill="#0069ff"
        />
        <path
          d="M1486 2921 l-169 -169 171 -170 c384 -383 523 -474 857 -564 68 -18
382 -18 450 0 336 91 467 176 845 549 l185 182 -170 171 c-93 93 -174 170
-180 170 -5 0 -97 -87 -205 -193 -107 -106 -207 -202 -221 -213 -95 -77 -170
-122 -273 -163 -16 -7 -68 -19 -115 -27 -70 -13 -100 -13 -161 -4 -219 34
-345 117 -675 449 -82 83 -154 151 -160 151 -6 0 -86 -76 -179 -169z"
          fill="#0069ff"
        />
      </g>
    </svg>
  </div>
);
