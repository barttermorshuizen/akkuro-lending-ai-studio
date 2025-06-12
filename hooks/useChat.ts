import { Item } from "@/lib/assistant";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseChatProps {
  onSendMessage: (message: string) => void;
  items: Item[];
  listening: boolean;
  resetTranscript: () => void;
  transcript: string;
}

/**
 * Custom hook to manage the chat conversation
 * @param onSendMessage - Function to send message to the assistant
 * @param items - Array of chat items
 * @param listening - Whether the user is listening to the microphone
 * @param resetTranscript - Function to reset the transcript
 * @param transcript - The transcript of the user's voice input
 * @returns Object containing the following properties:
 * - itemsEndRef: Ref to the end of the items container
 * - textareaRef: Ref to the textarea element
 * - isComposing: Whether the user is composing a message
 * - handleVoiceTranscript: Function to handle voice transcript
 * - handleKeyDown: Function to handle key down event
 * - setIsComposing: Function to set the composing state
 * - resetMessage: Function to reset the message
 */
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
