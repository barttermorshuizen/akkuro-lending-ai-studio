"use client";

import { read_product } from "@/config/functions";
import {
  ProductConfigurationDTO,
  productsConfigurationMapping,
} from "@/config/productsConfigurationMapping";
import { noValueFallback } from "@/lib/fallback";
import { listenToProductUpdates } from "@/lib/productSyncChannel";
import useConfiguringProductStore from "@/stores/useConfiguringProductStore";
import { useEffect, useState } from "react";
import { WithAuthProtectionPage } from "../components/protected-page";

type ProductInfoProps = {
  name: string;
  description: string;
  isLoading: boolean;
};
function ProductInfo({ name, description, isLoading }: ProductInfoProps) {
  return (
    <div className="flex flex-col">
      <div className="text-sm font-semibold capitalize">
        {productsConfigurationMapping[name as keyof ProductConfigurationDTO]}
      </div>
      <div className="text-sm flex flex-wrap max-w-sm">
        {isLoading ? (
          <div className="sound-loader"></div>
        ) : (
          description || "N/A"
        )}
      </div>
    </div>
  );
}

const Studio = WithAuthProtectionPage(function Studio() {
  const { product, setProduct } = useConfiguringProductStore();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    read_product().then(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    listenToProductUpdates((incomingProduct) => {
      setProduct(incomingProduct);
    });
  }, [setProduct]);

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-white flex flex-col lg:px-32 font-light text-4xl lg:py-12">
      <div>Product configuration</div>
      <div className="flex flex-col mt-12 text-sm flex-wrap max-h-[calc(100vh-150px)] overflow-x-auto pb-24 gap-8">
        {Object.entries(product ?? {}).map(([key, value]) => (
          <ProductInfo
            key={key}
            name={key}
            description={noValueFallback(value).toString()}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
});

export default Studio;
