import ObjectDescription from "../../components/api/ObjectDescription";
import Scaffolding from "../../components/Scaffolding";

export default function Emails() {
  return (
    <Scaffolding>
      <ObjectDescription
        name={"Email"}
        enums={["EmailStatus", "EmailType"]}
        endpoints={["/emails", "/emails/{pk}", "/emails/{pk}/analytics"]}
      />
    </Scaffolding>
  );
}
