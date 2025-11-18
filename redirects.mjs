const REDIRECTS = [
  {
    source: "/",
    destination: "/introduction",
    permanent: false,
  },
  {
    source: "/odd-and-ends/exporting-your-data",
    permanent: true,
    destination: "/data-exports",
  },
  {
    source: "/advanced-features/automations",
    permanent: false,
    destination: "/automations-introduction",
  },
  {
    source: "/advanced-features/comments",
    permanent: false,
    destination: "/comments",
  },
  {
    source: "/advanced-features/css",
    permanent: false,
    destination: "/customizing-email-design",
  },
  {
    source: "/advanced-features/customizing-your-web-presence",
    permanent: false,
    destination: "/customizing-web-design",
  },
  {
    source: "/advanced-features/dedicated-ip",
    permanent: false,
    destination: "/dedicated-ip",
  },
  {
    source: "/advanced-features/metadata",
    permanent: false,
    destination: "/metadata",
  },
  {
    source: "/advanced-features/multiple-newsletters",
    permanent: false,
    destination: "/multiple-newsletters",
  },
  {
    source: "/advanced-features/paid-subscriptions/test-mode",
    permanent: false,
    destination: "/paid-subscriptions#faqs",
  },
  {
    source: "/stripe-test-mode",
    permanent: false,
    destination: "/paid-subscriptions#faqs",
  },
  {
    source: "/advanced-features/paid-subscriptions",
    permanent: false,
    destination: "/paid-subscriptions",
  },
  {
    source: "/advanced-features/rss-to-email",
    permanent: false,
    destination: "/rss-to-email",
  },
  {
    source: "/advanced-features/share-images",
    permanent: false,
    destination: "/share-images",
  },
  {
    source: "/advanced-features/surveys",
    permanent: false,
    destination: "/surveys",
  },
  {
    source: "/advanced-features/tags",
    permanent: false,
    destination: "/tags",
  },
  {
    source: "/advanced-features/teams",
    permanent: false,
    destination: "/teams",
  },
  {
    source: "/api-reference/authentication",
    permanent: false,
    destination: "/api-authentication",
  },
  {
    source: "/api-reference/changelog",
    permanent: false,
    destination: "/api-changelog",
  },
  {
    source: "/api-reference/events-and-webhooks",
    permanent: false,
    destination: "/events-and-webhooks-introduction",
  },
  {
    source: "/api-reference/introduction",
    permanent: false,
    destination: "/api-introduction",
  },
  {
    source: "/api-reference/authentication",
    permanent: false,
    destination: "/api-authentication",
  },
  {
    source: "/api-reference/automations",
    permanent: false,
    destination: "/api-external-feed-introduction",
  },
  {
    source: "/api-reference/bulk-actions",
    permanent: false,
    destination: "/api-bulk-actions-introduction",
  },
  {
    source: "/api-reference/changelog",
    permanent: false,
    destination: "/api-changelog",
  },
  {
    source: "/api-reference/comments",
    permanent: false,
    destination: "/api-comments-introduction",
  },
  {
    source: "/api-reference/emails",
    permanent: false,
    destination: "/api-emails-introduction",
  },
  {
    source: "/api-reference/images",
    permanent: false,
    destination: "/api-images-introduction",
  },
  {
    source: "/api-reference/introduction",
    permanent: false,
    destination: "/api-introduction",
  },
  {
    source: "/api-reference/newsletters",
    permanent: false,
    destination: "/api-newsletters-introduction",
  },
  {
    source: "/api-reference/pagination",
    permanent: false,
    destination: "/api-pagination",
  },
  {
    source: "/api-reference/subscribers",
    permanent: false,
    destination: "/api-subscribers-introduction",
  },
  {
    source: "/api-reference/tags",
    permanent: false,
    destination: "/api-tags-introduction",
  },
  {
    source: "/webhooks",
    permanent: false,
    destination: "/events-and-webhooks-introduction",
  },
  {
    source: "/api-reference/webhooks",
    permanent: false,
    destination: "/api-webhooks-introduction",
  },
  {
    source: "/behind-the-scenes/affiliate-program",
    permanent: false,
    destination: "/affiliate-program",
  },
  {
    source: "/behind-the-scenes/esoterica",
    permanent: false,
    destination: "https://buttondown.com/blog/my-favorite-newsletters",
  },
  {
    source: "/behind-the-scenes/funding",
    permanent: false,
    destination: "https://buttondown.com/open-source",
  },
  {
    source: "/kudos",
    permanent: true,
    destination: "https://buttondown.com/kudos",
  },
  {
    source: "/behind-the-scenes/kudos",
    permanent: false,
    destination: "https://buttondown.com/kudos",
  },
  {
    source: "/behind-the-scenes/subscriber-referrals",
    permanent: false,
    destination: "/subscriber-referrals",
  },
  {
    source: "/getting-started/billing",
    permanent: false,
    destination: "/billing",
  },
  {
    source: "/getting-started/building-your-subscriber-base",
    permanent: false,
    destination: "/building-your-subscriber-base",
  },
  {
    source: "/getting-started/getting-a-custom-domain",
    permanent: false,
    destination: "/getting-a-custom-domain",
  },
  {
    source: "/getting-started/hosting-on-a-custom-domain",
    permanent: false,
    destination: "/hosting-on-a-custom-domain",
  },
  {
    source: "/getting-started/importing-your-data",
    permanent: false,
    destination: "/importing-your-data",
  },
  {
    source: "/getting-started/quickstart",
    permanent: false,
    destination: "/quickstart",
  },
  {
    source: "/getting-started/registration-and-setup",
    permanent: false,
    destination: "/registration-and-setup",
  },
  {
    source: "/getting-started/scheduling-an-email",
    permanent: false,
    destination: "/scheduling-an-email",
  },
  {
    source: "/getting-started/sending-from-a-custom-domain",
    permanent: false,
    destination: "/sending-from-a-custom-domain",
  },
  {
    source: "/getting-started/sending-your-first-email",
    permanent: false,
    destination: "/sending-your-first-email",
  },
  {
    source: "/getting-started/using-markdown",
    permanent: false,
    destination: "/using-markdown",
  },
  {
    source: "/integrations/blogger",
    permanent: false,
    destination: "/blogger",
  },
  {
    source: "/integrations/carrd",
    permanent: false,
    destination: "/carrd",
  },
  {
    source: "/integrations/discord",
    permanent: false,
    destination: "/discord",
  },
  {
    source: "/integrations/duda",
    permanent: false,
    destination: "/duda",
  },
  {
    source: "/integrations/fathom",
    permanent: false,
    destination: "/fathom",
  },
  {
    source: "/integrations/framer",
    permanent: false,
    destination: "/framer",
  },
  {
    source: "/integrations/linktree",
    permanent: false,
    destination: "/linktree",
  },
  {
    source: "/integrations/plausible",
    permanent: false,
    destination: "/plausible",
  },
  {
    source: "/integrations/stripe",
    permanent: false,
    destination: "/stripe",
  },
  {
    source: "/integrations/wordpress",
    permanent: false,
    destination: "/wordpress",
  },
  {
    source: "/migration-guides/aweber",
    permanent: false,
    destination: "/aweber",
  },
  {
    source: "/migration-guides/benchmark",
    permanent: false,
    destination: "/benchmark",
  },
  {
    source: "/migration-guides/campaign-monitor",
    permanent: false,
    destination: "/campaign-monitor",
  },
  {
    source: "/migration-guides/constant-contact",
    permanent: false,
    destination: "/constant-contact",
  },
  {
    source: "/migration-guides/convertkit",
    permanent: false,
    destination: "/convertkit",
  },
  {
    source: "/migration-guides/emailoctopus",
    permanent: false,
    destination: "/emailoctopus",
  },
  {
    source: "/migration-guides/feedblitz",
    permanent: false,
    destination: "/feedblitz",
  },
  {
    source: "/migration-guides/mailchimp",
    permanent: false,
    destination: "/mailchimp",
  },
  {
    source: "/migration-guides/mailcoach",
    permanent: false,
    destination: "/mailcoach",
  },
  {
    source: "/migration-guides/mailerlite",
    permanent: false,
    destination: "/mailerlite",
  },
  {
    source: "/migration-guides/moosend",
    permanent: false,
    destination: "/moosend",
  },
  {
    source: "/migration-guides/revue",
    permanent: false,
    destination: "/revue",
  },
  {
    source: "/migration-guides/substack",
    permanent: false,
    destination: "/substack",
  },
  {
    source: "/migration-guides/tinyletter",
    permanent: false,
    destination: "/tinyletter",
  },
  {
    source: "/need-more-help",
    permanent: false,
    destination: "/introduction",
  },
  {
    source: "/odds-and-ends/automations-reference",
    permanent: false,
    destination: "/automations-introduction",
  },
  {
    source: "/odds-and-ends/data-exports",
    permanent: false,
    destination: "/data-exports",
  },
  {
    source: "/odds-and-ends/glossary",
    permanent: false,
    destination: "/introduction",
  },
  {
    source: "/odds-and-ends/law-enforcement-requests",
    permanent: false,
    destination: "/law-enforcement-requests",
  },
  {
    source: "/odds-and-ends/offboarding",
    permanent: false,
    destination: "/deleting-your-account",
  },
  {
    source: "/odds-and-ends/privacy-and-security",
    permanent: false,
    destination: "/privacy-and-security",
  },
  {
    source: "/odds-and-ends/screen-reader",
    permanent: false,
    destination: "/using-a-screen-reader",
  },
  {
    source: "/odds-and-ends/template-variables",
    permanent: false,
    destination: "/template-variables",
  },
  {
    source: "/sending-domains/sending-from-dreamhost",
    permanent: false,
    destination: "/sending-from-dreamhost",
  },
  {
    source: "/tutorials/customizing-list-views",
    permanent: false,
    destination: "/customizing-email-list-view",
  },
  {
    source: "/tutorials/drafting-emails-via-the-api",
    permanent: false,
    destination: "/drafting-emails-via-the-api",
  },
  {
    source: "/names",
    permanent: false,
    destination: "/subscriber-data",
  },
  {
    source: "/tutorials/names",
    permanent: false,
    destination: "/subscriber-data",
  },
  {
    source: "/tutorials/scheduling-emails-via-the-api",
    permanent: false,
    destination: "/scheduling-emails-via-the-api",
  },
  {
    source: "/tutorials/welcome-sequence",
    permanent: false,
    destination: "/welcome-sequence",
  },
  {
    source: "/rss/api-changelog.xml",
    destination: "/rss/api-changelog",
    permanent: true,
  },
];

export default REDIRECTS;
