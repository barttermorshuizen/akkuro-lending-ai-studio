export interface ComplianceCheckProductParametersModel {
  countryCode: string;
  parametersToCheck: {
    productParam: string;
    productParamDescription: string;
    paramValue: string;
    regulationDescription: string;
    expectedRange: string;
    isCompliant: boolean;
    notes: string;
  }[];
}
