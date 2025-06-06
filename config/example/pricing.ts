import { EXAMPLE_INSTRUCTION } from "./instruction";

export const PRICING_EXAMPLE = `
    ${EXAMPLE_INSTRUCTION}
    
    CONTEXT-ADAPTIVE PRICING EXAMPLE:
    This example shows the framework - ALWAYS adapt ranges, rates, and recommendations to the user's specific:
    🌍 Geography (local market rates and regulations)
    🏭 Industry (sector risk and market norms)  
    👥 Customer Segment (SME, corporate, retail requirements)

    Example interaction framework (customize to actual context):

    Assistant: Let's configure pricing for your {{USER_GEOGRAPHY}} {{USER_INDUSTRY}} {{CUSTOMER_SEGMENT}} loan product. I'll research current market conditions and guide you through:
    • Interest rate range (based on local central bank rates + market spreads)
    • Fee structure (compliant with local regulations)
    • Discount programs (aligned with industry incentives)
    • Early repayment conditions (per local consumer protection laws)

    Let me start by researching current {{USER_GEOGRAPHY}} market rates for {{USER_INDUSTRY}} {{CUSTOMER_SEGMENT}} lending...

    Based on current {{CENTRAL_BANK_NAME}} rates and {{USER_GEOGRAPHY}} market conditions, typical {{USER_INDUSTRY}} {{CUSTOMER_SEGMENT}} loans range {{RESEARCH_BASED_RANGE}}.
    What minimum interest rate would you like to offer?

    User: {{USER_INPUTS_RATE}}

    Assistant: For {{USER_CONTEXT}}, you've specified {{USER_RATE}}, which is {{COMPARISON_TO_LOCAL_MARKET_NORMS}}.
    {{IF_OUTSIDE_NORMS: ⚠️ This is [above/below] typical {{LOCAL_MARKET}} standards. [Explain market implications and risks]}}
    Would you like to {{SUGGESTED_ADJUSTMENT}} based on local market conditions, or proceed with {{USER_RATE}}?

    User: {{USER_DECISION}}

    Assistant: {{ACKNOWLEDGMENT}}. For the maximum rate, considering {{LOCAL_USURY_LAWS}} and {{COMPETITIVE_LANDSCAPE}}...

    User: {{USER_MAX_RATE}}

    Assistant: {{VALIDATION_AGAINST_LOCAL_REGULATIONS}}. That gives you a {{FINAL_RANGE}} spread, which {{MARKET_ASSESSMENT}}.

    Now for origination fees - in {{USER_GEOGRAPHY}}, {{CUSTOMER_SEGMENT}} lenders typically charge {{LOCAL_MARKET_RANGE}} with regulatory caps at {{LOCAL_FEE_LIMITS}}.

    User: {{USER_FEE_INPUT}}

    Assistant: {{CONTEXT_SPECIFIC_VALIDATION}}
    {{IF_COMPLIANCE_ISSUE: ⚠️ In {{USER_GEOGRAPHY}}, {{SPECIFIC_REGULATION}} limits {{FEE_TYPE}} to {{LEGAL_MAXIMUM}}}}
    {{IF_MARKET_OUTLIER: ⚠️ That's {{COMPARISON}} typical {{LOCAL_MARKET}} practices. {{COMPETITIVE_IMPLICATIONS}}}}

    User: {{USER_ADJUSTMENT}}

    Assistant: {{CONFIRMATION}}. For servicing fees, {{LOCAL_MARKET_RESEARCH}} shows {{TYPICAL_RANGE}} for {{USER_CONTEXT}}.

    User: {{USER_SERVICING_FEE}}

    Assistant: {{VALIDATION}}. Now for late payment fees - this is critical for compliance.
    {{RESEARCH_LOCAL_USURY_LAWS}}
    In {{USER_GEOGRAPHY}}, maximum late fees are {{LOCAL_LEGAL_LIMIT}} per {{REGULATION_REFERENCE}}.

    User: {{USER_LATE_FEE}}

    Assistant: {{COMPLIANCE_CHECK}}
    {{IF_NON_COMPLIANT: ⚠️ That exceeds {{LOCAL_LAW}} maximum of {{LEGAL_LIMIT}}. We need to adjust to {{COMPLIANT_AMOUNT}}.}}

    User: {{COMPLIANCE_ADJUSTMENT}}

    Assistant: {{CONFIRMATION}}. For {{USER_INDUSTRY}} in {{USER_GEOGRAPHY}}, common discount programs include {{RESEARCH_LOCAL_INCENTIVES}}.
    {{GOVERNMENT_PROGRAMS}} {{INDUSTRY_SPECIFIC_DISCOUNTS}} {{ESG_CONSIDERATIONS}}

    User: {{USER_DISCOUNT_PREFERENCE}}

    Assistant: {{VALIDATION_AGAINST_LOCAL_COMPETITION_LAWS}}. Finally, early repayment terms.
    {{RESEARCH_LOCAL_CONSUMER_PROTECTION_LAWS}}
    In {{USER_GEOGRAPHY}}, {{PREPAYMENT_REGULATIONS}} {{BUSINESS_VS_CONSUMER_DIFFERENCES}}.

    User: {{USER_EARLY_REPAYMENT_DECISION}}

    Assistant: {{LEGAL_COMPLIANCE_CHECK}}
    {{IF_LEGAL_ISSUES: ⚠️ {{LOCAL_CONSUMER_PROTECTION_LAW}} restricts {{PENALTY_TYPE}} for {{CUSTOMER_SEGMENT}}}}

    ✅ **Configured Pricing Summary for {{USER_GEOGRAPHY}} {{USER_INDUSTRY}} {{CUSTOMER_SEGMENT}}:**
    • **Interest Rate**: {{FINAL_MIN}}% - {{FINAL_MAX}}% (based on {{LOCAL_CENTRAL_BANK}} + market spreads)
    • **Origination Fee**: {{FINAL_ORIGINATION}}% (compliant with {{LOCAL_REGULATION}})
    • **Servicing Fee**: {{FINAL_SERVICING}}% (aligned with {{LOCAL_MARKET}} standards)
    • **Late Payment Fee**: {{FINAL_LATE_FEE}}% (per {{REGULATORY_REFERENCE}})
    • **Discount Program**: {{FINAL_DISCOUNT}} ({{PROGRAM_RATIONALE}})
    • **Early Repayment**: {{FINAL_TERMS}} ({{LEGAL_COMPLIANCE_NOTE}})

    **Market Positioning**: {{COMPETITIVE_ANALYSIS}}
    **Regulatory Status**: {{COMPLIANCE_CONFIRMATION}}
    **Risk Assessment**: {{PRICING_RISK_EVALUATION}}

    Ready to proceed? (Confirm/Revise specific parameters)

    ---
    CRITICAL IMPLEMENTATION NOTES:
    - Replace ALL {{VARIABLES}} with actual researched data for user's context
    - NEVER use template ranges as actual recommendations
    - ALWAYS research current local market conditions before suggesting ranges
    - MANDATORY compliance verification for each jurisdiction
    - Adapt conversation flow to local business customs and practices
`;
