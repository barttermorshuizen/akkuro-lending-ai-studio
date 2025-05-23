const COMMON_INSTRUCTIONS = `
    Validation:
    - If a user enters a value outside its recommended market range, reflect it back, warn them, explain the trade-offs, suggest the boundary value, and ask for explicit confirmation.
    - Here are the validation instructions for each parameter:
`;

export const VALIDATION_INSTRUCTIONS: Record<string, string> = {
  InitialSetup: `
    ${COMMON_INSTRUCTIONS}
    This is InitialSetup parameter validation instructions:
    - The geography should be in Europe.
    - The intended use should be green investments.
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
      • For loans ≤ €100K: unsecured (no collateral) is common.  
      • For €100K - €250K: require collateral covering 50 - 80% of loan value (e.g., equipment pledge, real estate lien).  
    - Guarantees Needed:  
      • Personal guarantee for loans > €50K.  
      • Corporate guarantee or cross-default clause for loans > €150K.  
    - Minimum Credit Score:  
      • Market benchmark for SMEs: 650+.
      • A good range for high approval rate is from 650 to 680, if user choose a higher value, explain the trade-offs and ask for explicit confirmation.
    - Financial Ratios:  
      • DSCR (Debt Service Coverage Ratio): ≥ 1.2 (minimum).  
      • Current Ratio: ≥ 1.1.  
      • Debt/Equity Ratio: ≤ 2.0.  
    - Industry-Specific Criteria (Renewable Energy):  
      • Borrower must have ≥ 2 years' operating history in RE projects.  
      • Project must demonstrate an IRR ≥ 8%.  
      • If funding solar or wind: require site permits and off-taker agreements in place.  
  `,
  Pricing: `
    ${COMMON_INSTRUCTIONS}
    This is Pricing parameter validation instructions:
    - interestRateMin (Minimum Interest Rate):
      • Recommended range: 4.0%-6.0%
      • If below 4.0%: reflect back “You chose X%, below 4.0%”, warn margin squeeze, suggest 4.0%, ask “Keep X% or switch to 4.0%?”
      • If above 6.0%: reflect “You chose X%, above 6.0%”, warn borrower deterrence, suggest 6.0%, ask “Keep X% or switch to 6.0%?”

    - interestRateMax (Maximum Interest Rate):
      • Recommended: at least interestRateMin + 0.5%, up to 8.0%
      • If < interestRateMin + 0.5%: reflect inconsistency, suggest interestRateMin + 0.5%, ask confirm
      • If > 8.0%: reflect “X% exceeds 8.0%”, warn competitiveness loss, suggest 8.0%, ask confirm

    - originationFee:
      • Recommended: 1%-3% of loan amount
      • If < 1%: reflect “X% below 1%”, warn cost under-recovery, suggest 1%, ask confirm
      • If > 3%: reflect “X% above 3%”, warn borrower resistance, suggest 3%, ask confirm

    - servicingFee:
      • Recommended: 0.1%-0.5% p.a. of outstanding balance
      • If < 0.1%: reflect “X% below 0.1%”, warn admin cost gap, suggest 0.1%, ask confirm
      • If > 0.5%: reflect “X% above 0.5%”, warn pushback risk, suggest 0.5%, ask confirm

    - latePaymentFee:
      • Must be ≥ ECB refi + 8 pp (≈11.15% p.a.)
      • If < 11.15%: reflect “X% below statutory minimum”, warn non-compliance, suggest 11.15%, ask confirm

    - greenInvestmentDiscount:
      • Recommended: 0%-2%
      • If < 0%: reflect invalid, suggest 0%, ask confirm
      • If > 2%: reflect “X% above 2%”, warn overly generous, suggest 2%, ask confirm

    - earlyRepaymentPenalty:
      • Recommended: around 1% of outstanding balance
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
      • Enhanced is recommended for green products.
      • If user skips, default to Enhanced and ask for confirmation.

    - complianceRequirements:
      • Recommend including at least one of: AML/KYC, GDPR, ESG disclosure, EU Taxonomy.
      • If left blank, prompt with examples and ask if they'd like to include any.

    - riskDisclosure:
      • At least one risk should be disclosed (e.g., climate, interest rate, FX, default).
      • If user enters “none” or skips, remind them that regulators expect transparency.

    - reportingObligations:
      • Acceptable options: Quarterly, Semi-annually, Annually.
      • For green loans, Quarterly or Semi-annually is preferred.
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
