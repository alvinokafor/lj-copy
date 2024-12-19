import { create } from "zustand";
import {
  ImageData,
  IOnboardingState,
  IOnboardingStateActions,
  OnboardingStateKeys,
} from "@/lib/types/Stores";

const initialState: IOnboardingState = {
  phoneNumber: "",
  name: "",
  dob: "",
  gender: "",
  relationshipStatus: "",
  height: "",
  country: "",
  languages: [],
  job: "",
  highestDegree: "",
  bio: "",
  interests: [],
  images: [
    {
      title: "",
      uri: "",
    },
    {
      title: "",
      uri: "",
    },
    {
      title: "",
      uri: "",
    },
    {
      title: "",
      uri: "",
    },
  ],
  uploadedImages: ["", "", "", ""],
  displayImage: "",
  countryCode: "",
};

const useOnboardingStore = create<IOnboardingState & IOnboardingStateActions>(
  (set, get) => ({
    ...initialState,

    updateOnboardingData: <TValueType>(
      key: OnboardingStateKeys,
      value: TValueType
    ) => {
      set((state) => ({ ...state, [key]: value }));
    },

    updateProfileImages: ({
      imagePosition,
      imageData,
      action,
    }: {
      imagePosition: number;
      imageData?: ImageData;
      action: string;
    }) => {
      set((state) => {
        const updatedImages = [...state.images];
        switch (action) {
          case "remove":
            updatedImages[imagePosition] = { title: "", uri: "" };
            break;
          case "add":
            updatedImages[imagePosition] = imageData!;
            break;
        }
        return { ...state, images: updatedImages };
      });
    },

    setProfileImages: ({ images }: { images: ImageData[] }) => {
      set((state) => {
        return { ...state, images };
      });
    },

    setUploadedImages({ index, url }) {
      set((state) => {
        const updatedImageUrls = [...state.uploadedImages];
        updatedImageUrls[index] = url;

        return { ...state, uploadedImages: updatedImageUrls };
      });
    },
  })
);

export default useOnboardingStore;
