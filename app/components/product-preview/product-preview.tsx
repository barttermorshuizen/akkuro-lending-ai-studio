import KuroChatIcon from "@/app/assets/icons/KuroChatIcon";
import { Button } from "@/components/ui/button";
import useExtractProductPreviewInfoByState from "@/hooks/useExtractProductPreviewInfoByState";
import { conversationStates } from "@/lib/stateMachine";
import { resetProduct } from "@/services/resetProduct";
import useConfiguringProductStore, {
  emptyProduct,
} from "@/stores/useConfiguringProductStore";
import useConversationStore from "@/stores/useConversationStore";
import ProductReviewSection from "./product-review-section";

import Show from "@/components/condition/show";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useComplianceCheckStore } from "@/stores/useComplianceCheckStore";
import { useRegulatoryCheckStore } from "@/stores/useRegulatoryCheck";
import { useMemo } from "react";

export default function ProductPreview() {
  const {
    productName,
    initialSetup,
    loanParameters,
    acceptanceCriteria,
    pricing,
    regulatory,
    goLive,
  } = useExtractProductPreviewInfoByState();
  const { resetConversation, setConversationState } = useConversationStore();
  const { setProduct } = useConfiguringProductStore();
  const {
    includeRegulatoryCheckFromInitialSetup,
    setIncludeRegulatoryCheckFromInitialSetup,
  } = useRegulatoryCheckStore();

  const handleReset = async () => {
    setProduct(emptyProduct);
    setConversationState(conversationStates[0]);
    resetConversation();
    setIncludeRegulatoryCheckFromInitialSetup(false);
    useComplianceCheckStore.getState().setComplianceCheck(null);
    await resetProduct();
  };

  const handleApplyToConfig = () => {
    window.open("/studio", "_blank");
  };

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
    <div className="flex-1 h-full w-full px-6 py-4">
      <div className="flex flex-1 h-full flex-row bg-white rounded-xl p-8">
        <div className="flex flex-col w-full">
          <div className="self-center flex flex-row gap-3 items-center text-sm text-[#9D9791]">
            Output based on the chat with
            <div className="flex gap-2 pb-1 items-center flex-row">
              <KuroChatIcon />
              <span className="text-[#BD00C4] font-bold">Kuro</span>
            </div>
          </div>
          <div className="flex flex-col overflow-y-auto pb-10 divide-y-2 mt-[10px] divide-dashed gap-[10px]">
            <div className="flex flex-row items-center gap-2">
              <div className="text-2xl font-light py-3">
                🌱 {productName || "N/A"}
              </div>
            </div>

            <ProductReviewSection data={initialSetup} />
            <ProductReviewSection
              data={loanParameters}
              title="Loan Parameters"
            />
            <ProductReviewSection
              data={acceptanceCriteria}
              title="Acceptance Criteria"
            />
            <ProductReviewSection data={pricing} title="Pricing" />
            <ProductReviewSection data={regulatory} title="Regulatory" />
            <ProductReviewSection data={goLive} title="Go Live" />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Show when={!!complianceCheck}>
              <div className="flex flex-row justify-between py-3">
                <div className="font-semibold">
                  Regulatory Compliance Check ({compliancePercentage}%
                  compliant)
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
                      ? "bg-green-50 border-green-500 text-green-700"
                      : "bg-red-50 border-red-500 text-red-700"
                  }`}
                  key={index}
                >
                  <div>
                    {check.productParamDescription} {check.expectedRange}
                  </div>
                  <div className="text-right">
                    {check.isCompliant ? (
                      <span className="flex flex-row gap-2">
                        Compliant ({check.paramValue})
                      </span>
                    ) : (
                      <span className="flex flex-row gap-2 text-wrap">
                        {check.notes}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 py-4">
            <Switch
              onCheckedChange={() => {
                setIncludeRegulatoryCheckFromInitialSetup(
                  !includeRegulatoryCheckFromInitialSetup,
                );
              }}
              id="regulatory-compliance"
              checked={includeRegulatoryCheckFromInitialSetup}
            />
            <Label
              htmlFor="regulatory-compliance"
              className="text-sm text-primary-darkForest font-normal"
            >
              Regulatory compliance included at each step
            </Label>
          </div>
          <div className="flex flex-row gap-2 w-full items-center justify-center">
            <Button onClick={handleReset} variant={"reset"}>
              Reset
            </Button>
            <Button
              onClick={handleApplyToConfig}
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              Apply to config
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
