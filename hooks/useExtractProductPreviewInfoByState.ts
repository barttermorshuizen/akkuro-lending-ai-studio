import useConfiguringProductStore from "@/stores/useConfiguringProductStore";

export default function useExtractProductPreviewInfoByState() {
  const { product } = useConfiguringProductStore();

  const productName = product?.productName;

  const initialSetup = {
    targetCustomer: product?.targetCustomer,
    intendedUse: product?.intendedUse,
    countryCode: product?.countryCode,
    currentState: product?.currentState,
  };

  const loanParameters = {
    loanAmountMin: product?.loanAmountMin,
    loanAmountMax: product?.loanAmountMax,
    interestRateType: product?.interestRateType,
    repaymentTerm: product?.repaymentTerm,
    repaymentFrequency: product?.repaymentFrequency,
    earlyRepaymentConditions: product?.earlyRepaymentConditions,
  };

  const acceptanceCriteria = {
    collateralRequirements: product?.collateralRequirements,
    guarantees: product?.guarantees,
    minCreditScore: product?.minCreditScore,
    financialRatios: product?.financialRatios,
    industrySpecificCriteria: product?.industrySpecificCriteria,
  };

  const pricing = {
    interestRateMin: product?.interestRateMin,
    interestRateMax: product?.interestRateMax,
    originationFee: product?.originationFee,
    servicingFee: product?.servicingFee,
    latePaymentFee: product?.latePaymentFee,
    greenInvestmentDiscount: product?.greenInvestmentDiscount,
    earlyRepaymentPenalty: product?.earlyRepaymentPenalty,
  };

  const regulatory = {
    regulatoryFramework: product?.regulatoryFramework,
    requiredDocumentation: product?.requiredDocumentation,
    complianceRequirements: product?.complianceRequirements,
    riskDisclosure: product?.riskDisclosure,
    reportingObligations: product?.reportingObligations,
  };

  const goLive = {
    launchDate: product?.launchDate,
    distributionChannels: product?.distributionChannels,
    monitoringRequirements: product?.monitoringRequirements,
  };

  return {
    productName,
    initialSetup,
    loanParameters,
    acceptanceCriteria,
    pricing,
    regulatory,
    goLive,
  };
}
