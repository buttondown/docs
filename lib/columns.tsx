type Column = {
  column: string;
  description: React.ReactNode;
};

export const EMAIL_COLUMNS: Column[] = [
  {
    column: "Status",
    description: "Draft, sent, scheduled, etc",
  },
  {
    column: "Subject",
    description: "The subject line of the email",
  },
  {
    column: "Audience",
    description: "The audience the email was sent to",
  },
  {
    column: "Creation date",
    description: "The date on which the email was created",
  },
  {
    column: "Publication date",
    description:
      "The date on which the email was published (or will be in the future)",
  },
  {
    column: "Modification date",
    description: "The date on which the email was last modified",
  },
  {
    column: "Webmentions",
    description: "The number of webmentions the email has received",
  },
  {
    column: "Subscriptions",
    description:
      "The number of subscribers who signed up from the web archive of this email",
  },
  {
    column: "Paid subscriptions",
    description:
      "The number of paid subscribers who signed up from the web archive of this email",
  },
  {
    column: "Opens",
    description: "The number of times the email was opened",
  },
  {
    column: "Clicks",
    description: "The number of times a link in the email was clicked",
  },
  {
    column: "Click rate",
    description: "The percentage of recipients who clicked a link in the email",
  },
  {
    column: "Open rate",
    description: "The percentage of recipients who opened the email",
  },
  {
    column: "Page views (lifetime)",
    description: "The number of times the email was viewed on the web",
  },
  {
    column: "Page views (30 days)",
    description:
      "The number of times the email was viewed on the web in the last 30 days",
  },
  {
    column: "Page views (7 days)",
    description:
      "The number of times the email was viewed on the web in the last 7 days",
  },
];

export const SUBSCRIBER_COLUMNS: Column[] = [
  {
    column: "Email",
    description: "A subscriber's email address",
  },
  {
    column: "Tags",
    description: (
      <span>
        A comma-separated list of{" "}
        <a href="/advanced-features/tags" className="underline">
          tags
        </a>{" "}
        associated with the subscriber
      </span>
    ),
  },
  {
    column: "Status",
    description: <span>Regular, paid, unactivated, etc</span>,
  },
  {
    column: "Subscription date",
    description: <span>The date the subscriber signed up</span>,
  },
  {
    column: "Unsubscription date",
    description: (
      <span>
        The date on which a subscriber unsubscribed from your newsletter
      </span>
    ),
  },
  {
    column: "Churn date",
    description: (
      <span>
        The date on which a premium subscriber canceled their subscription
      </span>
    ),
  },
  {
    column: "UTM Campaign",
    description: <span>UTM Campaign</span>,
  },
  {
    column: "UTM Medium",
    description: <span>UTM Medium</span>,
  },
  {
    column: "UTM Source",
    description: <span>UTM Source</span>,
  },
  {
    column: "Referrer URL",
    description: <span>Referrer URL</span>,
  },
  {
    column: "Metadata",
    description: (
      <span>
        Custom keys and values to sort your subscriber base. (You can learn more
        about metadata&nbsp;
        <a href="/advanced-features/metadata" className="underline">
          here
        </a>
        !)
      </span>
    ),
  },
];
