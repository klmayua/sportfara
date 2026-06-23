import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";

interface AuthWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  locale?: string;
}

export default function AuthWrapper({ children, title, subtitle, locale = "en" }: AuthWrapperProps) {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 py-12 relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-orange-glow opacity-30 pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative">
        {/* Logo */}
        <div className="text-center space-y-2">
          <Link href={`/${locale}${ROUTES.HOME}`} className="inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-premium-orange rounded-lg">
            <div className="w-10 h-10 rounded-xl bg-premium-orange flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2" />
                <path d="M6 10 L10 6 L14 10 L10 14 Z" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-2xl text-white">SPORTFARA</span>
          </Link>
          <p className="text-xs font-mono text-[#6B7280] uppercase tracking-widest">Where Sports Begin</p>
        </div>

        {/* Card */}
        <div className="glass-card p-6 sm:p-8 space-y-6">
          <div className="space-y-1 text-center">
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            {subtitle && <p className="text-sm text-[#9CA3AF]">{subtitle}</p>}
          </div>
          {children}
        </div>

        <p className="text-center text-xs text-[#6B7280]">
          {locale === "fr"
            ? "En continuant, vous acceptez nos "
            : "By continuing, you agree to our "}
          <Link href="#" className="text-premium-orange hover:underline">
            {locale === "fr" ? "Conditions" : "Terms"}
          </Link>{" "}
          {locale === "fr" ? "et notre " : "and "}
          <Link href="#" className="text-premium-orange hover:underline">
            {locale === "fr" ? "Politique de confidentialité" : "Privacy Policy"}
          </Link>
        </p>
      </div>
    </div>
  );
}
