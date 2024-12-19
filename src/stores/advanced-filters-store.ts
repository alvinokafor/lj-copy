import { create } from "zustand";
import {
  IAdvancedFiltersState,
  IAdvancedFiltersStateActions,
  FilterKeys,
} from "@/lib/types/Stores";

const initialState: IAdvancedFiltersState = {
  age: {
    title: "Age",
    value: [],
    renderDirection: "row",
  },
  distance: {
    title: "Around You",
    value: [],
    renderDirection: "row",
  },
  astrologicalSign: {
    title: "Astrological Sign",
    value: [],
    renderDirection: "column",
  },
  educationLevel: {
    title: "Education Level",
    value: [],
    renderDirection: "column",
  },
  children: {
    title: "Children",
    value: [],
    renderDirection: "row",
  },
  height: {
    title: "Height",
    value: [],
    renderDirection: "row",
  },
  ethnicity: {
    title: "Ethnicity",
    value: [],
    renderDirection: "column",
  },
  religion: {
    title: "Religion",
    value: [],
    renderDirection: "column",
  },
  language: {
    title: "Language",
    value: [],
    renderDirection: "column",
  },
};

const useAdvancedFiltersStore = create<
  IAdvancedFiltersState & IAdvancedFiltersStateActions
>((set, get) => ({
  ...initialState,

  updateFilter: <TValueType>(key: FilterKeys, value: TValueType) => {
    set((state) => ({ ...state, [key]: { ...state[key], value } }));
  },
}));

export default useAdvancedFiltersStore;
