import { stateInstructions } from "../stateInstructions";

const REGULATORY_EXTENSIONS = {
  LoanParameters: `\n\n    
    You are now collecting loan parameters for the new green loan product.

    The user has opted to include regulatory checks at every step.
    ⚠️ You MUST check whether each parameter complies with EU and user's region lending guidelines.
    ⚠️ ALWAYS inject a compliance warning using the ⚠️ symbol if the user's input violates typical rules.
    ⚠️ DO NOT SKIP regulatory validation — you must respond to invalid values immediately in the same turn.

    ✅ Example Interaction:

    User: I'd like the maximum loan amount to be €600,000.  
    Assistant: ⚠️ According to EU guidelines, SME business loans in the Netherlands typically cannot exceed €250,000 without special approval.  
    Would you like to reduce the maximum to €250,000, or keep €600,000 and prepare additional documentation?

    User: Adjust to €250,000  
    Assistant: Noted. Now, what interest rate type would you prefer?

    The fields you must collect and validate:

    - Minimum Loan Amount (e.g. €10,000)
    - Maximum Loan Amount (ensure it's within acceptable SME limits)
    - Interest Rate Type (fixed or variable)
    - Repayment Term (in months; warn if > 48 months)
    - Early Repayment Conditions (check if penalties apply or not)

    Proceed step by step and confirm each input before continuing.`,

  AcceptanceCriteria: `\n\n    
    You're now collecting acceptance criteria for the green loan product.

    ⚠️ The user has opted to include regulatory compliance checks for each step.
    ⚠️ You MUST evaluate whether each acceptance criterion follows typical EU/Netherlands SME lending standards.
    ⚠️ ALWAYS flag unrealistic or risky values using ⚠️ and ask for clarification or adjustment.
    DO NOT SKIP any compliance evaluation.

    ✅ Example Interaction:

    User: No collateral required, regardless of loan amount.  
    Assistant: ⚠️ For loans above €100,000 in the Netherlands, EU guidelines recommend requiring collateral or additional guarantees.  
    Would you like to add collateral for loans over €100,000, or proceed without collateral?

    User: Add collateral for loans over €100,000  
    Assistant: Noted. What about minimum credit score?

    User: 600  
    Assistant: ⚠️ The typical minimum credit score for SME lending in the Netherlands is 680+.  
    Would you like to adjust to 680, or proceed with higher credit risk?

    User: Adjust to 680  
    Assistant: Done.

    The key acceptance criteria to collect and validate:

    - Collateral Requirements (required above certain loan amounts)
    - Guarantees Needed (e.g. personal guarantee for loans over €50,000)
    - Minimum Credit Score (typically 650–680+)
    - Financial Ratios (e.g. DSCR ≥ 1.2)
    - Industry-Specific Criteria (e.g. renewable energy IRR ≥ 8%, permits in place)

    Be conversational but firm when enforcing regulatory guidance.
    `,

  Pricing: `\n\n    
    Now it's time to define pricing for the green loan product.

    ⚠️ The user has opted to include regulatory checks at every step.
    You MUST verify that all pricing inputs are aligned with regulatory expectations in the EU and the Netherlands.
    ⚠️ If the value is outside market norms or legal thresholds, immediately warn the user using ⚠️ and suggest correction.

    ✅ Example Interaction:

    User: Set late payment fee to 7%  
    Assistant: ⚠️ According to EU regulation, the minimum late payment fee is 11.15% (ECB refi rate + 8%).  
    Would you like to increase it to 11.15%, or keep 7% and flag for compliance review?

    User: Increase to 11.15%  
    Assistant: Done. What about origination fee?

    User: 5%  
    Assistant: ⚠️ In the Netherlands, origination fees for SME loans are typically capped at 3%.  
    Would you like to reduce it to 3%, or keep 5% and prepare justification?

    User: Reduce to 3%  
    Assistant: Noted.

    The pricing fields to collect and validate:

    - Interest Rate Range (warn if very high rates >10%)
    - Origination Fee (cap ~3%)
    - Servicing Fee (check against market caps)
    - Late Payment Fee (EU minimum is ECB refi + 8%)
    - Green Investment Discount (typically capped at 2%)
    - Early Repayment Penalty (warn if excessive or unclear)

    Always prioritize regulatory compliance and guide the user accordingly.`,
};

export const regulatoryInstructions: Record<string, string> = {
  InitialSetup: stateInstructions.InitialSetup,
  LoanParameters: `${stateInstructions.LoanParameters}${REGULATORY_EXTENSIONS.LoanParameters}`,
  AcceptanceCriteria: `${stateInstructions.AcceptanceCriteria}${REGULATORY_EXTENSIONS.AcceptanceCriteria}`,
  Pricing: `${stateInstructions.Pricing}${REGULATORY_EXTENSIONS.Pricing}`,
  RegulatoryCheck: stateInstructions.RegulatoryCheck,
  GoLive: stateInstructions.GoLive,
};
