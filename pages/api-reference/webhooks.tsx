import ObjectDescription from "../../components/api/ObjectDescription";
import Scaffolding from "../../components/Scaffolding";

export default function Webhooks() {
  return (
    <Scaffolding
      meta={{
        title: "Webhooks",
        description:
          "Learn how to use the Buttondown API to set up webhooks for various events.",
      }}
    >
      <ObjectDescription
        name={"Webhook"}
        endpoints={["/webhooks", "/webhooks/{pk}"]}
        enums={[]}
      />
    </Scaffolding>
  );
}
