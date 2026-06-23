"use client";
import * as RadixSwitch from "@radix-ui/react-switch";
import { cn } from "@/lib/utils/cn";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  id?: string;
  className?: string;
}

export default function Switch({ checked, onCheckedChange, label, id, className }: SwitchProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <RadixSwitch.Root
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={cn(
          "relative w-10 h-6 rounded-full transition-colors duration-200 cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-premium-orange focus:ring-offset-2 focus:ring-offset-primary-dark",
          checked ? "bg-premium-orange" : "bg-white/10"
        )}
      >
        <RadixSwitch.Thumb
          className={cn(
            "block w-4 h-4 bg-white rounded-full shadow-sm",
            "transition-transform duration-200",
            "translate-x-1 data-[state=checked]:translate-x-5"
          )}
        />
      </RadixSwitch.Root>
      {label && (
        <label htmlFor={id} className="text-sm text-[#9CA3AF] cursor-pointer select-none">
          {label}
        </label>
      )}
    </div>
  );
}
