import ObjectDescription from "../../components/api/ObjectDescription";
import Scaffolding from "../../components/Scaffolding";

export default function Automations() {
  return (
    <Scaffolding
      meta={{
        title: "Automations",
        description:
          "Learn how to use the Buttondown API to ingest and publish content from an RSS feed.",
      }}
    >
      <ObjectDescription
        name={"ExternalFeed"}
        enums={[
          "ExternalFeedAutomationBehavior",
          "ExternalFeedAutomationStatus",
          "ExternalFeedAutomationCadence",
        ]}
        endpoints={["/external_feeds", "/external_feeds/{pk}"]}
      />
    </Scaffolding>
  );
}
