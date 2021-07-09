import Table from "../Table";
import { H3 } from "../Markdown";
import { CheckCircleIcon } from "@heroicons/react/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ParametersTable({ content }) {
  return (
    <>
      <H3>Parameters</H3>
      <Table
        columns={[
          {
            title: "parameter",
            component: (s) => <span className="font-mono">{s}</span>,
          },
          {
            title: "type",
            component: (s) => <span className="font-mono">{s}</span>,
          },
          { title: "description" },
          {
            title: "optional",
            component: (s) =>
              s && (
                <CheckCircleIcon
                  className={
                    "text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
                  }
                  aria-hidden="true"
                />
              ),
          },
        ]}
        content={content}
      />
    </>
  );
}
