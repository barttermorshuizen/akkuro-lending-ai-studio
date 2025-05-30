import { functionsMap } from "@/config/functions";

type FunctionName = keyof typeof functionsMap;

export const pushMessageFunctions: FunctionName[] = [
  "read_product",
  "product_simulation",
  "check_compliance_for_product_parameters",
];

export type PushMessageFunction =
  | "read_product"
  | "product_simulation"
  | "check_compliance_for_product_parameters";

export const getPushMessageForFunction = (
  functionName: PushMessageFunction,
): string => {
  switch (functionName) {
    case "read_product":
      return "I've fetched the product details. Is there anything else you'd like me to do?";
    case "product_simulation":
      return "I've simulated the product. Is there anything else you'd like me to do?";
    case "check_compliance_for_product_parameters":
      return "I've checked the compliance for the product parameters. You can see the results in the Regulatory Compliance Check section. Is there anything else you'd like me to do?";
    default:
      return "I've completed the requested action. Is there anything else you'd like me to do?";
  }
};
