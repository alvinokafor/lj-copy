import { create } from "zustand";

const initialState: { showSpecModal: boolean } = {
  showSpecModal: true,
};

const useAppStore = create<
  { showSpecModal: boolean } & {
    setShowSpecModal: (value: boolean) => void;
  }
>((set, get) => ({
  ...initialState,

  setShowSpecModal: (value: boolean) => {
    set((state) => ({ ...state, showSpecModal: value }));
  },
}));

export default useAppStore;
