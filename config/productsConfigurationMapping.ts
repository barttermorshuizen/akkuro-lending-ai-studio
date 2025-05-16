import { ProductModel } from "@/types/product";

export type ProductConfigurationDTO = {
  productName: string;
  targetSegment: string;
  intendedUse: string;
  countryCode: string;
  currentState: string;
  loanAmountRange: string;
  interestRateType: string;
  repaymentTermOptions: string;
  interestRates: string;
  collateralRequirement: string;
  minimumRevenue: string;
  minimumOperatingHistory: string;
  creditScoreThreshold: string;
  sustainabilityIncentive: string;
  earlyRepaymentBenefit: string;
};

export const productsConfigurationMapping: Record<
  keyof ProductConfigurationDTO,
  string
> = {
  productName: "Loan product name",
  targetSegment: "Target segment",
  intendedUse: "Intended use",
  loanAmountRange: "Loan amount range",
  interestRateType: "Interest rate (tired)",
  repaymentTermOptions: "Repayment term options",
  interestRates: "Interest rates",
  collateralRequirement: "Collateral requirement",
  minimumRevenue: "Minimum revenue",
  minimumOperatingHistory: "Minimum operating history (months)",
  creditScoreThreshold: "Credit score threshold",
  sustainabilityIncentive: "Sustainability incentive",
  earlyRepaymentBenefit: "Early repayment benefit",
  countryCode: "Country code",
  currentState: "Current state",
};

export const transformProductModelToProductConfigurationDTO = (
  productModel: ProductModel,
): ProductConfigurationDTO => {
  return {
    productName: productModel.productName,
    targetSegment: productModel.targetCustomer,
    intendedUse: productModel.intendedUse,
    countryCode: productModel.countryCode,
    currentState: productModel.currentState,
    loanAmountRange:
      productModel.loanAmountMin + " - " + productModel.loanAmountMax,
    interestRateType: productModel.interestRateType || "",
    repaymentTermOptions: productModel.repaymentTerm?.toString() || "",
    interestRates:
      productModel.interestRateMin + " - " + productModel.interestRateMax,
    collateralRequirement:
      productModel.collateralRequirements?.toString() || "",
    minimumRevenue: productModel.servicingFee?.toString() || "",
    minimumOperatingHistory: productModel.minCreditScore?.toString() || "",
    creditScoreThreshold: productModel.minCreditScore?.toString() || "",
    sustainabilityIncentive:
      productModel.greenInvestmentDiscount?.toString() || "",
    earlyRepaymentBenefit:
      productModel.earlyRepaymentConditions?.toString() || "",
  };
};
