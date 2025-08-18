"use client";

import { cva } from "class-variance-authority";

const EXTERNAL_DOMAIN =
  process.env.NODE_ENV === "development"
    ? "application.bd"
    : "demo.buttondown.com";

const DEFAULT_HEIGHT = 300;

const iframeVariants = cva(
  "relative p-8 -mx-8 bg-gray-100 pb-0 rounded-lg border border-gray-200",
  {
    variants: {
      variant: {
        page: "mt-0",
        subscriber: "mt-0",
        email: "",
      },
    },
    defaultVariants: {
      variant: "page",
    },
  }
);

const containerVariants = cva(
  "rounded-t-lg m-0 border border-gray-300 h-full flex flex-col border-b-0",
  {
    variants: {
      variant: {
        page: "rounded-b-none shadow-no-bottom-md",
        email: "rounded-b-none bg-white",
        subscriber: "rounded-b-none shadow-no-bottom-md",
      },
    },
    defaultVariants: {
      variant: "page",
    },
  }
);

const UUID_REGEX =
  /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g;

const UUID_SENTINEL = "<id>";

type Variant = "email" | "page" | "subscriber";

const BrowserBar = ({ path }: { path: string }) => {
  // Grab the path from the src, and then replace all UUIDs with a placeholder.
  const mungedPath = new URL(path).pathname.replace(UUID_REGEX, UUID_SENTINEL);

  return (
    <div className="rounded-t-lg bg-gray-200 px-4 py-1 flex items-center border-b border-gray-300 relative max-w-full">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <div className="flex-1 flex items-center justify-center ml-4 max-w-full">
        <div className="bg-white px-4 py-1 w-full rounded-full text-xs my-0.5 border text-center border-gray-300 text-gray-600 flex justify-center items-center gap-2  truncate overflow-x-clip break-words">
          <div className="truncate break-words">
            {EXTERNAL_DOMAIN}
            {mungedPath}
          </div>
        </div>
      </div>
      <a
        href={`https://${EXTERNAL_DOMAIN}${mungedPath.replace(
          `/${UUID_SENTINEL}`,
          ""
        )}`}
        className="-mr-2 ml-2 block flex-0 rounded-md px-2 no-underline transition hover:bg-gray-200"
      >
        ↗
      </a>
    </div>
  );
};

