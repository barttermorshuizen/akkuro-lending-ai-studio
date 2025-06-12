import { COMPLIANCE_CHECK_PARAMETERS_CONFIG } from "./parameters-schemas";

const STORE_IS_REGULATORY_CHECK_AT_EVERY_STEP_TOOL_CONFIG = {
  name: "store_is_regulatory_check_at_every_step",
  description:
    "Set the regulatory check to be included at every step and store the regulatory check parameters. Only call this tool after user confirms the regulatory check option and regulatory check parameters",
  parameters: {
    includeRegulatoryCheckFromInitialSetup: {
      type: "boolean",
      description:
        "Whether regulatory checks should be included at each step or only at the end",
    },
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
};

const STORE_REGULATORY_CHECK_SECONDARY_TOOL_CONFIG = {
  name: "store_regulatory_check_secondary",
  description:
    "Store regulatory check information and check compliance for all parameters",
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
    ...COMPLIANCE_CHECK_PARAMETERS_CONFIG,
  },
};

const PDF_GENERATION_TOOLS_CONFIG = [
  {
    name: "generate_iso_compliance_pdf",
    description: "Generate an ISO declaration for the product",
    parameters: {
      productName: {
        type: "string",
        description: "The name of the loan product",
      },
      countryName: {
        type: "string",
        description: "Name of the country",
      },
      regulatoryFramework: {
        type: "string",
        description: "Applicable regulatory framework",
      },
      companyName: {
        type: "string",
        description: "The name of the company",
      },
      signatureLine: {
        type: "string",
        description: "The signature line of the ISO declaration",
      },
      scopeOfCompliance: {
        type: "string",
        description: "Scope of compliance",
      },
      complianceDetails: {
        type: "string",
        description: "Specific compliance details",
      },
    },
  },
  {
    name: "generate_eu_tax_compliance_pdf",
    description: "Generate an EU tax compliance declaration for the product",
    parameters: {
      productName: {
        type: "string",
        description: "The name of the loan product",
      },
      countryName: {
        type: "string",
        description: "Name of the country",
      },
      eligibleEconomicActivity: {
        type: "string",
        description: "Eligible economic activity",
      },
      alignmentCriteria: {
        type: "string",
        description: "Alignment criteria",
      },
      assessmentSummary: {
        type: "string",
        description: "Assessment summary",
      },
      companyName: {
        type: "string",
        description: "The name of the company",
      },
      regulatoryFramework: {
        type: "string",
        description: "Applicable regulatory framework",
      },
      signatureLine: {
        type: "string",
        description: "The signature line of the EU tax compliance declaration",
      },
    },
  },
  {
    name: "generate_esg_declaration_pdf",
    description: "Generate an ESG declaration for the product",
    parameters: {
      productName: {
        type: "string",
        description: "The name of the loan product",
      },
      countryName: {
        type: "string",
        description: "Name of the country",
      },
      signatureLine: {
        type: "string",
        description: "The signature line of the ESG declaration",
      },
      environmentalMeasures: {
        type: "string",
        description: "Environmental measures",
      },
      socialResponsibility: {
        type: "string",
        description: "Social responsibility",
      },
      governmancePractices: {
        type: "string",
        description: "Governance practices",
      },
      companyName: {
        type: "string",
        description: "The name of the company",
      },
      regulatoryFramework: {
        type: "string",
        description: "Applicable regulatory framework",
      },
    },
  },
];

const STORE_INITIAL_SETUP_TOOL_CONFIG = {
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
};

