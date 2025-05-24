import useToolsStore from "@/stores/useToolsStore";
import { functionsMap } from "../../config/functions";
import { isValidISOCountryCode } from "../countryCodeHelper";

type ToolName = keyof typeof functionsMap;

export const handleTool = async (toolName: ToolName, parameters: any) => {
  console.log("Handle tool", toolName, parameters);
  if (functionsMap[toolName]) {
    const result = await functionsMap[toolName](parameters);
    if (toolName === "store_initial_setup" && parameters.countryCode) {
      if (isValidISOCountryCode(parameters.countryCode)) {
        useToolsStore.getState().setCountryCode(parameters.countryCode);
      } else {
        useToolsStore.getState().setCountryCode("NL");
      }
    }
    return result;
  } else {
    throw new Error(`Unknown tool: ${toolName}`);
  }
};
