import OpenAPIEnums from "../../../lib/openapi/enums.json";
import { EnumDescription } from "../../../lib/openapi/types";
import Table, { Row } from "../../Table";
import Pill, { Variant } from "../../Pill";

type Props = {
  enum: keyof typeof OpenAPIEnums;
};

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
          component: (row: Row) => (
            <Pill variant={row.variant as Variant}>{row.name || row.type}</Pill>
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
      content={rows}
    />
  );
}
