import * as RadixAvatar from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils/cn";

interface AvatarProps {
  src?: string;
  name: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  xs: "w-6 h-6 text-2xs",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function Avatar({ src, name, size = "md", className }: AvatarProps) {
  return (
    <RadixAvatar.Root
      className={cn(
        "rounded-full overflow-hidden bg-premium-orange/20 flex items-center justify-center shrink-0",
        sizeClasses[size],
        className
      )}
    >
      {src && (
        <RadixAvatar.Image
          src={src}
          alt={name}
          className="w-full h-full object-cover"
        />
      )}
      <RadixAvatar.Fallback
        className={cn(
          "font-bold text-premium-orange font-mono",
          sizeClasses[size]
        )}
        delayMs={0}
      >
        {getInitials(name)}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
}
