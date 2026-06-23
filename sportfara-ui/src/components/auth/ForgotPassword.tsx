"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const schema = z.object({ email: z.string().email("Enter a valid email address.") });
type FormData = z.infer<typeof schema>;

interface ForgotPasswordProps {
  locale?: "en" | "fr";
  onSubmit?: (email: string) => Promise<void>;
}

export default function ForgotPassword({ locale = "en", onSubmit }: ForgotPasswordProps) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleFormSubmit = async ({ email }: FormData) => {
    setLoading(true);
    await onSubmit?.(email);
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="text-center space-y-3">
        <div className="glass-green p-4 rounded-xl">
          <p className="text-trust-green text-sm font-medium">
            {locale === "fr" ? "Email envoyé ! Vérifiez votre boîte." : "Email sent! Check your inbox."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4" noValidate>
      <Input
        {...register("email")}
        type="email"
        id="email"
        label={locale === "fr" ? "Adresse email" : "Email address"}
        placeholder="you@example.com"
        autoComplete="email"
        error={errors.email?.message}
      />
      <Button type="submit" fullWidth isLoading={loading}>
        {locale === "fr" ? "Réinitialiser le mot de passe" : "Reset password"}
      </Button>
    </form>
  );
}
