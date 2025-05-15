import { ProductConfigurationDTO } from "@/config/productsConfigurationMapping";

const channel = new BroadcastChannel("product-sync");

export const sendProductUpdate = (product: ProductConfigurationDTO) => {
  channel.postMessage({ type: "UPDATE_PRODUCT", product });
};

export const listenToProductUpdates = (
  onUpdate: (product: ProductConfigurationDTO) => void,
) => {
  channel.onmessage = (event) => {
    const { type, product } = event.data || {};
    if (type === "UPDATE_PRODUCT") {
      onUpdate(product);
    }
  };
};
