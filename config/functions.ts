import { storeProduct } from '@/services/storeProduct';

// Functions mapping to tool calls
// Define one function per tool call - each tool call should have a matching function
// Parameters for a tool call are passed as an object to the corresponding function

export const get_weather = async ({
  location,
  unit,
}: {
  location: string;
  unit: string;
}) => {
  console.log("location", location);
  console.log("unit", unit);
  const res = await fetch(
    `/api/functions/get_weather?location=${location}&unit=${unit}`
  ).then((res) => res.json());

  console.log("executed get_weather function", res);

  return res;
};

export const get_joke = async () => {
  const res = await fetch(`/api/functions/get_joke`).then((res) => res.json());
  return res;
};

export const store_product = async ({
  productName,
  targetCustomer,
  intendedUse
}: {
  productName: string;
  targetCustomer: string;
  intendedUse: string;
}) => {
  console.log("store_product params", productName, "-", targetCustomer, "-", intendedUse);
  const res = await storeProduct(productName, targetCustomer, intendedUse);
  console.log("executed store_product function", res);
  return { status: 'success' };
};

export const functionsMap = {
  get_weather: get_weather,
  get_joke: get_joke,
  store_product: store_product,
};
