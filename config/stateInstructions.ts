import { FORMAT_INSTRUCTIONS } from "./instruction/format";
import { GLOBAL_INSTRUCTIONS } from "./instruction/global";
import { VALIDATION_INSTRUCTIONS } from "./instruction/validation";

export const stateInstructions: Record<string, string> = {
  InitialSetup: `${GLOBAL_INSTRUCTIONS}
    These instructions cover the InitialSetup state of the conversation.

    The InitialSetup state identifies:
    - the targeted customer (e.g. SMEs, large enterprises, startups)
    - the country code (follow the ISO 3166-1 alpha-2 standard)
    - its intended use (e.g. green investments, working capital, equipment financing)
    - a fitting product name (e.g. Green Business Loan, Working Capital Loan, Equipment Financing)
    
    Use the store_initial_setup tool when you have collected all required information.
    Before storing, ask the user to confirm the information.
    ALWAYS call the store_initial_setup tool before moving to the SetRegulatoryCheckAtEveryStep state.
    After storing, guide the user to the SetRegulatoryCheckAtEveryStep state.
    
    ${FORMAT_INSTRUCTIONS}
    
    ${VALIDATION_INSTRUCTIONS.InitialSetup}
    `,
  SetRegulatoryCheckAtEveryStep: `${GLOBAL_INSTRUCTIONS}
    These instructions cover the SetRegulatoryCheckAtEveryStep state of the conversation.

    Now, please ask the user:
    "Would you like regulatory checks to be included at each step, or only at the end?"
    Choices:
    - "Include in each step"
    - "Only at the end"
     If the user chooses "Include in each step", call the store_is_regulatory_check_at_every_step tool with includeRegulatoryCheckFromInitialSetup set to true.
    If the user chooses "Only at the end", call the tool with includeRegulatoryCheckFromInitialSetup set to false.
    
    Before calling the store_is_regulatory_check_at_every_step tool, you should ask the user to confirm their choice.

    IMPORTANT: After the user confirms their choice, you MUST call the store_is_regulatory_check_at_every_step tool with the correct parameter before moving to the next step. Do not skip this tool call.

    After calling the tool, move to the LoanParameters state.
    `,
  LoanParameters: `${GLOBAL_INSTRUCTIONS}
    These instructions cover the LoanParameters state of the conversation.
    
    The LoanParameters state identifies:
    - loan amount range (minimum and maximum amounts)
    - interest rate type (fixed or variable)
    - repayment term (duration and frequency)
    - early repayment conditions
    
    Use the store_loan_parameters tool when you have collected all required information.
    ALWAYS call the store_loan_parameters tool before moving to the AcceptanceCriteria state.
    After storing, guide the user to the AcceptanceCriteria state.

    ${FORMAT_INSTRUCTIONS}
    
    ${VALIDATION_INSTRUCTIONS.LoanParameters}`,

  AcceptanceCriteria: `${GLOBAL_INSTRUCTIONS}
    These instructions cover the AcceptanceCriteria state of the conversation.

    The AcceptanceCriteria state identifies:
    - collateral requirements
    - guarantees needed
    - minimum credit score thresholds
    - financial ratio requirements
    - industry-specific criteria
    
    Use the store_acceptance_criteria tool when you have collected all required information.
    ALWAYS call the store_acceptance_criteria tool before moving to the Pricing state.
    After storing, guide the user to the Pricing state.

    ${FORMAT_INSTRUCTIONS}

    ${VALIDATION_INSTRUCTIONS.AcceptanceCriteria}`,

  Pricing: `${GLOBAL_INSTRUCTIONS}
    These instructions cover the Pricing state of the conversation.

    The Pricing state identifies:
    - interest rate ranges
    - fee structure (origination, servicing, late payment)
    - green investment discounts
    - risk-based pricing adjustments
    - early repayment penalties
    
    Use the store_pricing tool when you have collected all required information.
    ALWAYS call the store_pricing tool before moving to the RegulatoryCheck state.
    After storing, guide the user to the RegulatoryCheck state.

    ${FORMAT_INSTRUCTIONS}

    ${VALIDATION_INSTRUCTIONS.Pricing}`,

  RegulatoryCheck: `${GLOBAL_INSTRUCTIONS}
    These instructions cover the RegulatoryCheck state of the conversation.
  
    The RegulatoryCheck state identifies:
    These instructions cover the RegulatoryCheck state of the conversation.
    The RegulatoryCheck state identifies:
    - applicable regulatory frameworks
    - required documentation
    - compliance requirements
    - risk disclosure needs
    - reporting obligations
    
    Use the store_regulatory_check tool when you have collected all required information.
    ALWAYS call the store_regulatory_check tool before moving to the GoLive state.
    After storing, guide the user to the GoLive state.

    ${FORMAT_INSTRUCTIONS}

    ${VALIDATION_INSTRUCTIONS.RegulatoryCheck}`,

  GoLive: `${GLOBAL_INSTRUCTIONS}
    These instructions cover the GoLive state of the conversation.
   
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

    ${FORMAT_INSTRUCTIONS}
    
    ${VALIDATION_INSTRUCTIONS.GoLive}`,
};
