import { create } from "zustand";

interface MainStore {
  apikey: string | null;
  setApikey: (token: string) => void;
}

export const useMainStore = create<MainStore>((set) => ({
  apikey: null,
  setApikey: (apikey: string | null) => set({ apikey }),
}));
