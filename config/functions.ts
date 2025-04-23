import { storeProduct } from '@/services/storeProduct';
import { readProduct } from '@/services/readProduct';

// Functions mapping to tool calls
// Define one function per tool call
// Parameters for a tool call are passed as an object to the corresponding function
export const store_product = async ({
  productName,
  targetCustomer,
  intendedUse,
  countryCode,
}: {
  productName: string;
  targetCustomer: string;
  intendedUse: string;
  countryCode: string;
}) => {
  console.log(
    "store_product params",
    productName,
    "-",
    targetCustomer,
    "-",
    intendedUse,
    "-",
    countryCode
  );
  const res = await storeProduct(
    productName,
    targetCustomer,
    intendedUse,
    countryCode
  );
  console.log("executed store_product function", res);
  return { status: 'success' };
};

export const read_product = async () => {
  console.log("read_product called");
  const res = await readProduct();
  console.log("executed read_product function", res);
  return res;
};

export const functionsMap = {
  store_product,
  read_product,
};
