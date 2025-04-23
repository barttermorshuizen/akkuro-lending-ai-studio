'use server';
import { google } from 'googleapis';

export const readProduct = async () => {
  console.log("readProduct called");
  const authClient = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth: authClient });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
  const range = 'Sheet1!A2:C2';

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const row = response.data.values?.[0] || [];
  const productName = row[0] ?? null;
  const targetCustomer = row[1] ?? null;
  const intendedUse = row[2] ?? null;

  console.log("readProduct response", { productName, targetCustomer, intendedUse });
  return { productName, targetCustomer, intendedUse };
};