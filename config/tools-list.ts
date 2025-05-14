export const toolsList = [
  {
    name: "store_initial_setup",
    description: "Store initial product setup information",
    parameters: {
      productName: {
        type: "string",
        description: "The name of the loan product",
      },
      targetCustomer: {
        type: "string",
        description: "The type of customer the product targets",
      },
      intendedUse: {
        type: "string",
        description:
          "The intended use of the loan product (e.g. renewable energy, eco-upgrades)",
      },
      countryCode: {
        type: "string",
        description:
          "The 2-letter ISO 3166-1 country code (e.g. 'GB' for United Kingdom, 'US' for United States)",
      },
    },
  },
  {
    name: "store_loan_parameters",
    description: "Store loan parameters information",
    parameters: {
      loanAmountMin: {
        type: "number",
        description: "Minimum loan amount",
      },
      loanAmountMax: {
        type: "number",
        description: "Maximum loan amount",
      },
      interestRateType: {
        type: "string",
        description: "Type of interest rate (fixed or variable)",
      },
      repaymentTerm: {
        type: "number",
        description: "Loan repayment term in months",
      },
      repaymentFrequency: {
        type: "string",
        description: "Frequency of repayments (monthly, quarterly, annually)",
      },
      earlyRepaymentConditions: {
        type: "string",
        description: "Conditions for early repayment",
      },
    },
  },
  {
    name: "store_acceptance_criteria",
    description: "Store acceptance criteria information",
    parameters: {
      collateralRequirements: {
        type: "string",
        description: "Required collateral for the loan",
      },
      guarantees: {
        type: "string",
        description: "Required guarantees",
      },
      minCreditScore: {
        type: "number",
        description: "Minimum required credit score",
      },
      financialRatios: {
        type: "string",
        description: "Required financial ratios",
      },
      industrySpecificCriteria: {
        type: "string",
        description: "Industry-specific acceptance criteria",
      },
    },
  },
  {
    name: "store_pricing",
    description: "Store pricing information",
    parameters: {
      interestRateMin: {
        type: "number",
        description: "Minimum interest rate",
      },
      interestRateMax: {
        type: "number",
        description: "Maximum interest rate",
      },
      originationFee: {
        type: "string",
        description: "Origination fee structure",
      },
      servicingFee: {
        type: "string",
        description: "Servicing fee structure",
      },
      latePaymentFee: {
        type: "string",
        description: "Late payment fee structure",
      },
      greenInvestmentDiscount: {
        type: "number",
        description: "Discount percentage for green investments",
      },
      earlyRepaymentPenalty: {
        type: "string",
        description: "Early repayment penalty structure",
      },
    },
  },
  {
    name: "store_regulatory_check",
    description: "Store regulatory check information",
    parameters: {
      regulatoryFramework: {
        type: "string",
        description: "Applicable regulatory framework",
      },
      requiredDocumentation: {
        type: "string",
        description: "Required documentation level",
      },
      complianceRequirements: {
        type: "string",
        description: "Specific compliance requirements",
      },
      riskDisclosure: {
        type: "string",
        description: "Risk disclosure requirements",
      },
      reportingObligations: {
        type: "string",
        description: "Reporting obligations",
      },
    },
  },
  {
    name: "store_go_live",
    description: "Store go-live information",
    parameters: {
      launchDate: {
        type: "string",
        description: "Planned launch date",
      },
      distributionChannels: {
        type: "array",
        description: "Distribution channels for the product",
        items: {
          type: "string",
        },
      },
      monitoringRequirements: {
        type: "string",
        description: "Product monitoring requirements",
      },
    },
  },
  {
    name: "read_product",
    description: "Read the stored loan product model from the Google Sheet",
    parameters: {},
  },
  {
    name: "product_stimulation",
    description: "Stimulate the product creation process",
    parameters: {},
  },
];
