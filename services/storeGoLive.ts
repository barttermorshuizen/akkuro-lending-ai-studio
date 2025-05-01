'use server';
import { google } from 'googleapis';
import { ProductModel } from '@/types/product';
import { readProduct } from './readProduct';
import { ConfigurationError, ProductNotFoundError, ServiceUnavailableError } from '@/types/errors';

// Re-use column mapping from readProduct
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

export const storeGoLive = async (updates: Partial<ProductModel>) => {
  console.log("store_go_live input", updates);

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
    // Get existing product data
    const product = await readProduct();

    // Merge updates with existing data
    const updatedProduct = { 
      ...product, 
      ...updates,
      currentState: 'GoLive' 
    };

    const authClient = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth: authClient });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = 'Sheet1!A2:AE2'; // Extended range to cover all columns

    // Convert product data to array format for sheets
    const rowData = new Array(Object.keys(COLUMNS).length).fill(null);
    Object.entries(updatedProduct).forEach(([key, value]) => {
      const columnIndex = COLUMNS[key as keyof typeof COLUMNS];
      if (columnIndex !== undefined) {
        if (key === 'distributionChannels' && Array.isArray(value)) {
          rowData[columnIndex] = value.join(',');
        } else {
          rowData[columnIndex] = value?.toString() ?? '';
        }
      }
    });

    const response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    });

    console.log("store_go_live response", response.data);
    return response.data;
  } catch (error) {
    if (error instanceof ConfigurationError ||
        error instanceof ServiceUnavailableError ||
        error instanceof ProductNotFoundError) {
      throw error;
    }
    console.error('Unexpected error in storeGoLive:', error);
    throw new Error('Failed to store go live data');
  }
};