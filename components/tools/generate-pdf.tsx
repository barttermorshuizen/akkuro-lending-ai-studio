import { DownloadIcon, Zap } from "lucide-react";

import KuroChatIcon from "@/app/assets/icons/KuroChatIcon";
import PDFIcon from "@/app/assets/icons/PDFIcon";
import { ToolCallItem } from "@/lib/assistant";
import {
  getPdfFileName,
  handleDownloadPdf,
  pdfToolCallTypeMap,
} from "@/lib/pdf/pdf-handling";
import {
  EsgDeclarationPdfDataModel,
  EuTaxCompliancePdfDataModel,
  ISOCompliancePdfDataModel,
} from "@/types/pdf-data-model";

const PDFCell = ({ toolCall }: { toolCall: ToolCallItem }) => {
  const fileName = getPdfFileName(
    toolCall.name as keyof typeof pdfToolCallTypeMap,
    toolCall.parsedArguments as
      | ISOCompliancePdfDataModel
      | EuTaxCompliancePdfDataModel
      | EsgDeclarationPdfDataModel,
  );

  const handleGeneratedPDFCellClick = () => {
    handleDownloadPdf(
      toolCall.parsedArguments,
      pdfToolCallTypeMap[toolCall.name as keyof typeof pdfToolCallTypeMap],
      toolCall.name as keyof typeof pdfToolCallTypeMap,
    );
  };
  return (
    <>
      <div className={`font-bold text-[#ff5630]`}>
        <div className="flex gap-2 pb-1 items-center flex-row">
          <KuroChatIcon />
          <span className="text-[#BD00C4] font-bold">Kuro</span>
        </div>
      </div>
      <button
        className="flex gap-4 border text-start rounded-lg bg-white border-gray-200 px-4 py-3 hover:bg-gray-100 transition-colors"
        onClick={handleGeneratedPDFCellClick}
      >
        <PDFIcon className="size-4" />
        <div className="text-sm font-medium text-gray-700">{fileName}</div>
        <DownloadIcon className="size-4 text-gray-700" />
      </button>
    </>
  );
};

const GeneratePDFCell = ({ toolCall }: { toolCall: ToolCallItem }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm flex gap-2 items-center font-medium text-red-600">
        <Zap size={16} />
        {toolCall.status === "completed" && toolCall.output
          ? `Generated PDF`
          : `Generating PDF...`}
      </div>
      <PDFCell toolCall={toolCall} />
    </div>
  );
};

export default GeneratePDFCell;
