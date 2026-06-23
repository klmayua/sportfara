import { use } from "react";
import SuccessScreen from "@/components/paywall/SuccessScreen";

export default function SubscribeSuccessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  return <SuccessScreen locale={locale} />;
}
