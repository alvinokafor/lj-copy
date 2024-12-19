import {
  MutationCallBackArgs,
  QueryCallBack,
  QueryCallBackArgs,
} from "./types";
import ApiService from "./ApiService";
import { tanstackWrapper } from "./utils/TanstackWrapper";
import {
  DiscoverList,
  UserProfile,
  CreateNewInteraction,
} from "./types/MatchingAdapterTypes";

// api service initilizer
const matchingService = new ApiService("protected/user/matching");
const useMatchingMutation = tanstackWrapper.mutation;
const useMatchingQuery = tanstackWrapper.query;

const MatchingAdapter = {
  getDiscoverList: async (
    params: string | undefined
  ): Promise<DiscoverList> => {
    const response = await matchingService.fetch<DiscoverList>(
      `/discover?page=1&limit=10${params}`
    );
    return response;
  },

  createNewInteraction: async ({
    payload,
  }: MutationCallBackArgs<CreateNewInteraction>) => {
    const response = await matchingService.mutate<CreateNewInteraction, {}>({
      slug: "interaction",
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
};

export { useMatchingMutation, useMatchingQuery, MatchingAdapter };
