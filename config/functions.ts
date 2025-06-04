import { sendProductUpdate } from "@/lib/productSyncChannel";
import { conversationStates } from "@/lib/stateMachine";
import { readProduct } from "@/services/readProduct";
import { storeAcceptanceCriteria } from "@/services/storeAcceptanceCriteria";
import { storeGoLive } from "@/services/storeGoLive";
import { storeInitialSetup } from "@/services/storeInitialSetup";
import { storeLoanParameters } from "@/services/storeLoanParameters";
import { storePricing } from "@/services/storePricing";
import { storeRegulatoryCheck } from "@/services/storeRegulatoryCheck";
import { useComplianceCheckStore } from "@/stores/useComplianceCheckStore";
import useConfiguringProductStore from "@/stores/useConfiguringProductStore";
import useConversationStore from "@/stores/useConversationStore";
import { useRegulatoryCheckStore } from "@/stores/useRegulatoryCheck";
import useSimulationProductPopupStore from "@/stores/useSimulationProductPopupStore";
import { ComplianceCheckProductParametersModel } from "@/types/compliance-check-model";
import {
  EsgDeclarationPdfDataModel,
  EuTaxCompliancePdfDataModel,
  ISOCompliancePdfDataModel,
} from "@/types/pdf-data-model";
import { ProductModel } from "@/types/product";
import { transformProductModelToProductConfigurationDTO } from "./productsConfigurationMapping";
// Functions mapping to tool calls

export const set_product = async () => {
  try {
    const product = await readProduct();
    const productDTO = transformProductModelToProductConfigurationDTO(product);
    const setProduct = useConfiguringProductStore.getState().setProduct;
    setProduct(productDTO);
    useConfiguringProductStore.getState().setIsDisplayProductPreview(true);
    return {
      status: "success",
      requiresFollowUp: false,
    };
  } catch (error) {
    console.error("Error in set_product:", error);
    return {
      status: "error",
    };
  }
};

export const store_initial_setup = async (params: Partial<ProductModel>) => {
  try {
    console.log("store_initial_setup params", params);
    const res = await storeInitialSetup(params);
    console.log("executed store_initial_setup function", res);

    await set_product();

    useConversationStore.getState().setConversationState(conversationStates[1]);

    console.log("set conversation state to", conversationStates[1]);

    return { status: "success", requiresFollowUp: false };
  } catch (error) {
    console.error("Error in store_initial_setup:", error);
    return {
      status: "error",
      requiresFollowUp: false,
    };
  }
};

export const store_is_regulatory_check_at_every_step = async ({
  includeRegulatoryCheckFromInitialSetup,
}: {
  includeRegulatoryCheckFromInitialSetup: boolean;
}) => {
  try {
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

    return {
      status: "success",
      requiresFollowUp: false,
    };
  } catch (error) {
    console.error("Error in store_is_regulatory_check_at_every_step:", error);
    return {
      status: "error",
      requiresFollowUp: false,
    };
  }
};

export const store_loan_parameters = async (params: Partial<ProductModel>) => {
  try {
    console.log("store_loan_parameters params", params);
    const res = await storeLoanParameters(params);
    console.log("executed store_loan_parameters function", res);

    await set_product();

    useConversationStore.getState().setConversationState(conversationStates[3]);
    console.log("set conversation state to", conversationStates[3]);

    return { status: "success", requiresFollowUp: false };
  } catch (error) {
    console.error("Error in store_loan_parameters:", error);
    return {
      status: "error",
      requiresFollowUp: false,
    };
  }
};

export const store_acceptance_criteria = async (
  params: Partial<ProductModel>,
) => {
  try {
    console.log("store_acceptance_criteria params", params);
    const res = await storeAcceptanceCriteria(params);
    console.log("executed store_acceptance_criteria function", res);

    await set_product();

    useConversationStore.getState().setConversationState(conversationStates[4]);
    console.log("set conversation state to", conversationStates[4]);

    return { status: "success", requiresFollowUp: false };
  } catch (error) {
    console.error("Error in store_acceptance_criteria:", error);
    return {
      status: "error",
      requiresFollowUp: false,
    };
  }
};

export const store_pricing = async (params: Partial<ProductModel>) => {
  try {
    console.log("store_pricing params", params);
    const res = await storePricing(params);
    console.log("executed store_pricing function", res);

    await set_product();

    useConversationStore.getState().setConversationState(conversationStates[5]);
    console.log("set conversation state to", conversationStates[5]);

    return { status: "success", requiresFollowUp: false };
  } catch (error) {
    console.error("Error in store_pricing:", error);
    return {
      status: "error",
      requiresFollowUp: false,
    };
  }
};

