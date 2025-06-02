export const formatNumber = (value: any): string => {
  try {
    if (typeof value !== "string") return value;

    const match = value.match(/^([^\d.-]*)([\d,.-]+)([^\d.-]*)$/);
    if (!match) return value;

    const prefix = match[1] || "";
    const numberPart = match[2] || "";
    const suffix = match[3] || "";

    const cleaned = numberPart.replace(/,/g, "");
    const num = parseFloat(cleaned);
    if (isNaN(num)) return value;

    return `${prefix}${num.toLocaleString()}${suffix}`;
  } catch {
    return value;
  }
};
