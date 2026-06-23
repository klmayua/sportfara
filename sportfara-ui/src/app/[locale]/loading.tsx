import { CardSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="space-y-4 max-w-2xl">
        <div className="space-y-2">
          <div className="h-4 w-48 bg-white/5 rounded-lg animate-pulse" />
          <div className="h-8 w-56 bg-white/5 rounded-lg animate-pulse" />
        </div>
        {Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    </div>
  );
}
