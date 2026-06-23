"use client";
import { Mail, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";

interface VerifyEmailProps {
  email?: string;
  locale?: "en" | "fr";
  onResend?: () => void;
}

export default function VerifyEmail({ email, locale = "en", onResend }: VerifyEmailProps) {
  return (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-premium-orange/10 border border-premium-orange/20 flex items-center justify-center mx-auto">
        <Mail className="w-8 h-8 text-premium-orange" />
      </div>
      <div className="space-y-2">
        <p className="text-sm text-[#9CA3AF]">
          {locale === "fr" ? "Nous avons envoyé un lien de vérification à" : "We sent a verification link to"}
        </p>
        {email && <p className="font-mono font-bold text-white">{email}</p>}
      </div>
      <Button variant="ghost" fullWidth leftIcon={<RefreshCw className="w-4 h-4" />} onClick={onResend}>
        {locale === "fr" ? "Renvoyer l'email" : "Resend email"}
      </Button>
    </div>
  );
}
