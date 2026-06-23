"use client";
import * as RadixTabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils/cn";

interface Tab {
  value: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ tabs, defaultValue, value, onValueChange, children, className }: TabsProps) {
  return (
    <RadixTabs.Root
      defaultValue={defaultValue ?? tabs[0]?.value}
      value={value}
      onValueChange={onValueChange}
      className={className}
    >
      <RadixTabs.List className="flex gap-1 p-1 bg-white/5 rounded-xl mb-4" aria-label="Tabs">
        {tabs.map((tab) => (
          <RadixTabs.Trigger
            key={tab.value}
            value={tab.value}
            className={cn(
              "flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              "text-[#9CA3AF] cursor-pointer",
              "hover:text-white",
              "focus:outline-none focus:ring-2 focus:ring-premium-orange focus:ring-inset",
              "data-[state=active]:bg-premium-orange data-[state=active]:text-white data-[state=active]:shadow-orange-glow"
            )}
          >
            {tab.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {children}
    </RadixTabs.Root>
  );
}

export const TabContent = RadixTabs.Content;
