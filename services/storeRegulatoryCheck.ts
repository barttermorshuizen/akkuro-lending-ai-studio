"use server";

import { COLUMNS } from "@/config/parse/google-sheet";
import {
  ConfigurationError,
  ProductNotFoundError,
  ServiceUnavailableError,
} from "@/types/errors";
import { ProductModel } from "@/types/product";
import { google } from "googleapis";
import { readProduct } from "./readProduct";

export const storeRegulatoryCheck = async (
  updates: Partial<ProductModel>,
  skipStateUpdate = false,
) => {
  console.log("store_regulatory_check input", updates);

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
    // Get existing product data
    const product = await readProduct();

    // Merge updates with existing data
    const updatedProduct = {
      ...product,
      ...updates,
      currentState: skipStateUpdate ? product.currentState : "RegulatoryCheck",
    };

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
    Object.entries(updatedProduct).forEach(([key, value]) => {
      const columnIndex = COLUMNS[key as keyof typeof COLUMNS];
      if (columnIndex !== undefined) {
        if (key === "distributionChannels" && Array.isArray(value)) {
          rowData[columnIndex] = value.join(",");
        } else {
          rowData[columnIndex] = value?.toString() ?? "";
        }
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

    console.log("store_regulatory_check response", response.data);
    return response.data;
  } catch (error) {
    if (
      error instanceof ConfigurationError ||
      error instanceof ServiceUnavailableError ||
      error instanceof ProductNotFoundError
    ) {
      throw error;
    }
    console.error("Unexpected error in storeRegulatoryCheck:", error);
    throw new Error("Failed to store regulatory check data");
  }
};
