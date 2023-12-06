import ObjectDescription from "../../components/api/ObjectDescription";
import Scaffolding from "../../components/Scaffolding";

export default function Subscribers() {
  return (
    <Scaffolding>
      <ObjectDescription
        name={"Subscriber"}
        enums={["SubscriberType", "SubscriberSource"]}
        endpoints={[
          "/subscribers",
          "/subscribers/{pk}",
          "/subscribers/{pk}/send-reminder",
          "/subscribers/{pk}/emails/{email_pk}",
        ]}
      />
    </Scaffolding>
  );
}
