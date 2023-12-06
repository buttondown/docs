import ObjectDescription from "../../components/api/ObjectDescription";
import Scaffolding from "../../components/Scaffolding";

export default function Images() {
  return (
    <Scaffolding>
      <ObjectDescription
        name={"Image"}
        enums={[]}
        endpoints={["/images", "/images/{image_id}"]}
      />
    </Scaffolding>
  );
}
