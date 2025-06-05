"use server";

import { COLUMNS } from "@/config/parse/google-sheet";
import { emptyProductModel } from "@/stores/useConfiguringProductStore";
import {
  ConfigurationError,
  ProductNotFoundError,
  ServiceUnavailableError,
} from "@/types/errors";
import { google } from "googleapis";

export const resetProduct = async () => {
  console.log("reset product service called");
  // Validate environment variables
  if (!process.env.GOOGLE_CLIENT_EMAIL) {
    throw new ConfigurationError("Google client email is not configured");
  }
  if (!process.env.GOOGLE_PRIVATE_KEY) {
    throw new ConfigurationError("Google private key is not configured");
  }
  if (!process.env.GOOGLE_SHEET_ID) {
    throw new ConfigurationError("Google sheet ID is not configured");
  }

  try {
    const authClient = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth: authClient });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = "Sheet1!A2:AE2"; // Extended range to cover all columns

    // Convert product data to array format for sheets
    const rowData = new Array(Object.keys(COLUMNS).length).fill(null);
    Object.entries(emptyProductModel).forEach(([key]) => {
      const columnIndex = COLUMNS[key as keyof typeof COLUMNS];
      if (key !== "currentState") {
        rowData[columnIndex] = "";
        console.log("columnIndex", columnIndex);
      } else {
        rowData[columnIndex] = "InitialSetup";
      }
    });

    const response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [rowData],
      },
    });

    console.log("reset product response", response.data);
    return response.data;
  } catch (error) {
    if (
      error instanceof ConfigurationError ||
      error instanceof ServiceUnavailableError ||
      error instanceof ProductNotFoundError
    ) {
      throw error;
    }
    console.error("Unexpected error in storeAll:", error);
    throw new Error("Failed to store all data");
  }
};
