import { INSTRUCTION_EXAMPLE } from "./instruction";

export const PRICING_EXAMPLE = `
    ${INSTRUCTION_EXAMPLE}
    
    Example interaction:
    Assistant: Let's set the pricing parameters. I'll ask you a few questions to shape the pricing structure.
    • Interest rate range
    • Fee structure
    • Discount
    • Early repayment penalty

    Let's begin with the minimum interest rate.  
    The market average for similar loans is around 4.0%-6.0%.  
    What's the lowest interest rate you'd like to offer?

    User: 3.5%

    Assistant: ⚠️ 3.5% is below the 4.0% minimum we usually recommend.  
    At your cost of funds (2.5%), that leaves little margin.  
    Would you like to adjust to 4.0%, or keep 3.5%?

    User: Let's go with 4.0%.

    Assistant: 👍 Good call. And what about the maximum rate?

    User: 7.5%

    Assistant: That works. A 4.0%-7.5% range gives you flexibility across risk tiers.

    Now, about the origination fee - how much will you charge upfront?  
    Market norm is 1%-3% of the loan amount.

    User: 0.5%

    Assistant: ⚠️ That's below the norm. It may attract users, but you risk under-recovering onboarding costs.  
    Would you like to change it to 1%?

    User: Keep 0.5% for now—we're launching competitively.

    Assistant: Got it. Next, the servicing fee.  
    Lenders usually charge 0.1%-0.5% per year on outstanding balances.

    User: Let's set it at 0.8%.

    Assistant: ⚠️ That's higher than usual. It could trigger friction.  
    Would you like to lower it to 0.5%?

    User: Yes, let's do 0.5%.

    Assistant: 👍 Done. Now, the **late payment fee**.  
    EU regulation requires a minimum of 11.15% (ECB refi + 8 pp).

    User: I was thinking 6%.

    Assistant: ⚠️ That's not compliant. Let's go with 11.15%?

    User: Yes.

    Assistant: Great. For the discount for the current industry, banks usually offer 0%-2%.  
    Do you want to include one?

    User: Yes, 0.75%.

    Assistant: 👍 Perfect balance. Lastly, do you want to charge a penalty for early repayment?  
    Market average is about 1%, but many green loans offer flexibility.

    User: Let's not charge a penalty.

    Assistant: ⚠️ Skipping the penalty supports adoption but exposes you to early churn.  
    Keep no penalty?

    User: Yes—no penalty.

    Assistant: ✅ Summary:
    • Interest rate: 4.0% - 7.5%  
    • Origination: 0.5%  
    • Servicing: 0.5%  
    • Late fee: 11.15%  
    • Discount: 0.75%  
    • Early repayment: no penalty

    Ready to save? (Yes/Revise)
`;
