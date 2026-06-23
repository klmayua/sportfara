"use client";
import { use } from "react";
import AuthWrapper from "@/components/auth/AuthWrapper";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  return (
    <AuthWrapper
      title={locale === "fr" ? "Se connecter" : "Sign in"}
      subtitle={locale === "fr" ? "Bienvenue sur SPORTFARA" : "Welcome back to SPORTFARA"}
      locale={locale}
    >
      <LoginForm locale={locale} />
    </AuthWrapper>
  );
}
