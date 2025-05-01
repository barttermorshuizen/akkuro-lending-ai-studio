import { MessageItem } from "@/lib/assistant";
import React from "react";
import ReactMarkdown from "react-markdown";
import ChoicePanel from "./choice-panel";

interface MessageProps {
  message: MessageItem;
  onChoiceSelect?: (choice: string) => void;
}

const Message: React.FC<MessageProps> = ({ message, onChoiceSelect }) => {
  return (
    <div className="text-sm">
      {message.role === "user" ? (
        <div className="flex justify-end">
          <div>
            <div className="ml-4 rounded-[16px] px-4 py-2 md:ml-24 bg-[#ededed] text-stone-900  font-light">
              <div>
                <div>
                  <ReactMarkdown>
                    {message.content[0].text as string}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex">
            <div className="mr-4 rounded-[16px] px-4 py-2 md:mr-24 text-black bg-white font-light">
              <div>
                {/* Render text content. If choices are present, the text should be the clean text from the JSON. */}
                <ReactMarkdown>
                  {message.content[0].text as string}
                </ReactMarkdown>
                {/* Render ChoicePanel only if choices are present */}
                {message.content[0].choices && onChoiceSelect && (
                  <ChoicePanel
                    choices={message.content[0].choices}
                    onSelect={onChoiceSelect}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
