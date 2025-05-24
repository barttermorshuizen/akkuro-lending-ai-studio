export const noValueFallback = (
  value: string | number | undefined | Array<string>,
) => {
  if (Array.isArray(value)) {
    return value.join(", ");
  }
  return value || "N/A";
};
