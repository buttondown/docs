import type React from "react";

export type Page = {
  slug: string;
  title: string;
  navigationTitle?: string;
  description?: string;
  content: React.ReactNode;
  schema?: string;
  enum?: string;
  endpoint?: string;
  method?: string;
  date?: string;
  faqItems?: string;
  relatedPages?: Array<{ slug: string; title: string | null }>;
};
