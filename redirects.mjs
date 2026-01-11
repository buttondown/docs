const REDIRECTS = [
  {
    source: "/",
    destination: "/introduction",
    permanent: false,
  },
  {
    source: "/odd-and-ends/exporting-your-data",
    permanent: false,
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
    destination: "/importing-your-data",
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
    destination: "/importing-your-data",
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
    destination: "/how-to-write-accessible-emails",
  },
  {
    source: "/using-a-screen-reader",
    destination: "/how-to-write-accessible-emails",
    permanent: false,
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
    permanent: false,
  },
  {
    source: "/tinyletter",
    destination: "/importing-your-data",
    permanent: false,
  },
  {
    source: "/tip-jar",
    destination: "/pricing-models#pay-what-you-want",
    permanent: true,
  },
  {
    source: "/template-variables-email-absolute-url",
    destination: "/template-tags#emailabsolute_url",
    permanent: true,
  },
  {
    source: "/template-variables-email-is-premium",
    destination: "/template-tags#emailis_premium",
    permanent: true,
  },
  {
    source: "/template-variables-email-publish-date",
    destination: "/template-tags#emailpublish_date",
    permanent: true,
  },
  {
    source: "/template-variables-email-secondary-id",
    destination: "/template-tags#emailsecondary_id",
    permanent: true,
  },
  {
    source: "/template-variables-email-subject",
    destination: "/template-tags#emailsubject",
    permanent: true,
  },
  {
    source: "/template-variables-manage-subscription-url",
    destination: "/template-tags#manage_subscription_url",
    permanent: true,
  },
  {
    source: "/template-variables-medium",
    destination: "/template-tags#medium",
    permanent: true,
  },
  {
    source: "/template-variables-premium-subscribe-url",
    destination: "/template-tags#premium_subscribe_url",
    permanent: true,
  },
  {
    source: "/template-variables-random-number",
    destination: "/template-tags#random_number",
    permanent: true,
  },
  {
    source: "/template-variables-subscribe-form",
    destination: "/template-tags#subscribe_form",
    permanent: true,
  },
  {
    source: "/template-variables-subscribe-url",
    destination: "/template-tags#subscribe_url",
    permanent: true,
  },
  {
    source: "/template-variables-subscriber-can-be-upsold",
    destination: "/template-tags#subscribercan_be_upsold",
    permanent: true,
  },
  {
    source: "/template-variables-subscriber-can-view-premium-content",
    destination: "/template-tags#subscribercan_view_premium_content",
    permanent: true,
  },
  {
    source: "/template-variables-subscriber-email",
    destination: "/template-tags#subscriberemail",
    permanent: true,
  },
  {
    source: "/template-variables-subscriber-id",
    destination: "/template-tags#subscriberid",
    permanent: true,
  },
  {
    source: "/template-variables-subscriber-metadata",
    destination: "/template-tags#subscribermetadata",
    permanent: true,
  },
  {
    source: "/template-variables-subscriber-subscriber-type",
    destination: "/template-tags#subscribersubscriber_type",
    permanent: true,
  },
  {
    source: "/template-variables-subscriber-tags",
    destination: "/template-tags#subscribertags",
    permanent: true,
  },
  {
    source: "/template-variables-unsubscribe-url",
    destination: "/template-tags#unsubscribe_url",
    permanent: true,
  },
  {
    source: "/template-variables-upgrade-url",
    destination: "/template-tags#upgrade_url",
    permanent: true,
  },
  {
    source: "/using-templating",
    destination: "/template-tags",
    permanent: true,
  },
  {
    source: "/slash-buy",
    destination: "/paid-subscriptions",
    permanent: false,
  },
  {
    source: "/self-hosting",
    destination: "https://buttondown.com/open-source",
    permanent: false,
  },
  {
    source: "/xss",
    destination: "/external-scripts",
    permanent: false,
  },
  {
    source: "/aweber",
    destination: "/importing-your-data",
    permanent: true,
  },
  {
    source: "/bookmarklet",
    destination: "/introduction",
    permanent: true,
  },
  {
    source: "/what-s-a-good-tutorial-for-learning-css",
    destination: "/customizing-email-design",
    permanent: true,
  },
  {
    source: "/why-arent-i-seeing-my-new-share-image",
    destination: "/share-images",
    permanent: true,
  },
];

export default REDIRECTS;
