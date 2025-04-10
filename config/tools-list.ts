export const toolsList = [
  {
    name: "get_weather",
    description: "Get the weather for a given location",
    parameters: {
      location: {
        type: "string",
        description: "Location to get weather for",
      },
      unit: {
        type: "string",
        description: "Unit to get weather in",
        enum: ["celsius", "fahrenheit"],
      },
    },
  },
  {
    name: "get_joke",
    description: "Get a programming joke",
    parameters: {},
  },
  {
    name: "store_product",
    description: "Store a basic loan product model in a Google Sheet",
    parameters: {
        productName: {
          type: "string",
          description: "The name of the loan product",
        },
        targetCustomer: {
          type: "string",
          description: "The type of customer the product targets",
        },
        intendedUse: {
          type: "string",
          description: "The intended use of the loan product (e.g. renewable energy, eco-upgrades)",
        },
    },
  },
];
