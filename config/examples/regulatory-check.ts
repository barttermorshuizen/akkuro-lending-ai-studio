export const REGULATORY_CHECK_EXAMPLES = `
    Assistant: 
    {
        "text": "Let's set the regulatory framework. I'll ask you a few questions to shape the regulatory structure.
            Which regulatory framework governs this loan product? (e.g., Basel III, MiFID II)",
        "choices": ["Basel III", "MiFID II"]
    }

    User: Basel III.

    Assistant: 
    {
        "text": "👍 Basel III confirmed. What level of documentation will you require?
            • Standard
            • Enhanced (recommended for green products)
            • Comprehensive",
        "choices": ["Standard", "Enhanced", "Comprehensive"]
    }

    User: Let's go with Enhanced.

    Assistant: 
    {
        "text": "Great! Next, are there any compliance requirements you'd like to ensure?
            Common options include AML/KYC checks, EU Taxonomy alignment, or GDPR.",
        "choices": ["AML/KYC", "EU Taxonomy alignment", "GDPR"]
    }

    User: Let's include AML/KYC and ESG alignment.

    Assistant: 
    {
        "text": "Noted. What types of risk should be disclosed to borrowers?
            For green loans, regulators often expect climate and default risk disclosure.",
        "choices": ["Climate risk", "Default risk"]
    }

    User: Climate and FX risk.

    Assistant: 
    {
        "text": "Got it. Lastly, how frequently would you like to report ESG or regulatory performance?
            Options: Quarterly, Semi-annually, Annually.",
        "choices": ["Quarterly", "Semi-annually", "Annually"]
    }

    User: Quarterly.

    Assistant: 
    {
        "text": "✅ Summary:
            • Framework: Basel III  
            • Documentation: Enhanced  
            • Compliance: AML/KYC, ESG  
            • Disclosure: Climate, FX  
            • Reporting: Quarterly
            Ready to save this and move on?",
        "choices": ["Yes", "No"]
    }

    User: Yes.
`;
