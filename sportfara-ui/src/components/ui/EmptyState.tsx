import { cn } from "@/lib/utils/cn";
import Button from "./Button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  ctaLabel?: string;
  onCta?: () => void;
  className?: string;
}

export default function EmptyState({ icon, title, description, ctaLabel, onCta, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 text-center space-y-4", className)}>
      {icon && (
        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[#6B7280]">
          {icon}
        </div>
      )}
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-white">{title}</h3>
        {description && <p className="text-sm text-[#9CA3AF] max-w-xs">{description}</p>}
      </div>
      {ctaLabel && onCta && (
        <Button size="sm" onClick={onCta}>{ctaLabel}</Button>
      )}
    </div>
  );
}
