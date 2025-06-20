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

// ISO 3166-1 country code mapping for common non-standard codes
const COUNTRY_CODE_MAPPING: { [key: string]: string } = {
  UK: "GB", // United Kingdom
  USA: "US", // United States
};

// Validate and normalize country code
function validateCountryCode(code: string): string {
  if (!code) return "";

  const normalizedCode = code.toUpperCase();

  // Check if it's a common non-standard code that needs mapping
  if (COUNTRY_CODE_MAPPING[normalizedCode]) {
    return COUNTRY_CODE_MAPPING[normalizedCode];
  }

  // Validate the code format (2 uppercase letters)
  if (!/^[A-Z]{2}$/.test(normalizedCode)) {
    throw new ConfigurationError(
      `Invalid country code "${code}". Country code must be a valid ISO 3166-1 code (2 letters). ` +
        `For example, use "GB" for the United Kingdom or "US" for the United States.`,
    );
  }

  return normalizedCode;
}

export const storeInitialSetup = async (updates: Partial<ProductModel>) => {
  console.log("store_initial_setup input", updates);

  // Validate country code if provided
  if (updates.countryCode) {
    try {
      updates.countryCode = validateCountryCode(updates.countryCode);
    } catch (error) {
      if (error instanceof ConfigurationError) {
        throw error;
      }
      throw new ConfigurationError("Invalid country code format");
    }
  }

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
    // Get existing product data or initialize new product
    let product: ProductModel;
    try {
      product = await readProduct();
    } catch (error) {
      if (error instanceof ProductNotFoundError) {
        // Initialize new product with required fields
        product = {
          productName: "",
          targetCustomer: "",
          intendedUse: "",
          countryCode: "",
          currentState: "InitialSetup",
        };
      } else {
        throw error;
      }
    }

    // Merge updates with existing data
    const updatedProduct = { ...product, ...updates };

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

    console.log("store_initial_setup response", response.data);
    return response.data;
  } catch (error) {
    if (
      error instanceof ConfigurationError ||
      error instanceof ServiceUnavailableError ||
      error instanceof ProductNotFoundError
    ) {
      throw error;
    }
    console.error("Unexpected error in storeInitialSetup:", error);
    throw new Error("Failed to store initial setup data");
  }
};
