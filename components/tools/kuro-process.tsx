import { ToolCallItem } from "@/lib/assistant";
import { Zap } from "lucide-react";

export default function KuroProcess({ toolCall }: { toolCall: ToolCallItem }) {
  return (
    <div className="flex flex-col max-w-[70%] mb-[-8px]">
      <div className="w-full">
        <div className="flex flex-col text-sm rounded-[16px]">
          <div className="font-semibold px-3 pl-0 text-gray-700 rounded-b-none flex gap-2">
            <div className="flex gap-2 items-center text-blue-500 ml-[-8px]">
              <Zap size={16} />
              <div className="text-sm font-medium">
                {toolCall.status === "completed" && toolCall.output
                  ? `Kuro has completed his task`
                  : `Kuro is processing...`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
