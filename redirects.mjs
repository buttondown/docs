const REDIRECTS = [
  {
    source: "/",
    destination: "/introduction",
    permanent: false,
  },
  {
    source: "/does-buttondown-automatically-index-my-web-archives",
    destination: "/email-archives#indexing-your-web-archives",
    permanent: true,
  },

  {
    source: "/how-do-subscribers-customize-their-name-photo",
    destination: "/comments#faqs",
    permanent: true,
  },
  {
    source: "/buttondown-editor-mode",
    destination: "/editor-modes#faqs",
    permanent: true,
  },
  {
    source: "/creating-webhooks-dashboard",
    destination: "/events-and-webhooks-introduction#creating-webhooks",
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
    destination: "/subscriber-data",
  },
  {
    source: "/metadata",
    permanent: false,
    destination: "/subscriber-data",
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
    destination: "/hosting-domain",
  },
  {
    source: "/getting-started/hosting-on-a-custom-domain",
    permanent: false,
    destination: "/hosting-domain",
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
    destination: "/sending-emails#scheduling-an-email",
  },
  {
    source: "/getting-started/sending-from-a-custom-domain",
    permanent: false,
    destination: "/sending-from-a-custom-domain",
  },
  {
    source: "/getting-started/sending-your-first-email",
    permanent: false,
    destination: "/sending-emails",
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
    destination: "/importing-your-data",
  },
  {
    source: "/moosend",
    permanent: false,
    destination: "/importing-your-data",
  },
  {
    source: "/migration-guides/revue",
    permanent: false,
    destination: "/importing-your-data",
  },
  {
    source: "/revue",
    destination: "/importing-your-data",
    permanent: false,
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
    destination: "/templating",
  },
  {
    source: "/template-tags",
    permanent: false,
    destination: "/templating",
  },
  {
    source: "/template-variables",
    permanent: false,
    destination: "/templating",
  },
  {
    source: "/sending-domains/sending-from-dreamhost",
    permanent: false,
    destination: "/sending-from-dreamhost",
  },
  {
    source: "/tutorials/customizing-list-views",
    permanent: false,
    destination: "/email-dashboard",
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
    destination: "/premium-teaser#tip-jars",
    permanent: true,
  },
  {
    source: "/template-variables-email-absolute-url",
    destination: "/templating#emailabsolute_url",
    permanent: true,
  },
  {
    source: "/template-variables-email-is-premium",
    destination: "/templating#emailis_premium",
    permanent: true,
  },
  {
    source: "/template-variables-email-publish-date",
    destination: "/templating#emailpublish_date",
    permanent: true,
  },
  {
    source: "/template-variables-email-secondary-id",
    destination: "/templating#emailsecondary_id",
    permanent: true,
  },
  {
    source: "/template-variables-email-subject",
    destination: "/templating#emailsubject",
    permanent: true,
  },
  {
    source: "/template-variables-manage-subscription-url",
    destination: "/templating#manage_subscription_url",
    permanent: true,
  },
  {
    source: "/template-variables-medium",
    destination: "/templating#medium",
    permanent: true,
  },
  {
    source: "/template-variables-premium-subscribe-url",
    destination: "/templating#premium_subscribe_url",
    permanent: true,
  },
  {
    source: "/template-variables-random-number",
    destination: "/templating#random_number",
    permanent: true,
  },
  {
    source: "/template-variables-subscribe-form",
    destination: "/templating#subscribe_form",
    permanent: true,
  },
  {
    source: "/template-variables-subscribe-url",
    destination: "/templating#subscribe_url",
    permanent: true,
  },
  {
    source: "/template-variables-subscriber-can-be-upsold",
    destination: "/templating#subscribercan_be_upsold",
    permanent: true,
  },
  {
    source: "/template-variables-subscriber-can-view-premium-content",
    destination: "/templating#subscribercan_view_premium_content",
    permanent: true,
  },
  {
    source: "/template-variables-subscriber-email",
    destination: "/templating#subscriberemail",
    permanent: true,
  },
  {
    source: "/template-variables-subscriber-id",
    destination: "/templating#subscriberid",
    permanent: true,
  },
  {
    source: "/template-variables-subscriber-metadata",
    destination: "/templating#subscribermetadata",
    permanent: true,
  },
  {
    source: "/template-variables-subscriber-subscriber-type",
    destination: "/templating#subscribersubscriber_type",
    permanent: true,
  },
  {
    source: "/template-variables-subscriber-tags",
    destination: "/templating#subscribertags",
    permanent: true,
  },
  {
    source: "/template-variables-unsubscribe-url",
    destination: "/templating#unsubscribe_url",
    permanent: true,
  },
  {
    source: "/template-variables-upgrade-url",
    destination: "/templating#upgrade_url",
    permanent: true,
  },
  {
    source: "/using-templating",
    destination: "/templating",
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
    source: "/acceptable-use-policy",
    destination: "https://buttondown.com/legal/acceptable-use-policy",
    permanent: false,
  },
  {
    source: "/adult-content-policy",
    destination: "https://buttondown.com/legal/adult-content-policy",
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
    source: "/data-processing-agreement",
    destination: "https://buttondown.com/legal/data-processing-agreement",
    permanent: false,
  },
  {
    source: "/gdpr-eu-compliance",
    destination: "https://buttondown.com/legal/gdpr-eu-compliance",
    permanent: false,
  },
  {
    source: "/law-enforcement-requests",
    destination: "https://buttondown.com/legal/law-enforcement-requests",
    permanent: false,
  },
  {
    source: "/odds-and-ends/law-enforcement-requests",
    destination: "https://buttondown.com/legal/law-enforcement-requests",
    permanent: false,
  },
  {
    source: "/rate-limiting",
    destination: "/hosting-domain",
    permanent: true,
  },
  {
    source: "/subprocessors",
    destination: "https://buttondown.com/legal/subprocessors",
    permanent: false,
  },
  {
    source: "/support-policy",
    destination: "https://buttondown.com/legal/support-policy",
    permanent: false,
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
  {
    source: "/price-changes",
    destination: "/paid-subscriptions#faqs",
    permanent: false,
  },
  {
    source: "/rate-limiting",
    destination: "/hosting-domain",
    permanent: false,
  },
  {
    source: "/warming-up",
    destination: "/hosting-domain",
    permanent: true,
  },
  {
    source: "/late-payments",
    destination: "/billing",
    permanent: false,
  },
  {
    source: "/domains",
    destination: "https://disposables.app",
    permanent: false,
  },
  {
    source: "/can-i-set-a-custom-unsubscribe-link",
    destination: "/subscriber-cleanup#custom-unsubscribe-redirect",
    permanent: true,
  },
  {
    source: "/dealing-with-spam-subscribers",
    destination: "/subscriber-cleanup#dealing-with-spammy-subscribers",
    permanent: true,
  },
  {
    source: "/customizing-email-list-view",
    destination: "/email-dashboard",
    permanent: true,
  },
  {
    source: "/fancy-mode-dynamic",
    destination: "/fancy-mode#dynamic-content",
    permanent: true,
  },
  {
    source: "/fancy-mode-images",
    destination: "/fancy-mode#images",
    permanent: true,
  },
  {
    source: "/fancy-mode-text",
    destination: "/fancy-mode#text-options",
    permanent: true,
  },
  {
    source: "/can-i-set-custom-reply-to",
    destination: "/replies#custom-reply-to-addresses",
    permanent: true,
  },
  {
    source: "/how-do-i-avoid-the-promotions-tab",
    destination: "/sending-emails#avoiding-the-promotions-tab",
    permanent: true,
  },
  {
    source: "/resend-email",
    destination: "/sending-emails#re-sending-blocked-or-errored-emails",
    permanent: true,
  },
  {
    source: "/scheduling-an-email",
    destination: "/sending-emails#scheduling-an-email",
    permanent: true,
  },
  {
    source: "/sending-your-first-email",
    destination: "/sending-emails",
    permanent: true,
  },
  {
    source: "/converting-between-modes",
    destination: "/editor-modes",
    permanent: true,
  },
  {
    source: "/can-i-point-my-old-buttondown-newsletter-to-a-new-url",
    destination: "/hosting-domain",
    permanent: true,
  },
  {
    source: "/canonical-url",
    destination: "/hosting-domain",
    permanent: true,
  },
  {
    source: "/getting-a-custom-domain",
    destination: "/hosting-domain",
    permanent: true,
  },
  {
    source: "/hosting-on-a-custom-domain",
    destination: "/hosting-domain",
    permanent: true,
  },
  {
    source: "/pricing-models",
    destination: "/paid-subscriptions#pricing-models",
    permanent: true,
  },
  {
    source: "/stripe-upsell",
    destination: "/paid-subscriptions#configuring-paid-plans",
    permanent: true,
  },
  {
    source: "/can-i-pay-using-something-other-than-stripe",
    destination:
      "/paid-subscriptions#using-payment-processors-other-than-stripe",
    permanent: true,
  },
  {
    source: "/how-do-i-handle-taxes",
    destination: "/paid-subscriptions#taxes",
    permanent: true,
  },
];

export default REDIRECTS;
