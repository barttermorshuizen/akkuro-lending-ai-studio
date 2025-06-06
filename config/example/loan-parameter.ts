import { EXAMPLE_INSTRUCTION } from "./instruction";

export const LOAN_PARAMETER_EXAMPLE = `
    ${EXAMPLE_INSTRUCTION}

    LOAN PARAMETERS CONFIGURATION FRAMEWORK:
    This template shows how to design core loan terms based on user's specific market context.
    ALWAYS research current market conditions before suggesting ranges or terms.

    Example interaction framework (customize with actual market data):

    User: I'm ready to define the loan parameters for our {{USER_PRODUCT_NAME}}.

    Assistant: Excellent! Let's design competitive loan parameters for {{USER_GEOGRAPHY}} {{USER_INDUSTRY}} {{USER_CUSTOMER_SEGMENT}} lending. 
    
    Based on current {{USER_GEOGRAPHY}} market conditions, I'll guide you through these key parameters:
    • **Loan Amount Range** (in {{LOCAL_CURRENCY}})  
    • **Interest Rate Type** (Fixed/Variable based on {{LOCAL_MARKET_PREFERENCES}})  
    • **Repayment Term** (aligned with {{ASSET_TYPE}} and {{LOCAL_REGULATIONS}})  
    • **Collateral & Guarantees** (per {{LOCAL_LEGAL_FRAMEWORK}})  

    Let me first research current {{USER_GEOGRAPHY}} market standards for {{USER_CUSTOMER_SEGMENT}} {{USER_INDUSTRY}} lending...

    For {{USER_CONTEXT}}, typical loan amounts range {{RESEARCHED_MARKET_RANGE}}.
    What minimum and maximum amounts would you like to offer?

    User: {{USER_AMOUNT_RANGE}}

    Assistant: {{VALIDATE_AGAINST_LOCAL_MARKET_NORMS}}
    {{IF_OUTSIDE_TYPICAL_RANGE: ⚠️ For {{USER_CONTEXT}}, that's {{COMPARISON_TO_MARKET}}. {{MARKET_IMPLICATIONS_EXPLANATION}}}}
    
    For interest rate structure in {{USER_GEOGRAPHY}}, {{LOCAL_MARKET_ANALYSIS}}:
    • **Fixed Rate**: {{FIXED_RATE_BENEFITS_IN_CONTEXT}}
    • **Variable Rate**: {{VARIABLE_RATE_CONSIDERATIONS_WITH_CENTRAL_BANK_POLICY}}
    
    Which structure aligns with your strategy?

    User: {{USER_RATE_TYPE_CHOICE}}

    Assistant: {{VALIDATE_CHOICE_AGAINST_MARKET_CONDITIONS}} — {{RATIONALE_FOR_USER_CHOICE}}.
    
    For repayment terms, {{LOCAL_MARKET_RESEARCH}} shows:
    • {{USER_CUSTOMER_SEGMENT}} in {{USER_INDUSTRY}}: {{TYPICAL_TERM_RANGE}}
    • {{ASSET_CONSIDERATION}}: {{ASSET_BASED_TERM_GUIDANCE}}
    • {{REGULATORY_CONSTRAINTS}}: {{LOCAL_MAXIMUM_TERMS}}
    
    What repayment term range works for your risk appetite?

    User: {{USER_TERM_CHOICE}}

    Assistant: {{TERM_VALIDATION_AGAINST_CONTEXT}}
    {{IF_AGGRESSIVE_TERMS: ⚠️ {{RISK_ANALYSIS}} Based on {{MARKET_DATA}}, this could {{RISK_IMPLICATIONS}}.}}
    {{COMPETITIVE_ANALYSIS_AND_ALTERNATIVES}}
    
    Would you like me to research competitor terms or proceed with {{USER_TERM_CHOICE}}?

    User: {{USER_DECISION_ON_TERMS}}

    Assistant: {{CONFIRMATION_WITH_MARKET_CONTEXT}}.
    
    Finally, for collateral and guarantees in {{USER_GEOGRAPHY}}:
    {{LOCAL_LEGAL_FRAMEWORK_RESEARCH}}
    • **Collateral Options**: {{LOCAL_COLLATERAL_TYPES_AND_REQUIREMENTS}}
    • **Guarantee Framework**: {{LOCAL_GUARANTEE_SYSTEMS}}
    • **{{USER_CUSTOMER_SEGMENT}} Standards**: {{SEGMENT_SPECIFIC_PRACTICES}}
    
    What approach fits your risk management strategy?

    User: {{USER_COLLATERAL_GUARANTEE_CHOICE}}

    Assistant: {{VALIDATE_AGAINST_LOCAL_PRACTICES}}
    
    📋 **{{USER_PRODUCT_NAME}} Parameters Summary:**
    • **Loan Amount**: {{FINAL_AMOUNT_RANGE}} ({{MARKET_POSITIONING}})
    • **Interest Rate**: {{FINAL_RATE_TYPE}} ({{RATE_RATIONALE}})
    • **Repayment Term**: {{FINAL_TERMS}} ({{TERM_JUSTIFICATION}})
    • **Security**: {{FINAL_COLLATERAL_APPROACH}} ({{RISK_MITIGATION_EXPLANATION}})
    
    **Market Analysis**: {{COMPETITIVE_POSITIONING_SUMMARY}}
    **Risk Assessment**: {{PORTFOLIO_RISK_EVALUATION}}
    **Regulatory Compliance**: {{COMPLIANCE_STATUS_CHECK}}
    
    Ready to proceed with these parameters? (Confirm/Revise specific elements)

    ---
    CRITICAL IMPLEMENTATION NOTES:
    - Research {{LOCAL_MARKET_RANGE}} from current market data, not template examples
    - Validate all terms against {{LOCAL_REGULATIONS}} and {{CENTRAL_BANK_POLICIES}}
    - Provide {{COMPETITIVE_ANALYSIS}} based on actual competitor research
    - Ensure {{RISK_ASSESSMENT}} reflects current economic conditions
    - Adapt all currency, terms, and language to user's specific market context
`;
