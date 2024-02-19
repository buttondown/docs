import OpenAPIEnums from "../../../lib/openapi/enums.json";
import Pill, { Variant } from "../../Pill";
import Table, { Row } from "../../Table";

type Props = {
  enum: keyof typeof OpenAPIEnums;
};

const TypePill = (row: Row) => (
  <Pill variant={row.variant as Variant}>{row.name || row.type}</Pill>
);

const Identifier = (row: Row) => <span className="font-mono">{row.type}</span>;

export default function EnumTable({ enum: enumName }: Props) {
  const valueToSpec = OpenAPIEnums[enumName];
  const rows = Object.entries(valueToSpec).map(([key, value]) => ({
    type: key,
    ...value,
  }));
  return (
    <Table
      columns={[
        {
          title: "type",
          component: TypePill,
        },
        {
          title: "identifier",
          component: Identifier,
        },
        { title: "description" },
      ]}
      content={rows}
    />
  );
}
