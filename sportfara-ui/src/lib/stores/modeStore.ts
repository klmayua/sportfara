import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ActiveMode = "signal" | "intel" | "origin";

interface ModeState {
  activeMode: ActiveMode;
  setMode: (mode: ActiveMode) => void;
}

export const useModeStore = create<ModeState>()(
  persist(
    (set) => ({
      activeMode: "signal",
      setMode: (mode) => set({ activeMode: mode }),
    }),
    { name: "sf_mode" }
  )
);
