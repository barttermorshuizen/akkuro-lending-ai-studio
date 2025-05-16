import { functionsMap } from "@/config/functions";

type FunctionName = keyof typeof functionsMap;

export const pushMessageFunctions: FunctionName[] = [
  "read_product",
  "product_simulation",
];

export type PushMessageFunction = "read_product" | "product_simulation";

export const getPushMessageForFunction = (
  functionName: PushMessageFunction,
): string => {
  switch (functionName) {
    case "read_product":
      return "I've fetched the product details. Is there anything else you'd like me to do?";
    case "product_simulation":
      return "I've simulated the product. Is there anything else you'd like me to do?";
    default:
      return "I've completed the requested action. Is there anything else you'd like me to do?";
  }
};
