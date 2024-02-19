import {
  AnnotationIcon,
  BeakerIcon,
  BriefcaseIcon,
  EmojiHappyIcon,
  InboxInIcon,
  LightningBoltIcon,
  MapIcon,
  PresentationChartBarIcon,
  QuestionMarkCircleIcon,
  TerminalIcon,
} from "@heroicons/react/outline";
import { GlobeAltIcon } from "@heroicons/react/solid";

export type NavigationSubitem = {
  name: string;
  href: string;
  beta?: boolean;
};

export type NavigationItem = {
  name: string;
  href: string;
  icon: CallableFunction;
  children?: Array<NavigationSubitem>;
};

const NAVIGATION: Array<NavigationItem> = [
  {
    name: "Welcome to Buttondown!",
    href: "/",
    icon: EmojiHappyIcon,
  },
  {
    name: "Getting Started",
    href: "/getting-started",
    icon: PresentationChartBarIcon,
    children: [
      {
        name: "Quickstart",
        href: "/getting-started/quickstart",
      },
      {
        name: "Registration and setup",
        href: "/getting-started/registration-and-setup",
      },
      {
        name: "Importing your data",
        href: "/getting-started/importing-your-data",
      },
      {
        name: "Building your subscriber base",
        href: "/getting-started/building-your-subscriber-base",
      },
      {
        name: "Getting a custom domain",
        href: "/getting-started/getting-a-custom-domain",
      },
      {
        name: "Hosting on a custom domain",
        href: "/getting-started/hosting-on-a-custom-domain",
      },
      {
        name: "Sending from a custom domain",
        href: "/getting-started/sending-from-a-custom-domain",
      },
      {
        name: "Sending your first email",
        href: "/getting-started/sending-your-first-email",
      },
      {
        name: "Scheduling an email",
        href: "/getting-started/scheduling-an-email",
      },
      {
        name: "Using Markdown",
        href: "/getting-started/using-markdown",
      },
      {
        name: "Share images",
        href: "/advanced-features/share-images",
      },
      {
        name: "Billing",
        href: "/getting-started/billing",
      },
    ],
  },
  {
    name: "Advanced Features",
    href: "/advanced-features",
    icon: LightningBoltIcon,
    children: [
      {
        name: "CSS",
        href: "/advanced-features/css",
      },
      {
        name: "Tags",
        href: "/advanced-features/tags",
      },
      {
        name: "Metadata",
        href: "/advanced-features/metadata",
      },
      {
        name: "RSS-to-email",
        href: "/advanced-features/rss-to-email",
      },
      {
        name: "Surveys",
        href: "/advanced-features/surveys",
      },
      {
        name: "Paid subscriptions",
        href: "/advanced-features/paid-subscriptions",
      },
      {
        name: "Multiple newsletters",
        href: "/advanced-features/multiple-newsletters",
      },
      {
        name: "Automations",
        href: "/advanced-features/automations",
      },
      {
        name: "Teams",
        href: "/advanced-features/teams",
      },
      {
        name: "Dedicated IP",
        href: "/advanced-features/dedicated-ip",
      },
      {
        name: "Comments",
        href: "/advanced-features/comments",
      },
    ],
  },
  {
    name: "Tutorials",
    href: "/tutorials",
    icon: MapIcon,
    children: [
      {
        name: "Automating welcome sequences",
        href: "/tutorials/welcome-sequence",
      },
      {
        name: "Collecting and using subscriber names",
        href: "/tutorials/names",
      },
      {
        name: "Customizing email and subscriber list views",
        href: "/tutorials/customizing-list-views",
      },
      {
        name: "Drafting emails via the API",
        href: "/tutorials/drafting-emails-via-the-api",
      },
      {
        name: "Scheduling emails via the API",
        href: "/tutorials/scheduling-emails-via-the-api",
      },
    ],
  },
  {
    name: "Sending Domain Guides",
    href: "/sending-domains",
    icon: GlobeAltIcon,
    children: [
      {
        name: "Sending from DreamHost",
        href: "/sending-domains/sending-from-dreamhost",
      },
    ],
  },
  {
    name: "Migration Guides",
    href: "/migration-guides",
    icon: InboxInIcon,
    children: [
      { name: "AWeber", href: "/migration-guides/aweber" },
      { name: "Benchmark", href: "/migration-guides/benchmark" },
      { name: "Campaign Monitor", href: "/migration-guides/campaign-monitor" },
      { name: "Constant Contact", href: "/migration-guides/constant-contact" },
      { name: "ConvertKit", href: "/migration-guides/convertkit" },
      { name: "EmailOctopus", href: "/migration-guides/emailoctopus" },
      { name: "FeedBlitz", href: "/migration-guides/feedblitz" },
      { name: "Mailchimp", href: "/migration-guides/mailchimp" },
      { name: "Mailcoach", href: "/migration-guides/mailcoach" },
      { name: "MailerLite", href: "/migration-guides/mailerlite" },
      { name: "Moosend", href: "/migration-guides/moosend" },
      { name: "Revue", href: "/migration-guides/revue" },
      { name: "Substack", href: "/migration-guides/substack" },
      { name: "Tinyletter", href: "/migration-guides/tinyletter" },
    ],
  },
  {
    name: "API Reference",
    href: "/api-reference",
    icon: TerminalIcon,
    children: [
      { name: "Introduction", href: "/api-reference/introduction" },
      { name: "Authentication", href: "/api-reference/authentication" },
      {
        name: "Pagination",
        href: "/api-reference/pagination",
      },
      {
        name: "Events and webhooks",
        href: "/api-reference/events-and-webhooks",
      },
      { name: "Changelog", href: "/api-reference/changelog" },
      { name: "Subscribers", href: "/api-reference/subscribers" },
      { name: "Emails", href: "/api-reference/emails" },
      { name: "Tags", href: "/api-reference/tags" },
      { name: "Images", href: "/api-reference/images" },
      { name: "Newsletters", href: "/api-reference/newsletters" },
      { name: "Exports", href: "/api-reference/exports" },
      { name: "Bulk actions", href: "/api-reference/bulk-actions" },
      { name: "Automations", href: "/api-reference/automations" },
      { name: "Comments", href: "/api-reference/comments" },
    ],
  },
  {
    name: "Integrations",
    href: "/integrations",
    icon: BeakerIcon,
    children: [
      { name: "Blogger", href: "/integrations/blogger" },
      { name: "Carrd", href: "/integrations/carrd" },
      { name: "Discord", href: "/integrations/discord" },
      { name: "Duda", href: "/integrations/duda" },
      { name: "Fathom", href: "/integrations/fathom" },
      { name: "Framer", href: "/integrations/framer" },
      { name: "Linktree", href: "/integrations/linktree" },
      { name: "Plausible", href: "/integrations/plausible" },
      { name: "Stripe", href: "/integrations/stripe" },
      { name: "Wordpress", href: "/integrations/wordpress" },
      // { name: "Simple Analytics", href: "#" },
      // { name: "Zapier", href: "#" },
    ],
  },
  {
    name: "Behind the Scenes",
    href: "/behind-the-scenes",
    icon: BriefcaseIcon,
    children: [
      // { name: "Changelog", href: "#" },
      { name: "Esoterica", href: "/behind-the-scenes/esoterica" },
      { name: "Kudos", href: "/behind-the-scenes/kudos" },
      {
        name: "Affiliate program",
        href: "/behind-the-scenes/affiliate-program",
      },
      {
        name: "Subscriber referrals",
        href: "/behind-the-scenes/subscriber-referrals",
      },
    ],
  },
  {
    name: "Odds and Ends",
    href: "/odds-and-ends",
    icon: AnnotationIcon,
    children: [
      {
        name: "Glossary",
        href: "/odds-and-ends/glossary",
      },
      {
        name: "Template variables",
        href: "/odds-and-ends/template-variables",
      },
      {
        name: "Automations reference",
        href: "/odds-and-ends/automations-reference",
      },
      {
        name: "Privacy and security",
        href: "/odds-and-ends/privacy-and-security",
      },
      {
        name: "Data exports",
        href: "/odds-and-ends/data-exports",
      },
      { name: "Offboarding", href: "/odds-and-ends/offboarding" },
      {
        name: "Law enforcement requests",
        href: "/odds-and-ends/law-enforcement-requests",
      },
      {
        name: "Using a screen reader",
        href: "/odds-and-ends/screen-reader",
      },
    ],
  },
  {
    name: "Need More Help?",
    href: "/need-more-help",
    icon: QuestionMarkCircleIcon,
  },
];
export default NAVIGATION;
