"use client";
import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils/cn";

interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  danger?: boolean;
  disabled?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: "start" | "center" | "end";
}

export default function Dropdown({ trigger, items, align = "end" }: DropdownProps) {
  return (
    <RadixDropdown.Root>
      <RadixDropdown.Trigger asChild>{trigger}</RadixDropdown.Trigger>
      <RadixDropdown.Portal>
        <RadixDropdown.Content
          align={align}
          sideOffset={8}
          className={cn(
            "z-50 min-w-48 rounded-xl overflow-hidden",
            "bg-surface-dark border border-white/10 shadow-glass-lg",
            "data-[state=open]:animate-scale-in"
          )}
        >
          {items.map((item, i) => (
            <RadixDropdown.Item
              key={i}
              disabled={item.disabled}
              onSelect={item.onClick}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer",
                "transition-colors duration-150 focus:outline-none",
                item.danger
                  ? "text-error focus:bg-error/10"
                  : "text-[#9CA3AF] hover:text-white focus:text-white focus:bg-white/5",
                item.disabled && "opacity-40 cursor-not-allowed"
              )}
            >
              {item.icon && <span className="w-4 h-4">{item.icon}</span>}
              {item.label}
            </RadixDropdown.Item>
          ))}
        </RadixDropdown.Content>
      </RadixDropdown.Portal>
    </RadixDropdown.Root>
  );
}
