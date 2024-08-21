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

const Parameter = (props: Props) => {
  return (
    <div key={props.name}>
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
      <h4 className="my-1" id={props.id || props.name}>
        {props.name}
      </h4>
      <div className="mb-4 leading-snug">
        <p className="my-0 mb-2">{props.description || "No description."}</p>
        {props.example && (
          <>
            <span>Example: </span>
            {typeof props.example !== "string" ? (
              <code>{JSON.stringify(props.example, null, 2)}</code>
            ) : (
              <code>&quot;{props.example}&quot;</code>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Parameter;
