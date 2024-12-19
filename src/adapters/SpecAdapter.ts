import { MutationCallBackArgs } from "./types";
import ApiService from "./ApiService";
import { tanstackWrapper } from "./utils/TanstackWrapper";
import {
  CulturalHeritagePayload,
  EthnicityPayload,
  TraditionalFoodOrAttirePayload,
  TraditionalRolesPayload,
  ChildrenPayload,
  BridePricePayload,
} from "./types/SpecAdapterTypes";

// api service initilizer
const specService = new ApiService("protected/user/spec");
const useSpecMutation = tanstackWrapper.mutation;
const useSpecQuery = tanstackWrapper.query;

const SpecAdapter = {
  setupEthnicty: async ({
    payload,
  }: MutationCallBackArgs<EthnicityPayload>) => {
    const response = await specService.mutate<EthnicityPayload, {}>({
      slug: "setup/ethnicity",
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
  setupCulturalHeritage: async ({
    payload,
  }: MutationCallBackArgs<CulturalHeritagePayload>) => {
    const response = await specService.mutate<CulturalHeritagePayload, {}>({
      slug: "setup/heritage",
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
  setupChildren: async ({ payload }: MutationCallBackArgs<ChildrenPayload>) => {
    const response = await specService.mutate<ChildrenPayload, {}>({
      slug: "setup/children",
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
  setupTraditionalRoles: async ({
    payload,
  }: MutationCallBackArgs<TraditionalRolesPayload>) => {
    const response = await specService.mutate<TraditionalRolesPayload, {}>({
      slug: "setup/traditional-roles",
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
  setupTraditionalFoodOrAttire: async ({
    payload,
  }: MutationCallBackArgs<TraditionalFoodOrAttirePayload>) => {
    const response = await specService.mutate<
      TraditionalFoodOrAttirePayload,
      {}
    >({
      slug: "setup/traditional-food-or-attire",
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
  setupBridePrice: async ({
    payload,
  }: MutationCallBackArgs<BridePricePayload>) => {
    const response = await specService.mutate<BridePricePayload, {}>({
      slug: "setup/bride-price",
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
  getSpecList: async (params: string | undefined): Promise<{}> => {
    const response = await specService.fetch<{}>(``);
    return response;
  },
};

export { SpecAdapter, useSpecMutation, useSpecQuery };
