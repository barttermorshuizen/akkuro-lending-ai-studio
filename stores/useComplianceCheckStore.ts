import { ComplianceCheckProductParametersModel } from "@/types/compliance-check-model";
import { create } from "zustand";

interface ComplianceCheckStore {
  complianceCheck: ComplianceCheckProductParametersModel | null;
  setComplianceCheck: (
    complianceCheck: ComplianceCheckProductParametersModel | null,
  ) => void;
}

export const useComplianceCheckStore = create<ComplianceCheckStore>((set) => ({
  complianceCheck: null,
  setComplianceCheck: (
    complianceCheck: ComplianceCheckProductParametersModel | null,
  ) => set({ complianceCheck }),
}));
