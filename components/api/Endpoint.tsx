import { Method, Route } from "../../lib/openapi/types";
import { H2 } from "../Markdown";
import ClosedBetaNotice from "./ClosedBetaNotice";

type Props<R extends Route> = {
  title: string;
  method: Method<R>;
  path: string;
  beta?: boolean;
};

export default function Endpoint<R extends Route>({
  title,
  method,
  path,
  beta,
}: Props<R>) {
  return (
    <>
      <H2>{title}</H2>
      {beta && (
        <>
          <ClosedBetaNotice />
          <br />
        </>
      )}
      <pre className="py-6 px-4 bg-gray-700 text-gray-200 rounded">
        <span className="text-gray-400">$</span> curl -X{" "}
        {method.toLocaleUpperCase()} https://api.buttondown.email/v1
        {path}
      </pre>
    </>
  );
}
