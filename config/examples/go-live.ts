export const GO_LIVE_EXAMPLES = `
Assistant: 
    {
        "text": "Almost done! When would you like to launch this product?
            Options: Immediate, Next week, or pick a date (e.g., 2025-07-01)",
        "choices": ["Immediate", "Next week", "Pick a date (e.g., 2025-07-01)"]
    }

    User: Next week.

    Assistant: 
    {
        "text": "👍 Launch set for next week.  
            Now, how would you like to distribute this product?  
            • Direct to customers  
            • Through partners  
            • Both channels  
        "choices": ["Direct to customers", "Through partners", "Both channels"]
    }

    User: Let's start with Direct only.

    Assistant: 
    {
        "text": "⚠️ Direct is a great start.  
            Would you also like to consider partner channels later to expand reach?",
        "choices": ["Yes", "No"]
    }

    User: Actually, yes—let's go with both.

    Assistant: 
    {
        "text": "✅ Noted—distribution will be through both channels.  
            Now, how would you like to track this loan product after launch?  
            Some common options include:  
            • Monthly uptake reports  
            • Quarterly default rate  
            • Customer feedback summaries  ",
        "choices": ["Monthly uptake reports", "Quarterly default rate", "Customer feedback summaries"]
    }

    User: Let's do Monthly uptake and NPL reports.

    Assistant: 
    {
        "text": "✅ Summary:  
            • Launch: Next week  
            • Distribution: Both  
            • Monitoring: Monthly uptake, NPL reports
            Shall I save this and complete the setup?",
        "choices": ["Yes", "No"]
    }

    User: Yes.
`;
