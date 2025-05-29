export const LOAN_PARAMETERS_EXAMPLES = `
    User (Business Analyst): I'm ready to define the loan parameters for our Green Business Loan.
    
    Assistant: 
    {
        "text": "Fantastic! We'll tackle this step by step. First, here are the four key fields we need:
            • **Loan Amount Range** (€)  
            • **Interest Rate Type** (Fixed or Variable)  
            • **Repayment Term** (in months)  
            • **Collateral & Guarantees**  
        Let's begin with the **amount range**: What minimum and maximum amounts should businesses be able to borrow?
        *(e.g., “€10,000 - €250,000”)*  
        ",
        "choices": ["€10,000 - €250,000", "€250,000 - €500,000", "€500,000 - €1,000,000", "Other"]
    }

    User: €10,000 to €250,000  

    Assistant: 
    {
        "text": "👍 Great—that covers small pilot projects up to larger installations. 
            Next up, **interest rate type**:
            Would you like a **fixed rate** (predictability) or a **variable rate** (can track market changes)?",
        "choices": ["Fixed rate", "Variable rate"]
    }
      
    User: Fixed rate  
    
    Assistant: 
    {
        "text": "Solid choice—SMEs often prefer stable payments.  
            On to the **repayment term**:
            How long should borrowers have to repay? Common options are **36 - 48 months**, but you can extend to **60 months** for extra flexibility.  
        ",
        "choices": ["36 - 48 months", "60 months"]
    }

    User: Let's go up to 60 months.  
    Assistant: 
    {
        "text": "⚠️ Note: your existing SME loans cap at 48 months. Extending to 60 could attract more applicants but adds risk.  
            • Would you like to adjust the repayment term?
        ",
        "choices": ["Yes, adjust the repayment term", "No, stick to 48 months"]
    }

    User: Yes, adjust the repayment term.  

    Assistant: 
    {
        "text": "Most competitors offer **36 - 48 months** for similar green loans.  
            • A **60-month** term stands out but raises default risk by ~15%.  
            • **Suggested tiered structure:**  
      - **Up to 36 mo:** 6.0% fixed  
      - **37 - 60 mo:** 7.5% fixed  
        ",
        "choices": ["Tiered", "Single-term", "Other"]
    }

    User: Tiered sounds good.

    Assistant: 
    {
        "text": "Excellent—tiered adds choice for borrowers.  
            • Will you require collateral, guarantees, or both?  
        ",
        "choices": ["Collateral", "Guarantee", "Both"]
    }

    User: No collateral, but a personal guarantee for loans > €100K  

    Assistant: 
    {
        "text": "Understood—personal guarantees protect you without tying up assets.  
            • Would you like to adjust the collateral or guarantee requirements?",
        "choices": ["Yes, adjust the collateral or guarantee requirements", "No, keep the current requirements"]
    }

    User: No, keep the current requirements.

    Assistant: 
    {
        "text": "Great—let's save these and move on to the next step.
            • Would you like to save these and move on to the next step?
        ",
        "choices": ["Yes, save and move on", "No, revise"]
    }

    `;
