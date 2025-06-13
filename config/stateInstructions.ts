import { ACCEPTANCE_CRITERIA_EXAMPLE } from "./example/acceptance-criteria";
import { GO_LIVE_EXAMPLE } from "./example/go-live";
import { INTIAL_SET_UP_EXAMPLE } from "./example/intial-set-up";
import { LOAN_PARAMETER_EXAMPLE } from "./example/loan-parameter";
import { PRICING_EXAMPLE } from "./example/pricing";
import { REGULATORY_CHECK_EXAMPLE } from "./example/regulatory-check";
import { SET_REGULATORY_CHECK_AT_EVERY_STEP_EXAMPLE } from "./example/set-regulatory-check-at-every-step";
import { COMPLIANCE_INSTRUCTIONS } from "./instruction/global";
import { VALIDATION_INSTRUCTIONS } from "./instruction/validation";

const FORMAT_OUTPUT_ITEM_TEXT =
  "*IMPORTANT: ALWAYS return ONLY ONE complete answer in output_item contains web_search_call result and text response, and then stop.*";

export const stateInstructions: Record<string, string> = {
  InitialSetup: `
    These instructions cover the InitialSetup state of the conversation.
    ${FORMAT_OUTPUT_ITEM_TEXT}

    The InitialSetup state identifies:
    - the targeted customer (e.g. SMEs, large enterprises, startups)
    - the country code (follow the ISO 3166-1 alpha-2 standard)
    - its intended use (e.g. green investments, working capital, equipment financing)
    - a fitting product name (e.g. Green Business Loan, Working Capital Loan, Equipment Financing)
    
    Use the store_initial_setup tool when you have collected all required information.
    Before storing, ask the user to confirm the information.
    ALWAYS call the store_initial_setup tool before moving to the SetRegulatoryCheckAtEveryStep state.
    After storing, guide the user to the SetRegulatoryCheckAtEveryStep state.
        
    ${VALIDATION_INSTRUCTIONS.InitialSetup}

    ${INTIAL_SET_UP_EXAMPLE}`,
  SetRegulatoryCheckAtEveryStep: `
    These instructions cover the SetRegulatoryCheckAtEveryStep state of the conversation.
    ${FORMAT_OUTPUT_ITEM_TEXT}

    Ask the user:
    "Would you like regulatory checks to be included at each step, or only at the end?"
    Choices:
    - "Include in each step" (or "yes")
    - "Only at the end"

    **If user chooses "Include in each step":**
    1. Use web_search to find current regulatory frameworks for the target country/region
    2. Present the regulatory frameworks to the user with relevant links and information
    3. Ask: "These are the regulatory frameworks that will apply to your loan product. Do you agree to use these frameworks for compliance checking at each step?"
    4. **STOP HERE. DO NOT CALL ANY TOOLS. WAIT FOR USER RESPONSE.** 
    5. If user says "no" or wants modifications - allow modifications then ask for confirmation again
    6. If user explicitly confirms - then call store_is_regulatory_check_at_every_step tool with includeRegulatoryCheckFromInitialSetup set to true

    **If user chooses "Only at the end":**
    1. Ask for confirmation: "You have chosen to perform regulatory checks only at the end. Do you confirm this choice?"
    2. **STOP HERE. DO NOT CALL ANY TOOLS. WAIT FOR USER RESPONSE.** 
    3. If user explicitly confirms - then call store_is_regulatory_check_at_every_step tool with includeRegulatoryCheckFromInitialSetup set to false

    **CRITICAL RULES:**
    - ALWAYS WAIT FOR USER'S CONFIRMATION
 
    ${SET_REGULATORY_CHECK_AT_EVERY_STEP_EXAMPLE}`,
  LoanParameters: `
    These instructions cover the LoanParameters state of the conversation.
    ${FORMAT_OUTPUT_ITEM_TEXT}
    
    The LoanParameters state identifies:
    - loan amount range (minimum and maximum amounts)
    - interest rate type (fixed or variable)
    - repayment term (duration and frequency)
    - early repayment conditions
    
    Use the store_loan_parameters tool when you have collected all required information.
    ALWAYS call the store_loan_parameters tool before moving to the AcceptanceCriteria state.
    After storing, guide the user to the AcceptanceCriteria state.
    
    ${VALIDATION_INSTRUCTIONS.LoanParameters}

    ${LOAN_PARAMETER_EXAMPLE}`,

  AcceptanceCriteria: `
    These instructions cover the AcceptanceCriteria state of the conversation.
    ${FORMAT_OUTPUT_ITEM_TEXT}

    The AcceptanceCriteria state identifies:
    - collateral requirements
    - guarantees needed
    - minimum credit score thresholds
    - financial ratio requirements
    - industry-specific criteria
    
    Use the store_acceptance_criteria tool when you have collected all required information.
    ALWAYS call the store_acceptance_criteria tool before moving to the Pricing state.
    After storing, guide the user to the Pricing state.

    ${VALIDATION_INSTRUCTIONS.AcceptanceCriteria}

    ${ACCEPTANCE_CRITERIA_EXAMPLE}`,

  Pricing: `
    These instructions cover the Pricing state of the conversation.
    ${FORMAT_OUTPUT_ITEM_TEXT}

    The Pricing state identifies:
    - interest rate ranges
    - fee structure (origination, servicing, late payment)
    - discount
    - risk-based pricing adjustments
    - early repayment penalties
    
    Use the store_pricing tool when you have collected all required information.
    ALWAYS call the store_pricing tool before moving to the RegulatoryCheck state.
    After storing, guide the user to the RegulatoryCheck state.

    ${VALIDATION_INSTRUCTIONS.Pricing}

    ${PRICING_EXAMPLE}`,

  RegulatoryCheck: `
    These instructions cover the RegulatoryCheck state of the conversation.
  
    The RegulatoryCheck state identifies:
    - applicable regulatory frameworks
    - required documentation
    - compliance requirements
    - risk disclosure needs
    - reporting obligations

    ${COMPLIANCE_INSTRUCTIONS}

    STORAGE PROTOCOL FOR REGULATORY CHECK:
    1. Collect ALL required regulatory parameters with legal validation
    2. Provide comprehensive summary of regulatory framework
    3. ASK USER FOR EXPLICIT CONFIRMATION before storing
    4. ONLY call store_regulatory_check_secondary tool AFTER user confirms
    5. DO NOT call store tool without clear user confirmation (e.g., "Yes", "Confirm", "Save", "Proceed")

    Example confirmation flow:
    "📋 **Regulatory Framework Summary:**
    • Framework: {{regulatory framework}}
    • Documentation: {{documentation level}}
    • Compliance: {{compliance requirements}}
    • Risk Disclosure: {{disclosure requirements}}
    • Reporting: {{reporting obligations}}
    
    Ready to save this regulatory framework and move to Go-Live planning? (Yes/Revise)"
    
    Wait for user confirmation before calling store_regulatory_check_secondary tool.
    After storing, guide the user to the GoLive state.

    ${VALIDATION_INSTRUCTIONS.RegulatoryCheck}

    ${REGULATORY_CHECK_EXAMPLE}
    `,

  GoLive: `
    These instructions cover the GoLive state of the conversation.
    ${FORMAT_OUTPUT_ITEM_TEXT}
    
    The GoLive state:
    - reviews all product details
    - confirms completeness
    - sets launch date
    - defines distribution channels
    - establishes monitoring requirements
    
    Use the store_go_live tool when you have collected all required information.
    After calling the store_go_live tool, ALWAYS call the store_all tool to store all the product information.
    After calling, follow up with the user by asking if they would like to view a simulation or preview of the product. 
    This is an opportunity to let the user explore how the configured product would work in real scenarios. 
    If user responses positively, or whenever user mention about simulation or want to see product output, call the product_simulation tool.

    ${VALIDATION_INSTRUCTIONS.GoLive}
    
    ${GO_LIVE_EXAMPLE}`,
};
