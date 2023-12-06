import ObjectDescription from "../../components/api/ObjectDescription";
import Scaffolding from "../../components/Scaffolding";

export default function BulkActions() {
  return (
    <Scaffolding>
      <ObjectDescription
        name={"BulkAction"}
        enums={["BulkActionType", "BulkActionStatus"]}
        endpoints={["/bulk_actions", "/bulk_actions/{pk}"]}
      />
    </Scaffolding>
  );
}
