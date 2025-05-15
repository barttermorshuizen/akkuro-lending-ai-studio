"use client";

import useAuthStore from "@/stores/useAuthStore";
import {
  CalendarCheck,
  LucideGauge,
  MapPinMinus,
  SlidersVertical,
  TagIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
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
        <div className="text-3xl font-light line-clamp-1">{title}</div>
        <div className="text-sm line-clamp-1">{description}</div>
      </div>
      {icon}
    </button>
  );
}

export default function Lending() {
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();

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

  useEffect(() => {
    if (isHydrated && !userInfo) {
      router.replace("/login");
    }
  }, [isHydrated, userInfo, router]);

  if (!isHydrated || !userInfo) {
    return null;
  }

  return (
    <div className="h-full w-full flex flex-row mx-auto">
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
              icon={<CalendarCheck className="size-8" />}
            />
            <InfoCard
              title="Loan management"
              description="Manage existing loans and counterparties."
              icon={<LucideGauge className="size-8" />}
            />
            <InfoCard
              title="Product configuration"
              description="Configure loan product"
              icon={<SlidersVertical className="size-8" />}
              onClick={() => {
                window.open("/studio", "_blank");
              }}
            />
            <InfoCard
              title="Regional audit"
              description="Manage regional risk configuration for collaterals."
              icon={<MapPinMinus className="size-8" />}
            />
            <InfoCard
              title="Pricing"
              description="Manage interest rates and fees"
              icon={<TagIcon className="size-8" />}
            />
          </div>
        </div>
      </div>
      <div className="xl:w-[30vw] h-full bg-[url('/lending.svg')] bg-cover bg-center" />
      <Dialog>
        <DialogTrigger asChild>
          <button className="absolute shadow-xl bottom-8 rounded-full right-8 size-16 bg-white flex justify-center items-center hover:bg-gray-50 transition-colors">
            <ChatIcon className="size-8" />
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-[700px] h-[700px] bg-transparent border-none p-0">
          <DialogHeader className="hidden">
            <DialogTitle>Chat with Akkuro AI</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col flex-1 h-full">
            <Chat items={chatMessages} onSendMessage={handleSendMessage} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
