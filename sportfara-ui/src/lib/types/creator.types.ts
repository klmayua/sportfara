export interface CreatorStats {
  revenue: number;
  revenueChange: number;
  subscribers: number;
  subscribersChange: number;
  views: number;
  viewsChange: number;
  conversion: number;
  conversionChange: number;
}

export interface PayoutRecord {
  id: string;
  amount: number;
  currency: string;
  method: "stripe" | "paystack" | "flutterwave";
  status: "paid" | "pending" | "failed";
  paidAt?: string;
  periodStart: string;
  periodEnd: string;
}