const GmailBar = () => {
  return (
    <div className="w-full flex flex-wrap gap-0.5 justify-between items-center flex-none pointer-events-none user-select-none px-4  border-b border-gray-300">
      <div className="flex flex-wrap gap-0.5 justify-start items-center">
        <svg
          width="80px"
          height="17px"
          viewBox="0 0 101 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMin"
        >
          <path
            d="M29.9752 22.8913H2.6888C1.62297 22.8913 0.730915 22.0508 0.730915 20.9578V2.07996C0.730915 1.01442 1.59835 0.122078 2.6888 0.122078H29.9752C31.041 0.122078 31.9331 0.989513 31.9331 2.07996V20.9329C31.9082 22.0479 31.0408 22.8908 29.9752 22.8908V22.8913Z"
            fill="#F2F2F2"
          ></path>
          <path
            opacity="0.1"
            d="M4.62178 22.8913L16.2946 14.348L16.3691 13.8527L4.34952 5.20329L4.32461 22.4671L4.62178 22.8913Z"
            fill="#221F1F"
          ></path>
          <path
            d="M2.6888 22.8913C1.59835 22.8913 0.730915 22.0508 0.730915 20.9578V2.05251C0.730915 0.96206 1.59835 0.763668 2.6888 0.763668C3.77925 0.763668 4.64668 0.986682 4.64668 2.05251V22.8879L2.6888 22.8913Z"
            fill="#D44C3D"
          ></path>
          <path
            d="M2.6888 1.06395C4.07669 1.06395 4.34924 1.48847 4.34924 2.05534V22.6185H2.6888C2.24849 22.6183 1.82628 22.4433 1.51494 22.1319C1.2036 21.8206 1.02859 21.3984 1.02836 20.9581V2.05534C1.00346 1.46045 1.3009 1.06395 2.6888 1.06395ZM2.6888 0.791405C1.59835 0.791405 0.730915 1.01442 0.730915 2.05534V20.9329C0.730915 22.0479 1.59835 22.8908 2.6888 22.8908H4.64668V2.05534C4.62178 0.989797 3.77925 0.791405 2.6888 0.791405ZM29.9752 1.06395C31.2391 1.06395 31.6356 1.31187 31.6356 2.00581V20.9827C31.6354 21.423 31.4604 21.8452 31.1491 22.1565C30.8377 22.4679 30.4155 22.6429 29.9752 22.6431H28.3148V2.00581C28.2899 1.28696 28.711 1.06395 29.9752 1.06395V1.06395ZM29.9752 0.791405C28.8848 0.791405 28.0173 0.939986 28.0173 2.00836V22.9185H29.9752C31.0657 22.9185 31.9331 22.0511 31.9331 20.9606V1.98091C31.9082 0.915081 31.0408 0.791405 29.9752 0.791405Z"
            fill="#D44C3D"
          ></path>
          <path
            d="M29.9752 22.8913H28.0173V2.00581C28.0173 0.915363 28.8848 0.788857 29.9752 0.788857C31.0657 0.788857 31.9331 0.937438 31.9331 2.00581V20.9827C31.9082 22.0485 31.0408 22.891 29.9752 22.891V22.8913Z"
            fill="#D44C3D"
          ></path>
          <path
            opacity="0.08"
            d="M21.6229 22.8913L0.904402 2.87296L1.99485 3.31899L16.4183 13.7033L31.9331 2.32477V20.9796C31.9331 22.0454 31.0657 22.9126 29.9752 22.9126L21.6229 22.8913Z"
            fill="#221F1F"
          ></path>
          <path
            d="M16.2946 14.3726L1.57345 3.69087C0.706011 3.04645 0.458091 1.80742 1.10251 0.939986C1.74693 0.0725512 2.98596 -0.125558 3.87802 0.51858L16.3164 9.56424L28.8321 0.39462C29.703 -0.249518 30.9199 -0.0514085 31.5612 0.840932C32.2056 1.70837 32.0072 2.92278 31.1152 3.5672L16.2946 14.3726Z"
            fill="#D44C3D"
          ></path>
          <path
            d="M29.9752 0.320472C30.496 0.320472 31.0161 0.568392 31.3382 1.01442C31.859 1.7579 31.7101 2.79882 30.9663 3.34418L16.2949 14.0259L1.74693 3.46814C1.00346 2.92278 0.805065 1.85723 1.32241 1.13838C1.61958 0.692351 2.14315 0.419527 2.71031 0.419527C3.08219 0.419527 3.42916 0.518581 3.7017 0.741596L16.1183 9.76292L16.2918 9.86197L16.4653 9.76292L28.9561 0.593297C29.2782 0.41981 29.6005 0.320755 29.9749 0.320755L29.9752 0.320472ZM29.9752 0.0233085C29.579 0.0233085 29.1545 0.122363 28.8352 0.395188L16.3164 9.56424L3.8534 0.493676C3.53133 0.24604 3.10992 0.12208 2.6888 0.12208C2.06617 0.146985 1.44977 0.419244 1.07789 0.942818C0.455261 1.81025 0.70601 3.02466 1.57316 3.66908L16.2944 14.3755L31.118 3.57003C31.5351 3.26495 31.8156 2.80818 31.8991 2.29819C31.9825 1.78821 31.8622 1.26586 31.5641 0.843763C31.1678 0.323019 30.5727 0.0230255 29.978 0.0230255L29.9752 0.0233085Z"
            fill="#D44C3D"
          ></path>
          <path
            d="M59.4193 12.1448C59.4193 14.4853 58.7248 16.3503 57.3363 17.7394C55.7755 19.3938 53.7234 20.2208 51.18 20.2208C48.7455 20.2208 46.6857 19.378 45.0004 17.6927C43.315 16.0073 42.4722 13.932 42.4722 11.4664C42.4722 9.00076 43.315 6.92543 45.0004 5.24008C46.6857 3.55474 48.7455 2.71193 51.18 2.71193C52.4125 2.71193 53.5754 2.93042 54.6678 3.3671C55.7602 3.80379 56.6574 4.42048 57.3564 5.21631L55.8118 6.76156C55.2967 6.13752 54.6296 5.64932 53.8103 5.29839C52.991 4.94745 52.1133 4.77198 51.1768 4.77198C49.3514 4.77198 47.809 5.40367 46.5422 6.66817C45.2936 7.94739 44.6695 9.54726 44.6695 11.4667C44.6695 13.386 45.2936 14.9862 46.5422 16.2654C47.8062 17.5294 49.3511 18.1616 51.1768 18.1616C52.8466 18.1616 54.2354 17.6935 55.3436 16.757C56.4519 15.8205 57.0913 14.5334 57.263 12.895H51.1768V10.8819H59.2993C59.3755 11.299 59.4147 11.7219 59.4165 12.1459L59.4193 12.1448ZM63.8173 19.8433H61.6664V8.37643H63.7262V9.9681H63.8196C64.1473 9.40632 64.6505 8.93793 65.3295 8.56351C66.0084 8.18908 66.6828 8.00201 67.3542 8.00201C68.197 8.00201 68.9379 8.20012 69.5778 8.587C70.2052 8.96304 70.6969 9.52861 70.9821 10.2022C71.9339 8.73529 73.2527 8.00201 74.9386 8.00201C76.2648 8.00201 77.2871 8.40785 78.0051 9.21896C78.7231 10.0301 79.0819 11.1851 79.0819 12.683V19.8433H76.931V13.0113C76.931 11.9345 76.7329 11.1585 76.3458 10.6821C75.9586 10.2058 75.3003 9.96838 74.3797 9.96838C73.5524 9.96838 72.8582 10.3193 72.2967 11.0218C71.7352 11.7242 71.4539 12.5512 71.4539 13.5032V19.8433H69.303V13.0113C69.303 11.9345 69.1049 11.1585 68.718 10.6821C68.3311 10.2058 67.6725 9.96838 66.7519 9.96838C65.9244 9.96838 65.2301 10.3193 64.6689 11.0218C64.1077 11.7242 63.8261 12.5512 63.8261 13.5032V19.8433H63.8173ZM85.8437 8.00201C87.4353 8.00201 88.6916 8.42738 89.6123 9.27755C90.5329 10.1277 90.9934 11.2949 90.9934 12.777V19.8433H88.9336V18.2516H88.8402C87.9507 19.5625 86.7646 20.2177 85.2822 20.2177C84.0182 20.2177 82.9609 19.8433 82.1105 19.0941C81.26 18.345 80.8346 17.4088 80.8346 16.2849C80.8346 15.0963 81.2832 14.155 82.1806 13.4526C83.0781 12.7501 84.2758 12.3992 85.7738 12.3992C87.053 12.3992 88.1064 12.6332 88.9339 13.1011V12.6095C88.9339 11.8606 88.6373 11.2247 88.0441 10.702C87.4509 10.1792 86.7564 9.91801 85.9611 9.91801C84.7592 9.91801 83.8102 10.4254 83.1027 11.4398L81.2065 10.2455C82.2517 8.74746 83.7966 7.99833 85.8411 7.99833L85.8437 8.00201ZM83.058 16.335C83.058 16.8965 83.2957 17.3652 83.772 17.7394C84.2483 18.1135 84.805 18.3011 85.4455 18.3011C86.3503 18.3011 87.1577 17.9658 87.8681 17.2945C88.5784 16.6231 88.9333 15.8355 88.9333 14.9302C88.262 14.3998 87.3258 14.1343 86.1241 14.1343C85.2502 14.1343 84.5209 14.3449 83.9356 14.766C83.3503 15.1871 83.0577 15.7104 83.0577 16.3345L83.058 16.335ZM96.2138 4.4202C96.2172 4.62057 96.1795 4.81951 96.103 5.00473C96.0264 5.18994 95.9128 5.3575 95.7689 5.49706C95.4723 5.79366 95.1138 5.94139 94.6921 5.94139C94.2704 5.94139 93.9115 5.79337 93.6152 5.49706C93.3189 5.20075 93.1709 4.84189 93.1709 4.4202C93.1675 4.21984 93.2052 4.02092 93.2816 3.8357C93.3581 3.65048 93.4717 3.48291 93.6155 3.34333C93.7551 3.19956 93.9227 3.08593 94.1079 3.00946C94.2931 2.93299 94.492 2.8953 94.6924 2.89872C94.8927 2.8953 95.0916 2.93299 95.2769 3.00946C95.4621 3.08593 95.6297 3.19956 95.7692 3.34333C96.0655 3.64049 96.2141 3.99879 96.2141 4.4202H96.2138ZM95.7689 8.37672V19.8433H93.618V8.37643L95.7689 8.37672ZM100.731 3.0889V19.8433H98.5798V3.0889H100.731Z"
            fill="#787879"
          ></path>
        </svg>
      </div>
      <div className="flex flex-wrap gap-3 justify-end items-center">
        <p className="text-gray-500 text-xs">1 of 32</p>
        <svg
          stroke="hsl(220, 5%, 62%)"
          strokeWidth="2.5px"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          viewBox="0 0 24 24"
          className="w-[18px] h-[18px] relative flex-none"
        >
          <path d="M15 18l-6-6 6-6"></path>
        </svg>
        <svg
          stroke="hsl(220, 5%, 62%)"
          strokeWidth="2.5px"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          viewBox="0 0 24 24"
          className="w-[18px] h-[18px] relative flex-none"
        >
          <path d="M9 18l6-6-6-6"></path>
        </svg>
      </div>
    </div>
  );
};

