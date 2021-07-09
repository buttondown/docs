import { H2 } from "../Markdown";

export default function Endpoint({ title, method, path }) {
  return (
    <>
      <H2>{title}</H2>
      <pre className="py-6 px-4">
        <strong>{method} →</strong> https://api.buttondown.email{path}
      </pre>
    </>
  );
}
