export interface IOnboardingState {
  phoneNumber: string;
  name: string;
  dob: string;
  gender: "male" | "female" | string;
  relationshipStatus: string;
  height: string;
  country: string;
  languages: string[];
  job: string;
  highestDegree: string;
  bio: string;
  interests: string[];
  images: ImageData[];
  displayImage: string;
  countryCode: string;
  uploadedImages: string[];
}

export type ImageData = {
  title: string;
  uri: string;
};

export type OnboardingStateKeys = keyof IOnboardingState;

export interface IOnboardingStateActions {
  updateOnboardingData: <TValueType>(
    key: OnboardingStateKeys,
    value: TValueType
  ) => void;
  updateProfileImages: ({
    imagePosition,
    imageData,
    action,
  }: {
    imagePosition: number;
    imageData?: ImageData;
    action: "remove" | "add";
  }) => void;
  setProfileImages: ({ images }: { images: ImageData[] }) => void;
  setUploadedImages: ({ index, url }: { index: number; url: string }) => void;
}

type FilterValue = number[] | string[];
type FilterRenderDirection = "row" | "column";

export enum FilterKeys {
  age = "age",
  distance = "distance",
  astrologicalSign = "astrologicalSign",
  educationLevel = "educationLevel",
  children = "children",
  height = "height",
  ethnicity = "ethnicity",
  religion = "religion",
  language = "language",
}

interface Filter {
  title: string;
  value: FilterValue;
  renderDirection: FilterRenderDirection;
}

export type IAdvancedFiltersState = {
  [key in FilterKeys]: Filter;
};

export type FilterStateKeys = keyof IAdvancedFiltersState;

export interface IAdvancedFiltersStateActions {
  updateFilter: <TValueType>(key: FilterKeys, value: TValueType) => void;
}

export interface IProfileState {
  images: ImageData[];
}

export interface IProfileStateActions {
  addProfileImages: ({ imageData }: { imageData: ImageData[] }) => void;
  updatePhotoTitle: ({
    imageIndex,
    title,
  }: {
    imageIndex: number;
    title: string;
  }) => void;
  removePhoto: ({ imageIndex }: { imageIndex: number }) => void;
  clearImages: () => void;
}
