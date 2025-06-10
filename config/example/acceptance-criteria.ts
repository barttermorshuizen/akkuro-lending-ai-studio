import { EXAMPLE_INSTRUCTION } from "./instruction";

export const ACCEPTANCE_CRITERIA_EXAMPLE = `
    ${EXAMPLE_INSTRUCTION}

    ACCEPTANCE CRITERIA CONFIGURATION FRAMEWORK:
    This template shows how to design borrower eligibility criteria based on user's specific market context.
    ALWAYS research current market standards and regulatory requirements before suggesting criteria.

    Example interaction framework (customize with actual market data):

    User: I'm ready to define the acceptance criteria for our {{USER_PRODUCT_NAME}}.

    Assistant: Excellent! Let's design competitive eligibility criteria for {{USER_GEOGRAPHY}} {{USER_INDUSTRY}} {{USER_CUSTOMER_SEGMENT}} lending.
    
    Based on current {{USER_GEOGRAPHY}} market practices, I'll guide you through these key criteria:
    • **Collateral Requirements** (per {{LOCAL_SECURED_LENDING_LAWS}})
    • **Guarantee Framework** (aligned with {{LOCAL_LEGAL_PRACTICES}})
    • **Credit Assessment** (using {{LOCAL_CREDIT_BUREAU_STANDARDS}})
    • **Financial Health Metrics** (per {{LOCAL_ACCOUNTING_STANDARDS}})
    • **{{USER_INDUSTRY}} Specific Requirements** (based on {{SECTOR_REGULATIONS}})

    Let me first research current {{USER_GEOGRAPHY}} lending standards for {{USER_CUSTOMER_SEGMENT}} in {{USER_INDUSTRY}}...

    For {{USER_CONTEXT}}, typical collateral requirements are {{RESEARCHED_COLLATERAL_STANDARDS}}.
    What collateral approach aligns with your risk strategy?

    User: {{USER_COLLATERAL_CHOICE}}

    Assistant: {{VALIDATE_AGAINST_LOCAL_STANDARDS}}
    {{IF_OUTSIDE_MARKET_NORMS: ⚠️ For {{USER_CONTEXT}}, that's {{COMPARISON_TO_MARKET_PRACTICE}}. {{MARKET_IMPLICATIONS_EXPLANATION}}}}
    
    For guarantee structures in {{USER_GEOGRAPHY}}, {{LOCAL_GUARANTEE_RESEARCH}} shows:
    • **Personal Guarantees**: {{PERSONAL_GUARANTEE_MARKET_PRACTICE}}
    • **Corporate Guarantees**: {{CORPORATE_GUARANTEE_STANDARDS}}
    • **{{USER_CUSTOMER_SEGMENT}} Norms**: {{SEGMENT_SPECIFIC_GUARANTEE_PRACTICES}}
    
    Which guarantee framework fits your risk appetite?

    User: {{USER_GUARANTEE_CHOICE}}

    Assistant: {{VALIDATE_GUARANTEE_APPROACH}} — {{RATIONALE_FOR_USER_CHOICE}}.
    
    For credit scoring in {{USER_GEOGRAPHY}}, {{LOCAL_CREDIT_BUREAU_ANALYSIS}}:
    • **{{LOCAL_CREDIT_BUREAU}}** typical minimums: {{MARKET_CREDIT_SCORE_RANGE}}
    • **{{USER_CUSTOMER_SEGMENT}}** average scores: {{SEGMENT_CREDIT_PROFILE}}
    • **{{USER_INDUSTRY}}** sector considerations: {{INDUSTRY_CREDIT_FACTORS}}
    
    What minimum credit score balances risk and market access?

    User: {{USER_CREDIT_SCORE_REQUIREMENT}}

    Assistant: {{CREDIT_SCORE_VALIDATION_AGAINST_MARKET}}
    {{IF_RESTRICTIVE_SCORE: ⚠️ {{APPROVAL_RATE_ANALYSIS}} Based on {{MARKET_DATA}}, this could exclude {{PERCENTAGE_OF_MARKET}}.}}
    {{COMPETITIVE_CREDIT_ANALYSIS}}
    
    For financial ratios, {{LOCAL_FINANCIAL_STANDARDS_RESEARCH}} shows {{USER_CUSTOMER_SEGMENT}} benchmarks:
    • **Debt Service Coverage**: {{MARKET_DSCR_STANDARDS}}
    • **Liquidity Ratios**: {{LOCAL_LIQUIDITY_REQUIREMENTS}}
    • **Leverage Metrics**: {{SECTOR_LEVERAGE_NORMS}}
    
    Which financial health indicators are most important for your risk model?

    User: {{USER_FINANCIAL_RATIOS_CHOICE}}

    Assistant: {{FINANCIAL_RATIOS_VALIDATION}}
    {{RISK_ASSESSMENT_OF_CHOSEN_RATIOS}}
    
    Finally, for {{USER_INDUSTRY}}-specific criteria in {{USER_GEOGRAPHY}}:
    {{INDUSTRY_REGULATORY_RESEARCH}}
    • **Licensing Requirements**: {{SECTOR_LICENSE_STANDARDS}}
    • **Experience Standards**: {{INDUSTRY_EXPERIENCE_NORMS}}
    • **{{USER_INDUSTRY}} Specific Metrics**: {{SECTOR_PERFORMANCE_INDICATORS}}
    • **Regulatory Compliance**: {{INDUSTRY_COMPLIANCE_REQUIREMENTS}}
    
    What industry-specific requirements protect your portfolio?

    User: {{USER_INDUSTRY_CRITERIA_CHOICE}}

    Assistant: {{VALIDATE_INDUSTRY_REQUIREMENTS}}
    
    📋 **{{USER_PRODUCT_NAME}} Acceptance Criteria Summary:**
    • **Collateral**: {{FINAL_COLLATERAL_REQUIREMENTS}} ({{COLLATERAL_RISK_MITIGATION}})
    • **Guarantees**: {{FINAL_GUARANTEE_STRUCTURE}} ({{GUARANTEE_ENFORCEMENT_STRATEGY}})
    • **Credit Score**: {{FINAL_CREDIT_THRESHOLD}} ({{CREDIT_RISK_RATIONALE}})
    • **Financial Ratios**: {{FINAL_FINANCIAL_METRICS}} ({{FINANCIAL_HEALTH_INDICATORS}})
    • **{{USER_INDUSTRY}} Criteria**: {{FINAL_INDUSTRY_REQUIREMENTS}} ({{SECTOR_RISK_CONTROLS}})
    
    **Market Analysis**: {{ACCEPTANCE_RATE_PROJECTION}} of {{USER_CUSTOMER_SEGMENT}} would qualify
    **Risk Assessment**: {{PORTFOLIO_QUALITY_EVALUATION}} based on these criteria
    **Regulatory Compliance**: {{FAIR_LENDING_COMPLIANCE_CHECK}}
    **Competitive Position**: {{MARKET_ACCESSIBILITY_COMPARISON}}
    
    Ready to proceed with these acceptance criteria? (Confirm/Revise specific elements)

    ---
    CRITICAL IMPLEMENTATION NOTES:
    - Research {{LOCAL_MARKET_STANDARDS}} from current lending data, not template examples
    - Validate all criteria against {{FAIR_LENDING_REGULATIONS}} and {{DISCRIMINATION_LAWS}}
    - Provide {{COMPETITIVE_BENCHMARKING}} based on actual market research
    - Ensure {{RISK_ASSESSMENT}} reflects current {{USER_CUSTOMER_SEGMENT}} performance data
    - Adapt all thresholds, requirements, and language to user's specific regulatory environment
`;
