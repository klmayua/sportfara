import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import Button from "./Button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorState({
  title = "Something went wrong",
  message = "An error occurred. Please try again.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 text-center space-y-4", className)}>
      <div className="w-14 h-14 rounded-2xl bg-error/10 flex items-center justify-center">
        <AlertCircle className="w-7 h-7 text-error" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <p className="text-sm text-[#9CA3AF] max-w-xs">{message}</p>
      </div>
      {onRetry && (
        <Button size="sm" variant="ghost" onClick={onRetry}>Try again</Button>
      )}
    </div>
  );
}
