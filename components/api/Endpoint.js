import { H2 } from "../Markdown";
import ClosedBetaNotice from "./ClosedBetaNotice";

export default function Endpoint({ title, method, path, beta }) {
  return (
    <>
      <H2>{title}</H2>
      {beta && <ClosedBetaNotice />}
      <pre className="py-6 px-4">
        <strong>{method} →</strong> https://api.buttondown.email{path}
      </pre>
    </>
  );
}
