import { create } from "zustand";

interface RegulatoryCheckStore {
  includeRegulatoryCheckFromInitialSetup: boolean;
  setIncludeRegulatoryCheckFromInitialSetup: (
    includeRegulatoryCheckFromInitialSetup: boolean,
  ) => void;
}

export const useRegulatoryCheckStore = create<RegulatoryCheckStore>((set) => ({
  includeRegulatoryCheckFromInitialSetup: false,
  setIncludeRegulatoryCheckFromInitialSetup: (
    includeRegulatoryCheckFromInitialSetup: boolean,
  ) => set({ includeRegulatoryCheckFromInitialSetup }),
}));
