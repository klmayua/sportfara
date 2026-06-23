export type PaywallGate = "free" | "premium" | "pro";
export type ContentLanguage = "en" | "fr" | "both";
export type PublishStatus = "draft" | "published" | "scheduled";

export interface Article {
  id: string;
  title: string;
  titleFr?: string;
  bodyEn: string;
  bodyFr?: string;
  paywall: PaywallGate;
  language: ContentLanguage;
  status: PublishStatus;
  publishedAt?: string;
  scheduledAt?: string;
  creatorId: string;
  views: number;
  conversions: number;
  revenue: number;
  readTime: number;
}
