import { emptyProductModel } from "@/stores/useConfiguringProductStore";

export const PRODUCT_PARAMETERS = Object.keys(emptyProductModel).join(", ");

export const COMPLIANCE_CHECK_PARAMETERS_CONFIG = {
  countryCode: {
    type: "string",
    description:
      "The 2-letter ISO country code (e.g. 'NL', 'US') to determine the applicable regulations",
  },
  parametersToCheck: {
    type: "array",
    description:
      "List of parameters at current state to check against regulations",
    items: {
      type: "object",
      properties: {
        productParam: {
          type: "string",
          description: `The parameter name is one of ${PRODUCT_PARAMETERS} at current state`,
        },
        productParamDescription: {
          type: "string",
          description: "Description of the parameter",
        },
        paramValue: {
          type: "string",
          description: "The current value of the parameter",
        },
        regulationDescription: {
          type: "string",
          description: "Short description of the regulation that applies",
        },
        expectedRange: {
          type: "string",
          description: "Expected value or range according to the regulation",
        },
        isCompliant: {
          type: "boolean",
          description:
            "Whether the parameter value complies with the regulation",
        },
        notes: {
          type: "string",
          description: "Optional explanation of compliance or failure",
        },
      },
      required: [
        "productParam",
        "productParamDescription",
        "paramValue",
        "regulationDescription",
        "expectedRange",
        "isCompliant",
        "notes",
      ],
    },
  },
};
