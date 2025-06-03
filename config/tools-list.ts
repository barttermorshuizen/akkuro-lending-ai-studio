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
    name: "product_simulation",
    description: "Simulate the product creation process",
    parameters: {},
  },
  {
    name: "store_is_regulatory_check_at_every_step",
    description: "Set the regulatory check to be included at every step",
    parameters: {
      includeRegulatoryCheckFromInitialSetup: {
        type: "boolean",
        description:
          "Whether regulatory checks should be included at each step or only at the end",
      },
    },
  },
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
  {
    name: "current_collected_parameters_compliance_check",
    description:
      "Check if current collected parameters at current state comply with relevant regulations, returning details per parameter",
    parameters: {
      countryCode: {
        type: "string",
        description:
          "The 2-letter ISO country code (e.g. 'NL', 'US') to determine the applicable regulations",
      },
      parametersToCheck: {
        type: "array",
        description: "List of loan parameters to check against regulations",
        items: {
          type: "object",
          properties: {
            productParam: {
              type: "string",
              description:
                "The loan parameter name (e.g. loanAmountMax, interestRateType)",
            },
            productParamDescription: {
              type: "string",
              description: "Description of the loan parameter",
            },
            paramValue: {
              type: "string",
              description: "The current value of the product parameter",
            },
            regulationDescription: {
              type: "string",
              description: "Short description of the regulation that applies",
            },
            expectedRange: {
              type: "string",
              description:
                "Expected value or range according to the regulation",
            },
            isCompliant: {
              type: "boolean",
              description:
                "Whether the parameter value complies with the regulation",
            },
            notes: {
              type: "string",
              description: "Optional explanation of compliance or failure",
            },
          },
          required: [
            "productParam",
            "productParamDescription",
            "paramValue",
            "regulationDescription",
            "expectedRange",
            "isCompliant",
            "notes",
          ],
        },
      },
    },
    required: ["countryCode", "parametersToCheck"],
  },
  {
    name: "store_loan_parameters_and_check_compliance",
    description:
      "Store loan parameters information and check compliance for the loan parameters, returning details per parameter",
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
      countryCode: {
        type: "string",
        description:
          "The 2-letter ISO country code (e.g. 'NL', 'US') to determine the applicable regulations",
      },
      parametersToCheck: {
        type: "array",
        description: "List of loan parameters to check against regulations",
        items: {
          type: "object",
          properties: {
            productParam: {
              type: "string",
              description:
                "The loan parameter name (e.g. loanAmountMax, interestRateType)",
            },
            productParamDescription: {
              type: "string",
              description: "Description of the loan parameter",
            },
            paramValue: {
              type: "string",
              description: "The current value of the product parameter",
            },
            regulationDescription: {
              type: "string",
              description: "Short description of the regulation that applies",
            },
            expectedRange: {
              type: "string",
              description:
                "Expected value or range according to the regulation",
            },
            isCompliant: {
              type: "boolean",
              description:
                "Whether the parameter value complies with the regulation",
            },
            notes: {
              type: "string",
              description: "Optional explanation of compliance or failure",
            },
          },
          required: [
            "productParam",
            "productParamDescription",
            "paramValue",
            "regulationDescription",
            "expectedRange",
            "isCompliant",
            "notes",
          ],
        },
      },
    },
  },
];

export const compatibleCheckConfig = {
  countryCode: {
    type: "string",
    description:
      "The 2-letter ISO country code (e.g. 'NL', 'US') to determine the applicable regulations",
  },
  parametersToCheck: {
    type: "array",
    description:
      "List of product parameters at current state to check against regulations",
    items: {
      type: "object",
      properties: {
        productParam: {
          type: "string",
          description:
            "The product parameter name (e.g. loanAmountMax, interestRateType, collateralRequirements) at current state",
        },
        productParamDescription: {
          type: "string",
          description: "Description of the product parameter",
        },
        paramValue: {
          type: "string",
          description: "The current value of the product parameter",
        },
        regulationDescription: {
          type: "string",
          description: "Short description of the regulation that applies",
        },
        expectedRange: {
          type: "string",
          description: "Expected value or range according to the regulation",
        },
        isCompliant: {
          type: "boolean",
          description:
            "Whether the parameter value complies with the regulation",
        },
        notes: {
          type: "string",
          description: "Optional explanation of compliance or failure",
        },
      },
      required: [
        "productParam",
        "productParamDescription",
        "paramValue",
        "regulationDescription",
        "expectedRange",
        "isCompliant",
        "notes",
      ],
    },
  },
};

export const toolsListCompatableCheck = [
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
    },
  },
  {
    name: "store_loan_parameters_and_check_compliance",
    description:
      "Store loan parameters information and check compliance for the loan parameters, returning details per parameter",
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
      ...compatibleCheckConfig,
    },
  },
  {
    name: "store_acceptance_criteria_and_check_compliance",
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
      ...compatibleCheckConfig,
    },
  },
  {
    name: "store_pricing_and_check_compliance",
    description:
      "Store pricing information and check compliance for the pricing parameters",
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
        description: "Discount percentage for the product",
      },
      earlyRepaymentPenalty: {
        type: "string",
        description: "Early repayment penalty structure",
      },
      ...compatibleCheckConfig,
    },
  },
  {
    name: "store_regulatory_check_and_check_compliance",
    description:
      "Store regulatory check information and check compliance for the regulatory check parameters",
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
      ...compatibleCheckConfig,
    },
  },
  {
    name: "store_go_live_and_check_compliance",
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
      ...compatibleCheckConfig,
    },
  },
  {
    name: "read_product",
    description: "Read the stored loan product model from the Google Sheet",
    parameters: {},
  },
  {
    name: "product_simulation",
    description: "Simulate the product creation process",
    parameters: {},
  },
  {
    name: "store_is_regulatory_check_at_every_step",
    description: "Set the regulatory check to be included at every step",
    parameters: {
      includeRegulatoryCheckFromInitialSetup: {
        type: "boolean",
        description:
          "Whether regulatory checks should be included at each step or only at the end",
      },
    },
  },
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
  {
    name: "current_collected_parameters_compliance_check",
    description:
      "Check if current collected parameters at current state comply with relevant regulations, returning details per parameter",
    parameters: {
      ...compatibleCheckConfig,
    },
  },
];
