"use client";
import { Item, processMessages } from "@/lib/assistant";
import { listenToProductUpdates } from "@/lib/productSyncChannel";
import useConfiguringProductStore from "@/stores/useConfiguringProductStore";
import useConversationStore from "@/stores/useConversationStore";
import { useEffect } from "react";
import Chat from "../app/components/chat";
import Header from "./header";
import ProductScreen from "./product-screen";

export default function Assistant() {
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

  const { product, setProduct } = useConfiguringProductStore();

  useEffect(() => {
    listenToProductUpdates((incomingProduct) => {
      setProduct(incomingProduct);
    });
  }, [setProduct]);

  return (
    <div className="h-full flex p-4 w-full">
      <div className="flex flex-row justify-center items-center size-full">
        <div
          className={`flex flex-col w-full flex-1 ${
            !product
              ? "lg:max-w-[70%] xl:max-w-[50%] h-full"
              : "xl:max-w-[80vw]"
          }`}
        >
          <Header />

          {/* Main Container */}
          <div className="flex  h-[90vh] flex-col flex-1 lg:flex-row gap-8 w-full justify-center">
            {/* Chat Container */}
            <Chat items={chatMessages} onSendMessage={handleSendMessage} />

            <ProductScreen />
          </div>
        </div>
      </div>
    </div>
  );
}
