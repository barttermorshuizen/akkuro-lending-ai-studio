'use server';
import { google } from 'googleapis';
import { ConfigurationError, ServiceUnavailableError, ProductNotFoundError } from '@/types/errors';
import { ProductModel, ProductState } from '@/types/product';

// Column indices for each field in the spreadsheet
const COLUMNS = {
  productName: 0,
  targetCustomer: 1,
  intendedUse: 2,
  countryCode: 3,
  currentState: 4,
  loanAmountMin: 5,
  loanAmountMax: 6,
  interestRateType: 7,
  repaymentTerm: 8,
  repaymentFrequency: 9,
  earlyRepaymentConditions: 10,
  collateralRequirements: 11,
  guarantees: 12,
  minCreditScore: 13,
  financialRatios: 14,
  industrySpecificCriteria: 15,
  interestRateMin: 16,
  interestRateMax: 17,
  originationFee: 18,
  servicingFee: 19,
  latePaymentFee: 20,
  greenInvestmentDiscount: 21,
  earlyRepaymentPenalty: 22,
  regulatoryFramework: 23,
  requiredDocumentation: 24,
  complianceRequirements: 25,
  riskDisclosure: 26,
  reportingObligations: 27,
  launchDate: 28,
  distributionChannels: 29,
  monitoringRequirements: 30
};

export const readProduct = async (): Promise<ProductModel> => {
  console.log("readProduct called");

  // Validate environment variables
  if (!process.env.GOOGLE_CLIENT_EMAIL) {
    throw new ConfigurationError('Google client email is not configured');
  }
  if (!process.env.GOOGLE_PRIVATE_KEY) {
    throw new ConfigurationError('Google private key is not configured');
  }
  if (!process.env.GOOGLE_SHEET_ID) {
    throw new ConfigurationError('Google sheet ID is not configured');
  }

  try {
    const authClient = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth: authClient });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = 'Sheet1!A2:AE2'; // Extended range to cover all columns

    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });

      if (!response.data.values || response.data.values.length === 0) {
        throw new ProductNotFoundError('No product data found');
      }

      const row = response.data.values[0];
      
      // Helper function to safely parse numeric values
      const parseNumber = (value: string | undefined): number | undefined => {
        if (!value) return undefined;
        const num = Number(value);
        return isNaN(num) ? undefined : num;
      };

      // Helper function to parse distribution channels
      const parseDistributionChannels = (value: string | undefined): string[] | undefined => {
        if (!value) return undefined;
        return value.split(',').map(channel => channel.trim());
      };

      const product: ProductModel = {
        productName: row[COLUMNS.productName] || '',
        targetCustomer: row[COLUMNS.targetCustomer] || '',
        intendedUse: row[COLUMNS.intendedUse] || '',
        countryCode: row[COLUMNS.countryCode] || '',
        currentState: (row[COLUMNS.currentState] || 'InitialSetup') as ProductState,
        
        // Loan Parameters
        loanAmountMin: parseNumber(row[COLUMNS.loanAmountMin]),
        loanAmountMax: parseNumber(row[COLUMNS.loanAmountMax]),
        interestRateType: row[COLUMNS.interestRateType] as 'fixed' | 'variable' | undefined,
        repaymentTerm: parseNumber(row[COLUMNS.repaymentTerm]),
        repaymentFrequency: row[COLUMNS.repaymentFrequency] as 'monthly' | 'quarterly' | 'annually' | undefined,
        earlyRepaymentConditions: row[COLUMNS.earlyRepaymentConditions],

        // Acceptance Criteria
        collateralRequirements: row[COLUMNS.collateralRequirements],
        guarantees: row[COLUMNS.guarantees],
        minCreditScore: parseNumber(row[COLUMNS.minCreditScore]),
        financialRatios: row[COLUMNS.financialRatios],
        industrySpecificCriteria: row[COLUMNS.industrySpecificCriteria],

        // Pricing
        interestRateMin: parseNumber(row[COLUMNS.interestRateMin]),
        interestRateMax: parseNumber(row[COLUMNS.interestRateMax]),
        originationFee: row[COLUMNS.originationFee],
        servicingFee: row[COLUMNS.servicingFee],
        latePaymentFee: row[COLUMNS.latePaymentFee],
        greenInvestmentDiscount: parseNumber(row[COLUMNS.greenInvestmentDiscount]),
        earlyRepaymentPenalty: row[COLUMNS.earlyRepaymentPenalty],

        // Regulatory
        regulatoryFramework: row[COLUMNS.regulatoryFramework],
        requiredDocumentation: row[COLUMNS.requiredDocumentation],
        complianceRequirements: row[COLUMNS.complianceRequirements],
        riskDisclosure: row[COLUMNS.riskDisclosure],
        reportingObligations: row[COLUMNS.reportingObligations],

        // Go Live
        launchDate: row[COLUMNS.launchDate],
        distributionChannels: parseDistributionChannels(row[COLUMNS.distributionChannels]),
        monitoringRequirements: row[COLUMNS.monitoringRequirements]
      };

      console.log("readProduct response", product);
      return product;
    } catch (error) {
      if ((error as any).code === 503) {
        throw new ServiceUnavailableError('Google Sheets service is temporarily unavailable');
      }
      throw error;
    }
  } catch (error) {
    if (error instanceof ConfigurationError ||
        error instanceof ServiceUnavailableError ||
        error instanceof ProductNotFoundError) {
      throw error;
    }
    console.error('Unexpected error in readProduct:', error);
    throw new Error('Failed to read product data');
  }
};