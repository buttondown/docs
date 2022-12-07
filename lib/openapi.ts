/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/exports": {
    /** List Exports */
    get: operations["api_views_exports_list_exports"];
    /** Create Export */
    post: operations["api_views_exports_create_export"];
  };
  "/exports/{export_id}": {
    /** Retrieve Export */
    get: operations["api_views_exports_retrieve_export"];
  };
  "/tags": {
    /** List Tags */
    get: operations["api_views_subscriber_tags_list_tags"];
    /** Create Tag */
    post: operations["api_views_subscriber_tags_create_tag"];
  };
  "/tags/{tag_id}": {
    /** Retrieve Tag */
    get: operations["api_views_subscriber_tags_retrieve_tag"];
    /** Delete Tag */
    delete: operations["api_views_subscriber_tags_delete_tag"];
    /** Update Tag */
    patch: operations["api_views_subscriber_tags_update_tag"];
  };
  "/ping": {
    /** Ping */
    get: operations["api_views_ping_ping"];
  };
  "/images": {
    /** Create Image */
    post: operations["api_views_images_create_image"];
  };
  "/images/{image_id}": {
    /** Delete Image */
    delete: operations["api_views_images_delete_image"];
  };
  "/emails": {
    /** List Emails */
    get: operations["api_views_emails_list_emails"];
    /** Create Email */
    post: operations["api_views_emails_create_email"];
  };
  "/emails/{pk}": {
    /** Retrieve Email */
    get: operations["api_views_emails_retrieve_email"];
  };
  "/emails/{pk}/analytics": {
    /** Retrieve Email Analytics */
    get: operations["api_views_emails_retrieve_email_analytics"];
  };
  "/subscribers": {
    /** List Subscribers */
    get: operations["api_views_subscribers_list_subscribers"];
    /** Create Subscriber */
    post: operations["api_views_subscribers_create_subscriber"];
  };
  "/subscribers/{pk}": {
    /** Retrieve Subscriber */
    get: operations["api_views_subscribers_retrieve_subscriber"];
    /** Delete Subscriber */
    delete: operations["api_views_subscribers_delete_subscriber"];
    /** Update Subscriber */
    patch: operations["api_views_subscribers_update_subscriber"];
  };
  "/subscribers/{pk}/send-reminder": {
    /** Send Reminder */
    post: operations["api_views_subscribers_send_reminder"];
  };
  "/subscribers/{pk}/emails/{email_pk}": {
    /** Send Email To */
    post: operations["api_views_subscribers_send_email_to"];
  };
  "/newsletters": {
    /** List Newsletters */
    get: operations["api_views_newsletters_list_newsletters"];
    /** Create Newsletter */
    post: operations["api_views_newsletters_create_newsletter"];
  };
  "/newsletters/{pk}": {
    /** Delete Newsletter */
    delete: operations["api_views_newsletters_delete_newsletter"];
    /** Update Newsletter */
    patch: operations["api_views_newsletters_update_newsletter"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /**
     * Status 
     * @description An enumeration. 
     * @enum {string}
     */
    ExportStatus: "error" | "in_progress" | "not_started" | "ready";
    /** ExportOutput */
    ExportOutput: {
      /**
       * Id 
       * Format: uuid
       */
      id: string;
      /**
       * Creation Date 
       * Format: date-time
       */
      creation_date: string;
      status: components["schemas"]["ExportStatus"];
      /** Url */
      url: string;
      /**
       * Completion Date 
       * Format: date-time
       */
      completion_date?: string;
    };
    /** ErrorMessage */
    ErrorMessage: {
      /** Code */
      code?: Record<string, never>;
      /** Detail */
      detail: string;
      /** Metadata */
      metadata?: {
        [key: string]: string | undefined;
      };
    };
    /**
     * Collection 
     * @description An enumeration. 
     * @enum {string}
     */
    ExportCollection: "subscribers" | "emails" | "scheduled_emails" | "drafts" | "unsubscribers" | "events" | "referrals";
    /** ExportInput */
    ExportInput: {
      collections: (components["schemas"]["ExportCollection"])[];
    };
    /** Page[ExportOutput] */
    Page_ExportOutput_: {
      /** Results */
      results: (components["schemas"]["ExportOutput"])[];
      /** Count */
      count: number;
    };
    /** TagOutput */
    TagOutput: {
      /**
       * Id 
       * Format: uuid
       */
      id: string;
      /** Name */
      name: string;
      /** Color */
      color: string;
      /** Description */
      description?: string;
      /** Secondary Id */
      secondary_id: number;
      /**
       * Creation Date 
       * Format: date-time
       */
      creation_date: string;
    };
    /** TagInput */
    TagInput: {
      /** Name */
      name: string;
      /** Color */
      color: string;
      /** Description */
      description?: string;
    };
    /** Page[TagOutput] */
    Page_TagOutput_: {
      /** Results */
      results: (components["schemas"]["TagOutput"])[];
      /** Count */
      count: number;
    };
    /**
     * UpdateTagErrorCode 
     * @description An enumeration. 
     * @enum {string}
     */
    UpdateTagErrorCode: "name_already_exists";
    /** ErrorMessage[UpdateTagErrorCode] */
    ErrorMessage_UpdateTagErrorCode_: {
      code: components["schemas"]["UpdateTagErrorCode"];
      /** Detail */
      detail: string;
      /** Metadata */
      metadata?: {
        [key: string]: string | undefined;
      };
    };
    /** TagUpdateInput */
    TagUpdateInput: {
      /** Name */
      name?: string;
      /** Color */
      color?: string;
      /** Description */
      description?: string;
    };
    /** ImageOutput */
    ImageOutput: {
      /**
       * Id 
       * Format: uuid
       */
      id: string;
      /**
       * Creation Date 
       * Format: date-time
       */
      creation_date: string;
      /** Image */
      image: string;
    };
    /**
     * Type 
     * @description An enumeration. 
     * @enum {string}
     */
    EmailType: "public" | "private" | "premium" | "free" | "archival" | "hidden";
    /**
     * Status 
     * @description An enumeration. 
     * @enum {string}
     */
    EmailStatus: "draft" | "about_to_send" | "scheduled" | "in_flight" | "deleted" | "errored" | "sent" | "imported";
    /** EmailOutput */
    EmailOutput: {
      /**
       * Id 
       * Format: uuid
       */
      id: string;
      /** Included Tags */
      included_tags?: (string)[];
      /** Excluded Tags */
      excluded_tags?: (string)[];
      /**
       * Publish Date 
       * Format: date-time
       */
      publish_date?: string;
      /** Subject */
      subject: string;
      /** Body */
      body: string;
      /** Secondary Id */
      secondary_id?: number;
      email_type: components["schemas"]["EmailType"];
      /** Slug */
      slug: string;
      /** External Url */
      external_url: string;
      status: components["schemas"]["EmailStatus"];
      /**
       * Metadata 
       * @default {}
       */
      metadata?: {
        [key: string]: string | undefined;
      };
    };
    /**
     * EmailCreationErrorCode 
     * @description An enumeration. 
     * @enum {string}
     */
    EmailCreationErrorCode: "subject_invalid" | "email_duplicate" | "email_invalid";
    /** ErrorMessage[EmailCreationErrorCode] */
    ErrorMessage_EmailCreationErrorCode_: {
      code: components["schemas"]["EmailCreationErrorCode"];
      /** Detail */
      detail: string;
      /** Metadata */
      metadata?: {
        [key: string]: string | undefined;
      };
    };
    /** EmailInput */
    EmailInput: {
      /**
       * Included Tags 
       * @default []
       */
      included_tags?: (string | string)[];
      /**
       * Excluded Tags 
       * @default []
       */
      excluded_tags?: (string | string)[];
      /**
       * Publish Date 
       * Format: date-time
       */
      publish_date?: string;
      /** Subject */
      subject: string;
      /**
       * Body 
       * @default
       */
      body?: string;
      /** @default public */
      email_type?: components["schemas"]["EmailType"];
      /** @default about_to_send */
      status?: components["schemas"]["EmailStatus"];
      /**
       * Metadata 
       * @default {}
       */
      metadata?: {
        [key: string]: string | undefined;
      };
    };
    /** Page[EmailOutput] */
    Page_EmailOutput_: {
      /** Results */
      results: (components["schemas"]["EmailOutput"])[];
      /** Count */
      count: number;
    };
    /** Analytics */
    Analytics: {
      /** Recipients */
      recipients: number;
      /** Deliveries */
      deliveries: number;
      /** Opens */
      opens: number;
      /** Clicks */
      clicks: number;
      /** Temporary Failures */
      temporary_failures: number;
      /** Permanent Failures */
      permanent_failures: number;
      /** Unsubscriptions */
      unsubscriptions: number;
      /** Complaints */
      complaints: number;
    };
    /**
     * Type 
     * @description An enumeration. 
     * @enum {string}
     */
    SubscriberType: "regular" | "premium" | "churning" | "past_due" | "gifted" | "unpaid" | "unactivated" | "unsubscribed" | "spammy" | "removed" | "trialed" | "disabled" | "paused";
    /**
     * Source 
     * @description An enumeration. 
     * @enum {string}
     */
    SubscriberSource: "api" | "buttondown" | "csv" | "mailchimp" | "organic" | "nouveau" | "substack" | "tinyletter" | "typeform" | "user" | "admin" | "drip";
    /** SubscriberOutput */
    SubscriberOutput: {
      /**
       * Id 
       * Format: uuid
       */
      id: string;
      /** Email */
      email: string;
      /**
       * Notes 
       * @default
       */
      notes?: string;
      /**
       * Metadata 
       * @default {}
       */
      metadata?: Record<string, never>;
      /**
       * Tags 
       * @default []
       */
      tags?: (string)[];
      /**
       * Referrer Url 
       * @default
       */
      referrer_url?: string;
      /**
       * Creation Date 
       * Format: date-time
       */
      creation_date: string;
      /** Secondary Id */
      secondary_id: number;
      subscriber_type: components["schemas"]["SubscriberType"];
      source: components["schemas"]["SubscriberSource"];
      /** Utm Campaign */
      utm_campaign: string;
      /** Utm Medium */
      utm_medium: string;
      /** Utm Source */
      utm_source: string;
    };
    /** SubscriberInput */
    SubscriberInput: {
      /** Email */
      email: string;
      /**
       * Notes 
       * @default
       */
      notes?: string;
      /**
       * Metadata 
       * @default {}
       */
      metadata?: Record<string, never>;
      /**
       * Tags 
       * @default []
       */
      tags?: (string)[];
      /**
       * Referrer Url 
       * @default
       */
      referrer_url?: string;
    };
    /** Page[SubscriberOutput] */
    Page_SubscriberOutput_: {
      /** Results */
      results: (components["schemas"]["SubscriberOutput"])[];
      /** Count */
      count: number;
    };
    /**
     * ListSubscribersErrorCode 
     * @description An enumeration. 
     * @enum {string}
     */
    ListSubscribersErrorCode: "invalid_tag";
    /** ErrorMessage[ListSubscribersErrorCode] */
    ErrorMessage_ListSubscribersErrorCode_: {
      code: components["schemas"]["ListSubscribersErrorCode"];
      /** Detail */
      detail: string;
      /** Metadata */
      metadata?: {
        [key: string]: string | undefined;
      };
    };
    /**
     * UpdateSubscriberErrorCode 
     * @description An enumeration. 
     * @enum {string}
     */
    UpdateSubscriberErrorCode: "email_already_exists" | "email_invalid" | "subscriber_type_invalid";
    /** ErrorMessage[UpdateSubscriberErrorCode] */
    ErrorMessage_UpdateSubscriberErrorCode_: {
      code: components["schemas"]["UpdateSubscriberErrorCode"];
      /** Detail */
      detail: string;
      /** Metadata */
      metadata?: {
        [key: string]: string | undefined;
      };
    };
    /** SubscriberUpdateInput */
    SubscriberUpdateInput: {
      /** Email */
      email?: string;
      /** Notes */
      notes?: string;
      /** Metadata */
      metadata?: Record<string, never>;
      /** Tags */
      tags?: (string)[];
      /**
       * Referrer Url 
       * @default
       */
      referrer_url?: string;
      subscriber_type?: components["schemas"]["SubscriberType"];
    };
    /** NewsletterOutput */
    NewsletterOutput: {
      /**
       * Id 
       * Format: uuid
       */
      id: string;
      /** Username */
      username: string;
      /** Name */
      name: string;
      /** Description */
      description: string;
      /**
       * Creation Date 
       * Format: date-time
       */
      creation_date: string;
      /**
       * Api Key 
       * Format: uuid
       */
      api_key: string;
    };
    /** Page[NewsletterOutput] */
    Page_NewsletterOutput_: {
      /** Results */
      results: (components["schemas"]["NewsletterOutput"])[];
      /** Count */
      count: number;
    };
    /**
     * CreateNewsletterErrorCode 
     * @description An enumeration. 
     * @enum {string}
     */
    CreateNewsletterErrorCode: "username_already_exists";
    /** ErrorMessage[CreateNewsletterErrorCode] */
    ErrorMessage_CreateNewsletterErrorCode_: {
      code: components["schemas"]["CreateNewsletterErrorCode"];
      /** Detail */
      detail: string;
      /** Metadata */
      metadata?: {
        [key: string]: string | undefined;
      };
    };
    /** NewsletterInput */
    NewsletterInput: {
      /** Username */
      username: string;
      /** Name */
      name: string;
      /** Description */
      description: string;
    };
    /** NewsletterUpdateInput */
    NewsletterUpdateInput: {
      /** Username */
      username?: string;
      /** Name */
      name?: string;
      /** Description */
      description?: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

export interface operations {

  api_views_exports_list_exports: {
    /** List Exports */
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["Page_ExportOutput_"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description Forbidden */
      403: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
    };
  };
  api_views_exports_create_export: {
    /** Create Export */
    requestBody?: {
      content: {
        "application/json": components["schemas"]["ExportInput"];
      };
    };
    responses: {
      /** @description Created */
      201: {
        content: {
          "application/json": components["schemas"]["ExportOutput"];
        };
      };
      /** @description Forbidden */
      403: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
    };
  };
  api_views_exports_retrieve_export: {
    /** Retrieve Export */
    parameters: {
      path: {
        export_id: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["ExportOutput"];
        };
      };
    };
  };
  api_views_subscriber_tags_list_tags: {
    /** List Tags */
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["Page_TagOutput_"];
        };
      };
    };
  };
  api_views_subscriber_tags_create_tag: {
    /** Create Tag */
    requestBody: {
      content: {
        "application/json": components["schemas"]["TagInput"];
      };
    };
    responses: {
      /** @description Created */
      201: {
        content: {
          "application/json": components["schemas"]["TagOutput"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description Forbidden */
      403: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
    };
  };
  api_views_subscriber_tags_retrieve_tag: {
    /** Retrieve Tag */
    parameters: {
      path: {
        tag_id: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["TagOutput"];
        };
      };
    };
  };
  api_views_subscriber_tags_delete_tag: {
    /** Delete Tag */
    parameters: {
      path: {
        tag_id: string;
      };
    };
    responses: {
      /** @description No Content */
      204: never;
    };
  };
  api_views_subscriber_tags_update_tag: {
    /** Update Tag */
    parameters: {
      path: {
        tag_id: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["TagUpdateInput"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["TagOutput"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorMessage_UpdateTagErrorCode_"];
        };
      };
    };
  };
  api_views_ping_ping: {
    /** Ping */
    responses: {
      /** @description OK */
      200: never;
    };
  };
  api_views_images_create_image: {
    /** Create Image */
    requestBody: {
      content: {
        "multipart/form-data": {
          /**
           * Image 
           * Format: binary
           */
          image: string;
        };
      };
    };
    responses: {
      /** @description Created */
      201: {
        content: {
          "application/json": components["schemas"]["ImageOutput"];
        };
      };
    };
  };
  api_views_images_delete_image: {
    /** Delete Image */
    parameters: {
      path: {
        image_id: string;
      };
    };
    responses: {
      /** @description No Content */
      204: never;
    };
  };
  api_views_emails_list_emails: {
    /** List Emails */
    parameters?: {
      query?: {
        status?: (components["schemas"]["EmailStatus"])[];
        included_tags?: (string)[];
        excluded_tags?: (string)[];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["Page_EmailOutput_"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
    };
  };
  api_views_emails_create_email: {
    /** Create Email */
    requestBody: {
      content: {
        "application/json": components["schemas"]["EmailInput"];
      };
    };
    responses: {
      /** @description Created */
      201: {
        content: {
          "application/json": components["schemas"]["EmailOutput"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorMessage_EmailCreationErrorCode_"];
        };
      };
    };
  };
  api_views_emails_retrieve_email: {
    /** Retrieve Email */
    parameters: {
      path: {
        pk: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["EmailOutput"];
        };
      };
    };
  };
  api_views_emails_retrieve_email_analytics: {
    /** Retrieve Email Analytics */
    parameters: {
      path: {
        pk: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["Analytics"];
        };
      };
    };
  };
  api_views_subscribers_list_subscribers: {
    /** List Subscribers */
    parameters?: {
        /** @description An enumeration. */
      query?: {
        type?: "regular" | "premium" | "churning" | "past_due" | "gifted" | "unpaid" | "unactivated" | "unsubscribed" | "spammy" | "removed" | "trialed" | "disabled" | "paused";
        email?: string;
        tag?: string;
        "-tag"?: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["Page_SubscriberOutput_"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorMessage_ListSubscribersErrorCode_"];
        };
      };
    };
  };
  api_views_subscribers_create_subscriber: {
    /** Create Subscriber */
    requestBody: {
      content: {
        "application/json": components["schemas"]["SubscriberInput"];
      };
    };
    responses: {
      /** @description Created */
      201: {
        content: {
          "application/json": components["schemas"]["SubscriberOutput"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
    };
  };
  api_views_subscribers_retrieve_subscriber: {
    /** Retrieve Subscriber */
    parameters: {
      path: {
        pk: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["SubscriberOutput"];
        };
      };
    };
  };
  api_views_subscribers_delete_subscriber: {
    /** Delete Subscriber */
    parameters: {
      path: {
        pk: string;
      };
    };
    responses: {
      /** @description No Content */
      204: never;
    };
  };
  api_views_subscribers_update_subscriber: {
    /** Update Subscriber */
    parameters: {
      path: {
        pk: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["SubscriberUpdateInput"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["SubscriberOutput"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorMessage_UpdateSubscriberErrorCode_"];
        };
      };
    };
  };
  api_views_subscribers_send_reminder: {
    /** Send Reminder */
    parameters: {
      path: {
        pk: string;
      };
    };
    responses: {
      /** @description OK */
      200: never;
    };
  };
  api_views_subscribers_send_email_to: {
    /** Send Email To */
    parameters: {
      path: {
        pk: string;
        email_pk: string;
      };
    };
    responses: {
      /** @description OK */
      200: never;
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
    };
  };
  api_views_newsletters_list_newsletters: {
    /** List Newsletters */
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["Page_NewsletterOutput_"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
    };
  };
  api_views_newsletters_create_newsletter: {
    /** Create Newsletter */
    requestBody: {
      content: {
        "application/json": components["schemas"]["NewsletterInput"];
      };
    };
    responses: {
      /** @description Created */
      201: {
        content: {
          "application/json": components["schemas"]["NewsletterOutput"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorMessage_CreateNewsletterErrorCode_"];
        };
      };
    };
  };
  api_views_newsletters_delete_newsletter: {
    /** Delete Newsletter */
    parameters: {
      path: {
        pk: string;
      };
    };
    responses: {
      /** @description No Content */
      204: never;
    };
  };
  api_views_newsletters_update_newsletter: {
    /** Update Newsletter */
    parameters: {
      path: {
        pk: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["NewsletterUpdateInput"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["NewsletterOutput"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
    };
  };
}