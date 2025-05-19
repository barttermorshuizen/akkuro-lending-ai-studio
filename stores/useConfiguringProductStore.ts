import { ProductConfigurationDTO } from "@/config/productsConfigurationMapping";
import { ProductState } from "@/types/product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ConfiguringProductState {
  product: ProductConfigurationDTO | null;
  setProduct: (product: ProductConfigurationDTO | null) => void;
  resetProduct: () => void;
}

const emptyProduct: ProductConfigurationDTO = {
  productName: "",
  targetCustomer: "",
  intendedUse: "",
  countryCode: "",
  currentState: "InitialSetup" as ProductState,
  loanAmountMin: 0,
  loanAmountMax: 0,
  interestRateType: "fixed",
  repaymentTerm: 0,
  repaymentFrequency: "monthly",
  earlyRepaymentConditions: "",
  collateralRequirements: "",
  guarantees: "",
  minCreditScore: 0,
  financialRatios: "",
  industrySpecificCriteria: "",
  interestRateMin: 0,
  interestRateMax: 0,
  originationFee: "",
  servicingFee: "",
  latePaymentFee: "",
  greenInvestmentDiscount: 0,
  earlyRepaymentPenalty: "",
  regulatoryFramework: "",
  requiredDocumentation: "",
  complianceRequirements: "",
  riskDisclosure: "",
  reportingObligations: "",
  launchDate: "",
  distributionChannels: [],
  monitoringRequirements: "",
};

const useConfiguringProductStore = create<ConfiguringProductState>()(
  persist(
    (set) => ({
      product: emptyProduct,
      setProduct: (product) => {
        set({ product });
      },
      resetProduct: () => {
        set({ product: emptyProduct });
      },
    }),
    {
      name: "product",
    },
  ),
);

export default useConfiguringProductStore;
