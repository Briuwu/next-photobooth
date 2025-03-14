import { createStore } from "zustand/vanilla";

export type FiltersState = {
  photostrip: string;
  background: string;
  filter: string;
  dateEnabled: boolean;
};

export type FiltersActions = {
  setPhotostrip: (photostrip: string) => void;
  setBackground: (background: string) => void;
  setFilter: (filter: string) => void;
  setDateEnabled: () => void;
};

export type FiltersStore = FiltersState & FiltersActions;

export const defaultInitState: FiltersState = {
  photostrip: "#000",
  background: "#F6F0F0",
  filter: "black-and-white",
  dateEnabled: true,
};

export const createFiltersStore = (
  initState: FiltersState = defaultInitState,
) => {
  return createStore<FiltersStore>()((set) => ({
    ...initState,
    setPhotostrip: (photostrip) => set({ photostrip }),
    setBackground: (background) => set({ background }),
    setFilter: (filter) => set({ filter }),
    setDateEnabled: () => set((state) => ({ dateEnabled: !state.dateEnabled })),
  }));
};
