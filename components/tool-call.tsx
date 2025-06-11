"use client";

import React from "react";

import { ToolCallItem } from "@/lib/assistant";
import { pdfToolCallTypeMap } from "@/lib/pdf/pdf-handling";
import useToolsStore from "@/stores/useToolsStore";
import { BookOpenText, Clock, Globe, Zap } from "lucide-react";
import { Prism, SyntaxHighlighterProps } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import Message from "./message";
import GeneratePDFCell from "./tools/generate-pdf";
import KuroProcess from "./tools/kuro-process";

interface ToolCallProps {
  toolCall: ToolCallItem;
}

const SyntaxHighlighter =
  Prism as unknown as typeof React.Component<SyntaxHighlighterProps>;

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
              <SyntaxHighlighter
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
              </SyntaxHighlighter>
            </div>
            <div className="max-h-96 overflow-y-scroll mx-6 p-2 text-xs">
              {toolCall.output ? (
                <>
                  {getErrorMessage(toolCall.output) || (
                    <>
                      <SyntaxHighlighter
                        customStyle={{
                          backgroundColor: "#fafafa",
                          padding: "8px",
                          paddingLeft: "0px",
                          marginTop: 0,
                        }}
                        language="json"
                        style={coy}
                        className={getErrorStyle(toolCall.output)}
                      >
                        {JSON.stringify(JSON.parse(toolCall.output), null, 2)}
                      </SyntaxHighlighter>
                    </>
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

export default function ToolCall({ toolCall }: ToolCallProps) {
  const { isDisplayToolCallInChat } = useToolsStore();

  return (
    <div className="flex justify-start">
      {(() => {
        switch (toolCall.tool_type) {
          case "function_call":
            if (Object.keys(pdfToolCallTypeMap).includes(toolCall.name || "")) {
              return <GeneratePDFCell toolCall={toolCall} />;
            }
            if (isDisplayToolCallInChat && toolCall.name) {
              return <ApiCallCell toolCall={toolCall} />;
            }
            if (!isDisplayToolCallInChat && toolCall.name) {
              return <KuroProcess toolCall={toolCall} />;
            }
            return <Message message={toolCall} />;
          case "file_search_call":
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
