export type ProductState =
  | 'InitialSetup'
  | 'LoanParameters'
  | 'AcceptanceCriteria'
  | 'Pricing'
  | 'RegulatoryCheck'
  | 'GoLive';

export interface ProductModel {
  // Initial Setup
  productName: string;
  targetCustomer: string;
  intendedUse: string;
  countryCode: string;
  currentState: ProductState;

  // Loan Parameters
  loanAmountMin?: number;
  loanAmountMax?: number;
  interestRateType?: 'fixed' | 'variable';
  repaymentTerm?: number;
  repaymentFrequency?: 'monthly' | 'quarterly' | 'annually';
  earlyRepaymentConditions?: string;

  // Acceptance Criteria
  collateralRequirements?: string;
  guarantees?: string;
  minCreditScore?: number;
  financialRatios?: string;
  industrySpecificCriteria?: string;

  // Pricing
  interestRateMin?: number;
  interestRateMax?: number;
  originationFee?: string;
  servicingFee?: string;
  latePaymentFee?: string;
  greenInvestmentDiscount?: number;
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
}