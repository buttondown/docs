import ObjectDescription from "../../components/api/ObjectDescription";
import Scaffolding from "../../components/Scaffolding";

export default function Exports() {
  return (
    <Scaffolding>
      <ObjectDescription
        name={"Export"}
        enums={["ExportCollection", "ExportStatus"]}
        endpoints={["/exports", "/exports/{pk}"]}
      />
    </Scaffolding>
  );
}
