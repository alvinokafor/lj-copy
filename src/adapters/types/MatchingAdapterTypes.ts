export type UserProfile = {
  _id: string;
  firstName: string;
  lastName: string;
  profile_pic: string;
  email: string;
  isPhoneVerify: boolean;
  isOnboardingCompleted: boolean;
  onboarding: {
    isCompleted: boolean;
  };
  __v: number;
  dob: string; // or Date if parsing is needed
  dobAstral: string;
  gender: "MALE" | "FEMALE" | "OTHER"; // adjust based on potential values
  relationshipStatus: string;
  height: number;
  heightMetric: string;
  language: string;
  otherLanguages: string[];
  religion: string;
  job: string;
  degree: string;
  aboutMe: string;
  diasporaInvolvement: string[];
  phone: {
    number: string;
    code: string;
  };
  updated_at: string; // or Date if parsing is needed
  media: Array<{
    _id: string;
    url: string;
    index: number;
    mediaType?: string;
    objectKey?: string;
    bucket?: string;
    encryption?: string;
    etag?: string;
    user: string;
    created_at?: string; // or Date if parsing is needed
    updated_at?: string; // or Date if parsing is needed
    __v: number;
  }>;
};

export type DiscoverList = {
  data: UserProfile[];
  pagination: {
    currentPage: number;
    hasMore: boolean;
    totalPages: number;
    totalResults: number;
  };
};

export type CreateNewInteraction = {
  targetUserId: string;
  interactionType: "LIKE" | "SUPERLIKE" | "ROSES" | "DISLIKE";
  message?: string;
};
