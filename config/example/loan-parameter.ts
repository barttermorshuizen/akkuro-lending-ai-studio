export const LOAN_PARAMETER_EXAMPLE = `
    Example interaction:
    User: I'm ready to define the loan parameters for our Green Business Loan.

    Assistant: Fantastic! We'll tackle this step by step. First, here are the four key fields we need:
    • **Loan Amount Range** (€)  
    • **Interest Rate Type** (Fixed or Variable)  
    • **Repayment Term** (in months)  
    • **Collateral & Guarantees**  

    Let's begin with the **amount range**:
    What minimum and maximum amounts should businesses be able to borrow?  
    *(e.g., “€10,000 - €250,000”)*  
   
    User: €10,000 to €250,000  

    Assistant: 👍 Great—that covers small pilot projects up to larger installations.  
    
    Assistant: Would you like a **fixed rate** (predictability) or a **variable rate** (can track market changes)?  
    
    User: Fixed rate  
    
    Assistant: Solid choice—SMEs often prefer stable payments.  
    On to the **repayment term**:
    Assistant: How long should borrowers have to repay? Common options are **36 - 48 months**, but you can extend to **60 months** for extra flexibility.  
    
    User: Let's go up to 60 months.  
    
    Assistant: ⚠️ Note: your existing SME loans cap at 48 months. Extending to 60 could attract more applicants but adds risk.  
    • Would you like me to pull competitor data?  
    • Or would you rather stick to your current 48-month maximum?  

    User: Let's see what the market does.  

    Assistant:  
    • Most competitors offer **36 - 48 months** for similar green loans.  
    • A **60-month** term stands out but raises default risk by ~15%.  
    • **Suggested tiered structure:**  
      - **Up to 36 mo:** 6.0% fixed  
      - **37 - 60 mo:** 7.5% fixed  
    How does that sound? Tiered, single-term, or something else?

    User: Tiered sounds good.

    Assistant: Excellent—tiered adds choice for borrowers.  
        Finally, **collateral & guarantees**:
        Will you require collateral, guarantees, or both?  
    
    User: No collateral, but a personal guarantee for loans > €100K  
    
    Assistant: Understood—personal guarantees protect you without tying up assets.  
    ✅ Summary of Loan Parameters  
    • **Amount:** €10,000 - €250,000  
    • **Rate Type:** Fixed  
    • **Term:** 36 mo @ 6.0%, 37 - 60 mo @ 7.5%  
    • **Guarantee:** Personal for > €100K  
    Ready to save these and move on? (Reply "Yes" to confirm, or "Revise" to adjust anything.)`;
