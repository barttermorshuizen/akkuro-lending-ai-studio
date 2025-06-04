import { INITIAL_CONVERSATION_ITEM, INITIAL_MESSAGE } from "@/config/constants";
import { Item } from "@/lib/assistant";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { create } from "zustand";

interface ConversationState {
  chatMessages: Item[];
  conversationItems: ChatCompletionMessageParam[];
  conversationStates: string[];
  conversationState: string;
  setChatMessages: (items: Item[]) => void;
  setConversationItems: (messages: ChatCompletionMessageParam[]) => void;
  addChatMessage: (item: Item) => void;
  addConversationItem: (message: ChatCompletionMessageParam) => void;
  setConversationState: (state: string) => void;
  rawSet: (state: any) => void;
  resetConversation: () => void;
  isProcessingNewMessage: boolean;
  setIsProcessingNewMessage: (isProcessing: boolean) => void;
}

const CONVERSATION_STATES = [
  "InitialSetup",
  "SetRegulatoryCheckAtEveryStep",
  "LoanParameters",
  "AcceptanceCriteria",
  "Pricing",
  "RegulatoryCheck",
  "GoLive",
];

const useConversationStore = create<ConversationState>((set, get) => ({
  chatMessages: [
    {
      type: "message",
      role: "system",
      content: [
        {
          type: "output_text",
          text: INITIAL_MESSAGE.trim(),
        },
      ],
      sendAt: new Date(),
      isFinal: true,
    },
  ],
  conversationItems: [INITIAL_CONVERSATION_ITEM],
  conversationStates: CONVERSATION_STATES,
  conversationState: CONVERSATION_STATES[0],
  setChatMessages: (items) => set({ chatMessages: items }),
  setConversationItems: (messages) => set({ conversationItems: messages }),
  addChatMessage: (item) =>
    set({ chatMessages: [...get().chatMessages, item] }),
  addConversationItem: (message) =>
    set({ conversationItems: [...get().conversationItems, message] }),
  setConversationState: (state) => set({ conversationState: state }),
  rawSet: set,
  resetConversation: () =>
    set({
      chatMessages: [
        {
          type: "message",
          role: "system",
          content: [
            {
              type: "output_text",
              text: INITIAL_MESSAGE.trim(),
            },
          ],
          isFinal: true,
        },
      ],
      conversationItems: [INITIAL_CONVERSATION_ITEM],
      conversationState: CONVERSATION_STATES[0],
      isProcessingNewMessage: false,
    }),
  isProcessingNewMessage: false,
  setIsProcessingNewMessage: (isProcessing) =>
    set({ isProcessingNewMessage: isProcessing }),
}));

export default useConversationStore;
