import { marked } from "marked";

export type TypeProp =
  | {
      type: "string";
      value: string;
    }
  | {
      type: "ref";
      url: string;
      name: string;
    }
  | {
      type: "ref[]";
      url: string;
      name: string;
    };

type Props = {
  id?: string;
  name: string;
  required?: boolean;
  description?: string;
  type: TypeProp;
  example?: string | string[] | object;
  values?: string[];
};

const Caption = (props: { children: React.ReactNode }) => {
  return (
    <div className="text-xs text-gray-500 uppercase font-medium mt-4">
      {props.children}
    </div>
  );
};

const Parameter = (props: Props) => {
  return (
    <div key={props.name} className="mb-12">
      <h4 className="my-1" id={props.id || props.name}>
        {props.name}
      </h4>

      <Caption>Type</Caption>
      {props.type.type === "string" && (
        <div
          className={`font-mono text-sm p-1 inline-block px-3${
            props.required ? " bg-gray-700 text-white" : " bg-gray-200"
          }`}
        >
          {props.type.value}
          {props.required ? " · required" : ""}
        </div>
      )}
      {props.type.type === "ref" && (
        <div className="font-mono text-sm p-1 inline-block px-3 bg-blue-500">
          <a href={props.type.url} className="text-white">
            {props.type.name}
          </a>
        </div>
      )}
      {props.type.type === "ref[]" && (
        <div className="font-mono text-sm p-1 inline-block px-3 bg-blue-500">
          <a href={props.type.url} className="text-white">
            {props.type.name}[]
            {props.required ? " · required" : ""}
          </a>
        </div>
      )}

      <div className="mb-4 leading-snug">
        {props.description && (
          <>
            <Caption>Description</Caption>
            <div
              className="-mt-4"
              dangerouslySetInnerHTML={{ __html: marked(props.description) }}
            />
          </>
        )}
      </div>

      <div className="mb-4 leading-snug">
        {props.example && (
          <>
            <Caption>Example</Caption>
            <code className="before:content-[''] after:content-['']">
              {typeof props.example !== "string"
                ? JSON.stringify(props.example, null, 2)
                : `"${props.example}"`}
            </code>
          </>
        )}
      </div>

      {props.values && props.values.length > 0 && (
        <div className="mb-4 leading-snug not-prose">
          <Caption>Values</Caption>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {props.values.map((value) => (
              <li
                key={value}
                className="font-mono text-xs p-2 inline-block px-3 whitespace-nowrap border border-gray-200 rounded-md"
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Parameter;
