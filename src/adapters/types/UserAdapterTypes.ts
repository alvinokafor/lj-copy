export type UserProfile = {
  __v: number;
  _id: string;
  aboutMe: string;
  bride_price: string;
  children: string;
  country: string;
  currentSpecSetupState: null | string;
  degree: string;
  diasporaInvolvement: string[];
  dob: string; // ISO date string
  dobAstral: string;
  email: string;
  ethnicity: string;
  firstName: string;
  gender: "male" | "female" | "other";
  height: number;
  heightMetric: "ft" | "cm" | "in";
  heritage: string;
  id: string;
  isOnboardingCompleted: boolean;
  isPhoneVerify: boolean;
  isSpecUser: boolean;
  is_new: boolean;
  job: string;
  language: string;
  lastName: string;
  nextOnboardingState: string;
  onboarding: {
    isCompleted: boolean;
  };
  otherLanguages: string[];
  phone: {
    code: string;
    number: string;
  };
  postLoginState: string;
  profile_pic: string;
  relationshipStatus: string;
  religion: string;
  traditional_food_or_attire: string;
  traditional_roles: string;
  updated_at: string;
  referral: string;
};

export type UserProfileResponse = {
  data: UserProfile;
};

export type MediaItem = {
  caption: string;
  created_at: string;
  id: string;
  index: number;
  isDisplayImage: boolean;
  title: string;
  updated_at: string;
  url: string;
  user: string;
  __v: number;
  _id: string;
};

export type UserMediaResponse = {
  data: MediaItem[];
};

export type EditProfilePayload = {
  date_of_birth?: string;
  astral_sign?: string;
  religion?: string;
  gender?: string;
  height?: {
    value?: number;
    metric?: string;
  };
  job?: string;
  relationship?: string;
  diaspora?: string[];
  degree?: string;
  language?: string;
  otherLanguages?: string[];
  country?: string;
  about?: string;
};

export type SaveUserLocationPayload = {
  longitude: number | null;
  latitude: number | null;
};

export type UploadedFileData = {
  Bucket: string;
  ETag: string;
  Key: string;
  Location: string;
  ServerSideEncryption: string;
  publicUrl: string;
  uploaded: boolean;
};

export type UploadedFiles = {
  data: UploadedFileData[];
};

export type UpdateUserMediaPayload = {
  title: string;
  caption: string;
  isDisplayImage: boolean;
};
