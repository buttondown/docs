import {
  AnnotationIcon,
  BeakerIcon,
  BriefcaseIcon,
  EmojiHappyIcon,
  InboxInIcon,
  LightningBoltIcon,
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
    name: "Getting started",
    href: "/getting-started",
    icon: PresentationChartBarIcon,
    children: [
      {
        name: "Registration & setup",
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
        name: "Billing",
        href: "/getting-started/billing",
      },
    ],
  },
  {
    name: "Advanced features",
    href: "/advanced-features",
    icon: LightningBoltIcon,
    children: [
      {
        name: "Customizing your emails",
        href: "/advanced-features/customizing-your-emails",
      },
      {
        name: "Customizing your web presence",
        href: "/advanced-features/customizing-your-web-presence",
      },
      {
        name: "Using template variables",
        href: "/advanced-features/template-variables",
      },
      {
        name: "Collecting and using metadata",
        href: "/advanced-features/metadata",
      },
      {
        name: "Managing multiple newsletters",
        href: "/advanced-features/managing-multiple-newsletters",
      },
      {
        name: "Markdown",
        href: "/advanced-features/markdown",
      },
      {
        name: "Affiliate program",
        href: "/advanced-features/affiliate-program",
      },
      {
        name: "Monetizing your newsletter",
        href: "/advanced-features/monetizing-your-newsletter",
      },
      {
        name: "Email automation",
        href: "/advanced-features/email-automation",
      },
      {
        name: "Subscriber referrals",
        href: "/advanced-features/subscriber-referrals",
        beta: true,
      },
    ],
  },
  {
    name: "Sending domain guides",
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
    name: "Migration guides",
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
    name: "API reference",
    href: "/api-reference",
    icon: TerminalIcon,
    children: [
      { name: "Introduction", href: "/api-reference/introduction" },
      { name: "Authentication", href: "/api-reference/authentication" },
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
    ],
  },
  {
    name: "Integrations",
    href: "/integrations",
    icon: BeakerIcon,
    children: [
      { name: "Fathom", href: "/integrations/fathom" },
      { name: "Plausible", href: "/integrations/plausible" },
      { name: "Blogger", href: "/integrations/blogger" },
      // { name: "Simple Analytics", href: "#" },
      // { name: "Zapier", href: "#" },
    ],
  },
  {
    name: "Behind the scenes",
    href: "/behind-the-scenes",
    icon: BriefcaseIcon,
    children: [
      // { name: "Changelog", href: "#" },
      { name: "Esoterica", href: "/behind-the-scenes/esoterica" },
      { name: "Kudos", href: "/behind-the-scenes/kudos" },
      { name: "Running costs", href: "/behind-the-scenes/running-costs" },
      {
        name: "Funding open source software",
        href: "/behind-the-scenes/funding",
      },
    ],
  },
  {
    name: "Odds and ends",
    href: "/odds-and-ends",
    icon: AnnotationIcon,
    children: [
      {
        name: "Glossary",
        href: "/odds-and-ends/glossary",
      },
      {
        name: "Privacy and security",
        href: "/odds-and-ends/privacy-and-security",
      },
      {
        name: "Exporting your data",
        href: "/odds-and-ends/exporting-your-data",
      },
      { name: "Offboarding", href: "/odds-and-ends/offboarding" },
      {
        name: "Law enforcement requests",
        href: "/odds-and-ends/law-enforcement-requests",
      },
    ],
  },
  {
    name: "Need more help?",
    href: "/need-more-help",
    icon: QuestionMarkCircleIcon,
  },
];
export default NAVIGATION;
