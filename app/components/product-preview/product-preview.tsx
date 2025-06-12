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
import ComplianceCheckSection from "./compliance-check-section";

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
            <Show when={includeRegulatoryCheckFromInitialSetup}>
              <ProductReviewSection data={regulatory} title="Regulatory" />
            </Show>
            <ProductReviewSection
              data={loanParameters}
              title="Loan Parameters"
            />
            <ProductReviewSection
              data={acceptanceCriteria}
              title="Acceptance Criteria"
            />
            <ProductReviewSection data={pricing} title="Pricing" />
            <Show when={!includeRegulatoryCheckFromInitialSetup}>
              <ProductReviewSection data={regulatory} title="Regulatory" />
            </Show>
            <ProductReviewSection data={goLive} title="Go Live" />
          </div>
          <ComplianceCheckSection />
          <div className="flex flex-row items-center gap-2 py-4">
            <Switch
              onCheckedChange={setIncludeRegulatoryCheckFromInitialSetup}
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
