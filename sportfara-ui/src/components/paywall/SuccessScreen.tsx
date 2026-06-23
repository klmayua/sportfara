import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";

interface SuccessScreenProps {
  locale?: string;
}

export default function SuccessScreen({ locale = "en" }: SuccessScreenProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="glass-card p-8 max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-trust-green/10 border border-trust-green/20 flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-trust-green" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">
            {locale === "fr" ? "Vous êtes maintenant membre SPORTFARA Premium." : "You're now a SPORTFARA Premium member."}
          </h1>
          <p className="text-sm text-[#9CA3AF]">
            {locale === "fr"
              ? "Intelligence quotidienne illimitée, EN + FR. Bienvenue dans le cercle restreint."
              : "Unlimited daily intelligence, EN + FR. Welcome to the inner circle."}
          </p>
        </div>
        <Link
          href={`/${locale}${ROUTES.DASHBOARD}`}
          className={cn(
            "inline-flex items-center justify-center w-full h-11 rounded-xl",
            "bg-premium-orange hover:bg-premium-orange-hover text-white font-semibold",
            "transition-colors duration-200 cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-premium-orange"
          )}
        >
          {locale === "fr" ? "Aller au tableau de bord" : "Go to Dashboard"}
        </Link>
      </div>
    </div>
  );
}
