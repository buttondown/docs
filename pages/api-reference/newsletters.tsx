import ObjectDescription from "../../components/api/ObjectDescription";
import Scaffolding from "../../components/Scaffolding";

export default function Newsletters() {
  return (
    <Scaffolding>
      <ObjectDescription
        name={"Newsletter"}
        enums={[]}
        endpoints={["/newsletters", "/newsletters/{pk}"]}
      />
    </Scaffolding>
  );
}
