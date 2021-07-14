/* eslint-disable @next/next/no-img-element */

import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

import Prism from "prism-react-renderer/prism";

(typeof global !== "undefined" ? global : window).Prism = Prism;

require("prismjs/components/prism-django");

export const A = (props) => <a className="text-buttondown-blue" {...props} />;
export const H1 = (props) => (
  <h1 className="my-6 font-black text-3xl" {...props} />
);
export const H2 = (props) => (
  <h2 className="my-4 font-bold text-2xl" {...props} />
);
export const H3 = (props) => (
  <h3 className="my-4 font-bold text-xl" {...props} />
);
export const H4 = (props) => (
  <h4 className="my-4 text-lg font-semibold" {...props} />
);
export const P = (props) => <p className="my-4 text-lg" {...props} />;

export const Blockquote = (props) => (
  <blockquote
    className="my-4 text-lg text-gray-700"
    style={{ borderLeft: "10px #ccc solid", paddingLeft: "10px" }}
    {...props}
  />
);

export const Ol = (props) => (
  <ul
    className="text-lg"
    style={{ listStyleType: "decimal", paddingLeft: 30 }}
    {...props}
  />
);

export const Ul = (props) => (
  <ul
    className="text-lg"
    style={{ listStyleType: "circle", paddingLeft: 30 }}
    {...props}
  />
);

export const Img = (props) => (
  <div>
    <img {...props} alt={props.alt || ""} className="mx-auto" />
    <figcaption className="text-sm text-center text-gray-700">
      {props.alt}
    </figcaption>
  </div>
);

export const li = (props) => <li className="text-lg" {...props} />;

// For some reason, MDX likes to insert a trailing empty line after pre blocks.
const isEmptyTrailingLine = (tokens, tokenIndex) =>
  tokenIndex === tokens.length - 1 && tokens[tokenIndex][0].empty;

export const Code = ({ children, language }) => {
  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={children}
      language={language || "json"}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: "20px" }}>
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

export const Pre = (props) => <div {...props} />;
