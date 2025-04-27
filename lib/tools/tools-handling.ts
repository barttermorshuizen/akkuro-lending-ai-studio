import { functionsMap } from "../../config/functions";
import useToolsStore from "@/stores/useToolsStore";

type ToolName = keyof typeof functionsMap;

export const handleTool = async (toolName: ToolName, parameters: any) => {
  console.log("Handle tool", toolName, parameters);
  if (functionsMap[toolName]) {
    const result = await functionsMap[toolName](parameters);
    if (toolName === "store_product" && parameters.countryCode) {
      useToolsStore.getState().setCountryCode(parameters.countryCode);
    }
    return result;
  } else {
    throw new Error(`Unknown tool: ${toolName}`);
  }
};
