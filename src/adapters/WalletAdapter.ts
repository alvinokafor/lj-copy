import ApiService from "./ApiService";
import { tanstackWrapper } from "./utils/TanstackWrapper";
import { UserProfileResponse } from "./types/UserAdapterTypes";
import {
  WalletBalance,
  WalletTransactionHistoryResponse,
} from "./types/WalletAdapterTypes";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

// api service initilizer
const walletService = new ApiService("protected/user");
const useWalletMutation = tanstackWrapper.mutation;
const useWalletQuery = tanstackWrapper.query;

const WalletAdapter = {
  getWalletBalance: async (
    _params: string | undefined
  ): Promise<WalletBalance> => {
    const response = await walletService.fetch<WalletBalance>(`/wallet`);

    return response;
  },
  getWalletTransactionHistory: async (
    _params: string | undefined
  ): Promise<WalletTransactionHistoryResponse> => {
    const response =
      await walletService.fetch<WalletTransactionHistoryResponse>(
        `/transactions/activity`
      );

    return response;
  },
};

export { WalletAdapter, useWalletMutation, useWalletQuery };
