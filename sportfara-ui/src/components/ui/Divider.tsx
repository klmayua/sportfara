import { cn } from "@/lib/utils/cn";

interface DividerProps {
  label?: string;
  className?: string;
}

export default function Divider({ label, className }: DividerProps) {
  if (label) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-[#6B7280] font-medium">{label}</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>
    );
  }
  return <div className={cn("h-px bg-white/10 w-full", className)} />;
}
