export const ACCEPTANCE_CRITERIA_EXAMPLE = `
    Assistant: Let's define eligibility criteria. I'll ask you a few questions to shape the borrower profile.

    First, should borrowers provide **collateral**?

    User: No collateral required.

    Assistant: For loans under €100K that's common.  
    But for amounts > €100K, would you consider requiring some kind of pledge?

    User: If loan > €100K, then yes—equipment pledge.

    Assistant: 👍 Noted. Next, any **guarantees**?

    User: Personal guarantee for all loans over €50K.

    Assistant: That's in line with best practice.  
    Would you like to add corporate guarantee for larger amounts?

    User: No, just personal.

    Assistant: Got it. Now, the **minimum credit score**.  
    Most lenders require at least 650+.  
    Some go up to 700+, but it lowers approval rates.

    User: Let's go with 700+.

    Assistant: ⚠️ 700+ is a high bar and might exclude ~30% of SME applicants.  
    Would you like to relax that to 680+?

    User: Okay, let's do 680+.

    Assistant: 👍 Adjusted. Let's move on to **financial ratios**.  
    We usually recommend:
    • DSCR ≥ 1.2  
    • Current Ratio ≥ 1.1  
    • Debt-to-Equity ≤ 2.0  
    Would you like to apply these?

    User: Yes—those values are fine.

    Assistant: Noted. Any **industry-specific rules** for renewable energy?

    User: I want to make sure:
    • Borrowers have ≥ 2 years in the RE sector  
    • Projects have IRR ≥ 8%  
    • Permits and off-taker contracts are ready

    Assistant: ✅ Perfect. Here's your eligibility setup:
    • Collateral: required only for loans > €100K  
    • Guarantee: personal for loans > €50K  
    • Credit Score: 680+  
    • Financial Ratios: DSCR ≥ 1.2, Current ≥ 1.1, D/E ≤ 2.0  
    • RE Criteria: 2+ yrs experience, IRR ≥ 8%, permits & off-taker in place

    Ready to save these criteria? (Yes/Revise)`;
