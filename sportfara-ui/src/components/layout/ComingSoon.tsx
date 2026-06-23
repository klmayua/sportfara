"use client";
import { useState } from "react";
import { Clock, Bell } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ComingSoonProps {
  feature: string;
}

export default function ComingSoon({ feature }: ComingSoonProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="glass-card p-8 max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-premium-orange/10 border border-premium-orange/20 flex items-center justify-center mx-auto">
          <Clock className="w-8 h-8 text-premium-orange" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">{feature}</h1>
          <p className="text-secondary text-sm">
            {feature} is coming soon. We&apos;re building something exceptional.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <p className="text-xs text-[#9CA3AF]">
              Join the waitlist to be first in line.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className={cn(
                  "flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5",
                  "text-white placeholder:text-[#6B7280] text-sm",
                  "focus:outline-none focus:ring-2 focus:ring-premium-orange focus:border-transparent",
                  "transition-colors duration-200"
                )}
              />
              <button
                type="submit"
                className={cn(
                  "bg-premium-orange hover:bg-premium-orange-hover text-white",
                  "px-4 py-2.5 rounded-xl text-sm font-medium",
                  "transition-colors duration-200 cursor-pointer",
                  "focus:outline-none focus:ring-2 focus:ring-premium-orange focus:ring-offset-2 focus:ring-offset-primary-dark",
                  "flex items-center gap-2"
                )}
              >
                <Bell className="w-4 h-4" />
                Notify me
              </button>
            </div>
          </form>
        ) : (
          <div className="glass-green p-4 rounded-xl">
            <p className="text-trust-green text-sm font-medium">
              You&apos;re on the list. We&apos;ll be in touch.
            </p>
          </div>
        )}

        <div className="flex items-center gap-2 justify-center">
          <span className="font-mono text-xs font-bold tracking-wider text-[#6B7280] uppercase">
            SPORTFARA™
          </span>
          <span className="text-[#6B7280] text-xs">·</span>
          <span className="text-[#6B7280] text-xs">Where Sports Begin</span>
        </div>
      </div>
    </div>
  );
}
