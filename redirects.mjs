const REDIRECTS = [
  {
    source: "/",
    destination: "/welcome-to-buttondown",
    permanent: false,
  },
  {
    source: "/api-emails-events",
    destination: "/api-events-list",
    permanent: true,
  },
  {
    source: "/introduction",
    destination: "/welcome-to-buttondown",
    permanent: true,
  },
  {
    source: "/quickstart",
    destination: "/welcome-to-buttondown",
    permanent: true,
  },
  {
    source: "/registration-and-setup",
    destination: "/welcome-to-buttondown",
    permanent: true,
  },
  {
    source: "/customizing-email-design",
    destination: "/designing-your-email",
    permanent: true,
  },
  {
    source: "/manually-adding-subscribers",
    destination: "/building-your-subscriber-base#faqs",
    permanent: true,
  },
  {
    source: "/embed-form-cors-csp",
    destination: "/building-your-subscriber-base#faqs",
    permanent: true,
  },
  {
    source: "/one-click-unsubscribe",
    destination: "/building-your-subscriber-base#faqs",
    permanent: true,
  },
  {
    source: "/why-some-email-clients-look-different",
    destination: "/designing-your-email#faqs",
    permanent: true,
  },
  {
    source: "/how-to-write-accessible-emails",
    destination: "/designing-your-email#faqs",
    permanent: true,
  },
  {
    source: "/how-do-i-set-sender-information",
    destination: "/designing-your-email#faqs",
    permanent: true,
  },
  {
    source: "/how-do-i-format-dates",
    destination: "/designing-your-email#faqs",
    permanent: true,
  },
  {
    source: "/localization",
    destination: "/designing-your-email#faqs",
    permanent: true,
  },
  {
    source: "/customizing-transactional-emails",
    destination: "/designing-your-email#faqs",
    permanent: true,
  },
  {
    source: "/modern-template-hide-top",
    destination: "/designing-your-email#faqs",
    permanent: true,
  },
  {
    source: "/can-i-center-my-email",
    destination: "/designing-your-email#faqs",
    permanent: true,
  },
  {
    source: "/can-i-link-two-related-emails",
    destination: "/designing-your-email#faqs",
    permanent: true,
  },
  {
    source: "/can-i-use-a-custom-font",
    destination: "/designing-your-email#faqs",
    permanent: true,
  },
  {
    source: "/can-i-customize-my-gmail-icon",
    destination: "/designing-your-email#faqs",
    permanent: true,
  },
  {
    source: "/import-limitations",
    destination: "/importing-your-data#faqs",
    permanent: true,
  },
  {
    source: "/do-imported-subscribers-have-to-re-confirm-their-subscription",
    destination: "/importing-your-data#faqs",
    permanent: true,
  },
  {
    source: "/convertkit",
    destination: "/kit",
    permanent: true,
  },
  {
    source: "/sending-your-first-email-advanced",
    destination: "/publishing-your-first-email",
    permanent: true,
  },
  {
    source: "/beehiiv",
    destination: "/importing-your-data",
    permanent: true,
  },
  {
    source: "/benchmark",
    destination: "/importing-your-data",
    permanent: true,
  },
  {
    source: "/campaign-monitor",
    destination: "/importing-your-data",
    permanent: true,
  },
  {
    source: "/constant-contact",
    destination: "/importing-your-data",
    permanent: true,
  },
  {
    source: "/emailoctopus",
    destination: "/importing-your-data",
    permanent: true,
  },
  {
    source: "/feedblitz",
    destination: "/importing-your-data",
    permanent: true,
  },
  {
    source: "/mailcoach",
    destination: "/importing-your-data",
    permanent: true,
  },
  {
    source: "/mailerlite",
    destination: "/importing-your-data",
    permanent: true,
  },
  {
    source: "/podia",
    destination: "/importing-your-data",
    permanent: true,
  },
  {
    source: "/can-i-exclude-an-email-from-archive",
    destination:
      "/email-archives#archived-visibility-setting-on-individual-emails",
    permanent: true,
  },
  {
    source: "/using-attachments",
    destination: "/fancy-mode#attachments",
    permanent: true,
  },
  {
    source: "/uploading-images",
    destination: "/fancy-mode#images",
    permanent: true,
  },
  {
    source: "/draft-send",
    destination: "/sending-emails#previewing-and-sending-drafts",
    permanent: true,
  },
  {
    source: "/how-do-i-include-audio-in-my-newsletter",
    destination: "/fancy-mode#including-audio",
    permanent: true,
  },
  {
    source: "/support-amp-for-email",
    destination: "/welcome-to-buttondown",
    permanent: true,
  },
  {
    source: "/sending-from-dreamhost",
    destination: "/hosting-domain",
    permanent: true,
  },
  {
    source: "/billing",
    destination: "https://buttondown.com/pricing",
    permanent: true,
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
    permanent: true,
  },
  {
    source: "/odd-and-ends/exporting-your-data",
    permanent: true,
    destination: "/data-exports-email",
  },
  {
    source: "/advanced-features/automations",
    permanent: true,
    destination: "/automations-introduction",
  },
  {
    source: "/advanced-features/comments",
    permanent: true,
    destination: "/comments",
  },
  {
    source: "/advanced-features/css",
    permanent: true,
    destination: "/designing-your-email",
  },
  {
    source: "/advanced-features/customizing-your-web-presence",
    permanent: true,
    destination: "/customizing-web-design",
  },
  {
    source: "/advanced-features/dedicated-ip",
    permanent: true,
    destination: "/dedicated-ip",
  },
  {
    source: "/advanced-features/metadata",
    permanent: true,
    destination: "/subscriber-metadata",
  },
  {
    source: "/metadata",
    permanent: true,
    destination: "/subscriber-metadata",
  },
  {
    source: "/subscriber-data",
    permanent: true,
    destination: "/subscriber-metadata",
  },
  {
    source: "/advanced-features/multiple-newsletters",
    permanent: true,
    destination: "/account#adding-another-newsletter-to-your-account",
  },
  {
    source: "/advanced-features/paid-subscriptions/test-mode",
    permanent: true,
    destination: "/paid-subscriptions#faqs",
  },
  {
    source: "/stripe-test-mode",
    permanent: true,
    destination: "/paid-subscriptions#faqs",
  },
  {
    source: "/advanced-features/paid-subscriptions",
    permanent: true,
    destination: "/paid-subscriptions",
  },
  {
    source: "/advanced-features/rss-to-email",
    permanent: true,
    destination: "/rss-to-email",
  },
  {
    source: "/advanced-features/share-images",
    permanent: true,
    destination: "/share-images",
  },
  {
    source: "/advanced-features/surveys",
    permanent: true,
    destination: "/surveys",
  },
  {
    source: "/advanced-features/tags",
    permanent: true,
    destination: "/tags",
  },
  {
    source: "/advanced-features/teams",
    permanent: true,
    destination: "/teams",
  },
  {
    source: "/api",
    permanent: true,
    destination: "/api-introduction",
  },
  {
    source: "/api-reference/authentication",
    permanent: true,
    destination: "/api-authentication",
  },
  {
    source: "/api-reference/changelog",
    permanent: true,
    destination: "/api-changelog",
  },
  {
    source: "/api-reference/events-and-webhooks",
    permanent: true,
    destination: "/events-and-webhooks-introduction",
  },
  {
    source: "/api-reference/introduction",
    permanent: true,
    destination: "/api-introduction",
  },
  {
    source: "/api-reference/automations",
    permanent: true,
    destination: "/api-external-feed-introduction",
  },
  {
    source: "/api-reference/bulk-actions",
    permanent: true,
    destination: "/api-bulk-actions-introduction",
  },
  {
    source: "/api-reference/comments",
    permanent: true,
    destination: "/api-comments-introduction",
  },
  {
    source: "/api-reference/emails",
    permanent: true,
    destination: "/api-emails-introduction",
  },
  {
    source: "/api-reference/images",
    permanent: true,
    destination: "/api-images-introduction",
  },
  {
    source: "/api-reference/newsletters",
    permanent: true,
    destination: "/api-newsletters-introduction",
  },
  {
    source: "/api-reference/pagination",
    permanent: true,
    destination: "/api-pagination",
  },
  {
    source: "/api-reference/subscribers",
    permanent: true,
    destination: "/api-subscribers-introduction",
  },
  {
    source: "/api-reference/tags",
    permanent: true,
    destination: "/api-tags-introduction",
  },
  {
    source: "/webhooks",
    permanent: true,
    destination: "/events-and-webhooks-introduction",
  },
  {
    source: "/api-reference/webhooks",
    permanent: true,
    destination: "/api-webhooks-introduction",
  },
  {
    source: "/api-webhooks-event-types",
    permanent: true,
    destination: "/event-types",
  },
  {
    source: "/behind-the-scenes/affiliate-program",
    permanent: true,
    destination: "/affiliate-program",
  },
  {
    source: "/behind-the-scenes/esoterica",
    permanent: true,
    destination: "https://buttondown.com/blog/my-favorite-newsletters",
  },
  {
    source: "/behind-the-scenes/funding",
    permanent: true,
    destination: "https://buttondown.com/open-source",
  },
  {
    source: "/kudos",
    permanent: true,
    destination: "https://buttondown.com/kudos",
  },
  {
    source: "/behind-the-scenes/kudos",
    permanent: true,
    destination: "https://buttondown.com/kudos",
  },
  {
    source: "/behind-the-scenes/subscriber-referrals",
    permanent: true,
    destination: "/subscriber-referrals",
  },
  {
    source: "/getting-started/billing",
    permanent: true,
    destination: "https://buttondown.com/pricing",
  },
  {
    source: "/getting-started/building-your-subscriber-base",
    permanent: true,
    destination: "/building-your-subscriber-base",
  },
  {
    source: "/getting-started/getting-a-custom-domain",
    permanent: true,
    destination: "/hosting-domain",
  },
  {
    source: "/getting-started/hosting-on-a-custom-domain",
    permanent: true,
    destination: "/hosting-domain",
  },
  {
    source: "/getting-started/importing-your-data",
    permanent: true,
    destination: "/importing-your-data",
  },
  {
    source: "/getting-started/quickstart",
    permanent: true,
    destination: "/welcome-to-buttondown",
  },
  {
    source: "/getting-started/registration-and-setup",
    permanent: true,
    destination: "/welcome-to-buttondown",
  },
  {
    source: "/getting-started/scheduling-an-email",
    permanent: true,
    destination: "/sending-emails#scheduling-an-email",
  },
  {
    source: "/getting-started/sending-from-a-custom-domain",
    permanent: true,
    destination: "/sending-from-a-custom-domain",
  },
  {
    source: "/getting-started/sending-your-first-email",
    permanent: true,
    destination: "/sending-emails",
  },
  {
    source: "/getting-started/using-markdown",
    permanent: true,
    destination: "/using-markdown",
  },
  {
    source: "/integrations/blogger",
    permanent: true,
    destination: "/blogger",
  },
  {
    source: "/integrations/carrd",
    permanent: true,
    destination: "/carrd",
  },
  {
    source: "/integrations/discord",
    permanent: true,
    destination: "/discord",
  },
  {
    source: "/integrations/fathom",
    permanent: true,
    destination: "/fathom",
  },
  {
    source: "/integrations/framer",
    permanent: true,
    destination: "/framer",
  },
  {
    source: "/integrations/plausible",
    permanent: true,
    destination: "/plausible",
  },
  {
    source: "/integrations/stripe",
    permanent: true,
    destination: "/stripe",
  },
  {
    source: "/integrations/wordpress",
    permanent: true,
    destination: "/wordpress",
  },
  {
    source: "/migration-guides/aweber",
    permanent: true,
    destination: "/importing-your-data",
  },
  {
    source: "/migration-guides/benchmark",
    permanent: true,
    destination: "/importing-your-data",
  },
  {
    source: "/migration-guides/campaign-monitor",
    permanent: true,
    destination: "/importing-your-data",
  },
  {
    source: "/migration-guides/constant-contact",
    permanent: true,
    destination: "/importing-your-data",
  },
  {
    source: "/migration-guides/convertkit",
    permanent: true,
    destination: "/kit",
  },
  {
    source: "/migration-guides/emailoctopus",
    permanent: true,
    destination: "/importing-your-data",
  },
  {
    source: "/migration-guides/feedblitz",
    permanent: true,
    destination: "/importing-your-data",
  },
  {
    source: "/migration-guides/mailchimp",
    permanent: true,
    destination: "/mailchimp",
  },
  {
    source: "/migration-guides/mailcoach",
    permanent: true,
    destination: "/importing-your-data",
  },
  {
    source: "/migration-guides/mailerlite",
    permanent: true,
    destination: "/importing-your-data",
  },
  {
    source: "/migration-guides/moosend",
    permanent: true,
    destination: "/importing-your-data",
  },
  {
    source: "/moosend",
    permanent: true,
    destination: "/importing-your-data",
  },
  {
    source: "/migration-guides/revue",
    permanent: true,
    destination: "/importing-your-data",
  },
  {
    source: "/revue",
    destination: "/importing-your-data",
    permanent: true,
  },
  {
    source: "/migration-guides/substack",
    permanent: true,
    destination: "/substack",
  },
  {
    source: "/migration-guides/tinyletter",
    permanent: true,
    destination: "/importing-your-data",
  },
  {
    source: "/need-more-help",
    permanent: true,
    destination: "/welcome-to-buttondown",
  },
  {
    source: "/odds-and-ends/automations-reference",
    permanent: true,
    destination: "/automations-introduction",
  },
  {
    source: "/odds-and-ends/data-exports",
    permanent: true,
    destination: "/data-exports-email",
  },
  {
    source: "/odds-and-ends/glossary",
    permanent: true,
    destination: "/welcome-to-buttondown",
  },
  {
    source: "/odds-and-ends/offboarding",
    permanent: true,
    destination: "/account#deleting-your-buttondown-account",
  },
  {
    source: "/odds-and-ends/privacy-and-security",
    permanent: true,
    destination: "/account",
  },
  {
    source: "/odds-and-ends/screen-reader",
    permanent: true,
    destination: "/designing-your-email#faqs",
  },
  {
    source: "/using-a-screen-reader",
    destination: "/designing-your-email#faqs",
    permanent: true,
  },
  {
    source: "/odds-and-ends/template-variables",
    permanent: true,
    destination: "/templating",
  },
  {
    source: "/template-tags",
    permanent: true,
    destination: "/templating",
  },
  {
    source: "/template-variables",
    permanent: true,
    destination: "/templating",
  },
  {
    source: "/sending-domains/sending-from-dreamhost",
    permanent: true,
    destination: "/hosting-domain",
  },
  {
    source: "/tutorials/customizing-list-views",
    permanent: true,
    destination: "/email-dashboard",
  },
  {
    source: "/tutorials/drafting-emails-via-the-api",
    permanent: true,
    destination: "/drafting-emails-via-the-api",
  },
  {
    source: "/names",
    permanent: true,
    destination: "/subscriber-metadata",
  },
  {
    source: "/tutorials/names",
    permanent: true,
    destination: "/subscriber-metadata",
  },
  {
    source: "/tutorials/scheduling-emails-via-the-api",
    permanent: true,
    destination: "/scheduling-emails-via-the-api",
  },
  {
    source: "/tutorials/welcome-sequence",
    permanent: true,
    destination: "/welcome-sequence",
  },
  {
    source: "/rss/api-changelog.xml",
    destination: "/rss/api-changelog",
    permanent: true,
  },
  {
    source: "/tinyletter",
    destination: "/importing-your-data",
    permanent: true,
  },
  {
    source: "/tip-jar",
    destination: "/paid-subscriptions",
    permanent: true,
  },
  {
    source: "/premium-content",
    destination: "/premium-teaser",
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
    permanent: true,
  },
  {
    source: "/self-hosting",
    destination: "https://buttondown.com/open-source",
    permanent: true,
  },
  {
    source: "/xss",
    destination: "/external-scripts",
    permanent: true,
  },
  {
    source: "/acceptable-use-policy",
    destination: "https://buttondown.com/legal/acceptable-use-policy",
    permanent: true,
  },
  {
    source: "/adult-content-policy",
    destination: "https://buttondown.com/legal/adult-content-policy",
    permanent: true,
  },
  {
    source: "/aweber",
    destination: "/importing-your-data",
    permanent: true,
  },
  {
    source: "/bookmarklet",
    destination: "/welcome-to-buttondown",
    permanent: true,
  },
  {
    source: "/data-processing-agreement",
    destination: "https://buttondown.com/legal/data-processing-agreement",
    permanent: true,
  },
  {
    source: "/gdpr-eu-compliance",
    destination: "https://buttondown.com/legal/gdpr-eu-compliance",
    permanent: true,
  },
  {
    source: "/law-enforcement-requests",
    destination: "https://buttondown.com/legal/law-enforcement-requests",
    permanent: true,
  },
  {
    source: "/odds-and-ends/law-enforcement-requests",
    destination: "https://buttondown.com/legal/law-enforcement-requests",
    permanent: true,
  },
  {
    source: "/rate-limiting",
    destination: "/hosting-domain",
    permanent: true,
  },
  {
    source: "/subprocessors",
    destination: "https://buttondown.com/legal/subprocessors",
    permanent: true,
  },
  {
    source: "/support-policy",
    destination: "https://buttondown.com/legal/support-policy",
    permanent: true,
  },
  {
    source: "/what-s-a-good-tutorial-for-learning-css",
    destination: "/designing-your-email",
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
    permanent: true,
  },
  {
    source: "/warming-up",
    destination: "/hosting-domain",
    permanent: true,
  },
  {
    source: "/late-payments",
    destination: "https://buttondown.com/pricing",
    permanent: true,
  },
  {
    source: "/domains",
    destination: "https://disposables.app",
    permanent: true,
  },
  {
    source: "/can-i-set-a-custom-unsubscribe-link",
    destination: "/subscriber-cleanup",
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
  {
    source: "/multiple-newsletters",
    destination: "/account#adding-another-newsletter-to-your-account",
    permanent: true,
  },
  {
    source: "/change-password",
    destination: "/account#changing-your-password",
    permanent: true,
  },
  {
    source: "/change-username",
    destination: "/account#changing-your-username",
    permanent: true,
  },
  {
    source: "/change-login-method",
    destination: "/account#changing-your-login-method",
    permanent: true,
  },
  {
    source: "/paused-billing",
    destination: "/account",
    permanent: true,
  },
  {
    source: "/deleting-your-account",
    destination: "/account#deleting-your-buttondown-account",
    permanent: true,
  },
  {
    source: "/dormancy",
    destination: "/account#snoozing-your-newsletter",
    permanent: true,
  },
  {
    source: "/data-exports",
    destination: "/data-exports-email",
    permanent: true,
  },
  {
    source: "/rss-audience",
    destination: "/rss-to-email",
    permanent: true,
  },
  {
    source: "/rss-cadence",
    destination: "/rss-to-email",
    permanent: true,
  },
  {
    source: "/does-buttondown-offer-a-b-testing",
    destination: "/templating#random_number",
    permanent: true,
  },
  {
    source: "/podcasts",
    destination: "/welcome-to-buttondown",
    permanent: true,
  },

  {
    source: "/glossary-csv",
    destination: "/glossary-managing-your-list#csv",
    permanent: true,
  },
  {
    source: "/glossary-cta",
    destination: "/glossary-managing-your-list#cta",
    permanent: true,
  },
  {
    source: "/glossary-paywall",
    destination: "/glossary-managing-your-list#paywall",
    permanent: true,
  },
  {
    source: "/glossary-posse",
    destination: "/glossary-managing-your-list#posse",
    permanent: true,
  },
  {
    source: "/glossary-precedence-bulk",
    destination: "/glossary-managing-your-list#precedence-bulk",
    permanent: true,
  },
  {
    source: "/glossary-rate-sheet",
    destination: "/glossary-managing-your-list#rate-sheet",
    permanent: true,
  },
  {
    source: "/glossary-rss",
    destination: "/glossary-managing-your-list#rss",
    permanent: true,
  },
  {
    source: "/glossary-sending-domain",
    destination: "/glossary-managing-your-list#sending-domain",
    permanent: true,
  },
  {
    source: "/glossary-transactional-email",
    destination: "/glossary-managing-your-list#transactional-email",
    permanent: true,
  },

  {
    source: "/glossary-alt-text",
    destination: "/glossary-writing-emails#alt-text",
    permanent: true,
  },
  {
    source: "/glossary-drip-sequence",
    destination: "/glossary-writing-emails#drip-sequence",
    permanent: true,
  },
  {
    source: "/glossary-gravatar",
    destination: "/glossary-writing-emails#gravatar",
    permanent: true,
  },
  {
    source: "/glossary-latex",
    destination: "/glossary-writing-emails#latex",
    permanent: true,
  },
  {
    source: "/glossary-slug",
    destination: "/glossary-writing-emails#slug",
    permanent: true,
  },
  {
    source: "/glossary-ugc",
    destination: "/glossary-writing-emails#ugc",
    permanent: true,
  },
  {
    source: "/glossary-whitelabeling",
    destination: "/glossary-writing-emails#whitelabeling",
    permanent: true,
  },
  {
    source: "/glossary-wysiwyg",
    destination: "/glossary-writing-emails#wysiwyg",
    permanent: true,
  },

  {
    source: "/glossary-amp",
    destination: "/glossary-analytics#amp",
    permanent: true,
  },
  {
    source: "/glossary-cac",
    destination: "/glossary-analytics#cac",
    permanent: true,
  },
  {
    source: "/glossary-cpm",
    destination: "/glossary-analytics#cpm",
    permanent: true,
  },
  {
    source: "/glossary-omnichannel",
    destination: "/glossary-analytics#omnichannel",
    permanent: true,
  },

  {
    source: "/glossary-bimi",
    destination: "/glossary-email-infrastructure#bimi",
    permanent: true,
  },
  {
    source: "/glossary-dkim",
    destination: "/glossary-email-infrastructure#dkim",
    permanent: true,
  },
  {
    source: "/glossary-dmarc",
    destination: "/glossary-email-infrastructure#dmarc",
    permanent: true,
  },
  {
    source: "/glossary-dns",
    destination: "/glossary-email-infrastructure#dns",
    permanent: true,
  },
  {
    source: "/glossary-esp",
    destination: "/glossary-email-infrastructure#esp",
    permanent: true,
  },
  {
    source: "/glossary-hosting-domain",
    destination: "/glossary-email-infrastructure#hosting-domain",
    permanent: true,
  },
  {
    source: "/glossary-permanent-failure",
    destination: "/glossary-email-infrastructure#permanent-failure",
    permanent: true,
  },
  {
    source: "/glossary-reverse-dns",
    destination: "/glossary-email-infrastructure#reverse-dns",
    permanent: true,
  },
  {
    source: "/glossary-spamassassin",
    destination: "/glossary-email-infrastructure#spamassassin",
    permanent: true,
  },
  {
    source: "/glossary-spf",
    destination: "/glossary-email-infrastructure#spf",
    permanent: true,
  },
  {
    source: "/glossary-temporary-failure",
    destination: "/glossary-email-infrastructure#temporary-failure",
    permanent: true,
  },

  {
    source: "/glossary-api",
    destination: "/glossary-developers#api",
    permanent: true,
  },
  {
    source: "/glossary-headless-mode",
    destination: "/glossary-developers#headless-mode",
    permanent: true,
  },
  {
    source: "/glossary-jamstack",
    destination: "/glossary-developers#jamstack",
    permanent: true,
  },
  {
    source: "/glossary-json-ld",
    destination: "/glossary-developers#json-ld",
    permanent: true,
  },
  {
    source: "/glossary-oembed",
    destination: "/glossary-developers#oembed",
    permanent: true,
  },
  {
    source: "/glossary-openapi",
    destination: "/glossary-developers#openapi",
    permanent: true,
  },
  {
    source: "/glossary-preheader",
    destination: "/glossary-developers#preheader",
    permanent: true,
  },
  {
    source: "/glossary-rest",
    destination: "/glossary-developers#rest",
    permanent: true,
  },
  {
    source: "/glossary-smtp",
    destination: "/glossary-developers#smtp",
    permanent: true,
  },
  {
    source: "/glossary-webhook",
    destination: "/glossary-developers#webhooks",
    permanent: true,
  },
  {
    source: "/glossary-webmentions",
    destination: "/glossary-developers#webmentions",
    permanent: true,
  },

  {
    source: "/glossary-can-spam",
    destination: "/glossary-email-regulations#can-spam-act",
    permanent: true,
  },
  {
    source: "/glossary-captcha",
    destination: "/glossary-email-regulations#captcha",
    permanent: true,
  },
  {
    source: "/glossary-cfl",
    destination: "/glossary-email-regulations#cfbl",
    permanent: true,
  },
  {
    source: "/glossary-coi",
    destination: "/glossary-email-regulations#coi",
    permanent: true,
  },
  {
    source: "/glossary-cold-email",
    destination: "/glossary-email-regulations#cold-email",
    permanent: true,
  },
  {
    source: "/glossary-cors",
    destination: "/glossary-email-regulations#cors",
    permanent: true,
  },
  {
    source: "/glossary-double-optin",
    destination: "/double-opt-in",
    permanent: true,
  },
  {
    source: "/glossary-gdpr",
    destination: "/glossary-email-regulations#gdpr",
    permanent: true,
  },
  {
    source: "/ab-test-introduction",
    destination: "https://buttondown.com/blog?category=ab-tests",
    permanent: true,
  },
  {
    source: "/ab-test-0001",
    destination: "https://buttondown.com/blog/ab-test-0001",
    permanent: true,
  },
  {
    source: "/ab-test-0002",
    destination: "https://buttondown.com/blog/ab-test-0002",
    permanent: true,
  },
  {
    source: "/ab-test-0003",
    destination: "https://buttondown.com/blog/ab-test-0003",
    permanent: true,
  },
  {
    source: "/ab-test-0004",
    destination: "https://buttondown.com/blog/ab-test-0004",
    permanent: true,
  },
  {
    source: "/ab-test-0005",
    destination: "https://buttondown.com/blog/ab-test-0005",
    permanent: true,
  },
  {
    source: "/ab-test-0006",
    destination: "https://buttondown.com/blog/ab-test-0006",
    permanent: true,
  },
  {
    source: "/ab-test-0007",
    destination: "https://buttondown.com/blog/ab-test-0007",
    permanent: true,
  },
  {
    source: "/ab-test-0008",
    destination: "https://buttondown.com/blog/ab-test-0008",
    permanent: true,
  },
  {
    source: "/ab-test-0009",
    destination: "https://buttondown.com/blog/ab-test-0009",
    permanent: true,
  },
  {
    source: "/ab-test-0010",
    destination: "https://buttondown.com/blog/ab-test-0010",
    permanent: true,
  },
  {
    source: "/ab-test-0011",
    destination: "https://buttondown.com/blog/ab-test-0011",
    permanent: true,
  },
  {
    source: "/ab-test-0012",
    destination: "https://buttondown.com/blog/ab-test-0012",
    permanent: true,
  },
  {
    source: "/buttondown-data",
    destination: "https://buttondown.com/legal/gdpr-eu-compliance",
    permanent: true,
  },
  {
    source: "/does-buttondown-offer-stipends",
    destination: "/welcome-to-buttondown",
    permanent: true,
  },
  {
    source: "/home",
    destination: "/welcome-to-buttondown",
    permanent: true,
  },
  {
    source: "/privacy-and-security",
    destination: "/account",
    permanent: true,
  },
  {
    source: "/customizing-subscriber-list-view",
    destination: "/subscriber-dashboard",
    permanent: true,
  },
  {
    source: "/customizing-request-list-view",
    destination: "/api-introduction",
    permanent: true,
  },
];

export default REDIRECTS;
