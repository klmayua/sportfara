import { create } from "zustand";

export type TrialStatus = "anonymous" | "free" | "trial" | "paid";

interface TrialState {
  status: TrialStatus;
  briefingsUsedToday: number;
  trialDaysRemaining: number;
  setTrialState: (s: Partial<Pick<TrialState, "status" | "briefingsUsedToday" | "trialDaysRemaining">>) => void;
}

export const useTrialStore = create<TrialState>((set) => ({
  status: "anonymous",
  briefingsUsedToday: 0,
  trialDaysRemaining: 7,
  setTrialState: (s) => set((prev) => ({ ...prev, ...s })),
}));
