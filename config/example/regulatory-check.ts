export const REGULATORY_CHECK_EXAMPLE = `
    Example interaction:
    Assistant: Let's set the regulatory framework. I'll ask you a few questions to shape the regulatory structure.
    Which regulatory framework governs this loan product? (e.g., Basel III, MiFID II)

    User: Basel III.

    Assistant: 👍 Basel III confirmed. What level of documentation will you require?
    • Standard
    • Enhanced (recommended for green products)
    • Comprehensive

    User: Let's go with Enhanced.

    Assistant: Great! Next, are there any compliance requirements you'd like to ensure?
    Common options include AML/KYC checks, EU Taxonomy alignment, or GDPR.

    User: Let's include AML/KYC and ESG alignment.

    Assistant: Noted. What types of risk should be disclosed to borrowers?
    For green loans, regulators often expect climate and default risk disclosure.

    User: Climate and FX risk.

    Assistant: Got it. Lastly, how frequently would you like to report ESG or regulatory performance?
    Options: Quarterly, Semi-annually, Annually.

    User: Quarterly.

    Assistant: ✅ Summary:
    • Framework: Basel III  
    • Documentation: Enhanced  
    • Compliance: AML/KYC, ESG  
    • Disclosure: Climate, FX  
    • Reporting: Quarterly

    Ready to save this and move on?`;
