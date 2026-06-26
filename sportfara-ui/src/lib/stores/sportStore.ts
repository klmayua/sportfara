import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ActiveSport =
  | "all" | "football" | "athletics" | "rugby"
  | "basketball" | "cricket" | "cycling" | "handball" | "boxing";

interface SportState {
  activeSport: ActiveSport;
  setSport: (sport: ActiveSport) => void;
}

export const useSportStore = create<SportState>()(
  persist(
    (set) => ({ activeSport: "all", setSport: (sport) => set({ activeSport: sport }) }),
    { name: "sf_sport" }
  )
);

export const SPORT_PILLS: { key: ActiveSport; label: string }[] = [
  { key: "all",        label: "All sports" },
  { key: "football",   label: "Football" },
  { key: "athletics",  label: "Athletics" },
  { key: "rugby",      label: "Rugby" },
  { key: "basketball", label: "Basketball" },
  { key: "cricket",    label: "Cricket" },
  { key: "cycling",    label: "Cycling" },
  { key: "handball",   label: "Handball" },
  { key: "boxing",     label: "Boxing" },
];

export const SPORT_LABELS: Record<ActiveSport, string> = {
  all: "All sports", football: "Football", athletics: "Athletics",
  rugby: "Rugby", basketball: "Basketball", cricket: "Cricket",
  cycling: "Cycling", handball: "Handball", boxing: "Boxing",
};
