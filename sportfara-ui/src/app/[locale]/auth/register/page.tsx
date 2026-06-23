"use client";
import { use } from "react";
import AuthWrapper from "@/components/auth/AuthWrapper";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  return (
    <AuthWrapper
      title={locale === "fr" ? "Créer un compte" : "Create account"}
      subtitle={locale === "fr" ? "Rejoignez SPORTFARA" : "Join SPORTFARA — Where Sports Begin"}
      locale={locale}
    >
      <RegisterForm locale={locale} />
    </AuthWrapper>
  );
}
