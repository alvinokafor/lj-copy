export interface User {
  token: string;
  user: {
    _id: string;
    diasporaInvolvement: string[];
    email: string;
    firstName: string;
    id: string;
    isOnboardingCompleted: boolean;
    isPhoneVerify: boolean;
    lastName: string;
    nextOnboardingState: string;
    onboarding: { isCompleted: boolean };
    otherLanguages: string[];
    postLoginState: string;
    profile_pic: string;
  };
}
