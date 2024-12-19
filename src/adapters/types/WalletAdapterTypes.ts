export type WalletBalance = {
  data: {
    __v: number;
    _id: string;
    balance: number;
    created_at: string;
    currency: string;
    updated_at: string;
    user: string;
  };
  error_code: string | null;
  success: boolean;
};

type MediaPayloadItem = {
  title: string;
  caption: string;
  index: number;
  url: string;
  isDisplayImage?: boolean;
};

export type UploadMediaPayload = MediaPayloadItem[];

export type WalletTransactionHistory = {
  _id: string;
  user: string;
  amount: number;
  interaction_type: string;
  created_at: string;
  updated_at: string;
  __v: number;
};

export type WalletTransactionHistoryResponse = {
  success: boolean;
  error_code: string | null;
  data: WalletTransactionHistory[];
};
