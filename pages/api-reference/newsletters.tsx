import ObjectDescription from "../../components/api/ObjectDescription";
import Scaffolding from "../../components/Scaffolding";

export default function Newsletters() {
  return (
    <Scaffolding
      meta={{
        title: "Newsletters",
        description:
          "Learn how to use the Buttondown API to programmatically create entire newsletters.",
      }}
    >
      <ObjectDescription
        name={"Newsletter"}
        enums={[]}
        endpoints={["/newsletters", "/newsletters/{pk}"]}
      />
    </Scaffolding>
  );
}
