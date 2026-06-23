"use client";
import { use } from "react";
import AuthWrapper from "@/components/auth/AuthWrapper";
import ForgotPassword from "@/components/auth/ForgotPassword";

export default function ForgotPasswordPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  return (
    <AuthWrapper
      title={locale === "fr" ? "Mot de passe oublié ?" : "Forgot password?"}
      subtitle={locale === "fr" ? "Nous vous enverrons un lien de réinitialisation." : "We'll send you a reset link."}
      locale={locale}
    >
      <ForgotPassword locale={locale as "en" | "fr"} />
    </AuthWrapper>
  );
}
