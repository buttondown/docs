import ObjectDescription from "../../components/api/ObjectDescription";
import Scaffolding from "../../components/Scaffolding";

export default function Tags() {
  return (
    <Scaffolding>
      <ObjectDescription
        name={"Tag"}
        enums={[]}
        endpoints={["/tags", "/tags/{tag_id}"]}
      />
    </Scaffolding>
  );
}
