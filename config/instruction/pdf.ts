export const PDF_INSTRUCTIONS = ` When user asks for a PDF, collect the following parameters and call the corresponding function:
    Which type of PDF: "iso_compliance" or "eu_tax_compliance" or "esg_declaration", only one of these three types is allowed, when ask user, use the natural language to ask the user to choose one of the three types, and then call the corresponding function.
    ALWAYS collect all necessary parameters for the PDF, and then call the corresponding function, some fields are collected from previous steps such as productName, regulatoryFramework.

    With iso_compliance, you need to call the function "generate_iso_compliance_pdf" and provide the following parameters:
    - productName: "The name of the loan product"
    - countryName: "The name of the country"
    - regulatoryFramework: "Applicable regulatory framework"
    - companyName: "The name of the company"
    - signatureLine: "The signature line of the ISO declaration"
    - scopeOfCompliance: "Scope of compliance"
    - complianceDetails: "Compliance details"

    With eu_tax_compliance, you need to call the function "generate_eu_tax_compliance_pdf" and provide the following parameters:
    - productName: "The name of the loan product"
    - countryName: "The name of the country"
    - intendedUse: "The intended use of the loan product"
    - eligibleEconomicActivity: "Eligible economic activity"
    - alignmentCriteria: "Alignment criteria"
    - assessmentSummary: "Assessment summary"
    - companyName: "The name of the company"
    - regulatoryFramework: "Applicable regulatory framework"
    - signatureLine: "The signature line of the EU tax compliance declaration"

    With esg_declaration, you need to call the function "generate_esg_declaration_pdf" and provide the following parameters:
    - productName: "The name of the loan product"
    - countryName: "The name of the country"
    - signatureLine: "The signature line of the ESG declaration"
    - environmentalMeasures: "Environmental measures"
    - socialResponsibility: "Social responsibility"
    - governmancePractices: "Governance practices"  
    - companyName: "The name of the company"
    - regulatoryFramework: "Applicable regulatory framework`;
