// storeProduct.ts
'use server';
import { google } from 'googleapis';

export const storeProduct = async (productName: string, targetCustomer: string, intendedUse: string, countryCode: string) => {
  console.log("store_product input", { productName, targetCustomer, intendedUse });

  const authClient = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth: authClient });

  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
  const range = 'Sheet1!A2:D2';

  const response = await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[productName, targetCustomer, intendedUse, countryCode]],
    },
  });

  console.log("store_product response", response.data);
  return response.data;
};