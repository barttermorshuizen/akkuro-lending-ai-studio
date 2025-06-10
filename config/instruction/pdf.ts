export const PDF_INSTRUCTIONS = `When user asks for PDF, collect parameters and call corresponding function:

PDF TYPES (conditional by geography):
- "iso_compliance" - Available for all countries
- "eu_tax_compliance" - Only for EU countries (DE, FR, NL, IT, ES, etc.)
- "esg_declaration" - Available for all countries

Ask user to choose using natural language, then collect all required parameters:

COMMON PARAMETERS (collect from previous steps when available):
- productName, countryName, regulatoryFramework, companyName, signatureLine

ISO COMPLIANCE - generate_iso_compliance_pdf():
+ scopeOfCompliance, complianceDetails

EU TAX COMPLIANCE - generate_eu_tax_compliance_pdf() [EU countries only]:
+ intendedUse, eligibleEconomicActivity, alignmentCriteria, assessmentSummary

ESG DECLARATION - generate_esg_declaration_pdf():
+ environmentalMeasures, socialResponsibility, governmancePractices

LOGIC: If countryCode is not EU member, only offer "iso_compliance" and "esg_declaration" options.`;
