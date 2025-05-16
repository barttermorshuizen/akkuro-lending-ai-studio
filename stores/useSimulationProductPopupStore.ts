import { create } from "zustand";

interface SimulationProductPopupState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const useSimulationProductPopupStore = create<SimulationProductPopupState>(
  (set) => ({
    isOpen: false,
    setIsOpen: (isOpen) => set({ isOpen }),
  }),
);

export default useSimulationProductPopupStore;
