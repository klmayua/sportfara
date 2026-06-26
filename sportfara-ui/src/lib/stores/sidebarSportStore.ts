import { create } from "zustand";

export type SidebarSport = "all" | "football" | "rugby" | "athletics" | "nba" | "cricket";

export const SIDEBAR_TABS: { key: SidebarSport; label: string }[] = [
  { key: "all",       label: "All" },
  { key: "football",  label: "Football" },
  { key: "rugby",     label: "Rugby" },
  { key: "athletics", label: "Athletics" },
  { key: "nba",       label: "NBA" },
  { key: "cricket",   label: "Cricket" },
];

interface SidebarSportState {
  activeSidebarSport: SidebarSport;
  setSidebarSport: (sport: SidebarSport) => void;
}

export const useSidebarSportStore = create<SidebarSportState>((set) => ({
  activeSidebarSport: "all",
  setSidebarSport: (sport) => set({ activeSidebarSport: sport }),
}));
