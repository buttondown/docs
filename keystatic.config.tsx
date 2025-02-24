import PRICES from "@/autogen/prices.json";
import { preview } from "@/components/keystatic/preview";
import {
    NAVIGATION_GROUPS,
    NAVIGATION_GROUP_LABELS,
} from "@/components/layout/lib";
import {
    collection,
    component,
    config,
    fields,
    singleton,
} from "@keystatic/core";

const navigationGroupSchema = (label: string) =>
  fields.array(
    fields.object({
      name: fields.text({ label: "Name" }),
      items: fields.blocks(
        {
          page: {
            label: "Page",
            schema: fields.relationship({ label: "Page", collection: "pages" }),
            itemLabel: (props) => props?.value ?? "",
          },
          divider: {
            label: "Divider",
            schema: fields.text({ label: "Divider" }),
            itemLabel: (props) => `Divider: ${props?.value}`,
          },
        },
        { label: "Navigation" },
      ),
    }),
    {
      label,
      itemLabel: (props) =>
        `${props.fields.name.value} (${props.fields.items.elements.length})`,
    },
  );

// NON-OBVIOUS LOGIC ALERT!
// When deploying a Keystatic application within the monorepo to Vercel, we deploy
// the entire monorepo, _not_ just this directory — which means that the process _serving_ the
// application is in the root directory of the monorepo, not this directory. As a result, this process
// should be run from the root directory of the monorepo even when local — this helps ensure that the
// behavior is similar to production.
const IN_PRODUCTION = process.env.NODE_ENV === "production";
const APPLICATION_DIRECTORY = IN_PRODUCTION ? "docs" : ".";
export const localBaseURL = IN_PRODUCTION ? "../" : "./";
const generatePath = (path: string) => {
  return `${APPLICATION_DIRECTORY}/${path}`;
};

