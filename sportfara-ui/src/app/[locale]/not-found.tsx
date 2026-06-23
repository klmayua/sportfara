import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <p className="font-mono text-8xl font-extrabold text-premium-orange opacity-20">404</p>
          <h1 className="text-2xl font-bold text-white">This page doesn&apos;t exist.</h1>
          <p className="text-sm text-[#9CA3AF]">
            The page you&apos;re looking for has moved or never existed.
          </p>
        </div>
        <Link
          href={`/en${ROUTES.HOME}`}
          className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-premium-orange hover:bg-premium-orange-hover text-white font-semibold text-sm transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-premium-orange"
        >
          Go to Feed
        </Link>
      </div>
    </div>
  );
}
