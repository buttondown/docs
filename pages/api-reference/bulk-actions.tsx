import ObjectDescription from "../../components/api/ObjectDescription";
import Scaffolding from "../../components/Scaffolding";

export default function BulkActions() {
  return (
    <Scaffolding
      meta={{
        title: "Bulk actions",
        description:
          "Learn how to use the Buttondown API to administrate actions in bulk such as deletions or reminders.",
      }}
    >
      <ObjectDescription
        name={"BulkAction"}
        enums={["BulkActionType", "BulkActionStatus"]}
        endpoints={["/bulk_actions", "/bulk_actions/{pk}"]}
      />
    </Scaffolding>
  );
}
