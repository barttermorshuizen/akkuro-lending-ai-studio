import { EXAMPLE_INSTRUCTION } from "./instruction";

export const REGULATORY_CHECK_EXAMPLE = `
    ${EXAMPLE_INSTRUCTION}
    
    REGULATORY FRAMEWORK CONFIGURATION:
    This template shows how to establish jurisdiction-specific compliance requirements.
    ALWAYS research current regulatory requirements for the user's specific geography and industry.

    Example interaction framework (customize to actual regulatory environment):

    Assistant: Let's configure the regulatory compliance framework for your {{USER_GEOGRAPHY}} {{USER_INDUSTRY}} {{USER_CUSTOMER_SEGMENT}} loan product.
    
    Based on {{USER_GEOGRAPHY}} lending regulations, I need to understand your compliance approach across several areas:
    • **Regulatory Framework** ({{LOCAL_SUPERVISORY_AUTHORITIES}})
    • **Documentation Requirements** ({{LOCAL_KYC_AML_STANDARDS}})
    • **Compliance Obligations** ({{JURISDICTION_SPECIFIC_REQUIREMENTS}})
    • **Risk Disclosure** ({{LOCAL_TRANSPARENCY_REGULATIONS}})
    • **Reporting Frequency** ({{SUPERVISORY_REPORTING_REQUIREMENTS}})

    First, which regulatory framework governs your {{USER_CUSTOMER_SEGMENT}} lending in {{USER_GEOGRAPHY}}?
    Current options include: {{RESEARCH_LOCAL_FRAMEWORKS}}

    User: {{USER_REGULATORY_FRAMEWORK_CHOICE}}

    Assistant: {{VALIDATE_FRAMEWORK_APPLICABILITY}} for {{USER_CONTEXT}}.
    {{FRAMEWORK_SPECIFIC_IMPLICATIONS_AND_REQUIREMENTS}}
    
    For documentation requirements under {{USER_FRAMEWORK}} in {{USER_GEOGRAPHY}}, the options are:
    • **{{BASIC_DOC_LEVEL}}**: {{BASIC_REQUIREMENTS_DESCRIPTION}}
    • **{{STANDARD_DOC_LEVEL}}**: {{STANDARD_REQUIREMENTS_DESCRIPTION}}  
    • **{{ENHANCED_DOC_LEVEL}}**: {{ENHANCED_REQUIREMENTS_DESCRIPTION}}
    
    For {{USER_INDUSTRY}} {{USER_CUSTOMER_SEGMENT}} lending, {{RECOMMENDED_LEVEL_WITH_RATIONALE}}.

    User: {{USER_DOCUMENTATION_CHOICE}}

    Assistant: {{VALIDATE_DOCUMENTATION_LEVEL_AGAINST_RISK_PROFILE}}.
    
    Now for compliance requirements specific to {{USER_GEOGRAPHY}} {{USER_INDUSTRY}} lending:
    **Mandatory Requirements**: {{JURISDICTION_MANDATORY_COMPLIANCE}}
    **Industry-Specific**: {{SECTOR_SPECIFIC_REQUIREMENTS}}
    **Optional but Recommended**: {{BEST_PRACTICE_ADDITIONS}}
    
    Which compliance areas should we include?

    User: {{USER_COMPLIANCE_REQUIREMENTS}}

    Assistant: {{VALIDATE_COMPLIANCE_COVERAGE}} for {{USER_CONTEXT}}.
    {{IF_GAPS_IDENTIFIED: ⚠️ Consider adding {{MISSING_CRITICAL_REQUIREMENTS}} to ensure full {{LOCAL_REGULATORY}} compliance.}}
    
    For risk disclosure under {{USER_GEOGRAPHY}} regulations:
    **Required Disclosures**: {{MANDATORY_RISK_DISCLOSURES}}
    **Industry-Specific Risks**: {{USER_INDUSTRY_RISK_CATEGORIES}}
    **Customer Segment Considerations**: {{USER_CUSTOMER_SEGMENT_SPECIFIC_DISCLOSURES}}
    
    Which risks should be disclosed to borrowers?

    User: {{USER_RISK_DISCLOSURE_CHOICE}}

    Assistant: {{VALIDATE_RISK_DISCLOSURE_COMPLETENESS}}.
    {{REGULATORY_TRANSPARENCY_COMPLIANCE_CHECK}}
    
    Finally, reporting frequency for {{USER_GEOGRAPHY}} {{USER_FRAMEWORK}} compliance:
    **Supervisory Reporting**: {{LOCAL_SUPERVISORY_FREQUENCY_REQUIREMENTS}}
    **Public Disclosure**: {{PUBLIC_REPORTING_OBLIGATIONS}}
    **Industry Standards**: {{MARKET_PRACTICE_RECOMMENDATIONS}}
    
    What reporting schedule aligns with your operational capacity?

    User: {{USER_REPORTING_FREQUENCY}}

    Assistant: {{VALIDATE_REPORTING_FREQUENCY_COMPLIANCE}}.
    
    📋 **Regulatory Compliance Framework for {{USER_GEOGRAPHY}} {{USER_INDUSTRY}}:**
    • **Framework**: {{FINAL_REGULATORY_FRAMEWORK}} ({{SUPERVISORY_AUTHORITY}})
    • **Documentation**: {{FINAL_DOCUMENTATION_LEVEL}} ({{COMPLIANCE_RATIONALE}})
    • **Compliance Scope**: {{FINAL_COMPLIANCE_REQUIREMENTS}} ({{COVERAGE_ASSESSMENT}})
    • **Risk Disclosure**: {{FINAL_RISK_DISCLOSURES}} ({{TRANSPARENCY_LEVEL}})
    • **Reporting**: {{FINAL_REPORTING_FREQUENCY}} ({{REPORTING_OBLIGATIONS}})
    
    **Compliance Status**: {{OVERALL_COMPLIANCE_ASSESSMENT}}
    **Implementation Timeline**: {{REGULATORY_SETUP_TIMEFRAME}}
    **Ongoing Obligations**: {{CONTINUOUS_COMPLIANCE_REQUIREMENTS}}
    
    Ready to proceed with this regulatory framework?

    ---
    CRITICAL IMPLEMENTATION NOTES:
    - Research current {{LOCAL_SUPERVISORY_AUTHORITIES}} and their specific requirements
    - Verify {{MANDATORY_COMPLIANCE_REQUIREMENTS}} for user's jurisdiction and industry
    - Ensure {{RISK_DISCLOSURE_STANDARDS}} meet local transparency regulations
    - Validate {{REPORTING_OBLIGATIONS}} against current supervisory expectations
    - Consider {{CROSS_BORDER_IMPLICATIONS}} if applicable to user's business model
`;
