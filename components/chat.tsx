"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import ToolCall from "./tool-call";
import Message from "./message";
import Annotations from "./annotations";
import VoiceInput from "./voice-input";
import { Item } from "@/lib/assistant";

interface ChatProps {
  items: Item[];
  onSendMessage: (message: string) => void;
}

const Chat: React.FC<ChatProps> = ({ items, onSendMessage }) => {
  const itemsEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [inputMessageText, setinputMessageText] = useState<string>("");
  const [isListening, setIsListening] = useState(false);
  // This state is used to provide better user experience for non-English IMEs such as Japanese
  const [isComposing, setIsComposing] = useState(false);

  const handleChoiceSelect = useCallback((choice: string) => {
    setinputMessageText(choice);
    // Focus the textarea after setting the text
    textareaRef.current?.focus();
  }, []);

  const handleVoiceTranscript = useCallback((transcript: string) => {
    setinputMessageText(transcript);
  }, []);

  const scrollToBottom = () => {
    itemsEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey && !isComposing) {
        event.preventDefault();
        onSendMessage(inputMessageText);
        setinputMessageText("");
      }
    },
    [onSendMessage, inputMessageText, isComposing],
  );

  useEffect(() => {
    scrollToBottom();
  }, [items]);

  return (
    <div className="flex justify-center items-center size-full">
      <div className="flex grow flex-col h-full max-w-[750px]">
        <div className="flex flex-row items-center py-4 gap-2">
          <div className="text-3xl font-bold text-white">Akkuro</div>
          <div className="text-xs text-white">Chatbot v1</div>
        </div>
        <div className="h-[90vh] rounded-t-xl bg-chatBackground overflow-y-auto px-6 flex flex-col">
          <div className="mt-auto space-y-5 pt-4">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                {item.type === "tool_call" ? (
                  <ToolCall toolCall={item} />
                ) : item.type === "message" ? (
                  <div className="flex flex-col gap-1">
                    <Message
                      message={item}
                      onChoiceSelect={handleChoiceSelect}
                    />
                    {item.content &&
                      item.content[0].annotations &&
                      item.content[0].annotations.length > 0 && (
                        <Annotations
                          annotations={item.content[0].annotations}
                        />
                      )}
                  </div>
                ) : null}
              </React.Fragment>
            ))}
            <div ref={itemsEndRef} />
          </div>
        </div>
        <div className="flex-1 p-4 px-6 bg-chatBackground flex flex-col items-center rounded-b-xl">
          <div className="flex items-center w-full flex-1">
            <div className="flex w-full items-center pb-4 md:pb-1">
              <div className="flex w-full flex-col gap-1.5 rounded-lg pr-2.5 pl-1.5 transition-colors bg-white border border-stone-200 shadow-sm">
                <div className="flex items-center gap-1.5 md:gap-2 pl-4">
                  <VoiceInput
                    onTranscript={handleVoiceTranscript}
                    isListening={isListening}
                    setIsListening={setIsListening}
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <textarea
                      ref={textareaRef}
                      id="prompt-textarea"
                      tabIndex={0}
                      dir="auto"
                      rows={2}
                      placeholder={isListening ? "Listening..." : "Message..."}
                      className="mb-2 resize-none border-0 focus:outline-none text-sm bg-transparent px-0 pb-6 pt-4"
                      value={inputMessageText}
                      onChange={(e) => setinputMessageText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onCompositionStart={() => setIsComposing(true)}
                      onCompositionEnd={() => setIsComposing(false)}
                    />
                  </div>
                  <button
                    disabled={!inputMessageText}
                    data-testid="send-button"
                    className="bg-primary text-white px-4 py-3 rounded-lg cursor-pointer"
                    onClick={() => {
                      onSendMessage(inputMessageText);
                      setinputMessageText("");
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="text-[#9e9791] pt-2 text-sm">
            AI can make mistakes. Please check your response.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
