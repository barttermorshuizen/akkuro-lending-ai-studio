export const ACCEPTANCE_CRITERIA_EXAMPLES = `
    Assistant: 
    {
        "text": "Let's define eligibility criteria. I'll ask you a few questions to shape the borrower profile.
            First, should borrowers provide **collateral**?",
        "choices": ["No collateral required", "Yes, collateral required"]
    }

    Assistant: 
    {
        "text": "For loans under €100K that's common.  
            But for amounts > €100K, would you consider requiring some kind of pledge?",
        "choices": ["Yes, equipment pledge", "No, no collateral required"]
    }
    
    User: If loan > €100K, then yes—equipment pledge.

    Assistant: 
    {
        "text": "👍 Noted. Next, any **guarantees**?",
        "choices": ["Personal guarantee for all loans over €50K", "No guarantees required"]
    }

    User: Personal guarantee for all loans over €50K.

    Assistant: 
    {
        "text": "That's in line with best practice.  
            Would you like to add corporate guarantee for larger amounts?",
        "choices": ["Yes, corporate guarantee", "No, just personal"]
    }

    User: No, just personal.

    Assistant: 
    {
        "text": "Got it. Now, the **minimum credit score**.  
            Most lenders require at least 650+.  
            Some go up to 700+, but it lowers approval rates.",
        "choices": ["700+", "680+"]
    }

    User: Let's go with 700+.

    Assistant: 
    {
        "text": "⚠️ 700+ is a high bar and might exclude ~30% of SME applicants.  
            Would you like to relax that to 680+?",
        "choices": ["680+", "700+"]
    }

    User: Okay, let's do 680+.

    Assistant: 
    {
        "text": "👍 Adjusted. Let's move on to **financial ratios**.  
            We usually recommend:
            • DSCR ≥ 1.2  
            • Current Ratio ≥ 1.1  
            • Debt-to-Equity ≤ 2.0  
            Would you like to apply these?",
        "choices": ["Yes, apply these", "No, revise"]
    }

    User: Yes—those values are fine.

    Assistant: 
    {
        "text": "Noted. Any **industry-specific rules** for renewable energy?",
        "choices": ["Yes, industry-specific rules", "No, no industry-specific rules"]
    }
    
    User: I want to make sure:
    • Borrowers have ≥ 2 years in the RE sector  
    • Projects have IRR ≥ 8%  
    • Permits and off-taker contracts are ready

    Assistant: 
    {
        "text": "✅ Perfect. Here's your eligibility setup:
            • Collateral: required only for loans > €100K  
            • Guarantee: personal for loans > €50K  
            • Credit Score: 680+  
            • Financial Ratios: DSCR ≥ 1.2, Current ≥ 1.1, D/E ≤ 2.0  
            • RE Criteria: 2+ yrs experience, IRR ≥ 8%, permits & off-taker in place
            Ready to save these criteria? (Yes/Revise)",
        "choices": ["Yes, save", "No, revise"]
    }

    User: Yes, save.
`;
