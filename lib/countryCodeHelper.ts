import { ISO_3166_ALPHA_2_CODES } from "@/components/country-selector";

export const isValidISOCountryCode = (countryCode: string) => {
  const isExist = Array.from(ISO_3166_ALPHA_2_CODES).find(
    (item) => item === countryCode,
  );
  return isExist !== undefined;
};