export const store_regulatory_check = async (params: Partial<ProductModel>) => {
  try {
    console.log("store_regulatory_check params", params);
    const res = await storeRegulatoryCheck(params);
    console.log("executed store_regulatory_check function", res);

    await set_product();

    useConversationStore.getState().setConversationState(conversationStates[6]);
    console.log("set conversation state to", conversationStates[6]);

    return { status: "success", requiresFollowUp: false };
  } catch (error) {
    console.error("Error in store_regulatory_check:", error);
    return {
      status: "error",
      requiresFollowUp: false,
    };
  }
};

export const read_product = async () => {
  try {
    console.log("read_product called");
    const res = await readProduct();

    await set_product();

    console.log("executed read_product function", res);

    return {
      status: "success",
      requiresFollowUp: false,
    };
  } catch (error) {
    console.error("Error in read_product:", error);
    return {
      status: "error",
      requiresFollowUp: false,
    };
  }
};

export const product_simulation = async () => {
  try {
    console.log("product_simulation called");
    const res = await readProduct();

    const setProduct = useConfiguringProductStore.getState().setProduct;
    const product = transformProductModelToProductConfigurationDTO(res);

    setProduct(product);
    sendProductUpdate(product);

    useSimulationProductPopupStore.getState().setIsOpen(true);

    console.log("executed product_simulation function", res);

    return {
      status: "success",
      requiresFollowUp: false,
    };
  } catch (error) {
    console.error("Error in product_simulation:", error);
    return {
      status: "error",
      requiresFollowUp: false,
    };
  }
};

export const generate_iso_compliance_pdf = async (
  params: ISOCompliancePdfDataModel,
) => {
  try {
    console.log("generate_iso_compliance_pdf params", params);
    console.log("executed generate_iso_compliance_pdf function");
    return { status: "success", requiresFollowUp: false };
  } catch (error) {
    console.error("Error in generate_iso_compliance_pdf:", error);
    return { status: "error", requiresFollowUp: false };
  }
};

export const generate_eu_tax_compliance_pdf = async (
  params: EuTaxCompliancePdfDataModel,
) => {
  try {
    console.log("generate_eu_tax_compliance_pdf params", params);
    console.log("executed generate_eu_tax_compliance_pdf function");
    return { status: "success", requiresFollowUp: false };
  } catch (error) {
    console.error("Error in generate_eu_tax_compliance_pdf:", error);
    return { status: "error", requiresFollowUp: false };
  }
};

export const generate_esg_declaration_pdf = async (
  params: EsgDeclarationPdfDataModel,
) => {
  try {
    console.log("generate_esg_declaration_pdf params", params);
    console.log("executed generate_esg_declaration_pdf function");
    return { status: "success", requiresFollowUp: false };
  } catch (error) {
    console.error("Error in generate_esg_declaration_pdf:", error);
    return { status: "error", requiresFollowUp: false };
  }
};

export const update_compliance_check = async (
  params: ComplianceCheckProductParametersModel,
) => {
  try {
    console.log("update_compliance_check params", params);

    const previousComplianceCheck =
      useComplianceCheckStore.getState().complianceCheck;

    const previousParametersToCheck =
      previousComplianceCheck?.parametersToCheck;

    previousParametersToCheck?.forEach((param) => {
      const paramToUpdate = params.parametersToCheck.find(
        (p) => p.productParam === param.productParam,
      );
      if (paramToUpdate) {
        param.isCompliant = paramToUpdate.isCompliant;
        param.notes = paramToUpdate.notes;
        param.expectedRange = paramToUpdate.expectedRange;
        param.paramValue = paramToUpdate.paramValue;
        param.productParam = paramToUpdate.productParam;
        param.productParamDescription = paramToUpdate.productParamDescription;
        param.regulationDescription = paramToUpdate.regulationDescription;
      }
    });

    const newParametersToCheck = params.parametersToCheck.filter(
      (p) =>
        !previousParametersToCheck?.some(
          (pp) => pp.productParam === p.productParam,
        ),
    );

    // avoid removing old check
    if (previousComplianceCheck) {
      const newComplianceCheckObj = {
        countryCode: previousComplianceCheck.countryCode,
        parametersToCheck: [
          ...previousComplianceCheck.parametersToCheck,
          ...newParametersToCheck,
        ],
      };
      const setComplianceCheck =
        useComplianceCheckStore.getState().setComplianceCheck;
      setComplianceCheck(newComplianceCheckObj);
    } else {
      const setComplianceCheck =
        useComplianceCheckStore.getState().setComplianceCheck;
      const newComplianceCheckObj = {
        countryCode: params.countryCode,
        parametersToCheck: [...newParametersToCheck],
      };
      setComplianceCheck(newComplianceCheckObj);
    }

    console.log("executed update_compliance_check function");
  } catch (error) {
    console.error("Error in update_compliance_check:", error);
  }
};

