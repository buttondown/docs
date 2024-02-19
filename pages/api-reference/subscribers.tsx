import ObjectDescription from "../../components/api/ObjectDescription";
import Scaffolding from "../../components/Scaffolding";

export default function Subscribers() {
  return (
    <Scaffolding
      meta={{
        title: "Subscribers",
        description:
          "Learn how to use the Buttondown API to create, update, or delete subscribers to your newsletter.",
      }}
    >
      <ObjectDescription
        name={"Subscriber"}
        enums={["SubscriberType", "SubscriberSource"]}
        endpoints={[
          "/subscribers",
          "/subscribers/{pk_or_email}",
          "/subscribers/{pk_or_email}/send-reminder",
          "/subscribers/{pk_or_email}/emails/{email_pk}",
        ]}
      />
    </Scaffolding>
  );
}
