import { storeInitialSetup } from "@/services/storeInitialSetup";
import { storeLoanParameters } from "@/services/storeLoanParameters";
import { storeAcceptanceCriteria } from "@/services/storeAcceptanceCriteria";
import { storePricing } from "@/services/storePricing";
import { storeRegulatoryCheck } from "@/services/storeRegulatoryCheck";
import { storeGoLive } from "@/services/storeGoLive";
import { readProduct } from "@/services/readProduct";
import { ProductModel } from "@/types/product";
import useConfiguringProductStore from "@/stores/useConfiguringProductStore";
import { transformProductModelToProductConfigurationDTO } from "./productsConfigurationMapping";
import { sendProductUpdate } from "@/lib/productSyncChannel";
import useConversationStore from "@/stores/useConversationStore";
import { conversationStates } from "@/lib/stateMachine";
import useSimulationProductPopupStore from "@/stores/useSimulationProductPopupStore";
import { storeAll } from "@/services/storeAll";
// Functions mapping to tool calls
export const store_initial_setup = async (params: Partial<ProductModel>) => {
  console.log("store_initial_setup params", params);
  const res = await storeInitialSetup(params);
  console.log("executed store_initial_setup function", res);

  useConversationStore.getState().setConversationState(conversationStates[1]);
  console.log("set conversation state to", conversationStates[1]);

  return { status: "success", requiresFollowUp: false };
};

export const store_loan_parameters = async (params: Partial<ProductModel>) => {
  console.log("store_loan_parameters params", params);
  const res = await storeLoanParameters(params);
  console.log("executed store_loan_parameters function", res);

  useConversationStore.getState().setConversationState(conversationStates[2]);
  console.log("set conversation state to", conversationStates[2]);

  return { status: "success", requiresFollowUp: false };
};

export const store_acceptance_criteria = async (
  params: Partial<ProductModel>,
) => {
  console.log("store_acceptance_criteria params", params);
  const res = await storeAcceptanceCriteria(params);
  console.log("executed store_acceptance_criteria function", res);

  useConversationStore.getState().setConversationState(conversationStates[3]);
  console.log("set conversation state to", conversationStates[3]);

  return { status: "success", requiresFollowUp: false };
};

export const store_pricing = async (params: Partial<ProductModel>) => {
  console.log("store_pricing params", params);
  const res = await storePricing(params);
  console.log("executed store_pricing function", res);

  useConversationStore.getState().setConversationState(conversationStates[4]);
  console.log("set conversation state to", conversationStates[4]);

  return { status: "success", requiresFollowUp: false };
};

export const store_regulatory_check = async (params: Partial<ProductModel>) => {
  console.log("store_regulatory_check params", params);
  const res = await storeRegulatoryCheck(params);
  console.log("executed store_regulatory_check function", res);

  useConversationStore.getState().setConversationState(conversationStates[5]);
  console.log("set conversation state to", conversationStates[5]);

  return { status: "success", requiresFollowUp: false };
};

export const store_go_live = async (params: Partial<ProductModel>) => {
  console.log("store_go_live params", params);
  try {
    const res = await storeGoLive(params);
    console.log("executed store_go_live function", res);

    return { status: "success", requiresFollowUp: false };
  } catch (error) {
    console.error("Error in store_go_live:", error);
    return { status: "error", requiresFollowUp: false };
  }
};

export const read_product = async () => {
  console.log("read_product called");
  const res = await readProduct();

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

export const store_all = async (params: ProductModel) => {
  console.log("store_all params", params);
  const res = await storeAll(params);

  console.log("executed store_all function", res);
  return res;
};

export const functionsMap = {
  store_initial_setup,
  store_loan_parameters,
  store_acceptance_criteria,
  store_pricing,
  store_regulatory_check,
  store_go_live,
  read_product,
  product_simulation,
  store_all,
};