export default function Iframe({
  src,
  description,
  height,
  variant = "page",
}: {
  src: string;
  description?: string;
  height?: number;
  variant?: Variant;
}) {
  const mungedSrc = src.replace("demo.buttondown.com", EXTERNAL_DOMAIN);

  return (
    <div>
      <div className={iframeVariants({ variant })}>
        <div className={containerVariants({ variant })}>
          {variant !== "email" && <BrowserBar path={src} />}
          {variant === "email" && <GmailBar />}

          <div
            role="img"
            aria-label="Live demo preview"
            aria-description={description}
          >
            <iframe
              src={mungedSrc}
              inert
              className="aspect-video w-full rounded-b-none transition-all duration-300"
              style={{ height: `${height ?? DEFAULT_HEIGHT}px` }}
            />
          </div>
        </div>
      </div>
      {(variant === "page" || variant === "subscriber") && (
        <div className="text-sm text-gray-500 p-4 text-center">
          This is a live demo. You can{" "}
          {variant === "subscriber" ? (
            <span>
              view{" "}
              <a href={src} target="_blank">
                this page as it exists live, too.
              </a>
            </span>
          ) : (
            <a
              href={mungedSrc.replace(
                "/demo.buttondown.com",
                "/buttondown.com"
              )}
              target="_blank"
            >
              view this page on your account, too.
            </a>
          )}
        </div>
      )}
    </div>
  );
}
