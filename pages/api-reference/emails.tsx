import ObjectDescription from "../../components/api/ObjectDescription";
import Scaffolding from "../../components/Scaffolding";

export default function Emails() {
  return (
    <Scaffolding
      meta={{
        title: "Emails",
        description:
          "Learn how to use the Buttondown API to manage emails and drafts.",
      }}
    >
      <ObjectDescription
        name={"Email"}
        enums={["EmailStatus", "EmailType"]}
        endpoints={[
          "/emails",
          "/emails/{pk}",
          "/emails/{pk}/analytics",
          "/emails/{pk}/send-draft",
        ]}
      />
    </Scaffolding>
  );
}
