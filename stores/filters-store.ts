import { createStore } from "zustand/vanilla";

export type FiltersState = {
  photostrip: string;
  background: string;
  filter: string;
};

export type FiltersActions = {
  setPhotostrip: (photostrip: string) => void;
  setBackground: (background: string) => void;
  setFilter: (filter: string) => void;
};

export type FiltersStore = FiltersState & FiltersActions;

export const defaultInitState: FiltersState = {
  photostrip: "bg-black",
  background: "bg-white",
  filter: "black-and-white",
};

export const createFiltersStore = (
  initState: FiltersState = defaultInitState,
) => {
  return createStore<FiltersStore>()((set) => ({
    ...initState,
    setPhotostrip: (photostrip) => set({ photostrip }),
    setBackground: (background) => set({ background }),
    setFilter: (filter) => set({ filter }),
  }));
};
