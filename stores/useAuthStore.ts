import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  userInfo: {
    username: string;
    displayName: string;
  } | null;
  setUserInfo: (
    userInfo: { username: string; displayName: string } | null,
  ) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (userInfo) => {
        console.log("Setting user info:", userInfo);
        set({ userInfo });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
    },
  ),
);

// Subscribe to store changes
useAuthStore.subscribe((state) => {
  console.log("Store updated:", state);
});

export default useAuthStore;
