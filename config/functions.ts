import { sendProductUpdate } from "@/lib/productSyncChannel";
import { conversationStates } from "@/lib/stateMachine";
import { readProduct } from "@/services/readProduct";
import { storeAcceptanceCriteria } from "@/services/storeAcceptanceCriteria";
import { storeAll } from "@/services/storeAll";
import { storeGoLive } from "@/services/storeGoLive";
import { storeInitialSetup } from "@/services/storeInitialSetup";
import { storeLoanParameters } from "@/services/storeLoanParameters";
import { storePricing } from "@/services/storePricing";
import { storeRegulatoryCheck } from "@/services/storeRegulatoryCheck";
import useConfiguringProductStore from "@/stores/useConfiguringProductStore";
import useConversationStore from "@/stores/useConversationStore";
import { useRegulatoryCheckStore } from "@/stores/useRegulatoryCheck";
import useSimulationProductPopupStore from "@/stores/useSimulationProductPopupStore";
import { ProductModel } from "@/types/product";
import { transformProductModelToProductConfigurationDTO } from "./productsConfigurationMapping";
// Functions mapping to tool calls

export const set_product = async () => {
  const product = await readProduct();
  const productDTO = transformProductModelToProductConfigurationDTO(product);
  const setProduct = useConfiguringProductStore.getState().setProduct;
  setProduct(productDTO);
  useConfiguringProductStore.getState().setIsDisplayProductPreview(true);
};

export const store_all = async (params: Partial<ProductModel>) => {
  console.log("store_all params", params);
  const res = await storeAll(params);

  console.log("executed store_all function", res);
  return res;
};

export const store_initial_setup = async (params: Partial<ProductModel>) => {
  console.log("store_initial_setup params", params);
  const res = await storeInitialSetup(params);
  console.log("executed store_initial_setup function", res);

  await set_product();

  useConversationStore
    .getState()
    .setConversationState("SetRegulatoryCheckAtEveryStep");

  console.log("set conversation state to", "SetRegulatoryCheckAtEveryStep");

  return { status: "success", requiresFollowUp: false };
};

export const store_is_regulatory_check_at_every_step = async ({
  includeRegulatoryCheckFromInitialSetup,
}: {
  includeRegulatoryCheckFromInitialSetup: boolean;
}) => {
  console.log(
    "store_is_regulatory_check_at_every_step params",
    includeRegulatoryCheckFromInitialSetup,
  );

  useRegulatoryCheckStore
    .getState()
    .setIncludeRegulatoryCheckFromInitialSetup(
      includeRegulatoryCheckFromInitialSetup,
    );

  useConversationStore.getState().setConversationState(conversationStates[2]);
  console.log("set conversation state to", conversationStates[2]);
  console.log("executed store_is_regulatory_check_at_every_step function");
};

export const store_loan_parameters = async (params: Partial<ProductModel>) => {
  console.log("store_loan_parameters params", params);
  const res = await storeLoanParameters(params);
  await storeAll(params);
  console.log("executed store_loan_parameters function", res);

  await set_product();

  useConversationStore.getState().setConversationState(conversationStates[3]);
  console.log("set conversation state to", conversationStates[3]);

  return { status: "success", requiresFollowUp: false };
};

export const store_acceptance_criteria = async (
  params: Partial<ProductModel>,
) => {
  console.log("store_acceptance_criteria params", params);
  const res = await storeAcceptanceCriteria(params);
  await storeAll(params);
  console.log("executed store_acceptance_criteria function", res);

  await set_product();

  useConversationStore.getState().setConversationState(conversationStates[4]);
  console.log("set conversation state to", conversationStates[4]);

  return { status: "success", requiresFollowUp: false };
};

export const store_pricing = async (params: Partial<ProductModel>) => {
  console.log("store_pricing params", params);
  const res = await storePricing(params);
  await storeAll(params);
  console.log("executed store_pricing function", res);

  await set_product();

  useConversationStore.getState().setConversationState(conversationStates[5]);
  console.log("set conversation state to", conversationStates[5]);

  return { status: "success", requiresFollowUp: false };
};

export const store_regulatory_check = async (params: Partial<ProductModel>) => {
  console.log("store_regulatory_check params", params);
  const res = await storeRegulatoryCheck(params);
  await storeAll(params);
  console.log("executed store_regulatory_check function", res);

  await set_product();

  useConversationStore.getState().setConversationState(conversationStates[6]);
  console.log("set conversation state to", conversationStates[6]);

  return { status: "success", requiresFollowUp: false };
};

export const store_go_live = async (params: Partial<ProductModel>) => {
  console.log("store_go_live params", params);
  try {
    const res = await storeGoLive(params);
    await storeAll(params);
    console.log("executed store_go_live function", res);

    await set_product();

    return { status: "success", requiresFollowUp: false };
  } catch (error) {
    console.error("Error in store_go_live:", error);
    return { status: "error", requiresFollowUp: false };
  }
};

export const read_product = async () => {
  console.log("read_product called");
  const res = await readProduct();

  await set_product();

  console.log("executed read_product function", res);
  return res;
};

export const product_simulation = async () => {
  console.log("product_simulation called");
  const res = await readProduct();

  const setProduct = useConfiguringProductStore.getState().setProduct;
  const product = transformProductModelToProductConfigurationDTO(res);

  setProduct(product);
  sendProductUpdate(product);

  useSimulationProductPopupStore.getState().setIsOpen(true);

  console.log("executed product_simulation function", res);
  return res;
};

export const functionsMap = {
  store_initial_setup,
  store_is_regulatory_check_at_every_step,
  store_loan_parameters,
  store_acceptance_criteria,
  store_pricing,
  store_regulatory_check,
  store_go_live,
  read_product,
  product_simulation,
  store_all,
};
