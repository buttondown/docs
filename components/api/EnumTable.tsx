import Table from "../Table";
import Pill, { Variant } from "../Pill";

type Row = {
  type: string;
  name?: string;
  variant: Variant;
};

export default function EnumTable({ e }: any) {
  return (
    <Table
      columns={[
        {
          title: "type",
          component: (row: Row) => (
            <Pill variant={row.variant}>{row.name || row.type}</Pill>
          ),
        },
        {
          title: "identifier",
          component: (row: Row) => (
            <span className="font-mono">{row.type}</span>
          ),
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
