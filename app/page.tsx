"use client";

import Assistant from "@/components/assistant";
import ToolsPanel from "@/components/tools-panel";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import useToolsStore from "@/stores/useToolsStore";
import { useState, useEffect } from "react";

export default function Main() {
  const [isToolsPanelOpen, setIsToolsPanelOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const setCountryCode = useToolsStore((state) => state.setCountryCode);

  useEffect(() => {
    async function initCountry() {
      try {
        const res = await fetch("/api/functions/read_product");
        if (res.ok) {
          const data = await res.json();
          if (data.countryCode) {
            setCountryCode(data.countryCode);
          }
        }
      } catch (error) {
        console.error("Error initializing country code:", error);
      }
    }
    initCountry();
  }, [setCountryCode]);

  return (
    <div className="flex h-screen bg-background relative">
      {/* Main content */}
      <div className={`${isCollapsed ? "w-full" : "w-full"} flex-1 h-full`}>
        <Assistant />
      </div>

      <div
        className={`hidden md:flex h-full overflow-hidden ${
          isCollapsed ? "w-12" : "w-1/3"
        } relative`}
      >
        {/* Collapse button */}
        <div className="absolute top-2 right-2 z-10">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 bg-white rounded shadow"
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>
        {/* Panel content */}
        <div
          className={`h-full w-full bg-white border-l overflow-auto flex flex-col transition-transform duration-300 ease-in-out ${
            isCollapsed
              ? "transform translate-x-full"
              : "transform translate-x-0"
          }`}
        >
          {!isCollapsed && (
            <div className="flex-grow overflow-auto p-4 pt-10">
              {" "}
              {/* Added padding top to account for button */}
              <ToolsPanel />
            </div>
          )}
        </div>
      </div>

      {/* Mobile hamburger */}
      <div className="absolute top-4 right-4 md:hidden">
        <button onClick={() => setIsToolsPanelOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile overlay */}
      {isToolsPanelOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-30">
          <div className="w-full md:w-1/3 bg-white h-full p-4">
            <button
              onClick={() => setIsToolsPanelOpen(false)}
              className="mb-4 p-2 bg-white rounded shadow"
            >
              <X size={20} />
            </button>
            <ToolsPanel />
          </div>
        </div>
      )}
    </div>
  );
}
