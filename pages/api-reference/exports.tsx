import ObjectDescription from "../../components/api/ObjectDescription";
import Scaffolding from "../../components/Scaffolding";

export default function Exports() {
  return (
    <Scaffolding
      meta={{
        title: "Exports",
        description:
          "Learn how to use the Buttondown API to trigger and query long-running exports of your data.",
      }}
    >
      <ObjectDescription
        name={"Export"}
        enums={["ExportCollection", "ExportStatus"]}
        endpoints={["/exports", "/exports/{pk}"]}
      />
    </Scaffolding>
  );
}
