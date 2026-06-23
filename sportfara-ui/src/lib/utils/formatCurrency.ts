type Currency = "USD" | "KES" | "NGN" | "XOF";

const currencyConfig: Record<Currency, { locale: string; symbol: string }> = {
  USD: { locale: "en-US", symbol: "$" },
  KES: { locale: "sw-KE", symbol: "KSh" },
  NGN: { locale: "en-NG", symbol: "₦" },
  XOF: { locale: "fr-SN", symbol: "CFA" },
};

export function formatCurrency(
  amount: number,
  currency: Currency = "USD"
): string {
  const config = currencyConfig[currency];
  try {
    return new Intl.NumberFormat(config.locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${config.symbol}${amount.toLocaleString()}`;
  }
}

export function formatCompact(amount: number): string {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(1)}K`;
  return `$${amount}`;
}
