import { collection, component, config, fields, singleton, type ObjectField, type PreviewProps } from "@keystatic/core";
import PRICES from "@/autogen/prices-v2.json";
import {
  NAVIGATION_GROUP_LABELS,
  NAVIGATION_GROUPS,
} from "@/components/layout/lib";

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
          hidden_page: {
            label: "Hidden Page",
            schema: fields.relationship({ label: "Page", collection: "pages" }),
            itemLabel: (props) => props?.value ?? "",
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
// Use KEYSTATIC_LOCAL=true to force local storage during builds (e.g., for local testing).
const IN_PRODUCTION =
  process.env.NODE_ENV === "production" &&
  process.env.KEYSTATIC_LOCAL !== "true";
const APPLICATION_DIRECTORY = IN_PRODUCTION ? "docs" : ".";
export const localBaseURL = IN_PRODUCTION ? "../" : "./";
const generatePath = (path: string) => {
  return `${APPLICATION_DIRECTORY}/${path}`;
};

const automationSchema = {
  url: fields.url({ label: "URL" }),
  name: fields.text({ label: "Name" }),
  description: fields.text({ label: "Description" }),
  trigger: fields.text({ label: "Trigger" }),
  action: fields.text({ label: "Action" }),
};

const automation = component({
  label: "Automation",
  schema: automationSchema,
  preview: (props: PreviewProps<ObjectField<typeof automationSchema>>) => (
    <div>
      <h2>{props.fields.name.value}</h2>
      <p>{props.fields.description.value}</p>
      <p>
        Trigger: {props.fields.trigger.value} - Action:{" "}
        {props.fields.action.value}
      </p>
    </div>
  ),
});

const faq = component({
  label: "FAQ Section",
  schema: { text: fields.text({ label: "Placeholder" }) },
  preview: () => (
    <div>FAQ section will be rendered automatically from page frontmatter</div>
  ),
});

const fileExplorerSchema = {
  title: fields.text({
    label: "Title",
    defaultValue: "Directory Structure",
  }),
  structure: fields.select({
    label: "Structure Type",
    options: [
      {
        label: "Buttondown CLI Structure",
        value: "buttondown-cli",
      },
      { label: "Custom Structure", value: "custom" },
    ],
    defaultValue: "buttondown-cli",
  }),
  customData: fields.text({
    label: "Custom Structure (JSON)",
    description:
      "JSON array of file/folder structure when using custom structure",
    multiline: true,
    validation: { isRequired: false },
  }),
};

const fileExplorer = component({
  label: "File Explorer",
  schema: fileExplorerSchema,
  preview: (props: PreviewProps<ObjectField<typeof fileExplorerSchema>>) => (
    <div className="border border-gray-200 p-4 rounded-lg bg-white shadow-xs">
      <div className="flex items-center mb-3">
        <div className="w-5 h-5 bg-blue-100 rounded-sm flex items-center justify-center mr-2">
          📁
        </div>
        <div className="text-sm font-medium text-gray-900">
          {props.fields.title.value || "Directory Structure"}
        </div>
      </div>
      <div className="text-xs text-gray-500 space-y-1">
        <div>
          Type:{" "}
          {props.fields.structure.value === "buttondown-cli"
            ? "Buttondown CLI Structure"
            : "Custom Structure"}
        </div>
        {props.fields.structure.value === "custom" &&
          props.fields.customData.value && (
            <div className="text-gray-400">Custom JSON provided</div>
          )}
      </div>
    </div>
  ),
});

const generatedMultilanguageSnippetsSchema = {
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
};

const generatedMultilanguageSnippets = component({
  label: "Generated API Multilanguage Code Snippets",
  schema: generatedMultilanguageSnippetsSchema,
  preview: (props: PreviewProps<ObjectField<typeof generatedMultilanguageSnippetsSchema>>) => (
    <code>{`We can't generate code snippets inside Keystatic, but imagine example code for ${props.fields.method.value.toUpperCase()} ${props.fields.endpoint.value} here.`}</code>
  ),
});

const iframeSchema = {
  src: fields.url({ label: "URL" }),
  height: fields.number({ label: "Height", defaultValue: 300 }),
  variant: fields.select({
    label: "Variant",
    defaultValue: "page",
    options: [
      { label: "Page", value: "page" },
      { label: "Email", value: "email" },
      { label: "Subscriber", value: "subscriber" },
    ],
  }),
};

const iframe = component({
  label: "iframe",
  schema: iframeSchema,
  preview: (props: PreviewProps<ObjectField<typeof iframeSchema>>) => {
    const src = props.fields.src.value;
    if (!src) return null;
    const height = props.fields.height.value;
    return (
      <iframe
        src={src}
        style={{
          height: height ?? 300,
          width: ((height ?? 300) * 16) / 9,
        }}
      ></iframe>
    );
  },
});

const liveCodeBlock = component({
  label: "Live Code Block",
  schema: {
    filename: fields.pathReference({
      label: "Filename",
      pattern: generatePath("public/**/*.html"),
      validation: { isRequired: false },
    }),
  },
  preview: (props) => (
    <div>
      <pre>{props.fields.filename.value}</pre>
    </div>
  ),
});

const noticeInfoSchema = {
  text: fields.text({ label: "Notice Text", multiline: true }),
};

const noticeInfo = component({
  label: "Notice Info",
  schema: noticeInfoSchema,
  preview: (props: PreviewProps<ObjectField<typeof noticeInfoSchema>>) => {
    const text = props.fields.text.value;
    if (!text) return null;
    return <div>{text}</div>;
  },
});

const noticeWarnSchema = {
  text: fields.text({ label: "Notice Warning", multiline: true }),
};

const noticeWarn = component({
  label: "Notice Warning",
  schema: noticeWarnSchema,
  preview: (props: PreviewProps<ObjectField<typeof noticeWarnSchema>>) => {
    const text = props.fields.text.value;
    if (!text) return null;
    return <div>{text}</div>;
  },
});

const paidFeature = component({
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
  preview: () => <div>This is a paid feature.</div>,
});

const playgroundEmbedSchema = {
  initialContent: fields.text({
    label: "Initial Content",
    description: "Optional initial markdown content to load in the editor",
    multiline: true,
    validation: { isRequired: false },
  }),
  height: fields.text({
    label: "Height",
    description: "Height of the embedded playground (e.g., '600px', '80vh')",
    defaultValue: "600px",
  }),
  title: fields.text({
    label: "Title",
    description: "Title to display above the playground",
    defaultValue: "Buttondown Playground",
  }),
  editorMode: fields.select({
    label: "Editor Mode",
    description: "Mode of the editor",
    options: [
      { label: "Plaintext", value: "plaintext" },
      { label: "Fancy", value: "fancy" },
    ],
    defaultValue: "fancy",
  }),
};

const playgroundEmbed = component({
  label: "Playground Embed",
  schema: playgroundEmbedSchema,
  preview: (props: PreviewProps<ObjectField<typeof playgroundEmbedSchema>>) => (
    <div className="border p-4 rounded-sm">
      <div className="text-sm text-gray-600 mb-2">
        Playground Embed: {props.fields.title.value}
      </div>
      <div className="text-xs text-gray-500">
        Height: {props.fields.height.value}
      </div>
    </div>
  ),
});

const supportSnippet = component({
  label: "Need Support",
  schema: {},
  preview: () => (
    <div>
      As always, we are happy to answer any questions you may have via
      support@buttondown.com.
    </div>
  ),
});

const videoSchema = {
  file: fields.file({
    label: "File",
    directory: generatePath("public"),
    publicPath: "/",
  }),
};

const video = component({
  label: "Video",
  schema: videoSchema,
  preview: (props: PreviewProps<ObjectField<typeof videoSchema>>) => {
    const file = props.fields.file.value;
    if (!file) return null;
    return <p>{file.filename}</p>;
  },
});

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
        faqItems: fields.text({
          label: "FAQ Items (JSON)",
          description:
            'JSON array of FAQ items. Example: [{"question":"Q?","answer":"A"}]',
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
            automation,
            faq,
            video,
            iframe,
            generatedMultilanguageSnippets,
            paidFeature,
            supportSnippet,
            liveCodeBlock,
            playgroundEmbed,
            noticeInfo,
            noticeWarn,
            fileExplorer,
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
