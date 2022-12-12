import OpenAPIEnums from "../../../lib/openapi/enums.json";
import OldEnumTable from "../EnumTable";

type props = {
  enum: keyof typeof OpenAPIEnums;
};

export default function EnumTable({ enum: enumName }: props) {
  const enumValues = OpenAPIEnums[enumName];
  return <OldEnumTable e={enumValues} />;
}
