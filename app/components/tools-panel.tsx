import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import ContextPanel from "../../components/tools-panel";

export default function ToolsPanel() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div
      className={`hidden md:flex h-full overflow-hidden ${isCollapsed ? "w-12" : "w-1/3"} relative`}
    >
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 bg-white rounded shadow"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <div
        className={`h-full w-full bg-white border-l overflow-auto flex flex-col transition-transform duration-300 ease-in-out ${isCollapsed ? "transform translate-x-full" : "transform translate-x-0"}`}
      >
        {!isCollapsed && (
          <div className="flex-grow overflow-auto p-4 pt-10">
            <ContextPanel />
          </div>
        )}
      </div>
    </div>
  );
}
