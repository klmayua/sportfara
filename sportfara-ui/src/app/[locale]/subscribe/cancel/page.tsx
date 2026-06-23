import { use } from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";

export default function SubscribeCancelPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: L } = use(params);
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="glass-card p-8 max-w-md w-full text-center space-y-5">
        <h1 className="text-xl font-bold text-white">
          {L === "fr" ? "Paiement annulé" : "Payment cancelled"}
        </h1>
        <p className="text-sm" style={{ color: "#9CA3AF" }}>
          {L === "fr"
            ? "Aucun paiement n'a été effectué. Revenez quand vous voulez."
            : "No payment was taken. Come back when you're ready."}
        </p>
        <Link
          href={`/${L}${ROUTES.HOME}`}
          className="inline-flex items-center justify-center w-full h-11 rounded-xl border text-white text-sm font-medium transition-colors cursor-pointer focus:outline-none"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          {L === "fr" ? "Retour au fil d'actu" : "Back to Feed"}
        </Link>
      </div>
    </div>
  );
}
