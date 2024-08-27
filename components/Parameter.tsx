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
            {props.description}
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
    </div>
  );
};

export default Parameter;
