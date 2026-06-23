"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import OAuthButtons from "./OAuthButtons";
import { ROUTES } from "@/lib/constants/routes";

const schema = z.object({
  fullName: z.string().min(2, "Enter your full name."),
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});
type FormData = z.infer<typeof schema>;

interface RegisterFormProps {
  locale?: string;
  onSubmit?: (data: Omit<FormData, "confirmPassword">) => Promise<void>;
}

export default function RegisterForm({ locale = "en", onSubmit }: RegisterFormProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = async ({ confirmPassword: _c, ...data }: FormData) => {
    setLoading(true);
    await onSubmit?.(data);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4" noValidate>
      <OAuthButtons locale={locale as "en" | "fr"} />
      <Divider label={locale === "fr" ? "ou" : "or"} />

      <Input
        {...register("fullName")}
        type="text"
        id="fullName"
        label={locale === "fr" ? "Nom complet" : "Full name"}
        placeholder="James Adeyemi"
        autoComplete="name"
        error={errors.fullName?.message}
      />
      <Input
        {...register("email")}
        type="email"
        id="email"
        label={locale === "fr" ? "Adresse email" : "Email address"}
        placeholder="you@example.com"
        autoComplete="email"
        error={errors.email?.message}
      />
      <Input
        {...register("password")}
        type="password"
        id="password"
        label={locale === "fr" ? "Mot de passe" : "Password"}
        placeholder="••••••••"
        autoComplete="new-password"
        error={errors.password?.message}
      />
      <Input
        {...register("confirmPassword")}
        type="password"
        id="confirmPassword"
        label={locale === "fr" ? "Confirmer le mot de passe" : "Confirm password"}
        placeholder="••••••••"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
      />

      <Button type="submit" fullWidth isLoading={loading}>
        {locale === "fr" ? "Créer un compte" : "Create account"}
      </Button>

      <p className="text-center text-sm text-[#9CA3AF]">
        {locale === "fr" ? "Vous avez déjà un compte ? " : "Already have an account? "}
        <Link href={`/${locale}${ROUTES.AUTH_LOGIN}`} className="text-premium-orange hover:underline font-medium">
          {locale === "fr" ? "Se connecter" : "Sign in"}
        </Link>
      </p>
    </form>
  );
}
