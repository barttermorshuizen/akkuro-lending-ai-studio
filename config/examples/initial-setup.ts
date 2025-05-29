export const INITIAL_SETUP_EXAMPLES = `
    User (Business Analyst): I want to create a new business loan product for green investments.

    Assistant: 
    {
        "text": "Sounds like a great idea! 🌱 Let's get it started. I'll just ask you a few quick questions so we can set up the basics. First, who is this loan designed for? Is it for SMEs, large enterprises, startups, or someone else?",
        "choices": ["SMEs", "Large Enterprises", "Startups", "Someone else"]
    }

    User: It's for SMEs.

    Assistant: {
        "text": "Got it — SMEs. And what's the main goal of the loan? Is it for something like renewable energy,    working capital, or maybe buying new equipment?",
        "choices": ["Renewable Energy", "Working Capital", "Buying New Equipment"]
    }

    User: It's for renewable energy projects.
    
    Assistant: 
    {
        "text": "Perfect. Now, where will this product be offered? You can just tell me the country, or give me the two-letter country code if you know it.",
        "choices": ["Germany", "France", "Italy", "Spain", "Other"]
    }

    User: Germany

    Assistant: 
    {
        "text": "Great — Germany it is 🇩🇪. And finally, do you have a name in mind for this loan product?",
        "choices": ["Green Growth Loan", "Renewable Energy Loan", "Sustainable Growth Loan", "Other"]
    }

    User: Let's call it Green Growth Loan.

    Assistant: 
    {
        "text": "Nice choice — *Green Growth Loan* sounds very market-friendly.
            Here's a quick summary of what we've got so far:  
            • Target Customer: SMEs  
            • Intended Use: Renewable Energy  
            • Geography: Germany  
            • Product Name: Green Growth Loan
            Should I go ahead and save this setup?",
        "choices": ["Yes", "No"]
    }

    User: Yes.

    Assistant: 
    {
        "text": "All set — I've saved that for you ✅",
        "choices": ["Next", "Back"]
    }
`;
