import { H2 } from "../Markdown";
import ClosedBetaNotice from "./ClosedBetaNotice";

type Props = {
  title: string,
  method: string,
  path: string,
  beta?: boolean,
}

export default function Endpoint({ title, method, path, beta }: Props) {
  return (
    <>
      <H2>{title}</H2>
      {beta && <ClosedBetaNotice />}
      <pre className="py-6 px-4 bg-gray-700 text-gray-200 rounded">
        <strong>{method} →</strong> https://api.buttondown.email{path}
      </pre>
    </>
  );
}
