"use client";
import Modal from "@/components/ui/Modal";
import PricingTable from "./PricingTable";

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
  locale?: "en" | "fr";
}

export default function UpgradeModal({ open, onClose, locale = "en" }: UpgradeModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={locale === "fr" ? "Choisissez votre abonnement" : "Choose your plan"}
      description={locale === "fr"
        ? "Intelligence quotidienne illimitée. En anglais et en français."
        : "Unlimited daily intelligence. English and French."}
      className="max-w-3xl"
    >
      <PricingTable locale={locale} />
    </Modal>
  );
}
