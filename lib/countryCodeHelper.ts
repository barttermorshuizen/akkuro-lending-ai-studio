import { iso31661 } from "iso-3166";

export const isValidISOCountryCode = (countryCode: string) => {
  const isExist = iso31661.find((item) => item.alpha2 === countryCode);
  return isExist !== undefined;
};
