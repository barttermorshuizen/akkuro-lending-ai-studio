import KuroChatIcon from "@/app/assets/icons/KuroChatIcon";
import PDFIcon from "@/app/assets/icons/PDFIcon";
import { ToolCallItem } from "@/lib/assistant";
import {
  EsgDeclarationPdfDataModel,
  EuTaxCompliancePdfDataModel,
  ISOCompliancePdfDataModel,
} from "@/types/pdf-data-model";
import { BookOpenText, Clock, DownloadIcon, Globe, Zap } from "lucide-react";
import Message from "./message";

interface ToolCallProps {
  toolCall: ToolCallItem;
}

function ApiCallCell({ toolCall }: ToolCallProps) {
  const getErrorStyle = (output: string) => {
    try {
      const parsed = JSON.parse(output);
      if (parsed.error) {
        switch (parsed.code) {
          case "SERVICE_UNAVAILABLE":
            return "bg-yellow-50 border-l-4 border-yellow-400";
          case "CONFIG_ERROR":
            return "bg-orange-50 border-l-4 border-orange-400";
          case "NOT_FOUND":
            return "bg-gray-50 border-l-4 border-gray-400";
          default:
            return "bg-red-50 border-l-4 border-red-400";
        }
      }
      return "";
    } catch {
      return "";
    }
  };

  const getErrorMessage = (output: string) => {
    try {
      const parsed = JSON.parse(output);
      if (parsed.error) {
        return (
          <div className="text-sm p-2 flex flex-col gap-1">
            <span className="font-medium">{parsed.error}</span>
            <span className="text-gray-600">{parsed.message}</span>
          </div>
        );
      }
      return null;
    } catch {
      return null;
    }
  };

  return (
    <div className="flex flex-col max-w-[70%] mb-[-8px]">
      <div className="w-full">
        <div className="flex flex-col text-sm rounded-[16px]">
          <div className="font-semibold p-3 pl-0 text-gray-700 rounded-b-none flex gap-2">
            <div className="flex gap-2 items-center text-blue-500 ml-[-8px]">
              <Zap size={16} />
              <div className="text-sm font-medium">
                {toolCall.status === "completed"
                  ? `Called ${toolCall.name}`
                  : `Calling ${toolCall.name}...`}
              </div>
            </div>
          </div>

          <div className="bg-[#fafafa] max-w-[50vw] lg:max-w-[30vw] rounded-xl py-2 ml-4 mt-2">
            <div className="max-h-96 overflow-y-scroll text-xs border-b mx-6 p-2">
              {/* <SyntaxHighlighter
                customStyle={{
                  backgroundColor: "#fafafa",
                  padding: "8px",
                  paddingLeft: "0px",
                  marginTop: 0,
                  marginBottom: 0,
                }}
                language="json"
                style={coy}
              >
                {JSON.stringify(toolCall.parsedArguments, null, 2)}
              </SyntaxHighlighter> */}
            </div>
            <div className="max-h-96 overflow-y-scroll mx-6 p-2 text-xs">
              {toolCall.output ? (
                <>
                  {getErrorMessage(toolCall.output) || (
                    <></>
                    // <SyntaxHighlighter
                    //   customStyle={{
                    //     backgroundColor: "#fafafa",
                    //     padding: "8px",
                    //     paddingLeft: "0px",
                    //     marginTop: 0,
                    //   }}
                    //   language="json"
                    //   style={coy}
                    //   className={getErrorStyle(toolCall.output)}
                    // >
                    //   {JSON.stringify(JSON.parse(toolCall.output), null, 2)}
                    // </SyntaxHighlighter>
                  )}
                </>
              ) : (
                <div className="text-zinc-500 flex items-center gap-2 py-2">
                  <Clock size={16} /> Waiting for result...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FileSearchCell({ toolCall }: ToolCallProps) {
  return (
    <div className="flex gap-2 items-center text-blue-500 mb-[-16px] ml-[-8px]">
      <BookOpenText size={16} />
      <div className="text-sm font-medium mb-0.5">
        {toolCall.status === "completed"
          ? "Searched files"
          : "Searching files..."}
      </div>
    </div>
  );
}

function WebSearchCell({ toolCall }: ToolCallProps) {
  return (
    <div className="flex gap-2 items-center text-blue-500 mb-[-16px] ml-[-8px]">
      <Globe size={16} />
      <div className="text-sm font-medium">
        {toolCall.status === "completed"
          ? "Searched the web"
          : "Searching the web..."}
      </div>
    </div>
  );
}

const GeneratingCell = () => {
  return (
    <div className="text-sm font-medium text-red-600">Generating PDF...</div>
  );
};

const toolCallTypeMap = {
  generate_iso_compliance_pdf: "iso_compliance",
  generate_eu_tax_compliance_pdf: "eu_tax_compliance",
  generate_esg_declaration_pdf: "esg_declaration",
} as const;

export default function ToolCall({ toolCall }: ToolCallProps) {
  const handleDownloadPdf = async (
    product: any,
    type: "iso_compliance" | "eu_tax_compliance" | "esg_declaration",
    fileName: string,
  ) => {
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

  const getPdfFileName = (
    toolCallName: keyof typeof toolCallTypeMap,
    product:
      | ISOCompliancePdfDataModel
      | EuTaxCompliancePdfDataModel
      | EsgDeclarationPdfDataModel,
  ) => {
    if (toolCallName === "generate_iso_compliance_pdf") {
      return `RegulatoryCompliance_ISO_Configuration_${product.productName}.pdf`;
    } else if (toolCallName === "generate_eu_tax_compliance_pdf") {
      return `RegulatoryCompliance_EU_Tax_Configuration_${product.productName}.pdf`;
    } else if (toolCallName === "generate_esg_declaration_pdf") {
      return `RegulatoryCompliance_ESG_Declaration_${product.productName}.pdf`;
    }
    return "";
  };

  return (
    <div className="flex justify-start pt-2">
      {(() => {
        switch (toolCall.tool_type) {
          case "function_call":
            if (Object.keys(toolCallTypeMap).includes(toolCall.name || "")) {
              return (
                <div className="flex flex-col gap-2">
                  {toolCall.status === "completed" ? (
                    <>
                      <div className="text-sm font-medium text-red-600">
                        {`Generated PDF`}
                      </div>
                      <div className={`font-bold text-[#ff5630]`}>
                        <div className="flex gap-2 pb-1 items-center flex-row">
                          <KuroChatIcon />
                          <span className="text-[#BD00C4] font-bold">Kuro</span>
                        </div>
                      </div>
                      <button
                        className="flex gap-4 border rounded-lg bg-white border-gray-200 px-4 py-3 hover:bg-gray-100 transition-colors"
                        onClick={() =>
                          handleDownloadPdf(
                            toolCall.parsedArguments,
                            toolCallTypeMap[
                              toolCall.name as keyof typeof toolCallTypeMap
                            ],
                            getPdfFileName(
                              toolCall.name as keyof typeof toolCallTypeMap,
                              toolCall.parsedArguments as
                                | ISOCompliancePdfDataModel
                                | EuTaxCompliancePdfDataModel
                                | EsgDeclarationPdfDataModel,
                            ),
                          )
                        }
                      >
                        <PDFIcon className="size-4" />
                        <div className="text-sm font-medium text-gray-700">
                          {getPdfFileName(
                            toolCall.name as keyof typeof toolCallTypeMap,
                            toolCall.parsedArguments as
                              | ISOCompliancePdfDataModel
                              | EuTaxCompliancePdfDataModel
                              | EsgDeclarationPdfDataModel,
                          )}
                        </div>
                        <DownloadIcon className="size-4 text-gray-700" />
                      </button>
                    </>
                  ) : (
                    <GeneratingCell />
                  )}
                </div>
              );
            }
            return <Message message={toolCall} />;
          // return <ApiCallCell toolCall={toolCall} />;
          case "file_search_call":
            // return <Message message={toolCall} />;
            return <FileSearchCell toolCall={toolCall} />;
          case "web_search_call":
            return <WebSearchCell toolCall={toolCall} />;
          default:
            return null;
        }
      })()}
    </div>
  );
}
