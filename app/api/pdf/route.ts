import { PdfType } from "@/types/pdf-data-model";
import { jsPDF } from "jspdf";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

interface PdfDataModel {
  type: PdfType;
  productName: string;
  companyName: string;
  regulatoryFramework: string;
  signatureLine: string;
}

interface ISOComplianceData extends PdfDataModel {
  type: "iso_compliance";
  scopeOfCompliance: string;
  complianceDetails: string;
  timestamp: string;
}

interface EuTaxComplianceData extends PdfDataModel {
  type: "eu_tax_compliance";
  intendedUse: string;
  eligibleEconomicActivity: string;
  alignmentCriteria: string;
  assessmentSummary: string;
}

interface EsgDeclarationData extends PdfDataModel {
  type: "esg_declaration";
  environmentalMeasures: string;
  socialResponsibility: string;
  governmancePractices: string;
}

interface Paragraph {
  text: string;
  spacing: number;
}

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

function createPdfContent(doc: jsPDF, title: string, paragraphs: Paragraph[]) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let y = margin;

  // Add title
  doc.setFontSize(24);
  const titleWidth = doc.getTextWidth(title);
  doc.text(title, (pageWidth - titleWidth) / 2, y);
  y += 20;

  // Add content
  doc.setFontSize(12);
  paragraphs.forEach(({ text, spacing }) => {
    const lines = doc.splitTextToSize(text.trim(), contentWidth);
    doc.text(lines, margin, y);
    y += lines.length * 7 + spacing;

    // Add new page if needed
    if (y > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      y = margin;
    }
  });
}

function getIsoComplianceContent(data: ISOComplianceData): Paragraph[] {
  return [
    {
      text: `This declaration confirms that the product configuration for ${data.productName} operating in ${data.companyName} complies with the requirements of ${data.regulatoryFramework}.`,
      spacing: 7,
    },
    {
      text: `Scope of Compliance:\n${data.scopeOfCompliance}`,
      spacing: 7,
    },
    {
      text: `Compliance Details:\n${data.complianceDetails}`,
      spacing: 7,
    },
    {
      text: "This declaration is issued to support internal audits, regulatory review, or external certification.",
      spacing: 7,
    },
    {
      text: `Date: ${new Date().toLocaleDateString()}.`,
      spacing: 0,
    },
    {
      text: `Prepared by: ${data.companyName}`,
      spacing: 0,
    },
    {
      text: `Title: ${data.productName} - ${data.regulatoryFramework}`,
      spacing: 0,
    },
    {
      text: `Signature: ${data.signatureLine}`,
      spacing: 7,
    },
    {
      text: "This declaration is valid only when accompanied by related certification documentation.",
      spacing: 7,
    },
  ];
}

function getEuTaxComplianceContent(data: EuTaxComplianceData): Paragraph[] {
  return [
    {
      text: `This document certifies that the financial product ${data.productName} intended for ${data.intendedUse}, is being assessed for alignment with the EU Taxonomy requirements under Regulation (EU) 2020/852.`,
      spacing: 7,
    },
    {
      text: `Eligible Economic Activity:\n${data.eligibleEconomicActivity}`,
      spacing: 7,
    },
    {
      text: `Alignment Criteria:\n${data.alignmentCriteria}`,
      spacing: 7,
    },
    {
      text: `Assessment Summary:\n${data.assessmentSummary}`,
      spacing: 7,
    },
    {
      text: "This declaration is issued to support internal audits, regulatory review, or external certification.",
      spacing: 7,
    },
    {
      text: `Date: ${new Date().toLocaleDateString()}.`,
      spacing: 0,
    },
    {
      text: `Prepared by: ${data.companyName}`,
      spacing: 0,
    },
    {
      text: `Title: ${data.productName} - ${data.regulatoryFramework}`,
      spacing: 0,
    },
    {
      text: `Signature: ${data.signatureLine}`,
      spacing: 7,
    },
    {
      text: "This declaration is valid only when accompanied by related certification documentation.",
      spacing: 7,
    },
  ];
}

function getEsgDeclarationContent(data: EsgDeclarationData): Paragraph[] {
  return [
    {
      text: `This declaration affirms that the product ${data.productName} meets internal and/or jurisdictional ESG (Environmental, Social, Governance) standards.`,
      spacing: 7,
    },
    {
      text: `Environmental Measures:\n${data.environmentalMeasures}`,
      spacing: 7,
    },
    {
      text: `Social Responsibility:\n${data.socialResponsibility}`,
      spacing: 7,
    },
    {
      text: `Governance Practices:\n${data.governmancePractices}`,
      spacing: 7,
    },
    {
      text: "This declaration is issued to support internal audits, regulatory review, or external certification.",
      spacing: 7,
    },
    {
      text: `Date: ${new Date().toLocaleDateString()}.`,
      spacing: 0,
    },
    {
      text: `Prepared by: ${data.companyName}`,
      spacing: 0,
    },
    {
      text: `Title: ${data.productName} - ${data.regulatoryFramework}`,
      spacing: 0,
    },
    {
      text: `Signature: ${data.signatureLine}`,
      spacing: 7,
    },
    {
      text: "This declaration is valid only when accompanied by related certification documentation.",
      spacing: 7,
    },
  ];
}

function getPdfContent(
  data: ISOComplianceData | EuTaxComplianceData | EsgDeclarationData,
): Paragraph[] {
  switch (data.type) {
    case "iso_compliance":
      return getIsoComplianceContent(data);
    case "eu_tax_compliance":
      return getEuTaxComplianceContent(data);
    case "esg_declaration":
      return getEsgDeclarationContent(data);
    default:
      return [];
  }
}

function getPdfFileName(
  data: ISOComplianceData | EuTaxComplianceData | EsgDeclarationData,
) {
  switch (data.type) {
    case "iso_compliance":
      return `RegulatoryCompliance_ISO_Configuration_${data.productName}.pdf`;
    case "eu_tax_compliance":
      return `RegulatoryCompliance_EU_Tax_Configuration_${data.productName}.pdf`;
    case "esg_declaration":
      return `RegulatoryCompliance_ESG_Declaration_${data.productName}.pdf`;
    default:
      return "RegulatoryCompliance.pdf";
  }
}

export async function POST(req: NextRequest) {
  const data = (await req.json()) as
    | ISOComplianceData
    | EuTaxComplianceData
    | EsgDeclarationData;

  // Create a new PDF document
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Get content
  const title = getPdfTitle(data.type);
  const content = getPdfContent(data);

  // Create PDF content
  createPdfContent(doc, title, content);

  // Get the PDF as a buffer
  const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${getPdfFileName(data)}`,
    },
  });
}
