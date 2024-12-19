import { MutationCallBackArgs } from "./types";
import ApiService from "./ApiService";
import { tanstackWrapper } from "./utils/TanstackWrapper";
import {
  VerifyNumberPayload,
  SetNamePayload,
  DateOfBirthPayload,
  GenderPayload,
  RelationshipStatusPayload,
  HeightPayload,
  LanguagesPayload,
  ReligionPayload,
  JobPayload,
  DegreePayload,
  AboutMePayload,
  DiasporaInvolvementPayload,
  CountryPayload,
  UploadMediaResponse,
  SaveUserMediaPayload,
  OnboardingProgressResponse,
} from "./types/OnboardingPayloadTypes";

// api service initilizer
const onboardingService = new ApiService("protected");
const useOnboardingMutation = tanstackWrapper.mutation;
const useOnboardingQuery = tanstackWrapper.query;

const OnboardingAdapter = {
  verifyPhoneNumber: async ({
    payload,
  }: MutationCallBackArgs<VerifyNumberPayload>) => {
    const response = await onboardingService.mutate<VerifyNumberPayload, {}>({
      slug: "user/verify-phone",
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
  setName: async ({ payload }: MutationCallBackArgs<SetNamePayload>) => {
    const response = await onboardingService.mutate<SetNamePayload, {}>({
      slug: "user/onboarding/username",
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
  setDateOfBirth: async ({
    payload,
  }: MutationCallBackArgs<DateOfBirthPayload>) => {
    const response = await onboardingService.mutate<DateOfBirthPayload, {}>({
      slug: "user/onboarding/dob",
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
  setGender: async ({ payload }: MutationCallBackArgs<GenderPayload>) => {
    const response = await onboardingService.mutate<GenderPayload, {}>({
      slug: "user/onboarding/gender",
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
  setRelationshipStatus: async ({
    payload,
  }: MutationCallBackArgs<RelationshipStatusPayload>) => {
    const response = await onboardingService.mutate<
      RelationshipStatusPayload,
      {}
    >({
      slug: "user/onboarding/relationship",
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
  setHeight: async ({ payload }: MutationCallBackArgs<HeightPayload>) => {
    const response = await onboardingService.mutate<HeightPayload, {}>({
      slug: "user/onboarding/height",
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
  setLanguages: async ({ payload }: MutationCallBackArgs<LanguagesPayload>) => {
    const response = await onboardingService.mutate<LanguagesPayload, {}>({
      slug: "user/onboarding/language",
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
  setReligion: async ({ payload }: MutationCallBackArgs<ReligionPayload>) => {
    const response = await onboardingService.mutate<ReligionPayload, {}>({
      slug: "user/onboarding/religion",
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
  setJob: async ({ payload }: MutationCallBackArgs<JobPayload>) => {
    const response = await onboardingService.mutate<JobPayload, {}>({
      slug: "user/onboarding/job",
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
  setDegree: async ({ payload }: MutationCallBackArgs<DegreePayload>) => {
    const response = await onboardingService.mutate<DegreePayload, {}>({
      slug: "user/onboarding/degree",
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
  setBio: async ({ payload }: MutationCallBackArgs<AboutMePayload>) => {
    const response = await onboardingService.mutate<AboutMePayload, {}>({
      slug: "user/onboarding/about",
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
  setInterests: async ({
    payload,
  }: MutationCallBackArgs<DiasporaInvolvementPayload>) => {
    const response = await onboardingService.mutate<
      DiasporaInvolvementPayload,
      {}
    >({
      slug: "user/onboarding/diaspora",
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
  setCountry: async ({ payload }: MutationCallBackArgs<CountryPayload>) => {
    const response = await onboardingService.mutate<CountryPayload, {}>({
      slug: "user/onboarding/country",
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
  uploadMedia: async ({ payload }: MutationCallBackArgs<FormData>) => {
    const response = await onboardingService.mutate<
      FormData,
      UploadMediaResponse
    >({
      slug: "user/media/upload",
      payload,
      type: "FormData",
      method: "POST",
    });
    return response;
  },

  saveUserMedia: async ({
    payload,
  }: MutationCallBackArgs<SaveUserMediaPayload>) => {
    const response = await onboardingService.mutate<SaveUserMediaPayload, {}>({
      slug: "user/media/",
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
  getOnboardingProgress: async (
    _params: string | undefined
  ): Promise<OnboardingProgressResponse> => {
    const response = await onboardingService.fetch<OnboardingProgressResponse>(
      `/user/onboarding/score`
    );

    return response;
  },
};

export { OnboardingAdapter, useOnboardingMutation, useOnboardingQuery };
