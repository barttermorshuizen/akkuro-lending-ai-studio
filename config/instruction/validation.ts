const COMMON_INSTRUCTIONS = `
    Validation Guidelines:
    - Always consider the user's specific geography, industry, and target customer when validating parameters
    - MANDATORY: Validate ALL financial parameters against local laws and regulatory requirements
    - When a user enters a value outside typical market ranges, reflect it back, explain regional/industry context, warn about potential trade-offs, suggest contextually appropriate alternatives, and ask for explicit confirmation
    - LEGAL COMPLIANCE FIRST: If any parameter violates local laws, immediately flag as non-compliant and require adjustment
    - The examples below are illustrative - you must adapt ranges, thresholds, and recommendations based on:
      • Geographic location and local regulations
      • Industry sector and market norms
      • Target customer segment (SME, corporate, retail, etc.)
      • Local economic conditions and market maturity
      • CURRENT LEGAL REQUIREMENTS and regulatory frameworks
    - Always research and apply current regulatory requirements for the user's specific jurisdiction
    - Provide 2-3 contextually relevant options when suggesting alternatives
    - FLAG NON-COMPLIANCE: Use ⚠️🚨 for legal violations, ⚠️ for market concerns
`;

export const VALIDATION_INSTRUCTIONS: Record<string, string> = {
  InitialSetup: `
    ${COMMON_INSTRUCTIONS}
    InitialSetup Parameter Validation:
    
    Geography Validation:
    - Accept ISO country codes (e.g., "US", "DE", "SG", "BR")
    - Research and apply specific regulatory frameworks for the selected country
    - Consider regional economic conditions and market maturity
    - LEGAL REQUIREMENT: Verify lending license requirements for the geography
    - Example: For emerging markets, suggest more conservative loan parameters; for developed markets, allow broader ranges
    
    Industry Validation:
    - Adapt all subsequent validations based on industry risk profile and regulatory requirements
    - LEGAL REQUIREMENT: Check for industry-specific lending regulations
    - Examples of industry considerations:
      • Financial Services: Higher regulatory scrutiny, lower risk tolerance, specific capital requirements
      • Healthcare: Stable cash flows, moderate risk, professional licensing considerations
      • Technology: Higher volatility, growth potential, intellectual property considerations
      • Manufacturing: Asset-heavy, cyclical considerations, environmental regulations
      • Renewable Energy: ESG focus, policy-dependent, government incentive frameworks
    - Always ask for specific industry sub-sector for more precise validation
    
    Target Customer Validation:
    - Adjust parameters based on customer segment and LOCAL LEGAL DEFINITIONS
    - LEGAL REQUIREMENT: Verify local definitions of customer segments (SME thresholds vary by country)
    - Research local customer protection laws for each segment:
      • SME (Small-Medium Enterprise): Check local SME definitions and lending caps
      • Corporate: Verify commercial lending regulations
      • Retail: CRITICAL - Consumer protection laws apply, stricter regulations
    - Consider local market definitions of customer segments and their legal protections
  `,

  SetRegulatoryCheckAtEveryStep: `
    ${COMMON_INSTRUCTIONS}
    Regulatory Check Frequency Validation:
    
    - Standard options: "Include in each step" or "Only at the end"
    - LEGAL REQUIREMENT: Some jurisdictions mandate step-by-step compliance validation
    - Recommend based on:
      • Geography: EU requires step-by-step for certain products; US may allow end-validation
      • Industry: Highly regulated sectors (financial services, healthcare) benefit from step-by-step
      • Product complexity: Complex products need continuous validation
      • LEGAL MANDATE: Check if local law requires continuous compliance monitoring
    - If user chooses "Only at the end" for high-risk scenarios, warn about potential compliance issues
  `,

  LoanParameters: `
    ${COMMON_INSTRUCTIONS}
    Loan Parameters Validation (MANDATORY legal compliance for all parameters):
    
    Loan Amount Range - LEGAL VALIDATION REQUIRED:
    - Research local market standards AND legal limits for the user's geography and industry
    - LEGAL REQUIREMENTS to verify:
      • Lending license limits (many countries cap loan amounts based on license type)
      • SME/Corporate lending definitions and maximum amounts
      • Consumer vs. business lending legal distinctions
      • Cross-border lending restrictions
    - Examples (adapt based on context):
      • US SME: Check state lending license limits, federal regulations
      • EU SME: Verify national implementations of SME lending directives
      • APAC SME: Varies by country - research central bank regulations
    - 🚨 FLAG if amount exceeds legal lending limits for institution type
    
    Repayment Term - LEGAL VALIDATION REQUIRED:
    - Base recommendations on local market norms AND maximum legal terms
    - LEGAL REQUIREMENTS to verify:
      • Consumer protection laws (maximum term limits)
      • Asset-based lending regulations (equipment life restrictions)
      • Usury law implications for longer terms
      • Industry-specific term restrictions
    - Examples (adapt to context):
      • Working capital: Check local business lending term limits
      • Equipment financing: Verify asset depreciation legal requirements
      • Real estate: Research mortgage vs. business lending legal distinctions
    - 🚨 FLAG if terms exceed legal maximums
    
    Interest Rate Type - LEGAL VALIDATION REQUIRED:
    - Consider local market preferences AND legal requirements
    - LEGAL REQUIREMENTS to verify:
      • Variable rate disclosure requirements
      • Interest rate cap regulations
      • Consumer vs. business rate legal distinctions
      • Central bank policy compliance
    - Fixed rate: Check legal disclosure requirements
    - Variable rate: Verify legal requirements for rate change notifications
    - 🚨 FLAG if rate type violates consumer protection laws`,

  AcceptanceCriteria: `
    ${COMMON_INSTRUCTIONS}
    Acceptance Criteria Validation (CRITICAL legal compliance required):
    
    Collateral Requirements - LEGAL VALIDATION REQUIRED:
    - LEGAL REQUIREMENTS to verify:
      • Local secured lending laws and registration requirements
      • Personal vs. business property collateral laws
      • Cross-border collateral legal recognition
      • Asset valuation legal requirements
    - Examples (adapt to jurisdiction):
      • US: UCC filings, state-specific secured transaction laws
      • EU: National secured lending regulations, cross-border recognition
      • APAC: Varies significantly - research local secured lending laws
    - 🚨 FLAG if collateral requirements violate local secured lending laws
    
    Guarantees Needed - LEGAL VALIDATION REQUIRED:
    - LEGAL REQUIREMENTS to verify:
      • Personal guarantee enforceability laws
      • Corporate guarantee legal requirements
      • Cross-guarantee restrictions and regulations
      • Consumer vs. business guarantee legal distinctions
    - Personal guarantees: Check local enforceability and legal limits
    - Corporate guarantees: Verify corporate authority requirements
    - 🚨 FLAG if guarantee structure violates local guarantee laws
    
    Minimum Credit Score - LEGAL VALIDATION REQUIRED:
    - CRITICAL: Adapt to local credit scoring systems AND anti-discrimination laws
    - LEGAL REQUIREMENTS to verify:
      • Local credit bureau regulations and data protection laws
      • Fair lending and anti-discrimination requirements
      • Minimum score legal restrictions (some jurisdictions prohibit certain thresholds)
      • Credit reporting legal compliance
    - Examples (research current standards):
      • US FICO: Verify fair lending compliance, ECOA requirements
      • EU: GDPR compliance, national credit bureau regulations
      • APAC: Local data protection and credit scoring laws
    - 🚨 FLAG if credit score requirements violate anti-discrimination laws
    
    Financial Ratios - LEGAL VALIDATION REQUIRED:
    - LEGAL REQUIREMENTS to verify:
      • Financial statement legal requirements for verification
      • Industry-specific ratio regulatory requirements
      • Privacy laws for financial data collection
      • Professional licensing requirements for ratio analysis
    - Adjust thresholds based on industry norms AND legal requirements
    - 🚨 FLAG if ratio requirements exceed legal data collection limits
    
    Industry-Specific Criteria - LEGAL VALIDATION REQUIRED:
    - LEGAL REQUIREMENTS to verify:
      • Industry licensing and regulatory requirements
      • Sector-specific lending restrictions
      • Professional qualification verification legal requirements
      • Industry regulatory compliance verification obligations
    - Always verify current legal requirements for the specific industry
  `,

  Pricing: `
    ${COMMON_INSTRUCTIONS}
    Pricing Validation (CRITICAL: Must comply with all local financial regulations):
    
    Interest Rate Range (Min/Max) - LEGAL VALIDATION REQUIRED:
    - LEGAL REQUIREMENTS to verify:
      • Usury laws and maximum interest rate limits
      • Central bank regulations and policy rates
      • Consumer vs. business lending rate legal distinctions
      • Rate disclosure legal requirements
    - Research current legal limits for user's geography and customer segment
    - Examples (update with current legal data):
      • US: State usury laws, federal rate regulations
      • EU: National usury law implementations, ECB policy compliance
      • Emerging markets: Central bank rate controls, inflation adjustments
    - 🚨 FLAG immediately if rates exceed legal usury limits
    
    Origination Fee - LEGAL VALIDATION REQUIRED:
    - LEGAL REQUIREMENTS to verify:
      • Local fee cap regulations and consumer protection laws
      • Fee disclosure legal requirements
      • Business vs. consumer fee legal distinctions
      • Cross-border fee regulations
    - Examples (verify current legal limits):
      • US: State fee caps, federal disclosure requirements
      • EU: National fee regulations, MiFID II requirements where applicable
      • Regulated industries: Sector-specific fee restrictions
    - 🚨 FLAG if fees exceed legal caps or violate disclosure requirements
    
    Servicing Fee - LEGAL VALIDATION REQUIRED:
    - LEGAL REQUIREMENTS to verify:
      • Annual vs. monthly fee legal structures
      • Fee collection legal requirements and restrictions
      • Consumer protection fee regulations
      • Ongoing fee disclosure legal obligations
    - Consider local market practices AND legal compliance
    - 🚨 FLAG if servicing fees violate local fee regulations
    
    Late Payment Fee - LEGAL VALIDATION REQUIRED:
    - CRITICAL: Must comply with local usury laws and penalty regulations
    - LEGAL REQUIREMENTS to verify:
      • Maximum late fee legal limits and calculation methods
      • Compound interest legal restrictions
      • Consumer vs. business late fee legal distinctions
      • Fee collection legal procedures and restrictions
    - Examples (research current legal requirements):
      • US: State late fee caps, federal collection regulations
      • EU: National late payment directive implementations
      • Consumer lending: Stricter legal limits typically apply
    - 🚨 IMMEDIATE FLAG if late fees exceed legal maximums
    
    Discount Programs - LEGAL VALIDATION REQUIRED:
    - LEGAL REQUIREMENTS to verify:
      • Fair lending law compliance for discount eligibility
      • Anti-discrimination regulations in discount criteria
      • Government incentive program legal requirements
      • Tax implications of discount programs
    - Adapt to local market incentives AND legal compliance requirements
    - 🚨 FLAG if discount criteria violate fair lending laws
    
    Early Repayment Penalty - LEGAL VALIDATION REQUIRED:
    - CRITICAL: Many jurisdictions restrict or prohibit prepayment penalties
    - LEGAL REQUIREMENTS to verify:
      • Consumer protection laws on prepayment penalties
      • Business vs. consumer lending penalty legal distinctions
      • Maximum penalty legal limits and calculation methods
      • Penalty disclosure legal requirements
    - Business lending may have more legal flexibility than consumer lending
    - 🚨 FLAG if penalties violate local consumer protection laws
  `,

  RegulatoryCheck: `
    ${COMMON_INSTRUCTIONS}
    Regulatory Validation (Comprehensive legal compliance verification):
    
    Regulatory Framework - LEGAL VALIDATION REQUIRED:
    - Research and apply current legal frameworks for user's geography
    - LEGAL REQUIREMENTS to verify:
      • Applicable regulatory authorities and their jurisdiction
      • Licensing requirements for proposed lending activities
      • Regulatory capital and compliance requirements
      • Cross-border regulatory recognition and requirements
    - Examples (verify current legal requirements):
      • US: FDIC, OCC, CFPB regulations depending on institution type and state
      • EU: CRD, EBA guidelines, national regulatory implementations
      • APAC: Local central bank and financial authority legal requirements
    - 🚨 FLAG if proposed activities exceed regulatory authorization
    
    Required Documentation - LEGAL VALIDATION REQUIRED:
    - LEGAL REQUIREMENTS to verify:
      • KYC/AML legal requirements and data protection compliance
      • Industry-specific documentation legal requirements
      • Cross-border documentation legal recognition
      • Data retention and privacy law compliance
    - Adapt to local legal requirements and risk assessments
    - 🚨 FLAG if documentation requirements violate privacy laws
    
    Compliance Requirements - LEGAL VALIDATION REQUIRED:
    - Must include ALL jurisdiction-specific legal requirements
    - LEGAL REQUIREMENTS to verify:
      • Mandatory compliance frameworks and reporting
      • Industry-specific legal compliance requirements
      • Data protection and privacy law compliance
      • Anti-money laundering and terrorism financing legal requirements
    - Universal legal considerations: AML/KYC, data protection
    - 🚨 FLAG any missing mandatory legal compliance requirements
    
    Risk Disclosure - LEGAL VALIDATION REQUIRED:
    - LEGAL REQUIREMENTS to verify:
      • Mandatory risk disclosure legal requirements
      • Consumer vs. business disclosure legal distinctions
      • Language and format legal requirements for disclosures
      • Regulatory approval requirements for disclosure documents
    - Required disclosures vary significantly by jurisdiction and customer type
    - 🚨 FLAG if disclosures fail to meet legal minimum requirements
    
    Reporting Obligations - LEGAL VALIDATION REQUIRED:
    - LEGAL REQUIREMENTS to verify:
      • Supervisory reporting legal requirements and deadlines
      • Public disclosure legal obligations
      • Data protection compliance in reporting
      • Cross-border reporting legal requirements
    - Frequency and format must comply with legal requirements
    - 🚨 FLAG if reporting schedule violates legal obligations
  `,

  GoLive: `
    ${COMMON_INSTRUCTIONS}
    Go-Live Validation (Ensure full legal compliance for market entry):
    
    Launch Date - LEGAL VALIDATION REQUIRED:
    - LEGAL REQUIREMENTS to verify:
      • Regulatory approval timelines and legal deadlines
      • Licensing effective dates and legal restrictions
      • Mandatory notice periods for new product launches
      • Legal compliance implementation deadlines
    - Consider local business calendars AND legal requirements
    - 🚨 FLAG if launch timeline violates regulatory approval requirements
    
    Distribution Channels - LEGAL VALIDATION REQUIRED:
    - LEGAL REQUIREMENTS to verify:
      • Distribution channel licensing and legal requirements
      • Agent and broker legal regulations
      • Cross-border distribution legal restrictions
      • Consumer protection laws for different distribution methods
    - Adapt to local market preferences AND legal compliance
    - 🚨 FLAG if distribution channels violate licensing requirements
    
    Monitoring Requirements - LEGAL VALIDATION REQUIRED:
    - LEGAL REQUIREMENTS to verify:
      • Supervisory monitoring legal requirements
      • Consumer protection monitoring legal obligations
      • Data protection compliance in monitoring systems
      • Reporting and record-keeping legal requirements
    - Align with local regulatory expectations AND legal compliance
    - 🚨 FLAG if monitoring fails to meet legal minimum requirements
  `,
};
