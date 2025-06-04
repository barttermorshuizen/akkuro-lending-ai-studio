import { create } from "zustand";

export const useTextToVoiceToggleStore = create<{
  isTextToVoiceEnabled: boolean;
  setIsTextToVoiceEnabled: (isTextToVoiceEnabled: boolean) => void;
}>((set) => ({
  isTextToVoiceEnabled: false,
  setIsTextToVoiceEnabled: (isTextToVoiceEnabled) =>
    set({ isTextToVoiceEnabled }),
}));
