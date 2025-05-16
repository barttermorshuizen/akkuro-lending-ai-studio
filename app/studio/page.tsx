"use client";

import {
  ProductConfigurationDTO,
  productsConfigurationMapping,
} from "@/config/productsConfigurationMapping";
import { listenToProductUpdates } from "@/lib/productSyncChannel";
import useConfiguringProductStore from "@/stores/useConfiguringProductStore";
import { useEffect } from "react";

type ProductInfoProps = {
  name: string;
  description: string;
};
function ProductInfo({ name, description }: ProductInfoProps) {
  return (
    <div className="flex flex-col">
      <div className="text-sm font-semibold capitalize">
        {productsConfigurationMapping[name as keyof ProductConfigurationDTO]}
      </div>
      <div className="text-sm">{description || "N/A"}</div>
    </div>
  );
}

export default function Studio() {
  const { product, setProduct } = useConfiguringProductStore();
  useEffect(() => {
    listenToProductUpdates((incomingProduct) => {
      setProduct(incomingProduct);
    });
  }, [setProduct]);

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-white flex flex-col lg:px-32 font-light text-4xl lg:py-12">
      <div>Product configuration</div>
      <div className="flex flex-col mt-12 text-sm flex-wrap max-h-[calc(100vh-200px)] pb-24 gap-8">
        {Object.entries(product ?? {}).map(([key, value]) => (
          <ProductInfo key={key} name={key} description={value} />
        ))}
      </div>
    </div>
  );
}
