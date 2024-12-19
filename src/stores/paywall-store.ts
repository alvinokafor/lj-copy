import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface PaywallStore {
  // Whether the paywall should be shown
  shouldShowPaywall: boolean;

  // Function to set paywall visibility
  setShouldShowPaywall: (show: boolean) => void;

  // Optional: Track paywall-related conditions
  paywallTriggerCount: number;
  incrementPaywallTrigger: () => void;

  // Method to check if paywall should be shown
  shouldTriggerPaywall: () => boolean;
}

const usePaywallStore = create<PaywallStore>()(
  persist(
    (set, get) => ({
      // Default state
      shouldShowPaywall: false,
      paywallTriggerCount: 0,

      // Set paywall visibility
      setShouldShowPaywall: (show) => set({ shouldShowPaywall: show }),

      // Increment paywall trigger count
      incrementPaywallTrigger: () =>
        set((state) => ({
          paywallTriggerCount: state.paywallTriggerCount + 1,
        })),

      // Complex logic for showing paywall
      shouldTriggerPaywall: () => {
        const { paywallTriggerCount, shouldShowPaywall } = get();

        // Example conditions:
        // 1. Explicit flag
        if (shouldShowPaywall) return true;

        // 2. Trigger after certain number of actions
        if (paywallTriggerCount >= 3) return true;

        return false;
      },
    }),
    {
      name: "paywall-storage", // unique name
      storage: createJSONStorage(() => AsyncStorage),

      // Specify which parts of the state to persist
      partialize: (state) => ({
        paywallTriggerCount: state.paywallTriggerCount,
      }),
    }
  )
);

export default usePaywallStore;
