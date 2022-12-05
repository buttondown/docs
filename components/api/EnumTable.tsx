import Table from "../Table";
import Pill from "../Pill";

export default function EnumTable({ e }: any) {
  return (
    <Table
      columns={[
        {
          title: "type",
          component: (row) => (
            <Pill variant={row.variant}>{row.name || row.type}</Pill>
          ),
        },
        {
          title: "identifier",
          component: (s) => <span className="font-mono">{s.type}</span>,
        },
        { title: "description" },
      ]}
      content={Object.keys(e).map((key) => ({
        type: key,
        ...e[key],
      }))}
    />
  );
}
