import ApiService from "./ApiService";
import { User } from "@/lib/types/User";
import { tanstackWrapper } from "./utils/TanstackWrapper";
import {
  EditProfilePayload,
  SaveUserLocationPayload,
  UpdateUserMediaPayload,
  UserMediaResponse,
  UserProfileResponse,
} from "./types/UserAdapterTypes";
import { MutationCallBackArgs } from "./types";
import { EventHandlerInternal } from "react-native-reanimated/lib/typescript/reanimated2/hook";
import {
  SaveUserMediaPayload,
  UploadMediaResponse,
} from "./types/OnboardingPayloadTypes";

// api service initilizer
const userService = new ApiService("protected/user");
const useUserMutation = tanstackWrapper.mutation;
const useUserQuery = tanstackWrapper.query;

const UserAdapter = {
  getUserProfile: async (
    _params: string | undefined
  ): Promise<UserProfileResponse> => {
    const response = await userService.fetch<UserProfileResponse>(`/profile`);

    return response;
  },
  getUserMedia: async (
    _params: string | undefined
  ): Promise<UserMediaResponse> => {
    const response = await userService.fetch<UserMediaResponse>(`/media`);

    return response;
  },
  deleteUserMedia: async ({
    payload,
  }: MutationCallBackArgs<{ mediaId: string }>) => {
    const response = await userService.mutate<{ mediaId: string }, {}>({
      slug: `media/${payload.mediaId}`,
      payload,
      type: "JSON",
      method: "DELETE",
    });
    return response;
  },
  editUserProfile: async ({
    payload,
  }: MutationCallBackArgs<EditProfilePayload>) => {
    const response = await userService.mutate<EditProfilePayload, {}>({
      slug: `profile/edit`,
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
  uploadMedia: async ({ payload }: MutationCallBackArgs<FormData>) => {
    const response = await userService.mutate<FormData, UploadMediaResponse>({
      slug: "media/upload",
      payload,
      type: "FormData",
      method: "POST",
    });
    return response;
  },
  saveUserMedia: async ({
    payload,
  }: MutationCallBackArgs<SaveUserMediaPayload>) => {
    const response = await userService.mutate<SaveUserMediaPayload, {}>({
      slug: "media/",
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
  saveUserLocation: async ({
    payload,
  }: MutationCallBackArgs<SaveUserLocationPayload>) => {
    const response = await userService.mutate<SaveUserLocationPayload, {}>({
      slug: "location",
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
  setDefaultMedia: async ({ payload, params }: MutationCallBackArgs<{}>) => {
    const response = await userService.mutate<{}, {}>({
      slug: `media/default/${params}`,
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
  updateUserMedia: async ({
    payload,
    params,
  }: MutationCallBackArgs<UpdateUserMediaPayload>) => {
    const response = await userService.mutate<UpdateUserMediaPayload, {}>({
      slug: `media/${params}`,
      payload,
      type: "JSON",
      method: "PATCH",
    });
    return response;
  },
};

export { UserAdapter, useUserMutation, useUserQuery };