const STORE_LOAN_PARAMETERS_TOOL_CONFIG = {
  name: "store_loan_parameters",
  description: "Store loan parameters information",
  parameters: {
    loanAmountMin: {
      type: "string",
      description: "Minimum loan amount, include the user's country's currency",
    },
    loanAmountMax: {
      type: "string",
      description: "Maximum loan amount, include the user's country's currency",
    },
    interestRateType: {
      type: "string",
      description: "Type of interest rate (fixed or variable)",
    },
    repaymentTerm: {
      type: "string",
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
};

const STORE_ACCEPTANCE_CRITERIA_TOOL_CONFIG = {
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
};

const STORE_PRICING_TOOL_CONFIG = {
  name: "store_pricing",
  description: "Store pricing information",
  parameters: {
    interestRateMin: {
      type: "string",
      description: "Minimum interest rate, add suffix %",
    },
    interestRateMax: {
      type: "string",
      description: "Maximum interest rate, add suffix %",
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
    discount: {
      type: "string",
      description: "Discount percentage for the product, add suffix %",
    },
    earlyRepaymentPenalty: {
      type: "string",
      description: "Early repayment penalty structure",
    },
  },
};

const STORE_GO_LIVE_TOOL_CONFIG = {
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
};

const DO_COMPLIANCE_CHECK_TOOL_CONFIG = {
  name: "do_compliance_check",
  description: `Perform detailed compliance validation of loan parameters against country-specific regulations.
      VALIDATION RULES:
      1. NUMERIC RANGES: If paramValue is outside expectedRange, set isCompliant = false
        - Example: paramValue="150%" vs expectedRange="100%-120%" → isCompliant = false
      2. THRESHOLD VALUES: Check if values exceed legal/regulatory limits
      3. BOOLEAN COMPLIANCE: Check mandatory requirements vs actual implementation
      4. CONTEXTUAL VALIDATION: Consider regulatory framework type (legal vs policy)

      COMPLIANCE DETERMINATION:
      - Legal violations: MUST be isCompliant = false (can face penalties)
      - Policy non-compliance: May be isCompliant = false (best practice deviation)
      - Market recommendations: Use judgment based on severity

      OUTPUT REQUIREMENTS:
      - isCompliant: true/false based on strict regulatory evaluation
      - notes: Explain WHY compliant/non-compliant with specific regulation reference
      - expectedRange: Provide specific regulatory acceptable range/value

      EXAMPLES:
      ✅ Compliant: paramValue="10%" vs expectedRange="5%-15%" → isCompliant = true
      ❌ Non-compliant: paramValue="150%" vs expectedRange="100%-120%" → isCompliant = false`,
  parameters: {
    ...COMPLIANCE_CHECK_PARAMETERS_CONFIG,
  },
  required: ["countryCode", "parametersToCheck"],
};

const STORE_LOAN_PARAMETERS_SECONDARY_TOOL_CONFIG = {
  name: "store_loan_parameters_secondary",
  description:
    "Store loan parameters information and check compliance for loan parameters",
  parameters: {
    ...STORE_LOAN_PARAMETERS_TOOL_CONFIG.parameters,
    ...COMPLIANCE_CHECK_PARAMETERS_CONFIG,
  },
};

const STORE_ACCEPTANCE_CRITERIA_SECONDARY_TOOL_CONFIG = {
  name: "store_acceptance_criteria_secondary",
  description: "Store acceptance criteria information",
  parameters: {
    ...STORE_ACCEPTANCE_CRITERIA_TOOL_CONFIG.parameters,
    ...COMPLIANCE_CHECK_PARAMETERS_CONFIG,
  },
};

const STORE_PRICING_SECONDARY_TOOL_CONFIG = {
  name: "store_pricing_secondary",
  description:
    "Store pricing information and check compliance for the pricing parameters",
  parameters: {
    ...STORE_PRICING_TOOL_CONFIG.parameters,
    ...COMPLIANCE_CHECK_PARAMETERS_CONFIG,
  },
};

export {
  DO_COMPLIANCE_CHECK_TOOL_CONFIG,
  PDF_GENERATION_TOOLS_CONFIG,
  STORE_ACCEPTANCE_CRITERIA_SECONDARY_TOOL_CONFIG,
  STORE_ACCEPTANCE_CRITERIA_TOOL_CONFIG,
  STORE_GO_LIVE_TOOL_CONFIG,
  STORE_INITIAL_SETUP_TOOL_CONFIG,
  STORE_IS_REGULATORY_CHECK_AT_EVERY_STEP_TOOL_CONFIG,
  STORE_LOAN_PARAMETERS_SECONDARY_TOOL_CONFIG,
  STORE_LOAN_PARAMETERS_TOOL_CONFIG,
  STORE_PRICING_SECONDARY_TOOL_CONFIG,
  STORE_PRICING_TOOL_CONFIG,
  STORE_REGULATORY_CHECK_SECONDARY_TOOL_CONFIG,
};
