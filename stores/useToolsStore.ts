import { defaultVectorStore } from "@/config/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// ISO 3166-1 country code mapping
const COUNTRY_CODE_MAPPING: { [key: string]: string } = {
  UK: "GB", // United Kingdom
  USA: "US", // United States
};

// Normalize country code
function normalizeCountryCode(code: string): string {
  if (!code) return "";
  const normalizedCode = code.toUpperCase();
  return COUNTRY_CODE_MAPPING[normalizedCode] || normalizedCode;
}

type File = {
  id: string;
  name: string;
  content: string;
};

type VectorStore = {
  id: string;
  name: string;
  files?: File[];
};

export type WebSearchConfig = {
  user_location?: {
    type: "approximate";
    country?: string;
    city?: string;
    region?: string;
  };
};

interface StoreState {
  fileSearchEnabled: boolean;
  //previousFileSearchEnabled: boolean;
  setFileSearchEnabled: (enabled: boolean) => void;
  webSearchEnabled: boolean;
  setWebSearchEnabled: (enabled: boolean) => void;
  functionsEnabled: boolean;
  //previousFunctionsEnabled: boolean;
  setFunctionsEnabled: (enabled: boolean) => void;
  vectorStore: VectorStore | null;
  setVectorStore: (store: VectorStore) => void;
  webSearchConfig: WebSearchConfig;
  setWebSearchConfig: (config: WebSearchConfig) => void;
  countryCode: string;
  setCountryCode: (code: string) => void;
  isDisplayToolCallInChat: boolean;
  setIsDisplayToolCallInChat: (isDisplayToolCallInChat: boolean) => void;
}

const defaultDisplayToolCallInChat =
  process.env.NODE_ENV === "development" ? true : false;

const useToolsStore = create<StoreState>()(
  persist(
    (set) => ({
      vectorStore: defaultVectorStore.id !== "" ? defaultVectorStore : null,
      webSearchConfig: {
        user_location: {
          type: "approximate",
          country: "NL",
          city: "",
          region: "",
        },
      },
      countryCode: "",
      setCountryCode: (code) =>
        set({ countryCode: normalizeCountryCode(code) }),
      fileSearchEnabled: true,
      previousFileSearchEnabled: false,
      setFileSearchEnabled: (enabled) => {
        set({ fileSearchEnabled: enabled });
      },
      webSearchEnabled: true,
      setWebSearchEnabled: (enabled) => {
        set({ webSearchEnabled: enabled });
      },
      functionsEnabled: true,
      previousFunctionsEnabled: true,
      setFunctionsEnabled: (enabled) => {
        set({ functionsEnabled: enabled });
      },
      setVectorStore: (store) => set({ vectorStore: store }),
      setWebSearchConfig: (config) =>
        set({
          webSearchConfig: {
            ...config,
            user_location: config.user_location
              ? {
                  ...config.user_location,
                  country: normalizeCountryCode(
                    config.user_location.country || "",
                  ),
                }
              : undefined,
          },
        }),
      isDisplayToolCallInChat: defaultDisplayToolCallInChat,
      setIsDisplayToolCallInChat: (isDisplayToolCallInChat) =>
        set({ isDisplayToolCallInChat }),
    }),
    {
      name: "tools-store",
    },
  ),
);

export default useToolsStore;
