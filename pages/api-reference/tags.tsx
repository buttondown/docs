import ObjectDescription from "../../components/api/ObjectDescription";
import Scaffolding from "../../components/Scaffolding";

export default function Tags() {
  return (
    <Scaffolding
      meta={{
        title: "Tags",
        description:
          "Learn how to use the Buttondown API to manage tags for your subscribers or emails",
      }}
    >
      <ObjectDescription
        name={"Tag"}
        enums={[]}
        endpoints={["/tags", "/tags/{pk}"]}
      />
    </Scaffolding>
  );
}
