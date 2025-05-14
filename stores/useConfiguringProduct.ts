import { ProductConfigurationDTO } from "@/config/productsConfigurationMapping";
import { create } from "zustand";

interface ConfiguringProductState {
  product: ProductConfigurationDTO | null;
  setProduct: (product: ProductConfigurationDTO) => void;
}

const emptyProduct: ProductConfigurationDTO = {
  productName: "",
  targetSegment: "",
  intendedUse: "",
  countryCode: "",
  currentState: "",
  loanAmountRange: "",
  interestRateType: "",
  repaymentTermOptions: "",
  interestRates: "",
  collateralRequirement: "",
  minimumRevenue: "",
  minimumOperatingHistory: "",
  creditScoreThreshold: "",
  sustainabilityIncentive: "",
  earlyRepaymentBenefit: "",
};

const useConfiguringProduct = create<ConfiguringProductState>((set) => ({
  product: null,
  setProduct: (product: ProductConfigurationDTO) => set({ product }),
}));

export default useConfiguringProduct;
