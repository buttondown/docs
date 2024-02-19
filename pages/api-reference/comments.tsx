import ObjectDescription from "../../components/api/ObjectDescription";
import Scaffolding from "../../components/Scaffolding";

export default function BulkActions() {
  return (
    <Scaffolding
      meta={{
        title: "Comments",
        description:
          "Learn how to use the Buttondown API to filter and retrieve comments.",
      }}
    >
      <ObjectDescription
        name={"Comment"}
        enums={[]}
        endpoints={["/comments"]}
      />
    </Scaffolding>
  );
}
