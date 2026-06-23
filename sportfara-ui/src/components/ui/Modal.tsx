"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({ open, onClose, title, description, children, className }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-60 data-[state=open]:animate-fade-in" />
        <Dialog.Content
          className={cn(
            "fixed z-60 focus:outline-none",
            "w-full max-w-lg",
            "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "bg-surface-dark border border-white/10 rounded-3xl shadow-glass-lg",
            "data-[state=open]:animate-scale-in",
            "sm:rounded-3xl rounded-t-3xl rounded-b-none sm:top-1/2 sm:bottom-auto bottom-0 sm:translate-y-[-50%] translate-y-0",
            "max-h-[90dvh] overflow-y-auto",
            className
          )}
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                {title && (
                  <Dialog.Title className="text-lg font-bold text-white">
                    {title}
                  </Dialog.Title>
                )}
                {description && (
                  <Dialog.Description className="text-sm text-[#9CA3AF] mt-1">
                    {description}
                  </Dialog.Description>
                )}
              </div>
              <Dialog.Close
                onClick={onClose}
                className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-white/5 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-premium-orange"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </Dialog.Close>
            </div>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
