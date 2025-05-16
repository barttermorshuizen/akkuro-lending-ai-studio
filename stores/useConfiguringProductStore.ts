import { ProductConfigurationDTO } from "@/config/productsConfigurationMapping";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ConfiguringProductState {
  product: ProductConfigurationDTO | null;
  setProduct: (product: ProductConfigurationDTO | null) => void;
  resetProduct: () => void;
}

const emptyProduct: ProductConfigurationDTO = {
  productName: "",
  targetSegment: "",
  intendedUse: "",
  countryCode: "",
  currentState: "",
  loanAmountRange: "",
  interestRateType: "",
  repaymentTermOptions: "",
  interestRates: "",
  collateralRequirement: "",
  minimumRevenue: "",
  minimumOperatingHistory: "",
  creditScoreThreshold: "",
  sustainabilityIncentive: "",
  earlyRepaymentBenefit: "",
};

const productChannel =
  typeof window !== "undefined" ? new BroadcastChannel("product_sync") : null;

const useConfiguringProductStore = create<ConfiguringProductState>()(
  persist(
    (set) => ({
      product: emptyProduct,
      setProduct: (product) => {
        set({ product });
        productChannel?.postMessage({
          type: "PRODUCT_UPDATE",
          product,
        });
      },
      resetProduct: () => {
        set({ product: emptyProduct });
      },
    }),
    {
      name: "product",
    },
  ),
);

if (productChannel) {
  productChannel.onmessage = (event) => {
    if (event.data.type === "PRODUCT_UPDATE") {
      useConfiguringProductStore.setState({ product: event.data.product });
    }
  };
}

export default useConfiguringProductStore;
