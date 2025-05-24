// stores/useAudioCacheStore.ts
import { create } from "zustand";

type AudioCacheStore = {
  audioMap: Record<string, string>; // text → audio URL
  getAudioCacheUrl: (text: string) => string | undefined;
  setAudioCacheUrl: (text: string, url: string) => void;
};

const useAudioCacheStore = create<AudioCacheStore>((set, get) => ({
  audioMap: {},
  getAudioCacheUrl: (text) => get().audioMap[text],
  setAudioCacheUrl: (text, url) =>
    set((state) => ({
      audioMap: { ...state.audioMap, [text]: url },
    })),
}));

export default useAudioCacheStore;
