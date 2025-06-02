import { productsConfigurationMapping } from "@/config/productsConfigurationMapping";

import { ProductConfigurationDTO } from "@/config/productsConfigurationMapping";
import { noValueFallback } from "@/lib/fallback";
import { formatNumber } from "@/lib/formatNumber";

interface ProductReviewSectionProps {
  data: Partial<ProductConfigurationDTO>;
  title?: string;
}

export default function ProductReviewSection({
  data,
  title,
}: ProductReviewSectionProps) {
  return (
    <div className="flex flex-col p-4 gap-4">
      <div className="text-2xl font-light">{title}</div>
      <div className="flex flex-row flex-wrap gap-x-16 gap-y-4">
        {Object.entries(data).map(([key, value]) => (
          <div className={`flex-col flex`} key={key}>
            <div className="text-sm text-primary-darkForest">
              {
                productsConfigurationMapping[
                  key as keyof ProductConfigurationDTO
                ]
              }
            </div>
            <div
              className={`${value ? "text-[#008071] font-bold text-lg" : "text-gray-500 text-base"}`}
            >
              {value ? formatNumber(value) : noValueFallback(value)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
