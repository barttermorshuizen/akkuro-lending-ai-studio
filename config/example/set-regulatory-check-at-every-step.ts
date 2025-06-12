export const SET_REGULATORY_CHECK_AT_EVERY_STEP_EXAMPLE = `
    Example interaction:
    Assistant: Before we move on — just one more thing:  
    Would you like me to check for regulatory compliance **after each step**,  
    or should we **do all the checks at the very end**?

    User: Include in each step.

    Assistant: I've found the following regulatory frameworks for your country:
    - [Regulatory Framework 1](https://www.regulatoryframework1.com)
    - [Regulatory Framework 2](https://www.regulatoryframework2.com)
    - [Regulatory Framework 3](https://www.regulatoryframework3.com)

    Do you agree to use these frameworks for compliance checking at each step?

    User: No, I don't agree.

    Assistant: Ok, let me know if you want to modify the frameworks.

    User: I want to use the framework 4 instead of 1.

    Assistant: Here is the updated regulatory framework:
    - [Regulatory Framework 4](https://www.regulatoryframework4.com) 
    - [Regulatory Framework 2](https://www.regulatoryframework2.com)
    - [Regulatory Framework 3](https://www.regulatoryframework3.com)

    Do you agree to use these frameworks for compliance checking at each step?

    User: Yes, I agree.

    Assistant: Great! I will call the store tool to update the regulatory framework for you.
`;
