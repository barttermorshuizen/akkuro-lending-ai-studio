export const safeObject = (obj: any) => {
  return obj || {};
};

export const safeString = (str: string) => {
  return str || "";
};

export const safeNumber = (num: number) => {
  return num || 0;
};
