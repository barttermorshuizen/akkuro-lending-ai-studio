"use client";

import useAuthStore from "@/stores/useAuthStore";
import {
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  LucideGauge,
  MapPinMinus,
  SlidersVertical,
  TagIcon,
} from "lucide-react";
import { HTMLAttributes, useEffect, useState } from "react";
import ChatIcon from "./assets/icons/ChatIcon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Chat from "@/components/chat";
import { Item, processMessages } from "@/lib/assistant";
import useConversationStore from "@/stores/useConversationStore";
import { redirect } from "next/navigation";
import SimulateProductConfirmPopUp from "@/components/simulate-product-confirm-pop-up";
import ToolsPanel from "@/components/tools-panel";

interface InfoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: HTMLAttributes<HTMLButtonElement>["onClick"];
}

function InfoCard({ title, description, icon, onClick }: InfoCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex hover:scale-105 hover:shadow-lendingCardHover transition-all duration-300 flex-row text-start justify-between gap-8 bg-chatBackground rounded-lg py-8 px-6 items-center w-[423px]"
    >
      <div className="flex flex-col gap-2">
        <div className="text-xl lg:text-3xl font-light line-clamp-1">
          {title}
        </div>
        <div className="text-xs lg:text-sm line-clamp-1">{description}</div>
      </div>
      {icon}
    </button>
  );
}

export default function Lending() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { userInfo } = useAuthStore();

  const { chatMessages, addConversationItem, addChatMessage } =
    useConversationStore();

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userItem: Item = {
      type: "message",
      role: "user",
      content: [{ type: "input_text", text: message.trim() }],
      sendAt: new Date(),
    };
    const userMessage: any = {
      role: "user",
      content: message.trim(),
    };

    try {
      addConversationItem(userMessage);
      addChatMessage(userItem);
      await processMessages();
    } catch (error) {
      console.error("Error processing message:", error);
    }
  };

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  if (!userInfo) {
    redirect("/login");
  }

  return (
    <div className="h-full w-full flex flex-row mx-auto bg-chatBackground">
      <div className="flex-1 flex-col justify-center items-center h-full hidden xl:flex"></div>
      <div className="flex flex-1 flex-col justify-center xl:absolute top-16 left-0 xl:w-[70vw] shadow-lending bg-background xl:h-[calc(100vh-64px)] items-center">
        <div className="flex flex-col gap-16">
          <div className=" text-2xl xl:text-6xl xl:leading-normal text-white font-light px-4 xl:px-0">
            Welcome to Akkuro, <br />
            {userInfo.displayName}!
          </div>
          <div className="xl:grid flex flex-col xl:grid-cols-2 items-center justify-center gap-8">
            <InfoCard
              title="Scheduled work"
              description="View scheduled work."
              icon={<CalendarCheck className="size-6 lg:size-8" />}
            />
            <InfoCard
              title="Loan management"
              description="Manage existing loans and counterparties."
              icon={<LucideGauge className="size-6 lg:size-8" />}
            />
            <InfoCard
              title="Product configuration"
              description="Configure loan product"
              icon={<SlidersVertical className="size-6 lg:size-8" />}
              onClick={() => {
                window.open("/studio", "_blank");
              }}
            />
            <InfoCard
              title="Regional audit"
              description="Manage regional risk configuration for collaterals."
              icon={<MapPinMinus className="size-6 lg:size-8" />}
            />
            <InfoCard
              title="Pricing"
              description="Manage interest rates and fees"
              icon={<TagIcon className="size-6 lg:size-8" />}
            />
          </div>
        </div>
      </div>
      <div className="xl:w-[30vw] h-full bg-[url('/lending.svg')] bg-cover bg-center" />

      <SimulateProductConfirmPopUp />

      <Dialog>
        <DialogTrigger asChild>
          <button className="absolute shadow-xl z-[99999] bottom-8 rounded-full right-8 size-16 bg-white flex justify-center items-center hover:bg-gray-50 transition-colors">
            <ChatIcon className="size-8" />
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-[700px] bg-transparent border-none p-0">
          <DialogHeader className="hidden">
            <DialogTitle>Chat with Akkuro AI</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col h-[75vh] bg-chatBackground rounded-xl">
            <Chat items={chatMessages} onSendMessage={handleSendMessage} />
          </div>
        </DialogContent>
      </Dialog>
      {/* <div
        className={`hidden md:flex h-full overflow-hidden ${isCollapsed ? "w-12" : "w-1/3"} relative`}
      >
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
        <div
          className={`h-full w-full bg-white border-l overflow-auto flex flex-col transition-transform duration-300 ease-in-out ${isCollapsed ? "transform translate-x-full" : "transform translate-x-0"}`}
        >
          {!isCollapsed && (
            <div className="flex-grow overflow-auto p-4 pt-10">
              {" "}
              <ToolsPanel />
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
}
