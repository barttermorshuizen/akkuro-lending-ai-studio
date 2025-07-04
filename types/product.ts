import { ConversationState } from "@/lib/stateMachine";

export type ProductState = ConversationState;

export interface ProductModel {
  // Initial Setup
  productName: string;
  targetCustomer: string;
  intendedUse: string;
  countryCode: string;
  currentState: ProductState;

  // Loan Parameters
  loanAmountMin?: string;
  loanAmountMax?: string;
  interestRateType?: "fixed" | "variable";
  repaymentTerm?: string;
  repaymentFrequency?: "monthly" | "quarterly" | "annually";
  earlyRepaymentConditions?: string;

  // Acceptance Criteria
  collateralRequirements?: string;
  guarantees?: string;
  minCreditScore?: number;
  financialRatios?: string;
  industrySpecificCriteria?: string;

  // Pricing
  interestRateMin?: string;
  interestRateMax?: string;
  originationFee?: string;
  servicingFee?: string;
  latePaymentFee?: string;
  discount?: string;
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
