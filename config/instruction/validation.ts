const COMMON_INSTRUCTIONS = `
    Validation:
    - If a user enters a value outside its recommended market range, reflect it back, warn them, explain the trade-offs, suggest the boundary value, and ask for explicit confirmation.
    - Here are the validation instructions for each parameter:
    Below is the validation example for the current industry, if user choose another industry, suggest the best fit validation instructions.
`;

export const VALIDATION_INSTRUCTIONS: Record<string, string> = {
  InitialSetup: `
    ${COMMON_INSTRUCTIONS}
    This is InitialSetup parameter validation instructions:
    - The geography is the country code of the country where the product will be offered.
    - The intended use is the purpose of the product.
    - The product name is the name of the product.
    - The targeted customer is the type of customer the product is designed for.
  `,
  SetRegulatoryCheckAtEveryStep: `
    ${COMMON_INSTRUCTIONS}
    This is SetRegulatoryCheckAtEveryStep parameter validation instructions:
    - The user should choose "Include in each step" or "Only at the end".
  `,
  LoanParameters: `
    ${COMMON_INSTRUCTIONS}
    This is LoanParameters parameter validation instructions:
    - Loan amount range should be between as normal as the market. If a user enters a value outside its recommended market range, reflect it back, warn them, explain the trade-offs, suggest the boundary value, and ask for explicit confirmation.
    - Repayment term should be between 36 to 48 months is the best fit for the market range. If a user enters a value outside its recommended market range, reflect it back, warn them, explain the trade-offs, suggest the boundary value, and ask for explicit confirmation.
    - Interest rate type have two options: fixed and variable. 
    - Repayment frequency options are monthly, quarterly, and annually.
  `,
  AcceptanceCriteria: ` 
    ${COMMON_INSTRUCTIONS}
    This is AcceptanceCriteria parameter validation instructions:
    - Collateral Requirements:  
      Check the current loan amount and suggest the collateral requirements.
      For example:
      If the current loan amount range is higher than the market range, suggest the collateral requirements for the recommended loan amount in the market range.

    - Guarantees Needed:  
      Check the current loan amount and suggest the guarantees needed.
    - Minimum Credit Score:  
      Market benchmark for SMEs: 650+.
      A good range for high approval rate is from 650 to 680, if user choose a higher value, explain the trade-offs and ask for explicit confirmation.
    - Financial Ratios:  
      DSCR (Debt Service Coverage Ratio): ≥ 1.2 (minimum).  
      • Current Ratio: ≥ 1.1.  
      • Debt/Equity Ratio: ≤ 2.0.  
    - Industry-Specific Criteria:  
      For example for Renewable Energy industry:
      • Borrower must have ≥ 2 years' operating history in RE projects.  
      • Project must demonstrate an IRR ≥ 8%.  
      • If funding solar or wind: require site permits and off-taker agreements in place.  
      If user choose a different industry, suggest the industry-specific criteria.
  `,
  Pricing: `
    ${COMMON_INSTRUCTIONS}
    This is Pricing parameter validation instructions:
    - interestRateMin (Minimum Interest Rate):
      Check the current loan amount configuration, the market range and suggest the interest rate range.

    - interestRateMax (Maximum Interest Rate):
      Check the current loan amount configuration, the market range and suggest the interest rate range.

    - originationFee:
      Check the current loan amount configuration, the market range and suggest the origination fee range.

    - servicingFee:
      Check the current loan amount configuration, the market range and suggest the servicing fee range. 

    - latePaymentFee:
        • Must be ≥ ECB refi + 8 pp (≈11.15% p.a.)
        • If < 11.15%: reflect “X% below statutory minimum”, warn non-compliance, suggest 11.15%, ask confirm

    - discount:
      Check the current loan amount configuration, the market range and suggest the industry-specific discount range.

    - earlyRepaymentPenalty:
      Check the current loan amount configuration, the market range and suggest the early repayment penalty range.
      For example:
      • If 0%: reflect “No penalty chosen”, warn loss of protection, suggest 1%, ask confirm
      • If > 2%: reflect “X% above 2%”, warn deterrence, suggest 2%, ask confirm
  `,
  RegulatoryCheck: `
    ${COMMON_INSTRUCTIONS}
    This is RegulatoryCheck parameter validation instructions:
    - regulatoryFramework:
      • Recommend one of: Basel III, MiFID II, PSD2.
      • If user enters unsupported value, ask for clarification or suggest known frameworks.

    - requiredDocumentation:
      • Valid options: Standard, Enhanced, Comprehensive.
      • Enhanced is recommended for green products. If user choose another industry, suggest the best fit documentation level.
      • If user skips, default to Enhanced and ask for confirmation.

    - complianceRequirements:
      • Recommend including at least one of: AML/KYC, GDPR, ESG disclosure, EU Taxonomy.
      • If left blank, prompt with examples and ask if they'd like to include any.

    - riskDisclosure:
      • At least one risk should be disclosed (e.g., climate, interest rate, FX, default).
      • If user enters “none” or skips, remind them that regulators expect transparency.

    - reportingObligations:
      • Acceptable options: Quarterly, Semi-annually, Annually.
      • For green loans, Quarterly or Semi-annually is preferred. If user choose another industry, suggest the reporting frequency.
      • If user selects Annual only, suggest Quarterly to align with ESG practices.
  `,
  GoLive: `
    ${COMMON_INSTRUCTIONS}
    This is GoLive parameter validation instructions:
    - launchDate:
      • Accept options like “Immediate”, “Next week”, or a specific ISO date (e.g., “2025-07-01”).
      • If user picks a date in the past, warn and ask for confirmation or adjustment.

    - distributionChannels:
      • Acceptable options: “Direct to customers”, “Through partners”, “Both”.
      • Recommend “Both” if product targets both digital and relationship channels.
      • If only one channel is selected, ask if user wants to consider expanding reach.

    - monitoringRequirements:
      • At least one metric should be tracked.
      • Recommend options like: “Monthly uptake”, “Quarterly default rate”, “Customer satisfaction survey”.
      • If skipped, offer 2-3 suggestions and ask for confirmation.
  `,
};
