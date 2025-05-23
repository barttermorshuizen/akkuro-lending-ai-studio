import {
  EsgDeclarationPdfDataModel,
  EsgDeclarationPdfDataModelWrapper,
  EuTaxCompliancePdfDataModel,
  EuTaxCompliancePdfDataModelWrapper,
  ISOCompliancePdfDataModel,
  ISOCompliancePdfDataModelWrapper,
  PdfType,
} from "@/types/pdf-data-model";
import { NextRequest } from "next/server";
import puppeteer from "puppeteer";

export const runtime = "nodejs"; // TODO: remove this

function getPdfTitle(type: PdfType) {
  switch (type) {
    case "iso_compliance":
      return "ISO Compliance Declaration";
    case "eu_tax_compliance":
      return "EU Tax Compliance Declaration";
    case "esg_declaration":
      return "ESG Declaration";
    default:
      return "";
  }
}

function getIsoComplianceContent(data: ISOCompliancePdfDataModel) {
  return `
      <div style="font-size: 16px; margin-top: 40px;">This declaration confirms that the product configuration for ${data.productName}
      operating in ${data.companyName} complies with the requirements of ${data.regulatoryFramework}.</div> 

      <div style="font-size: 16px; margin-top: 20px;">
        Scope of Compliance: <br/>
        ${data.scopeOfCompliance}
      </div>

      <div style="font-size: 16px; margin-top: 20px;">
        Compliance Details:
        <br/>${data.complianceDetails}
      </div>

      <div style="font-size: 16px; display: flex; flex-direction: column; margin-top: 20px; gap: 4px;">
        <div>This declaration is issued to support internal audits, regulatory review, or external certification.</div>
        <div>Date: ${new Date().toLocaleDateString()}.</div>
        <div>Prepared by: ${data.companyName}</div>
        <div>Title: ${data.productName} - ${data.regulatoryFramework}</div>
        <div>Signature: ${data.signatureLine}</div>
      </div>

      <div style="font-size: 16px; margin-top: 20px;">
        This declaration is valid only when accompanied by related certification documentation.      
      </div>
    `;
}

function getEuTaxComplianceContent(data: EuTaxCompliancePdfDataModel) {
  return `
     <div style="font-size: 16px; margin-top: 40px;">
      This document certifies that the financial product ${data.productName}
      intended for ${data.intendedUse}, is being assessed for alignment with the
      EU Taxonomy requirements under Regulation (EU) 2020/852.
     </div>

      <div style="font-size: 16px; margin-top: 20px;">
        Eligible Economic Activity: <br/>
        ${data.eligibleEconomicActivity}
      </div>

      <div style="font-size: 16px; margin-top: 20px;">
        Alignment Criteria:        
        <br/>${data.alignmentCriteria}
      </div>

      <div style="font-size: 16px; margin-top: 20px;">
        Assessment Summary:        
        <br/>${data.assessmentSummary}
      </div>

       <div style="font-size: 16px; display: flex; flex-direction: column; margin-top: 20px; gap: 4px;">
        <div>This declaration is issued to support internal audits, regulatory review, or external certification.</div>
        <div>Date: ${new Date().toLocaleDateString()}.</div>
        <div>Prepared by: ${data.companyName}</div>
        <div>Title: ${data.productName} - ${data.regulatoryFramework}</div>
        <div>Signature: ${data.signatureLine}</div>
      </div>

      <div style="font-size: 16px; margin-top: 20px;">
        This declaration is valid only when accompanied by related certification documentation.      
      </div>
    `;
}

function getEsgDeclarationContent(data: EsgDeclarationPdfDataModel) {
  return `
      <div style="font-size: 16px; margin-top: 40px;">
      This declaration affirms that the product ${data.productName}
      meets internal and/or jurisdictional ESG (Environmental, Social, Governance) standards.
     </div>

      <div style="font-size: 16px; margin-top: 20px;">
        Environmental Measures: <br/>
        ${data.environmentalMeasures}
      </div>

      <div style="font-size: 16px; margin-top: 20px;">
        Social Responsibility:        
        <br/>${data.socialResponsibility}
      </div>

      <div style="font-size: 16px; margin-top: 20px;">
        Governance Practices:        
        <br/>${data.governmancePractices}
      </div>

       <div style="font-size: 16px; display: flex; flex-direction: column; margin-top: 20px; gap: 4px;">
        <div>This declaration is issued to support internal audits, regulatory review, or external certification.</div>
        <div>Date: ${new Date().toLocaleDateString()}.</div>
        <div>Prepared by: ${data.companyName}</div>
        <div>Title: ${data.productName} - ${data.regulatoryFramework}</div>
        <div>Signature: ${data.signatureLine}</div>
      </div>

      <div style="font-size: 16px; margin-top: 20px;">
        This declaration is valid only when accompanied by related certification documentation.      
      </div>
    `;
}

function getPdfContent(
  data:
    | ISOCompliancePdfDataModelWrapper
    | EuTaxCompliancePdfDataModelWrapper
    | EsgDeclarationPdfDataModelWrapper,
) {
  switch (data.type) {
    case "iso_compliance":
      return getIsoComplianceContent(data);
    case "eu_tax_compliance":
      return getEuTaxComplianceContent(data);
    case "esg_declaration":
      return getEsgDeclarationContent(data);
    default:
      return "";
  }
}

function getPDfTemplate(
  data:
    | ISOCompliancePdfDataModelWrapper
    | EuTaxCompliancePdfDataModelWrapper
    | EsgDeclarationPdfDataModelWrapper,
) {
  return `
    <html><body style="padding:40px;font-family:sans-serif">
      <h1 style="font-size: 24px; font-weight: bold; margin: 0 auto; text-align: center;">${getPdfTitle(data.type)}
      </h1>
      ${getPdfContent(data)}
     </body></html>
  `;
}

function getPdfFileName(
  data:
    | ISOCompliancePdfDataModelWrapper
    | EuTaxCompliancePdfDataModelWrapper
    | EsgDeclarationPdfDataModelWrapper,
) {
  if (data.type === "iso_compliance") {
    return `RegulatoryCompliance_ISO_Configuration_${data.productName}.pdf`;
  } else if (data.type === "eu_tax_compliance") {
    return `RegulatoryCompliance_EU_Tax_Configuration_${data.productName}.pdf`;
  } else if (data.type === "esg_declaration") {
    return `RegulatoryCompliance_ESG_Declaration_${data.productName}.pdf`;
  }
}

export async function POST(req: NextRequest) {
  const data:
    | ISOCompliancePdfDataModelWrapper
    | EuTaxCompliancePdfDataModelWrapper
    | EsgDeclarationPdfDataModelWrapper = await req.json();

  console.log("req.body data", data);

  const html = getPDfTemplate(data);
  console.log("html", html);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  const pdf = await page.pdf({ format: "A4", printBackground: true });
  await browser.close();

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${getPdfFileName(data)}`,
    },
  });
}
