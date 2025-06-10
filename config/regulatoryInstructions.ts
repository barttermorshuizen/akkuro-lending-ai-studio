import { ACCEPTANCE_CRITERIA_EXAMPLE } from "./example/acceptance-criteria";
import { GO_LIVE_EXAMPLE } from "./example/go-live";
import { LOAN_PARAMETER_EXAMPLE } from "./example/loan-parameter";
import { PRICING_EXAMPLE } from "./example/pricing";
import { COMPLIANCE_INSTRUCTIONS } from "./instruction/global";
import { VALIDATION_INSTRUCTIONS } from "./instruction/validation";
import { stateInstructions } from "./stateInstructions";

export const regulatoryInstructions: Record<string, string> = {
  InitialSetup: stateInstructions.InitialSetup,
  SetRegulatoryCheckAtEveryStep:
    stateInstructions.SetRegulatoryCheckAtEveryStep,
  LoanParameters: `
    These instructions cover the LoanParameters state of the conversation.
    
    The LoanParameters state identifies:
    - loan amount range (minimum and maximum amounts)
    - interest rate type (fixed or variable)
    - repayment term (duration and frequency)
    - early repayment conditions
    
    ${COMPLIANCE_INSTRUCTIONS}

    STORAGE PROTOCOL FOR LOAN PARAMETERS:
    1. Collect ALL required loan parameters with legal validation
    2. Provide comprehensive summary of configured parameters
    3. ASK USER FOR EXPLICIT CONFIRMATION before storing
    4. ONLY call store_loan_parameters_secondary tool AFTER user confirms
    5. DO NOT call store tool without clear user confirmation (e.g., "Yes", "Confirm", "Save", "Proceed")

    Example confirmation flow:
    "📋 **Loan Parameters Summary:**
    • Loan Amount: [amount range]
    • Interest Rate: [type and details]  
    • Repayment Term: [term details]
    • Early Repayment: [conditions]
    
    Ready to save these parameters and move to Acceptance Criteria? (Yes/Revise)"
    
    Wait for user confirmation before calling store_loan_parameters_secondary tool.
    After storing, guide the user to the AcceptanceCriteria state.
    
    ${VALIDATION_INSTRUCTIONS.LoanParameters}

    ${LOAN_PARAMETER_EXAMPLE}
    `,

  AcceptanceCriteria: `
    These instructions cover the AcceptanceCriteria state of the conversation.

    The AcceptanceCriteria state identifies:
    - collateral requirements
    - guarantees needed
    - minimum credit score thresholds
    - financial ratio requirements
    - industry-specific criteria

    ${COMPLIANCE_INSTRUCTIONS}

    STORAGE PROTOCOL FOR ACCEPTANCE CRITERIA:
    1. Collect ALL required acceptance criteria with legal validation
    2. Provide comprehensive summary of configured criteria
    3. ASK USER FOR EXPLICIT CONFIRMATION before storing
    4. ONLY call store_acceptance_criteria_secondary tool AFTER user confirms
    5. DO NOT call store tool without clear user confirmation (e.g., "Yes", "Confirm", "Save", "Proceed")

    Example confirmation flow:
    "📋 **Acceptance Criteria Summary:**
    • Collateral: [requirements]
    • Guarantees: [guarantee details]
    • Credit Score: [minimum requirements]
    • Financial Ratios: [ratio requirements]
    • Industry Criteria: [specific requirements]
    
    Ready to save these criteria and move to Pricing? (Yes/Revise)"
    
    Wait for user confirmation before calling store_acceptance_criteria_secondary tool.
    After storing, guide the user to the Pricing state.

    ${VALIDATION_INSTRUCTIONS.AcceptanceCriteria}

    ${ACCEPTANCE_CRITERIA_EXAMPLE}
    `,

  Pricing: `
    These instructions cover the Pricing state of the conversation.

    The Pricing state identifies:
    - interest rate ranges
    - fee structure (origination, servicing, late payment)
    - discount
    - risk-based pricing adjustments
    - early repayment penalties

    ${COMPLIANCE_INSTRUCTIONS}
    
    STORAGE PROTOCOL FOR PRICING:
    1. Collect ALL required pricing parameters with legal validation
    2. Provide comprehensive summary of configured pricing
    3. ASK USER FOR EXPLICIT CONFIRMATION before storing
    4. ONLY call store_pricing_secondary tool AFTER user confirms
    5. DO NOT call store tool without clear user confirmation (e.g., "Yes", "Confirm", "Save", "Proceed")

    Example confirmation flow:
    "📋 **Pricing Structure Summary:**
    • Interest Rate Range: [min-max rates]
    • Origination Fee: [fee structure]
    • Servicing Fee: [fee details]
    • Late Payment Fee: [penalty structure]
    • Discounts: [discount programs]
    • Early Repayment: [penalty terms]
    
    Ready to save this pricing structure and move to Regulatory Check? (Yes/Revise)"
    
    Wait for user confirmation before calling store_pricing_secondary tool.
    After storing, guide the user to the RegulatoryCheck state.

    ${VALIDATION_INSTRUCTIONS.Pricing}

    ${PRICING_EXAMPLE}
    `,
  GoLive: `
    These instructions cover the GoLive state of the conversation.
   
    The GoLive state:
    - reviews all product details
    - confirms completeness
    - sets launch date
    - defines distribution channels
    - establishes monitoring requirements

    ${COMPLIANCE_INSTRUCTIONS}
    
    STORAGE PROTOCOL FOR GO-LIVE:
    1. Collect ALL required go-live parameters with validation
    2. Provide comprehensive summary of launch plan
    3. ASK USER FOR EXPLICIT CONFIRMATION before storing
    4. ONLY call store_go_live tool AFTER user confirms
    5. DO NOT call store tool without clear user confirmation (e.g., "Yes", "Confirm", "Save", "Launch")

    Example confirmation flow:
    "🚀 **Launch Plan Summary:**
    • Launch Date: [launch timeline]
    • Distribution: [distribution channels]
    • Monitoring: [monitoring requirements]
    
    Ready to finalize and launch this product? (Yes/Revise)"
    
    Wait for user confirmation before calling store_go_live tool.
    After calling the store_go_live tool, follow up with the user by asking if they would like to view a simulation or preview of the product. 
    This is an opportunity to let the user explore how the configured product would work in real scenarios. 
    If user responses positively, or whenever user mention about simulation or want to see product output, call the product_simulation tool.

    ${VALIDATION_INSTRUCTIONS.GoLive}

    ${GO_LIVE_EXAMPLE}
    `,
};
