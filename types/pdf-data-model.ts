export type PdfType =
  | "iso_compliance"
  | "eu_tax_compliance"
  | "esg_declaration";

export type ISOCompliancePdfDataModel = {
  productName: string;
  countryName: string;
  regulatoryFramework: string;
  companyName: string;
  signatureLine: string;
  scopeOfCompliance: string;
  complianceDetails: string;
  timestamp: string;
};

export type ISOCompliancePdfDataModelWrapper = {
  type: "iso_compliance";
} & ISOCompliancePdfDataModel;

export type EuTaxCompliancePdfDataModel = {
  productName: string;
  countryName: string;
  intendedUse: string;
  eligibleEconomicActivity: string;
  alignmentCriteria: string;
  assessmentSummary: string;
  regulatoryFramework: string;
  signatureLine: string;
  companyName: string;
};

export type EuTaxCompliancePdfDataModelWrapper = {
  type: "eu_tax_compliance";
} & EuTaxCompliancePdfDataModel;

export type EsgDeclarationPdfDataModel = {
  productName: string;
  countryName: string;
  signatureLine: string;
  environmentalMeasures: string;
  socialResponsibility: string;
  governmancePractices: string;
  companyName: string;
  regulatoryFramework: string;
};

export type EsgDeclarationPdfDataModelWrapper = {
  type: "esg_declaration";
} & EsgDeclarationPdfDataModel;
