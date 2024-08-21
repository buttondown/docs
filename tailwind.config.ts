import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/code/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Hex Franklin", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        buttondown: "#0069ff",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant, addComponents, matchUtilities }) {
      // These variants allow us to style links based on their href
      // For example, we could bold all links to the glossary by using the glossary variant:
      //   <a href='/glossary-api class="glossary:font-bold">API</a>
      // This seems overkill on its own — why not just manually do this? — but it's useful
      // combined with the `prose` plugin, which automatically styles Markdown text. It lets us
      // write things like:
      //   <div class="prose glossary:prose-a:font-bold">
      //     This is a paragraph with a [link to the glossary](/glossary-api).
      //   </div>
      // And have the link styled in a consistent way without having to manually scour the rendered Markdown.
      addVariant("glossary", '&[href*="glossary-"]');
      addVariant("app-link", '&[href*="https://buttondown.email"]');
      addVariant("github", '&[href*="https://github.com"]');
      addVariant("pricing", '&[href*="https://buttondown.com/pricing"]');

      // This component allows us to add arbitrary masks to elements, like as follows:
      //   <div class="mask-image:url(/path/to/image.png)"></div>
      // This is useful for adding icons to links, like so:
      //   <a href="https://buttondown.email" class="notable-link mask-image:url(/path/to/icon.png)">Buttondown</a>
      matchUtilities({
        mask: (value) => ({
          maskImage: value,
        }),
      });

      // This styles links with a background image and a hover effect. It looks overkill,
      // but the reason we do it _here_ and not in a global CSS file is because we want to apply
      // the rule based on those variants declared above.
      addComponents({
        ".notable-link": {
          position: "relative",
          "&:after": {
            content: '""',
            display: "inline-block",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            marginLeft: "0.25em",
            width: "16px",
            height: "16px",
            color: "inherit",
            backgroundColor: "currentColor",
            maskPosition: "center",
            maskSize: "16px",
            maskRepeat: "no-repeat",
          },
        },
      });
    }),
    require("@tailwindcss/typography"),
  ],
};

export default config;
