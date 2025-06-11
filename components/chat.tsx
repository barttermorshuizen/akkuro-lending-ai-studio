"use client";

import KuroChatIcon from "@/app/assets/icons/KuroChatIcon";
import { useChat } from "@/hooks/useChat";
import { Item } from "@/lib/assistant";
import useConversationStore from "@/stores/useConversationStore";
import { useTextToVoiceToggleStore } from "@/stores/useTextToVoiceToggleStore";
import useToolsStore from "@/stores/useToolsStore";
import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Annotations from "./annotations";
import Message from "./message";
import ToolCall from "./tool-call";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import VoiceInput from "./voice-input";

interface ChatProps {
  items: Item[];
  onSendMessage: (message: string) => void;
}

const Chat = ({ items, onSendMessage }: ChatProps) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const {
    handleKeyDown,
    setIsComposing,
    itemsEndRef,
    textareaRef,
    resetMessage,
    handleChoiceSelect,
  } = useChat({
    onSendMessage,
    items,
    listening,
    resetTranscript,
    transcript,
  });

  const { isProcessingNewMessage } = useConversationStore();
  const { isTextToVoiceEnabled, setIsTextToVoiceEnabled } =
    useTextToVoiceToggleStore();
  const { isDisplayToolCallInChat, setIsDisplayToolCallInChat } =
    useToolsStore();

  return (
    <div className={`flex flex-1 h-full flex-col`}>
      <div className="flex-1 rounded-t-xl bg-chatBackground overflow-y-auto px-6 flex flex-col">
        <div className="mt-auto flex flex-col space-y-5 pt-4">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {item.type === "tool_call" ? (
                <ToolCall toolCall={item} />
              ) : item.type === "message" ? (
                <div className="flex flex-col gap-1">
                  <Message message={item} onChoiceSelect={handleChoiceSelect} />
                  {item.content &&
                    item.content[0].annotations &&
                    item.content[0].annotations.length > 0 && (
                      <Annotations annotations={item.content[0].annotations} />
                    )}
                </div>
              ) : null}
            </React.Fragment>
          ))}
          {isProcessingNewMessage && (
            <div className="flex text-[15px] flex-col gap-1 items-start">
              <div className="flex gap-2 pb-1 items-center flex-row">
                <KuroChatIcon />
                <span className="text-[#BD00C4] font-bold">Kuro</span>
              </div>
              <div className={`flex items-center max-w-[85%] gap-2 flex-row`}>
                <div
                  className={`rounded-md flex shadow-messageChat px-4 py-3 w-fit bg-white rounded-tl-none text-black`}
                >
                  <div className="sound-loader" />
                </div>
              </div>
            </div>
          )}
          <div ref={itemsEndRef} />
        </div>
      </div>

      <div className="p-4 px-6 bg-chatBackground flex flex-col items-center rounded-b-xl">
        <div className="flex items-center w-full flex-1">
          <div className="flex w-full items-center pb-4 md:pb-0">
            <div className="flex w-full flex-col gap-1.5 rounded-lg pr-2.5 pl-1.5 transition-colors bg-white border border-stone-200 shadow-sm">
              <div className="flex items-center gap-1.5 md:gap-2 pl-4">
                <VoiceInput
                  listening={listening}
                  onClick={() => {
                    if (!browserSupportsSpeechRecognition) {
                      alert(
                        "Your browser does not support speech recognition.",
                      );
                      return;
                    }
                    if (!isMicrophoneAvailable) {
                      alert(
                        "Please enable microphone access in your browser settings.",
                      );
                      return;
                    }
                    if (listening) {
                      SpeechRecognition.stopListening();
                      resetTranscript();
                    } else {
                      SpeechRecognition.startListening({
                        continuous: true,
                      });
                    }
                  }}
                />
                <div className="flex min-w-0 flex-1 flex-col">
                  <textarea
                    readOnly={listening}
                    ref={textareaRef}
                    onClick={() => {
                      if (listening) {
                        SpeechRecognition.stopListening();
                        resetTranscript();
                      }
                    }}
                    id="prompt-textarea"
                    tabIndex={0}
                    dir="auto"
                    rows={1}
                    placeholder={listening ? "Listening..." : "Message..."}
                    className="mb-2 resize-none border-0 focus:outline-none text-sm bg-transparent px-0 pb-6 pt-4"
                    onChange={(e) => {
                      if (textareaRef.current) {
                        textareaRef.current.value = e.target.value;
                      }
                    }}
                    onKeyDown={handleKeyDown}
                    onCompositionStart={() => setIsComposing(true)}
                    onCompositionEnd={() => setIsComposing(false)}
                  />
                </div>
                <button
                  data-testid="send-button"
                  className="bg-primary text-white px-8 py-[10px] rounded-lg cursor-pointer"
                  onClick={() => {
                    if (listening) {
                      onSendMessage(transcript || "");
                      resetTranscript();
                    } else {
                      onSendMessage(textareaRef.current?.value || "");
                    }
                    resetMessage();
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 pt-2 w-full">
          <div>
            <div className="flex items-center gap-2 pl-4">
              <Switch
                id="text-to-voice"
                checked={isTextToVoiceEnabled}
                onCheckedChange={setIsTextToVoiceEnabled}
              />
              <Label
                htmlFor="text-to-voice"
                className="text-[#9e9791] pt-2 text-sm"
              >
                Text to Voice
              </Label>
            </div>
            <div className="flex items-center gap-2 pl-4">
              <Switch
                id="tool-call-shown-in-chat"
                checked={isDisplayToolCallInChat}
                onCheckedChange={setIsDisplayToolCallInChat}
              />
              <Label
                htmlFor="tool-call-shown-in-chat"
                className="text-[#9e9791] pt-2 text-sm"
              >
                Display Tool Calls
              </Label>
            </div>
          </div>
          <div className="text-[#9e9791] pt-2 text-sm flex-1 text-center">
            AI can make mistakes. Please check your response.
          </div>
        </div>
        {/* <button
          className="bg-primary text-white px-8 py-[10px] rounded-lg cursor-pointer"
          onClick={() => {
            console.log(
              "includeRegulatoryCheckFromInitialSetup",
              includeRegulatoryCheckFromInitialSetup,
            );
          }}
        >
          Test
        </button> */}
      </div>
    </div>
  );
};

export default Chat;