export const do_compliance_check = async (
  params: ComplianceCheckProductParametersModel,
) => {
  try {
    console.log("do_compliance_check params", params);
    console.log("executed do_compliance_check function");

    await update_compliance_check(params);
    return {
      status: "success",
      requiresFollowUp: false,
    };
  } catch (error) {
    console.error("Error in do_compliance_check:", error);
    return {
      status: "error",
      requiresFollowUp: false,
    };
  }
};

export const store_loan_parameters_secondary = async (
  params: Partial<ProductModel> & ComplianceCheckProductParametersModel,
) => {
  try {
    console.log("store_loan_parameters_secondary params", params);

    const { countryCode, parametersToCheck, ...rest } = params;

    await store_loan_parameters(rest);

    const paramsToCheck = {
      countryCode,
      parametersToCheck,
    };

    await do_compliance_check(paramsToCheck);
    console.log("executed store_loan_parameters_secondary function");

    useConversationStore.getState().setConversationState(conversationStates[3]);
    console.log("set conversation state to", conversationStates[3]);

    return {
      status: "success",
      requiresFollowUp: false,
    };
  } catch (error) {
    console.error("Error in store_loan_parameters_secondary:", error);
    return {
      status: "error",
      requiresFollowUp: false,
    };
  }
};

export const store_acceptance_criteria_secondary = async (
  params: Partial<ProductModel> & ComplianceCheckProductParametersModel,
) => {
  try {
    console.log("store_acceptance_criteria_secondary params", params);

    const { countryCode, parametersToCheck, ...rest } = params;

    await store_acceptance_criteria(rest);

    const paramsToCheck = {
      countryCode,
      parametersToCheck,
    };

    await do_compliance_check(paramsToCheck);
    console.log("executed store_acceptance_criteria_secondary function");

    useConversationStore.getState().setConversationState(conversationStates[4]);
    console.log("set conversation state to", conversationStates[4]);

    return {
      status: "success",
      requiresFollowUp: false,
    };
  } catch (error) {
    console.error("Error in store_acceptance_criteria_secondary:", error);
    return {
      status: "error",
      requiresFollowUp: false,
    };
  }
};

export const store_pricing_secondary = async (
  params: Partial<ProductModel> & ComplianceCheckProductParametersModel,
) => {
  try {
    console.log("store_pricing_secondary params", params);

    const { countryCode, parametersToCheck, ...rest } = params;

    await store_pricing(rest);

    const paramsToCheck = {
      countryCode,
      parametersToCheck,
    };

    await do_compliance_check(paramsToCheck);
    console.log("executed store_pricing_secondary function");

    useConversationStore.getState().setConversationState(conversationStates[5]);
    console.log("set conversation state to", conversationStates[5]);

    return {
      status: "success",
      requiresFollowUp: false,
    };
  } catch (error) {
    console.error("Error in store_pricing_secondary:", error);
    return {
      status: "error",
      requiresFollowUp: false,
    };
  }
};

export const store_regulatory_check_secondary = async (
  params: Partial<ProductModel> & ComplianceCheckProductParametersModel,
) => {
  try {
    console.log("store_regulatory_check_secondary params", params);

    const { countryCode, parametersToCheck, ...rest } = params;

    await store_regulatory_check(rest);

    const paramsToCheck = {
      countryCode,
      parametersToCheck,
    };

    await do_compliance_check(paramsToCheck);
    console.log("executed store_regulatory_check_secondary function");

    useConversationStore.getState().setConversationState(conversationStates[6]);
    console.log("set conversation state to", conversationStates[6]);

    return {
      status: "success",
      requiresFollowUp: false,
    };
  } catch (error) {
    console.error("Error in store_regulatory_check_secondary:", error);
    return {
      status: "error",
      requiresFollowUp: false,
    };
  }
};

export const store_go_live = async (
  params: Partial<ProductModel> & ComplianceCheckProductParametersModel,
) => {
  try {
    console.log("store_go_live params", params);

    const { countryCode, parametersToCheck, ...rest } = params;

    await storeGoLive(rest);

    await set_product();

    const paramsToCheck = {
      countryCode,
      parametersToCheck,
    };

    await do_compliance_check(paramsToCheck);

    console.log("executed store_go_live function");

    return {
      status: "success",
      requiresFollowUp: false,
    };
  } catch (error) {
    console.error("Error in store_go_live:", error);
    return {
      status: "error",
      requiresFollowUp: false,
    };
  }
};

export const functionsMap = {
  store_initial_setup,
  store_is_regulatory_check_at_every_step,
  store_loan_parameters,
  store_acceptance_criteria,
  store_pricing,
  store_regulatory_check,
  store_go_live,
  generate_iso_compliance_pdf,
  generate_eu_tax_compliance_pdf,
  generate_esg_declaration_pdf,
  do_compliance_check,
  store_loan_parameters_secondary,
  store_acceptance_criteria_secondary,
  store_pricing_secondary,
  store_regulatory_check_secondary,
};
