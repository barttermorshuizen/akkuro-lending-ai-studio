import { ACCEPTANCE_CRITERIA_EXAMPLE } from "./example/acceptance-criteria";
import { GO_LIVE_EXAMPLE } from "./example/go-live";
import { LOAN_PARAMETER_EXAMPLE } from "./example/loan-parameter";
import { PRICING_EXAMPLE } from "./example/pricing";
import { REGULATORY_CHECK_EXAMPLE } from "./example/regulatory-check";
import { FORMAT_INSTRUCTIONS } from "./instruction/format";
import {
  COMPLIANCE_INSTRUCTIONS,
  GLOBAL_INSTRUCTIONS,
} from "./instruction/global";
import { VALIDATION_INSTRUCTIONS } from "./instruction/validation";
import { stateInstructions } from "./stateInstructions";

export const regulatoryInstructions: Record<string, string> = {
  InitialSetup: stateInstructions.InitialSetup,
  SetRegulatoryCheckAtEveryStep:
    stateInstructions.SetRegulatoryCheckAtEveryStep,
  LoanParameters: `${GLOBAL_INSTRUCTIONS}
    These instructions cover the LoanParameters state of the conversation.
    
    The LoanParameters state identifies:
    - loan amount range (minimum and maximum amounts)
    - interest rate type (fixed or variable)
    - repayment term (duration and frequency)
    - early repayment conditions
    
    ${COMPLIANCE_INSTRUCTIONS}


    Use the store_loan_parameters_secondary tool when you have collected all required information.
    ALWAYS call the store_loan_parameters_secondary tool before moving to the AcceptanceCriteria state.
    The compliance check will be done for all necessary parameters, not skip any of them.

    After storing, guide the user to the AcceptanceCriteria state.

    ${FORMAT_INSTRUCTIONS}
    
    ${VALIDATION_INSTRUCTIONS.LoanParameters}

    ${LOAN_PARAMETER_EXAMPLE}
    `,

  AcceptanceCriteria: `${GLOBAL_INSTRUCTIONS}
    These instructions cover the AcceptanceCriteria state of the conversation.

    The AcceptanceCriteria state identifies:
    - collateral requirements
    - guarantees needed
    - minimum credit score thresholds
    - financial ratio requirements
    - industry-specific criteria

    ${COMPLIANCE_INSTRUCTIONS}

    Use the store_acceptance_criteria_secondary tool when you have collected all required information.
    ALWAYS call the store_acceptance_criteria_secondary tool before moving to the Pricing state.
    After storing, guide the user to the Pricing state.

    ${FORMAT_INSTRUCTIONS}

    ${VALIDATION_INSTRUCTIONS.AcceptanceCriteria}

    ${ACCEPTANCE_CRITERIA_EXAMPLE}
    `,

  Pricing: `${GLOBAL_INSTRUCTIONS}
    These instructions cover the Pricing state of the conversation.

    The Pricing state identifies:
    - interest rate ranges
    - fee structure (origination, servicing, late payment)
    - discount
    - risk-based pricing adjustments
    - early repayment penalties

    ${COMPLIANCE_INSTRUCTIONS}
    
    Use the store_pricing_secondary tool when you have collected all required information.
    ALWAYS call the store_pricing_secondary tool before moving to the RegulatoryCheck state.
    After storing, guide the user to the RegulatoryCheck state.

    ${FORMAT_INSTRUCTIONS}

    ${VALIDATION_INSTRUCTIONS.Pricing}

    ${PRICING_EXAMPLE}
    `,

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

    ${COMPLIANCE_INSTRUCTIONS}

    Use the store_regulatory_check_secondary tool when you have collected all required information.
    ALWAYS call the store_regulatory_check_secondary tool before moving to the GoLive state.
    After storing, guide the user to the GoLive state.

    ${FORMAT_INSTRUCTIONS}

    ${VALIDATION_INSTRUCTIONS.RegulatoryCheck}

    ${REGULATORY_CHECK_EXAMPLE}
    `,

  GoLive: `${GLOBAL_INSTRUCTIONS}
    These instructions cover the GoLive state of the conversation.
   
    The GoLive state:
    - reviews all product details
    - confirms completeness
    - sets launch date
    - defines distribution channels
    - establishes monitoring requirements

    ${COMPLIANCE_INSTRUCTIONS}
    
    Use the store_go_live tool when you have collected all required information.
    After calling the store_go_live tool, follow up with the user by asking if they would like to view a simulation or preview of the product. 
    This is an opportunity to let the user explore how the configured product would work in real scenarios. 
    If user responses positively, or whenever user mention about simulation or want to see product output, call the product_simulation tool.

    ${FORMAT_INSTRUCTIONS}
    
    ${VALIDATION_INSTRUCTIONS.GoLive}

    ${GO_LIVE_EXAMPLE}
    `,
};
