import Highlight, { defaultProps } from "prism-react-renderer";

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

// For some reason, MDX likes to insert a trailing empty line after pre blocks.
const isEmptyTrailingLine = (tokens, tokenIndex) =>
  tokenIndex === tokens.length - 1 && tokens[tokenIndex][0].empty;

export const Code = (props) => {
  return (
    <Highlight {...defaultProps} code={props.children} language="json">
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
