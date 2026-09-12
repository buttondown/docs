import { marked } from "marked";
import EnumValues from "./EnumValues";

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
  enumName?: string;
};

const Label = (props: { children: React.ReactNode }) => {
  return <div className="text-sm text-gray-500 mt-4">{props.children}</div>;
};

const Parameter = (props: Props) => {
  return (
    <div
      key={props.name}
      className="not-prose border-t border-gray-200 pt-6 mb-10"
    >
      <h4
        id={props.id || props.name}
        className="font-mono text-base text-gray-900 scroll-mt-24"
      >
        {props.name}
        <span className="ml-3 text-sm text-gray-500">
          {props.type.type === "string" && props.type.value}
          {props.type.type !== "string" && (
            <a href={props.type.url} className="text-buttondown underline">
              {props.type.name}
              {props.type.type === "ref[]" && "[]"}
            </a>
          )}
          {props.enumName && (
            <>
              {" · "}
              <span className="bg-amber-100 text-amber-900 px-1 rounded-sm">
                enum
              </span>
            </>
          )}
          {props.required && (
            <>
              {" · "}
              <span className="text-gray-700">required</span>
            </>
          )}
        </span>
      </h4>

      {props.description && (
        <div
          className="mt-1 text-gray-600 leading-snug [&_p]:my-0 [&_a]:underline [&_code]:font-mono [&_code]:text-sm"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: trust me bro
          dangerouslySetInnerHTML={{ __html: marked(props.description) }}
        />
      )}

      {props.example && (
        <>
          <Label>example</Label>
          <code className="font-mono text-sm text-gray-700">
            {typeof props.example !== "string"
              ? JSON.stringify(props.example, null, 2)
              : `"${props.example}"`}
          </code>
        </>
      )}

      {props.enumName && <EnumValues name={props.enumName} />}

      {!props.enumName && props.values && props.values.length > 0 && (
        <>
          <Label>values</Label>
          <ul className="mt-1 grid grid-cols-2 gap-1">
            {props.values.map((value) => (
              <li key={value} className="font-mono text-sm text-gray-700">
                {value}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Parameter;
