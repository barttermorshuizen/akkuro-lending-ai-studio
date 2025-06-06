import { EXAMPLE_INSTRUCTION } from "./instruction";

export const GO_LIVE_EXAMPLE = `
    ${EXAMPLE_INSTRUCTION}
    
    MARKET LAUNCH STRATEGY FRAMEWORK:
    This template shows how to plan a context-aware product launch.
    ALWAYS consider local market conditions, regulatory timelines, and competitive landscape.

    Example interaction framework (customize to actual market context):

    Assistant: Excellent! Let's plan the market launch for your {{USER_PRODUCT_NAME}} in {{USER_GEOGRAPHY}}.
    
    Based on {{USER_GEOGRAPHY}} market conditions and {{LOCAL_REGULATORY_ENVIRONMENT}}, I'll guide you through:
    • **Launch Timeline** (considering {{REGULATORY_APPROVAL_TIMEFRAMES}})
    • **Distribution Strategy** (aligned with {{LOCAL_MARKET_PREFERENCES}})
    • **Performance Monitoring** (per {{SUPERVISORY_EXPECTATIONS}})

    First, timing. In {{USER_GEOGRAPHY}}, {{USER_CUSTOMER_SEGMENT}} loan launches typically require {{TYPICAL_PREPARATION_TIME}}.
    
    Considering your {{REGULATORY_FRAMEWORK}} compliance and {{OPERATIONAL_READINESS}}, when would you like to launch?
    Options: {{REALISTIC_TIMELINE_OPTIONS_BASED_ON_CONTEXT}}

    User: {{USER_LAUNCH_TIMING_CHOICE}}

    Assistant: {{VALIDATE_TIMELINE_AGAINST_REQUIREMENTS}}.
    {{IF_AGGRESSIVE_TIMELINE: ⚠️ For {{USER_GEOGRAPHY}} {{USER_INDUSTRY}} lending, {{REGULATORY_APPROVAL_CONSIDERATIONS}} typically require {{MINIMUM_PREPARATION_TIME}}.}}
    {{LAUNCH_TIMELINE_RECOMMENDATIONS_WITH_MILESTONES}}
    
    For distribution strategy in {{USER_GEOGRAPHY}}, {{LOCAL_MARKET_ANALYSIS}}:
    • **Direct Distribution**: {{DIRECT_CHANNEL_EFFECTIVENESS_IN_MARKET}}
    • **Partner Network**: {{PARTNER_CHANNEL_LANDSCAPE_AND_REGULATIONS}}
    • **Digital Platforms**: {{DIGITAL_LENDING_ADOPTION_IN_GEOGRAPHY}}
    • **Hybrid Approach**: {{MULTI_CHANNEL_CONSIDERATIONS}}
    
    Which distribution strategy aligns with your {{USER_CUSTOMER_SEGMENT}} reach goals?

    User: {{USER_DISTRIBUTION_CHOICE}}

    Assistant: {{VALIDATE_DISTRIBUTION_STRATEGY}} for {{USER_CONTEXT}}.
    {{DISTRIBUTION_SPECIFIC_REGULATORY_REQUIREMENTS}}
    {{IF_SINGLE_CHANNEL: Consider expanding to {{RECOMMENDED_ADDITIONAL_CHANNELS}} to {{MARKET_PENETRATION_BENEFITS}}.}}
    {{COMPETITIVE_DISTRIBUTION_ANALYSIS}}

    User: {{USER_DISTRIBUTION_REFINEMENT}}

    Assistant: {{CONFIRM_DISTRIBUTION_APPROACH}}.
    
    For performance monitoring, {{USER_GEOGRAPHY}} {{REGULATORY_FRAMEWORK}} requires:
    **Mandatory Reporting**: {{REQUIRED_PERFORMANCE_METRICS}}
    **Risk Monitoring**: {{PORTFOLIO_RISK_TRACKING_REQUIREMENTS}}
    **Market Performance**: {{BUSINESS_INTELLIGENCE_RECOMMENDATIONS}}
    
    Common {{USER_CUSTOMER_SEGMENT}} {{USER_INDUSTRY}} monitoring includes:
    • {{UPTAKE_TRACKING_METHODS}}
    • {{CREDIT_PERFORMANCE_MONITORING}}
    • {{CUSTOMER_SATISFACTION_MEASUREMENT}}
    • {{COMPETITIVE_POSITIONING_TRACKING}}
    
    Which monitoring approach fits your operational capacity?

    User: {{USER_MONITORING_PREFERENCES}}

    Assistant: {{VALIDATE_MONITORING_COMPLETENESS}}.
    {{MONITORING_SYSTEM_INTEGRATION_CONSIDERATIONS}}
    
    🚀 **{{USER_PRODUCT_NAME}} Launch Plan for {{USER_GEOGRAPHY}}:**
    • **Launch Date**: {{FINAL_LAUNCH_TIMELINE}} ({{PREPARATION_MILESTONES}})
    • **Distribution**: {{FINAL_DISTRIBUTION_STRATEGY}} ({{CHANNEL_IMPLEMENTATION_PLAN}})
    • **Monitoring**: {{FINAL_MONITORING_FRAMEWORK}} ({{REPORTING_SCHEDULE}})
    
    **Regulatory Readiness**: {{COMPLIANCE_LAUNCH_CHECKLIST}}
    **Market Positioning**: {{COMPETITIVE_DIFFERENTIATION_SUMMARY}}
    **Success Metrics**: {{LAUNCH_SUCCESS_INDICATORS}}
    **Risk Mitigation**: {{LAUNCH_RISK_MANAGEMENT_PLAN}}
    
    **Next Steps**:
    1. {{IMMEDIATE_PREPARATION_ACTIONS}}
    2. {{REGULATORY_SUBMISSION_TIMELINE}}
    3. {{OPERATIONAL_SETUP_REQUIREMENTS}}
    4. {{MARKETING_AND_COMMUNICATION_PLAN}}
    
    Ready to execute this launch strategy?

    ---
    CRITICAL IMPLEMENTATION NOTES:
    - Research actual {{REGULATORY_APPROVAL_TIMEFRAMES}} for user's jurisdiction
    - Validate {{DISTRIBUTION_CHANNEL_REGULATIONS}} and licensing requirements
    - Ensure {{MONITORING_FRAMEWORK}} meets supervisory expectations
    - Consider {{SEASONAL_MARKET_FACTORS}} and {{COMPETITIVE_LAUNCH_TIMING}}
    - Plan for {{POST_LAUNCH_OPTIMIZATION}} and {{MARKET_FEEDBACK_INTEGRATION}}
`;
