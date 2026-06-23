"use client";
import { use } from "react";
import AuthWrapper from "@/components/auth/AuthWrapper";
import VerifyEmail from "@/components/auth/VerifyEmail";

export default function VerifyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  return (
    <AuthWrapper
      title={locale === "fr" ? "Vérifiez votre email" : "Verify your email"}
      locale={locale}
    >
      <VerifyEmail locale={locale as "en" | "fr"} email="user@example.com" />
    </AuthWrapper>
  );
}
