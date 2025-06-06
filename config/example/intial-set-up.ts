import { EXAMPLE_INSTRUCTION } from "./instruction";

export const INTIAL_SET_UP_EXAMPLE = `
    ${EXAMPLE_INSTRUCTION}
    
    CONTEXT-ESTABLISHMENT FRAMEWORK:
    This template shows how to gather essential context that will drive all subsequent recommendations.
    ALWAYS adapt the conversation to be natural and contextually relevant.

    Example interaction framework (customize to actual context):

    User: I want to create a new {{LOAN_TYPE}} product.

    Assistant: Excellent! Let's design a {{LOAN_TYPE}} product that fits your market perfectly. 🌱  
    I'll gather some key context to ensure we build something competitive and compliant.

    First, who is your target customer segment?  
    Are you thinking {{CUSTOMER_SEGMENT_OPTIONS_BASED_ON_MARKET}}?

    User: {{USER_CUSTOMER_SEGMENT_CHOICE}}

    Assistant: Perfect — {{USER_CUSTOMER_SEGMENT}} it is.  
    And what's the primary purpose of this loan?  
    For {{USER_CUSTOMER_SEGMENT}}, common uses include {{INDUSTRY_RELEVANT_USE_CASES}}.

    User: {{USER_INTENDED_USE}}

    Assistant: {{VALIDATE_USE_CASE_AGAINST_CUSTOMER_SEGMENT}}.  
    Now, which market will you be serving?  
    Please share the country or region where you'll offer this product.

    User: {{USER_GEOGRAPHY_CHOICE}}

    Assistant: Excellent — {{USER_GEOGRAPHY}} 🌍  
    {{DEMONSTRATE_LOCAL_MARKET_KNOWLEDGE}}
    
    Finally, what would you like to call this product?  
    Something that resonates with {{USER_CUSTOMER_SEGMENT}} in the {{USER_GEOGRAPHY}} {{USER_INDUSTRY}} market?

    User: {{USER_PRODUCT_NAME}}

    Assistant: {{VALIDATE_PRODUCT_NAME_MARKET_FIT}} — *{{USER_PRODUCT_NAME}}* {{MARKET_POSITIONING_COMMENT}}.
    
    📋 **Setup Summary for {{USER_GEOGRAPHY}} Market:**
    • **Target Customer**: {{USER_CUSTOMER_SEGMENT}}  
    • **Intended Use**: {{USER_INTENDED_USE}}  
    • **Geography**: {{USER_GEOGRAPHY}} ({{LOCAL_REGULATORY_FRAMEWORK}})
    • **Product Name**: {{USER_PRODUCT_NAME}}
    
    {{CONTEXT_VALIDATION_AND_MARKET_INSIGHTS}}
    
    Ready to proceed with this foundation? This context will help me provide market-specific recommendations throughout our design process.

    User: {{USER_CONFIRMATION}}

    Assistant: ✅ Context established and saved!

    Next: Let's configure the regulatory compliance approach for {{USER_GEOGRAPHY}} {{USER_INDUSTRY}} lending requirements.

    ---
    CRITICAL IMPLEMENTATION NOTES:
    - Replace {{CUSTOMER_SEGMENT_OPTIONS}} with actual options relevant to user's market
    - Research and insert appropriate {{INDUSTRY_RELEVANT_USE_CASES}} for the chosen customer segment
    - Show knowledge of {{LOCAL_REGULATORY_FRAMEWORK}} for the user's geography
    - Validate {{PRODUCT_NAME}} against local market conventions and competitive landscape
    - Demonstrate {{LOCAL_MARKET_KNOWLEDGE}} to establish credibility
`;
