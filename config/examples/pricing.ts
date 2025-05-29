export const PRICING_EXAMPLES = `
    Assistant: 
    {
        "text": "Let's set the pricing parameters. I'll ask you a few questions to shape the pricing structure.
            • Interest rate range
            • Fee structure
            • Green discount
            • Early repayment penalty

            Let's begin with the minimum interest rate.  
            The market average for similar loans is around 4.0%-6.0%.  
            What's the lowest interest rate you'd like to offer?",
        "choices": ["3.5%", "4.0%", "4.5%", "Other"]
    }

    User: 3.5%

    Assistant: 
    {
        "text": "⚠️ 3.5% is below the 4.0% minimum we usually recommend.  
            At your cost of funds (2.5%), that leaves little margin.  
            Would you like to adjust to 4.0%, or keep 3.5%?
        ",
        "choices": ["4.0%", "3.5%"]
    }

    User: Let's go with 4.0%.

    Assistant: 
    {
        "text": "👍 Good call. And what about the maximum rate?",
        "choices": ["7.5%", "8.0%", "8.5%", "Other"]
    }

    User: 7.5%

    Assistant: 
    {
        "text": "That works. A 4.0%-7.5% range gives you flexibility across risk tiers.
            Now, about the origination fee - how much will you charge upfront?  
            Market norm is 1%-3% of the loan amount.  
            What's the origination fee you'd like to charge?",
        "choices": ["1%", "2%", "3%", "Other"]
    }

    

    User: 0.5%

    Assistant: 
    {
        "text": "⚠️ That's below the norm. It may attract users, but you risk under-recovering onboarding costs.  
            Would you like to change it to 1%?",
        "choices": ["1%", "0.5%"]
    }

    User: Keep 0.5% for now—we're launching competitively.

    Assistant: 
    {
        "text": "Got it. Next, the servicing fee.  
            Lenders usually charge 0.1%-0.5% per year on outstanding balances.
            What's the servicing fee you'd like to charge?",
        "choices": ["0.1%", "0.2%", "0.3%", "0.4%", "0.5%", "Other"]
    }

    User: Let's set it at 0.8%.

    Assistant: 
    {
        "text": "⚠️ That's higher than usual. It could trigger friction.  
            Would you like to lower it to 0.5%?",
        "choices": ["0.5%", "0.4%", "0.3%", "0.2%", "0.1%", "Other"]
    }

    User: Yes, let's do 0.5%.

    Assistant: 
    {
        "text": "👍 Done. Now, the **late payment fee**.  
            EU regulation requires a minimum of 11.15% (ECB refi + 8 pp).
            What's the late payment fee you'd like to charge?",
        "choices": ["11.15%", "12.15%", "13.15%", "Other"]
    }

    User: I was thinking 6%.

    Assistant: 
    {
        "text": "⚠️ That's not compliant. Let's go with 11.15%?",
        "choices": ["11.15%", "12.15%", "13.15%", "Other"]
    }

    User: Yes.

    Assistant: 
    {
        "text": "Great. For the **green investment discount**, banks usually offer 0%-2%.  
            Do you want to include one?",
        "choices": ["0%", "0.5%", "1%", "2%", "Other"]
    }

    User: Yes, 0.75%.

    Assistant: 
    {
        "text": "👍 Perfect balance. Lastly, do you want to charge a penalty for early repayment?  
            Market average is about 1%, but many green loans offer flexibility.",
        "choices": ["Yes", "No"]
    }

    User: Let's not charge a penalty.

    Assistant: 
    {
        "text": "⚠️ Skipping the penalty supports adoption but exposes you to early churn.  
            Keep no penalty?",
        "choices": ["Yes", "No"]
    }

    User: Yes—no penalty.

    Assistant: 
    {
        "text": "✅ Summary:
            • Interest rate: 4.0% - 7.5%  
            • Origination: 0.5%  
            • Servicing: 0.5%  
            • Late fee: 11.15%  
            • Green discount: 0.75%  
            • Early repayment: no penalty
        Ready to save? (Yes/Revise)",
        "choices": ["Yes", "Revise"]
    }

    User: Yes, save.
`;
