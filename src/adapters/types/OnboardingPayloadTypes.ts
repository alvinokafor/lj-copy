export type SetNamePayload = {
  firstName: string;
  lastName: string;
};

export type VerifyNumberPayload = {
  phoneNumber: string;
  countryCode: string;
  otp: string;
};

export type DateOfBirthPayload = {
  dob: string | undefined;
  starSign: string;
};

export type GenderPayload = {
  gender: string;
};

export type RelationshipStatusPayload = {
  relationshipType: string;
};

export type HeightPayload = {
  height: number;
  metric: "cm" | "ft" | string;
};

export type LanguagesPayload = {
  lang: string;
  otherlang: string[];
};

export type ReligionPayload = {
  religion: string;
};

export type DegreePayload = {
  degree: string;
};

export type AboutMePayload = {
  aboutMe: string;
};

export type DiasporaInvolvementPayload = {
  diasporaInvolvement: string[];
};

export type JobPayload = {
  job: string;
};

export type CountryPayload = {
  country: string;
};

export type UploadMediaResponse = {
  data: {
    Bucket: string;
    ETag: string;
    Key: string;
    Location: string;
    ServerSideEncryption: string;
    publicUrl: string;
    uploaded: boolean;
  }[];
};

export type SaveUserMediaPayload = {
  data: {
    title: string;
    caption: string;
    index: number;
    url: string;
    isDisplayImage: boolean;
  }[];
};

export type OnboardingProgressResponse = {
  data: { score: number };
  error_code: null;
  success: true;
};
