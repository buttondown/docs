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
      <p>{props.description || "No description."}</p>
    </div>
  );
};

export default Parameter;
