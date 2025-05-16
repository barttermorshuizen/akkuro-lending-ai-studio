"use client";

import AkkuroDarkLogo from "@/public/akkuro-dark.svg";
import Image from "next/image";
import {
  ProductConfigurationDTO,
  productsConfigurationMapping,
} from "@/config/productsConfigurationMapping";
import useConfiguringProductStore from "@/stores/useConfiguringProductStore";

export default function ConfiguratingProductScreen() {
  const { product } = useConfiguringProductStore();

  return (
    <div className="w-full h-full flex flex-col justify-start overflow-y-hidden pt-8 items-center text-black text-xl">
      <Image
        src={AkkuroDarkLogo}
        alt="Akkuro Logo"
        width={108.14}
        height={18.85}
      />
      {/* Product Configuration Info */}
      <div className="flex flex-col pt-10 overflow-y-auto w-full h-full gap-4">
        {Object.entries(product || {}).map(([key, value]) => (
          <div
            className="flex flex-col justify-center gap-1 font-sans"
            key={key}
          >
            <div className="font-bold text-sm text-center">
              {
                productsConfigurationMapping[
                  key as keyof ProductConfigurationDTO
                ]
              }
            </div>
            <div className="text-sm text-center">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
