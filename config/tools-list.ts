export const toolsList = [
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
  {
    name: "read_product",
    description: "Read the stored loan product model from the Google Sheet",
    parameters: {},
  },
];
