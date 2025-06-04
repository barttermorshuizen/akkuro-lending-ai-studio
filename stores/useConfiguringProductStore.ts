import { ProductConfigurationDTO } from "@/config/productsConfigurationMapping";
import { ProductModel, ProductState } from "@/types/product";
import { create } from "zustand";

interface ConfiguringProductState {
  product: ProductConfigurationDTO | null;
  setProduct: (product: ProductConfigurationDTO | null) => void;
  resetProduct: () => void;
  isDisplayProductPreview: boolean;
  setIsDisplayProductPreview: (isDisplayProductPreview: boolean) => void;
}

export const emptyProductModel: ProductModel = {
  productName: "",
  targetCustomer: "",
  intendedUse: "",
  countryCode: "",
  currentState: "InitialSetup" as ProductState,
  loanAmountMin: undefined,
  loanAmountMax: undefined,
  interestRateType: undefined,
  repaymentTerm: undefined,
  repaymentFrequency: undefined,
  earlyRepaymentConditions: "",
  collateralRequirements: "",
  guarantees: "",
  minCreditScore: undefined,
  financialRatios: "",
  industrySpecificCriteria: "",
  interestRateMin: undefined,
  interestRateMax: undefined,
  originationFee: "",
  servicingFee: "",
  latePaymentFee: "",
  greenInvestmentDiscount: undefined,
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

export const emptyProduct: ProductConfigurationDTO = {
  productName: "",
  targetCustomer: "",
  intendedUse: "",
  countryCode: "",
  currentState: "InitialSetup" as ProductState,
  loanAmountMin: "",
  loanAmountMax: "",
  interestRateType: "",
  repaymentTerm: "",
  repaymentFrequency: "",
  earlyRepaymentConditions: "",
  collateralRequirements: "",
  guarantees: "",
  minCreditScore: "",
  financialRatios: "",
  industrySpecificCriteria: "",
  interestRateMin: "",
  interestRateMax: "",
  originationFee: "",
  servicingFee: "",
  latePaymentFee: "",
  greenInvestmentDiscount: "",
  earlyRepaymentPenalty: "",
  regulatoryFramework: "",
  requiredDocumentation: "",
  complianceRequirements: "",
  riskDisclosure: "",
  reportingObligations: "",
  launchDate: "",
  distributionChannels: "",
  monitoringRequirements: "",
};

const useConfiguringProductStore = create<ConfiguringProductState>()((set) => ({
  product: emptyProduct,
  setProduct: (product) => {
    set({ product });
  },
  resetProduct: () => {
    set({ product: emptyProduct });
  },
  isDisplayProductPreview: false,
  setIsDisplayProductPreview: (isDisplayProductPreview) => {
    set({ isDisplayProductPreview });
  },
}));

export default useConfiguringProductStore;
