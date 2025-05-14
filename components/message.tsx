import React from "react";
import ReactMarkdown from "react-markdown";
import { Item, MessageItem } from "@/lib/assistant";
import TextToSpeech from "./text-to-speech";

interface MessageProps {
  message: Item;
  onChoiceSelect?: (choice: string) => void;
}

const Message: React.FC<MessageProps> = ({ message, onChoiceSelect }) => {
  // Only process if it's a message item
  if (message.type !== "message") return null;

  const messageItem = message as MessageItem;
  const isAssistant =
    messageItem.role === "assistant" || messageItem.role === "system";
  const content = messageItem.content[0];
  const text = content?.text || "";
  // const choices = content?.choices || [];

  return (
    <div
      className={`flex text-[15px] flex-col gap-1 ${isAssistant ? "items-start" : "items-end"}`}
    >
      <div
        className={`flex gap-2 items-center ${isAssistant ? "flex-row" : "flex-row-reverse"}`}
      >
        <div className="font-bold">{isAssistant ? "Kuro" : "You"}</div>
        <div className="text-xs text-gray-500" suppressHydrationWarning={true}>
          {messageItem.sendAt?.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </div>
      </div>
      <div
        className={`flex items-center max-w-[85%] gap-2 ${isAssistant ? "flex-row" : "flex-row-reverse"}`}
      >
        <div
          className={`rounded-md flex shadow-messageChat px-4 py-3 w-fit ${
            isAssistant
              ? "bg-white rounded-tl-none text-black"
              : "bg-primary text-white rounded-tr-none"
          }`}
        >
          <div className="markdown-content [&>*]:block [&>*]:mb-2 last:[&>*]:mb-0">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        </div>
        {isAssistant && <TextToSpeech text={text} />}
      </div>
      {/* {isAssistant && choices.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {choices.map((choice: string, index: number) => (
            <button
              key={index}
              className="bg-white text-black px-4 py-2 rounded-xl shadow-messageChat hover:bg-gray-100 transition-colors"
              onClick={() => onChoiceSelect?.(choice)}
            >
              {choice}
            </button>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default Message;
