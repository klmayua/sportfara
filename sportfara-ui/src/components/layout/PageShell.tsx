import { cn } from "@/lib/utils/cn";

interface PageShellProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  className?: string;
}

export default function PageShell({ children, sidebar, className }: PageShellProps) {
  return (
    <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6", className)}>
      {sidebar ? (
        <div className="flex gap-6">
          <main className="flex-1 min-w-0">{children}</main>
          <aside className="hidden lg:block w-80 shrink-0">{sidebar}</aside>
        </div>
      ) : (
        <main>{children}</main>
      )}
    </div>
  );
}
