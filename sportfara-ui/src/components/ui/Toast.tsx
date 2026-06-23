"use client";
import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type ToastType = "success" | "error" | "info";

interface ToastProps {
  type?: ToastType;
  message: string;
  duration?: number;
  onClose?: () => void;
}

const typeConfig: Record<ToastType, { icon: React.ElementType; classes: string }> = {
  success: { icon: CheckCircle, classes: "border-trust-green/30 bg-trust-green/10 text-trust-green" },
  error: { icon: XCircle, classes: "border-error/30 bg-error/10 text-error" },
  info: { icon: Info, classes: "border-info/30 bg-info/10 text-info" },
};

export default function Toast({ type = "info", message, duration = 4000, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true);
  const { icon: Icon, classes } = typeConfig[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.25 }}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-sm",
            "shadow-glass max-w-sm w-full",
            classes
          )}
          role="alert"
          aria-live="polite"
        >
          <Icon className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium text-white flex-1">{message}</p>
          <button
            onClick={() => { setVisible(false); onClose?.(); }}
            className="text-white/50 hover:text-white cursor-pointer focus:outline-none"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
