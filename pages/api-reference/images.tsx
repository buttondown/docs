import ObjectDescription from "../../components/api/ObjectDescription";
import { A, H2 } from "../../components/Markdown";
import Scaffolding from "../../components/Scaffolding";

export default function Images() {
  return (
    <Scaffolding
      meta={{
        title: "Images",
        description:
          "Learn how to use the Buttondown API to upload and manage images",
      }}
    >
      <ObjectDescription
        name={"Image"}
        enums={[]}
        endpoints={["/images", "/images/{pk}"]}
      />

      <div>
        <H2>In the wild</H2>
        <p>
          Check out how Jon Sullivan{" "}
          <A href="https://buttondown.email/blog/typora">
            uses the Buttondown API to upload images through Typora
          </A>{" "}
          and then embed them in his newsletters.
        </p>
      </div>
    </Scaffolding>
  );
}
