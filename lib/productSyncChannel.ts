const channel = new BroadcastChannel("product-sync");

export const sendProductUpdate = (product: any) => {
  channel.postMessage({ type: "UPDATE_PRODUCT", product });
};

export const listenToProductUpdates = (onUpdate: (product: any) => void) => {
  channel.onmessage = (event) => {
    const { type, product } = event.data || {};
    if (type === "UPDATE_PRODUCT") {
      onUpdate(product);
    }
  };
};
