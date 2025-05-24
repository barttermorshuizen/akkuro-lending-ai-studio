import { Item } from "@/lib/assistant";
import { useRef, useCallback, useEffect, useState } from "react";

interface UseChatProps {
  onSendMessage: (message: string) => void;
  items: Item[];
  listening: boolean;
  resetTranscript: () => void;
  transcript: string;
}

export const useChat = ({
  onSendMessage,
  items,
  listening,
  resetTranscript,
  transcript,
}: UseChatProps) => {
  const itemsEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // This state is used to provide better user experience for non-English IMEs such as Japanese
  const [isComposing, setIsComposing] = useState(false);

  const scrollToBottom = () => {
    itemsEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  const resetMessage = () => {
    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
  };

  const handleVoiceTranscript = useCallback((transcript: string) => {
    if (textareaRef.current) {
      textareaRef.current.value = transcript;
      textareaRef.current.focus();
    }
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey && !isComposing) {
        event.preventDefault();
        if (listening) {
          onSendMessage(transcript || "");
          resetTranscript();
        } else {
          onSendMessage(textareaRef.current?.value || "");
        }
        resetMessage();
      }
    },
    [isComposing, listening, onSendMessage, transcript, resetTranscript],
  );

  const handleChoiceSelect = useCallback((choice: string) => {
    if (textareaRef.current) {
      textareaRef.current.value = choice;
      textareaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [items]);

  useEffect(() => {
    if (listening && textareaRef.current) {
      textareaRef.current.value = transcript;
    }
  }, [listening, textareaRef, transcript]);

  return {
    itemsEndRef,
    textareaRef,
    isComposing,
    handleVoiceTranscript,
    handleKeyDown,
    setIsComposing,
    resetMessage,
    handleChoiceSelect,
  };
};