export default config({
  storage: IN_PRODUCTION
    ? {
        kind: "github",
        repo: {
          owner: "buttondown",
          name: "monorepo",
        },
      }
    : {
        kind: "local",
      },
  singletons: {
    navigation: singleton({
      label: "Navigation",
      path: generatePath("content/navigation"),
      format: { data: "json" },
      schema: NAVIGATION_GROUPS.reduce(
        (acc, group) => {
          acc[group] = navigationGroupSchema(NAVIGATION_GROUP_LABELS[group]);
          return acc;
        },
        {} as Record<string, any>,
      ),
    }),
  },
  collections: {
    pages: collection({
      label: "Pages",
      slugField: "title",
      path: generatePath("content/pages/*") as `${string}/*`,
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        navigationTitle: fields.text({
          label: "Navigation Title",
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
        }),
        schema: fields.text({
          label: "Schema",
        }),
        enum: fields.text({
          label: "Enum",
        }),
        date: fields.date({
          label: "Date",
        }),
        endpoint: fields.text({
          label: "Endpoint",
        }),
        method: fields.text({
          label: "Method",
        }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: generatePath("public"),
            publicPath: "/",
          },
          tables: true,
          componentBlocks: {
            automation: component({
              label: "Automation",
              schema: {
                url: fields.url({ label: "URL" }),
                name: fields.text({ label: "Name" }),
                description: fields.text({ label: "Description" }),
                trigger: fields.text({ label: "Trigger" }),
                action: fields.text({ label: "Action" }),
              },
              preview(props) {
                return (
                  <div>
                    <h2>{props.fields.name.value}</h2>
                    <p>{props.fields.description.value}</p>
                    <p>
                      Trigger: {props.fields.trigger.value} - Action:{" "}
                      {props.fields.action.value}
                    </p>
                  </div>
                );
              },
            }),
            video: component({
              label: "Video",
              schema: {
                file: fields.file({
                  label: "File",
                  directory: generatePath("public"),
                  publicPath: "/",
                }),
              },
              preview(props) {
                const file = props.fields.file.value;
                if (!file) return null;
                return <p>{file.filename}</p>;
              },
            }),
            iframe: component({
              label: "iframe",
              schema: {
                src: fields.url({ label: "URL" }),
              },
              preview(props) {
                const src = props.fields.src.value;
                if (!src) {
                  return null;
                }
                return (
                  <iframe
                    src={src}
                    style={{ height: 200, width: (200 * 16) / 9 }}
                  ></iframe>
                );
              },
            }),
            preview,
            renderable: component({
              label: "Renderable",
              schema: {
                html: fields.text({ label: "HTML", multiline: true }),
              },
              preview() {
                return <div>This is a renderable component.</div>;
              },
            }),
            generatedMultilanguageSnippets: component({
              label: "Generated API Multilanguage Code Snippets",
              schema: {
                method: fields.text({ label: "HTTP Method" }),
                endpoint: fields.text({ label: "HTTP endpoint" }),
                body: fields.text({
                  label: "JSON body",
                  validation: { isRequired: false },
                }),
                headers: fields.text({
                  label: "Headers (as JSON object)",
                  validation: { isRequired: false },
                }),
                query: fields.text({
                  label: "Query parameters (as JSON object)",
                  validation: { isRequired: false },
                }),
              },
              preview(props) {
                return (
                  <code>{`We can't generate code snippets inside Keystatic, but imagine example code for ${props.fields.method.value.toUpperCase()} ${props.fields.endpoint.value} here.`}</code>
                );
              },
            }),
            multilanguageSnippets: component({
              label: "Multiple Snippets",
              schema: {
                python: fields.pathReference({
                  label: "Python",
                  pattern: generatePath("public/**/*.py"),
                  validation: {
                    isRequired: false,
                  },
                }),
                ruby: fields.pathReference({
                  label: "Ruby",
                  pattern: generatePath("public/**/*.rb"),
                  validation: {
                    isRequired: false,
                  },
                }),
                curl: fields.pathReference({
                  label: "Curl",
                  pattern: generatePath("public/**/*.sh"),
                  validation: {
                    isRequired: false,
                  },
                }),
                javascript: fields.pathReference({
                  label: "Javascript",
                  pattern: generatePath("public/**/*.js"),
                  validation: {
                    isRequired: false,
                  },
                }),
              },
              preview(props) {
                return <div>{props.fields.python.value}</div>;
              },
            }),
            customizableContent: component({
              label: "Customizable Content",
              schema: {
                loggedIn: fields.text({
                  label: "If user logged in",
                  multiline: true,
                }),
                anonymous: fields.text({
                  label: "If anonymous",
                  multiline: true,
                }),
              },
              preview() {
                return <div>This is a renderable component.</div>;
              },
            }),
            exportButtondownData: component({
              label: "Export data snippet",
              schema: {},
              preview() {
                return (
                  <div>With Buttondown, it’s easy to export all your data.</div>
                );
              },
            }),
            paidFeature: component({
              label: "Paid feature",
              schema: {
                feature: fields.select({
                  label: "Feature",
                  description: "The feature that this snippet is about.",
                  options: PRICES[4].features.map((feature) => {
                    return { value: feature, label: feature };
                  }),
                  defaultValue: "scheduling",
                }),
              },
              preview() {
                return <div>This is a paid feature.</div>;
              },
            }),
            supportSnippet: component({
              label: "Need Support",
              schema: {},
              preview() {
                return (
                  <div>
                    As always, we’re happy to answer any questions you may have
                    via support@buttondown.com.
                  </div>
                );
              },
            }),
            liveCodeBlock: component({
              label: "Live Code Block",
              schema: {
                filename: fields.pathReference({
                  label: "Filename",
                  pattern: generatePath("public/**/*.html"),
                  validation: {
                    isRequired: false,
                  },
                }),
              },
              preview(props) {
                return (
                  <div>
                    <pre>{props.fields.filename.value}</pre>
                  </div>
                );
              },
            }),
            noticeInfo: component({
              label: "Notice Info",
              schema: {
                text: fields.text({ label: "Notice Text", multiline: true }),
              },
              preview(props) {
                const text = props.fields.text.value;
                if (!text) {
                  return null;
                }
                return <div>{text}</div>;
              },
            }),
            noticeWarn: component({
              label: "Notice Warning",
              schema: {
                text: fields.text({ label: "Notice Warning", multiline: true }),
              },
              preview(props) {
                const text = props.fields.text.value;
                if (!text) {
                  return null;
                }
                return <div>{text}</div>;
              },
            }),
            snippetSpacer: component({
              label: "Spacer between two snippets",
              schema: {},
              preview() {
                return <div>This is a spacer</div>;
              },
            }),
          },
        }),
        relatedPages: fields.array(
          fields.relationship({ label: "Page", collection: "pages" }),
          { label: "Related Pages", itemLabel: (props) => props.value ?? "" },
        ),
      },
    }),
  },
});
