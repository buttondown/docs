export default function Endpoint({ method, path }) {
  return (
    <pre className="py-6 px-4">
      <strong>{method} →</strong> https://api.buttondown.email{path}
    </pre>
  );
}
