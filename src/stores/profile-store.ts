import { create } from "zustand";
import {
  ImageData,
  IProfileState,
  IProfileStateActions,
} from "@/lib/types/Stores";

const initialState: IProfileState = {
  images: [],
};

const useProfileStore = create<IProfileState & IProfileStateActions>(
  (set, get) => ({
    ...initialState,

    addProfileImages: ({ imageData }: { imageData: ImageData[] }) => {
      set((state) => {
        return { ...state, images: [...imageData, ...state.images] };
      });
    },

    updatePhotoTitle: ({
      imageIndex,
      title,
    }: {
      imageIndex: number;
      title: string;
    }) => {
      set((state) => {
        const updatedImages = [...state.images];
        updatedImages[imageIndex].title = title;
        return { ...state, images: updatedImages };
      });
    },

    removePhoto: ({ imageIndex }: { imageIndex: number }) => {
      set((state) => {
        const updatedImages = [...state.images];
        updatedImages.splice(imageIndex, 1);
        return { ...state, images: updatedImages };
      });
    },

    clearImages: () => {
      set((state) => {
        return { ...state, images: [] };
      });
    },
  })
);

export default useProfileStore;
