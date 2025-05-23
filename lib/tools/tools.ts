import { toolsList } from "../../config/tools-list";
import useToolsStore from "@/stores/useToolsStore";
import { WebSearchConfig } from "@/stores/useToolsStore";

// ISO 3166-1 country code mapping
const COUNTRY_CODE_MAPPING: { [key: string]: string } = {
  'UK': 'GB',  // United Kingdom
  'USA': 'US', // United States
};

// Normalize country code
function normalizeCountryCode(code: string): string {
  if (!code) return '';
  const normalizedCode = code.toUpperCase();
  return COUNTRY_CODE_MAPPING[normalizedCode] || normalizedCode;
}

interface WebSearchTool extends WebSearchConfig {
  type: "web_search";
}

export const getTools = () => {
  const {
    webSearchEnabled,
    fileSearchEnabled,
    functionsEnabled,
    vectorStore,
    webSearchConfig,
    countryCode,
  } = useToolsStore.getState();

  const tools: any[] = [];

  if (webSearchEnabled) {
    const webSearchTool: WebSearchTool = {
      type: "web_search",
      user_location: {
        type: "approximate",
        country: normalizeCountryCode(countryCode || webSearchConfig.user_location?.country || ""),
        region: webSearchConfig.user_location?.region || "",
        city: webSearchConfig.user_location?.city || "",
      },
    };
    tools.push(webSearchTool);
  }

  if (fileSearchEnabled && vectorStore && vectorStore.id) {
    const fileSearchTool = {
      type: "file_search",
      vector_store_ids: [vectorStore.id],
    };
    tools.push(fileSearchTool);
  }

  if (functionsEnabled) {
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
      })
    );
  }

  console.log("tools", tools);
  return tools;
};
