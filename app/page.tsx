"use client";

import ProductPreview from "@/app/components/product-preview/product-preview";
import Chat from "@/components/chat";
import Show from "@/components/condition/show";
import SimulateProductConfirmPopUp from "@/components/simulate-product-confirm-pop-up";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Item, processMessages } from "@/lib/assistant";
import { resetProduct } from "@/services/resetProduct";
import useAuthStore from "@/stores/useAuthStore";
import useConfiguringProductStore from "@/stores/useConfiguringProductStore";
import useConversationStore from "@/stores/useConversationStore";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  LucideGauge,
  MapPinMinus,
  SlidersVertical,
  TagIcon,
} from "lucide-react";
import { redirect } from "next/navigation";
import { HTMLAttributes, useEffect, useRef, useState } from "react";
import ChatIcon from "./assets/icons/ChatIcon";
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
  const [showTooltip, setShowTooltip] = useState(true);

  const hasReset = useRef(false);

  const { userInfo } = useAuthStore();

  const {
    chatMessages,
    addConversationItem,
    addChatMessage,
    setIsProcessingNewMessage,
  } = useConversationStore();
  const { isDisplayProductPreview } = useConfiguringProductStore();

  useEffect(() => {
    if (showTooltip) {
      setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
    }
  }, [showTooltip]);

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
      setIsProcessingNewMessage(true);
      await processMessages();
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setIsProcessingNewMessage(false);
    }
  };

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasReset.current) {
      resetProduct();
      hasReset.current = true;
    }
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
        <div className="absolute z-[99999] bottom-12 right-12 flex items-end flex-col gap-4">
          <motion.div
            className={`flex justify-center items-center bg-white rounded-md p-[10px] shadow-chatTooltip mr-4 ${
              showTooltip ? "flex" : "hidden"
            }`}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0, scale: 1.2 }}
            transition={{
              type: "spring",
              stiffness: 600,
              damping: 20,
              delay: 0.5,
            }}
          >
            <div className="text-gray-800 text-sm">
              Hey, let&apos;s have a chat!
            </div>
          </motion.div>
          <DialogTrigger asChild>
            <button className="cursor-pointer flex justify-center items-center ">
              <ChatIcon className="size-[70px] text-white" />
            </button>
          </DialogTrigger>
        </div>
        <DialogContent
          className={`bg-transparent border-none p-0 ${
            isDisplayProductPreview
              ? "max-w-[90vw] xl:max-w-[75vw]"
              : "max-w-[90vw] xl:max-w-[45vw]"
          }`}
        >
          <DialogHeader className="hidden">
            <DialogTitle>Chat with Akkuro AI</DialogTitle>
          </DialogHeader>
          <div
            className={`flex flex-col lg:flex-row h-[95vh] overflow-y-auto lg:h-[90vh] divide-x-[1px] divide-solid divide-[#C5BFB9] py-4 bg-chatBackground rounded-xl`}
          >
            <Show when={isDisplayProductPreview}>
              <ProductPreview />
            </Show>
            <Chat items={chatMessages} onSendMessage={handleSendMessage} />
          </div>
        </DialogContent>
      </Dialog>
      {/* <ToolsPanel /> */}
    </div>
  );
}
