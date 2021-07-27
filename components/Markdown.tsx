/* eslint-disable @next/next/no-img-element */

import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import Prism from "prismjs";

import classNames from "../lib/classNames";
import slugify from "../lib/slugify";

(typeof global !== "undefined" ? global : window).Prism = Prism;

require("prismjs/components/prism-django");

export const A = (props: any) => (
  <a className="text-buttondown-blue" {...props} />
);
export const H1 = (props: any) => (
  <h1 className="my-6 font-black text-3xl" {...props} />
);
export const H2 = (props: any) => (
  <h2
    className="my-4 font-bold text-2xl"
    {...props}
    id={slugify(props.children)}
  />
);
export const H3 = (props: any) => (
  <h3
    className="my-4 font-bold text-xl"
    {...props}
    id={slugify(props.children)}
  />
);
export const H4 = (props: any) => (
  <h4
    className="my-4 text-lg font-semibold"
    {...props}
    id={slugify(props.children)}
  />
);
export const P = (props: any) => (
  <p className="my-4 leading-relaxed text-lg" {...props} />
);

export const Blockquote = (props: any) => (
  <blockquote
    className="my-4 text-lg text-gray-700"
    style={{ borderLeft: "10px #ccc solid", paddingLeft: "10px" }}
    {...props}
  />
);

export const Ol = (props: any) => (
  <ul
    className="text-lg"
    style={{ listStyleType: "decimal", paddingLeft: 30 }}
    {...props}
  />
);

export const Ul = (props: any) => (
  <ul
    className="text-lg"
    style={{ listStyleType: "circle", paddingLeft: 30 }}
    {...props}
  />
);

export const Img = (props: any) => (
  <div>
    <img {...props} alt={props.alt || ""} className="mx-auto" />
    <figcaption className="text-sm text-center text-gray-700">
      {props.alt}
    </figcaption>
  </div>
);

export const Li = (props: any) => <li className="text-lg" {...props} />;

// For some reason, MDX likes to insert a trailing empty line after pre blocks.
const isEmptyTrailingLine = (tokens: Array<any>, tokenIndex: number) =>
  tokenIndex === tokens.length - 1 && tokens[tokenIndex][0].empty;

export const Code = ({ children, language, classes }: any) => {
  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={children}
      language={language || "json"}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={classNames(className, "rounded", classes)}
          style={{ ...style, padding: "20px" }}
        >
          {tokens.map(
            (line, i) =>
              !isEmptyTrailingLine(tokens, i) && (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              )
          )}
        </pre>
      )}
    </Highlight>
  );
};

export const Pre = (props: any) => <div {...props} />;
export const InlineCode = (props: any) => (
  <span className="bg-gray-300 font-mono p-0.5 rounded">
    `{props.children}`
  </span>
);
