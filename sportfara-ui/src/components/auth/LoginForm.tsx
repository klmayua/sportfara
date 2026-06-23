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
import { cn } from "@/lib/utils/cn";

const schema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});
type FormData = z.infer<typeof schema>;

interface LoginFormProps {
  locale?: string;
  onSubmit?: (data: FormData) => Promise<void>;
}

export default function LoginForm({ locale = "en", onSubmit }: LoginFormProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = async (data: FormData) => {
    setLoading(true);
    await onSubmit?.(data);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4" noValidate>
      <OAuthButtons locale={locale as "en" | "fr"} />
      <Divider label={locale === "fr" ? "ou" : "or"} />

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
        autoComplete="current-password"
        error={errors.password?.message}
      />

      <div className="flex justify-end">
        <Link
          href={`/${locale}${ROUTES.AUTH_FORGOT}`}
          className="text-xs text-premium-orange hover:text-premium-orange-hover transition-colors"
        >
          {locale === "fr" ? "Mot de passe oublié ?" : "Forgot password?"}
        </Link>
      </div>

      <Button type="submit" fullWidth isLoading={loading}>
        {locale === "fr" ? "Se connecter" : "Sign in"}
      </Button>

      <p className="text-center text-sm text-[#9CA3AF]">
        {locale === "fr" ? "Pas encore de compte ? " : "Don't have an account? "}
        <Link href={`/${locale}${ROUTES.AUTH_REGISTER}`} className="text-premium-orange hover:underline font-medium">
          {locale === "fr" ? "Créer un compte" : "Create account"}
        </Link>
      </p>
    </form>
  );
}
