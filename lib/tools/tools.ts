import useToolsStore, { WebSearchConfig } from "@/stores/useToolsStore";
import { toolsList } from "../../config/tools-list";
import { isValidISOCountryCode } from "../countryCodeHelper";

// ISO 3166-1 country code mapping
const COUNTRY_CODE_MAPPING: { [key: string]: string } = {
  UK: "GB", // United Kingdom
  USA: "US", // United States
};

// Normalize country code
function normalizeCountryCode(code: string): string {
  if (!code) return "";
  const normalizedCode = code.toUpperCase();
  return COUNTRY_CODE_MAPPING[normalizedCode] || normalizedCode;
}

interface WebSearchTool extends WebSearchConfig {
  type: "web_search_preview";
}

export const getTools = () => {
  const { webSearchConfig, countryCode, vectorStore } =
    useToolsStore.getState();

  const tools: any[] = [];

  const isValidCountryCode = isValidISOCountryCode(
    countryCode || webSearchConfig.user_location?.country || "",
  );
  const country = isValidCountryCode
    ? countryCode || webSearchConfig.user_location?.country || ""
    : "NL";
  const webSearchTool: WebSearchTool = {
    type: "web_search_preview",
    user_location: {
      type: "approximate",
      country: normalizeCountryCode(country),
      region: webSearchConfig.user_location?.region || "",
      city: webSearchConfig.user_location?.city || "",
    },
  };
  if (vectorStore && vectorStore.id) {
    const fileSearchTool = {
      type: "file_search",
      vector_store_ids: [vectorStore.id],
    };
    tools.push(fileSearchTool);
  }

  tools.push(webSearchTool);
  tools.push(
    ...toolsList.map((tool) => {
      return {
        type: "function",
        name: tool.name,
        description: tool.description,
        parameters: {
          type: "object",
          properties: { ...tool.parameters },
          required: Object.keys(tool.parameters),
          additionalProperties: false,
        },
      };
    }),
  );

  console.log("tools", tools);
  return tools;
};
