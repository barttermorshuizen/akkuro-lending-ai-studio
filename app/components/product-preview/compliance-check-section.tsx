import Show from "@/components/condition/show";
import { formatNumber } from "@/lib/formatNumber";
import { useComplianceCheckStore } from "@/stores/useComplianceCheckStore";
import { useMemo } from "react";

export default function ComplianceCheckSection() {
  const { complianceCheck } = useComplianceCheckStore();
  const compliancePercentage = useMemo(() => {
    if (!complianceCheck) return 0;
    const compliantCount = complianceCheck.parametersToCheck.filter(
      (check) => check.isCompliant,
    ).length;
    return Math.round(
      (compliantCount / complianceCheck.parametersToCheck.length) * 100,
    );
  }, [complianceCheck]);
  return (
    <div className="flex flex-col gap-2 w-full">
      <Show when={!!complianceCheck}>
        <div className="flex flex-row justify-between py-3">
          <div className="font-semibold">
            Policy Compliance Check ({compliancePercentage}% compliant)
          </div>
          <div className="font-semibold">
            Compliant: {compliancePercentage}%
          </div>
        </div>
      </Show>
      <div className="flex flex-col max-h-[120px] overflow-y-auto gap-2">
        {complianceCheck?.parametersToCheck.map((check, index) => (
          <div
            className={`flex flex-row justify-between gap-2 border rounded-xl py-2 px-4 ${
              check.isCompliant
                ? "bg-[#EBFAEC] border-[#B8E4BB] text-[#1C6A2B]"
                : "bg-[#FFEEEE] border-[#EDC0C0] text-[#B13635]"
            }`}
            key={index}
          >
            <div>
              {check.productParamDescription} ({check.expectedRange})
            </div>
            <div className="text-right">
              {check.isCompliant ? (
                <span className="flex flex-row gap-2">
                  Compliant ({formatNumber(check.paramValue)})
                </span>
              ) : (
                <span className="flex flex-row gap-2 text-wrap">
                  {check.notes} ({formatNumber(check.paramValue)})
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
