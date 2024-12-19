import {
  useMutation,
  UseMutationResult,
  useQuery,
} from "@tanstack/react-query";
import { type MutationCallBackArgs, type QueryCallBackArgs } from "./types";
import ApiService from "./ApiService";
import { User } from "@/lib/types/User";
import { tanstackWrapper } from "./utils/TanstackWrapper";

// api service initilizer
const authService = new ApiService("public/auth");
const useAuthMutation = tanstackWrapper.mutation;
const useAuthQuery = tanstackWrapper.query;

type SignOnPayload = {
  data: {
    displayName: string;
    email: string;
    emailVerified: boolean;
    photoURL: string;
  };
};

const AuthAdapter = {
  googleSignOn: async ({
    payload,
  }: MutationCallBackArgs<SignOnPayload>): Promise<User> => {
    const response = await authService.mutate<SignOnPayload, User>({
      slug: "sign-on",
      payload,
      type: "JSON",
      method: "POST",
    });
    return response.data;
  },
};

export { AuthAdapter, useAuthMutation, useAuthQuery };
