import { ProductModel, ProductState } from "@/types/product";

export type ProductConfigurationDTO = {
  productName: string;
  targetCustomer: string;
  intendedUse: string;
  countryCode: string;
  currentState: ProductState;

  // Loan Parameters
  loanAmountMin?: string;
  loanAmountMax?: string;
  interestRateType?: string;
  repaymentTerm?: string;
  repaymentFrequency?: string;
  earlyRepaymentConditions?: string;

  // Acceptance Criteria
  collateralRequirements?: string;
  guarantees?: string;
  minCreditScore?: string;
  financialRatios?: string;
  industrySpecificCriteria?: string;

  // Pricing
  interestRateMin?: string;
  interestRateMax?: string;
  originationFee?: string;
  servicingFee?: string;
  latePaymentFee?: string;
  greenInvestmentDiscount?: string;
  earlyRepaymentPenalty?: string;

  // Regulatory
  regulatoryFramework?: string;
  requiredDocumentation?: string;
  complianceRequirements?: string;
  riskDisclosure?: string;
  reportingObligations?: string;

  // Go Live
  launchDate?: string;
  distributionChannels?: string[];
  monitoringRequirements?: string;
};

export const productsConfigurationMapping: Record<
  keyof ProductConfigurationDTO,
  string
> = {
  productName: "Loan product name",
  targetCustomer: "Target customer",
  intendedUse: "Intended use",
  countryCode: "Country",
  currentState: "Current state",

  loanAmountMin: "Min Loan Amount",
  loanAmountMax: "Max Loan Amount",
  interestRateType: "Interest rate type",
  repaymentTerm: "Repayment term",
  repaymentFrequency: "Repayment frequency",
  earlyRepaymentConditions: "Early repayment conditions",

  collateralRequirements: "Collateral requirement",
  guarantees: "Guarantees",
  minCreditScore: "Minimum credit score",
  financialRatios: "Financial ratios",
  industrySpecificCriteria: "Industry-specific criteria",

  interestRateMin: "Min interest rate",
  interestRateMax: "Max interest rate",
  originationFee: "Origination fee",
  servicingFee: "Servicing fee",
  latePaymentFee: "Late payment fee",
  greenInvestmentDiscount: "Green investment discount",
  earlyRepaymentPenalty: "Early repayment penalty",

  regulatoryFramework: "Regulatory framework",
  requiredDocumentation: "Required documentation",
  complianceRequirements: "Compliance requirements",
  riskDisclosure: "Risk disclosure",
  reportingObligations: "Reporting obligations",

  launchDate: "Launch date",
  distributionChannels: "Distribution channels",
  monitoringRequirements: "Monitoring requirements",
};

export const transformProductModelToProductConfigurationDTO = (
  productModel: ProductModel,
): ProductConfigurationDTO => {
  return {
    productName: productModel.productName,
    targetCustomer: productModel.targetCustomer,
    intendedUse: productModel.intendedUse,
    countryCode: productModel.countryCode,
    currentState: productModel.currentState,

    loanAmountMin: productModel.loanAmountMin?.toString().includes("€")
      ? productModel.loanAmountMin?.toString()
      : "€" + productModel.loanAmountMin?.toString(),
    loanAmountMax: productModel.loanAmountMax?.toString().includes("€")
      ? productModel.loanAmountMax?.toString()
      : "€" + productModel.loanAmountMax?.toString(),
    interestRateType: productModel.interestRateType,
    repaymentTerm: productModel.repaymentTerm?.toString(),
    repaymentFrequency: productModel.repaymentFrequency,
    earlyRepaymentConditions: productModel.earlyRepaymentConditions,

    collateralRequirements: productModel.collateralRequirements,
    guarantees: productModel.guarantees,
    minCreditScore: productModel.minCreditScore?.toString(),
    financialRatios: productModel.financialRatios,
    industrySpecificCriteria: productModel.industrySpecificCriteria,

    interestRateMin: productModel.interestRateMin?.toString().includes("%")
      ? productModel.interestRateMin?.toString()
      : productModel.interestRateMin?.toString() + "%",
    interestRateMax: productModel.interestRateMax?.toString().includes("%")
      ? productModel.interestRateMax?.toString()
      : productModel.interestRateMax?.toString() + "%",
    originationFee: productModel.originationFee,
    servicingFee: productModel.servicingFee,
    latePaymentFee: productModel.latePaymentFee,
    greenInvestmentDiscount: productModel.greenInvestmentDiscount?.toString(),
    earlyRepaymentPenalty: productModel.earlyRepaymentPenalty,

    regulatoryFramework: productModel.regulatoryFramework,
    requiredDocumentation: productModel.requiredDocumentation,
    complianceRequirements: productModel.complianceRequirements,
    riskDisclosure: productModel.riskDisclosure,
    reportingObligations: productModel.reportingObligations,

    launchDate: productModel.launchDate,
    distributionChannels: productModel.distributionChannels,
    monitoringRequirements: productModel.monitoringRequirements,
  };
};
