import { ProductConfigurationDTO } from "@/config/productsConfigurationMapping";
import { create } from "zustand";

interface ConfiguringProductState {
  product: ProductConfigurationDTO | null;
  setProduct: (product: ProductConfigurationDTO | null) => void;
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

const useConfiguringProduct = create<ConfiguringProductState>((set) => ({
  product: null,
  setProduct: (product) => {
    set({ product });
    // Broadcast thay đổi đến các tab khác
    productChannel?.postMessage({
      type: "PRODUCT_UPDATE",
      product,
    });
  },
}));

if (productChannel) {
  productChannel.onmessage = (event) => {
    if (event.data.type === "PRODUCT_UPDATE") {
      useConfiguringProduct.setState({ product: event.data.product });
    }
  };
}

export default useConfiguringProduct;
