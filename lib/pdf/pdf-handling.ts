import { ISOCompliancePdfDataModel } from "@/types/pdf-data-model";

import { EuTaxCompliancePdfDataModel } from "@/types/pdf-data-model";

import { EsgDeclarationPdfDataModel } from "@/types/pdf-data-model";

const pdfToolCallTypeMap = {
  generate_iso_compliance_pdf: "iso_compliance",
  generate_eu_tax_compliance_pdf: "eu_tax_compliance",
  generate_esg_declaration_pdf: "esg_declaration",
} as const;

const getPdfFileName = (
  toolCallName: keyof typeof pdfToolCallTypeMap,
  product:
    | ISOCompliancePdfDataModel
    | EuTaxCompliancePdfDataModel
    | EsgDeclarationPdfDataModel,
) => {
  if (toolCallName === "generate_iso_compliance_pdf") {
    return `RegulatoryCompliance_ISO_Configuration_${product.productName}.pdf`;
  }
  if (toolCallName === "generate_eu_tax_compliance_pdf") {
    return `RegulatoryCompliance_EU_Tax_Configuration_${product.productName}.pdf`;
  }
  if (toolCallName === "generate_esg_declaration_pdf") {
    return `RegulatoryCompliance_ESG_Declaration_${product.productName}.pdf`;
  }
  return "";
};

const handleDownloadPdf = async (
  product: any,
  type: "iso_compliance" | "eu_tax_compliance" | "esg_declaration",
  toolCallName: keyof typeof pdfToolCallTypeMap,
) => {
  const fileName = getPdfFileName(toolCallName, product);
  const res = await fetch("/api/pdf", {
    method: "POST",
    body: JSON.stringify({ ...product, type }),
    headers: { "Content-Type": "application/json" },
  });

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
};

export { getPdfFileName, handleDownloadPdf, pdfToolCallTypeMap };
