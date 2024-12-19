import { AxiosResponse } from "axios";
import { apiInstance } from "./config";
import { getData } from "@/utils/data-store";

type Method = "POST" | "PUT" | "PATCH" | "DELETE";
type ContentType = "JSON" | "FormData";

type MutateArgs<R> = {
  slug?: string;
  payload: R;
  type: ContentType;
  method: Method;
};

class ApiService {
  public url: string;

  constructor(url: string) {
    this.url = url;
  }

  //method to fetch the auth token dynamically
  private async getToken() {
    const token = await getData("accessToken");
    return token;
  }

  //fetches all data
  async fetch<TData>(params: string): Promise<TData> {
    const token = await this.getToken();
    const res = await apiInstance.get(`${this.url}${params}`, {
      headers: { Authorization: token },
    });
    return res.data as TData;
  }

  // handles mutation requests => POST, PATCH, PUT, DELETE
  /* "slug" can be an id or an extra path to be added to the base url, 
  pass in an empty string if you have no need for a slug(POST methods only) */
  async mutate<TPayload, TResponse>({
    slug,
    payload,
    type,
    method,
  }: MutateArgs<TPayload>): Promise<AxiosResponse<TResponse>> {
    const token = await this.getToken();
    const contentType =
      type === "FormData" ? "multipart/form-data" : "application/json";
    const url = `${this.url}${slug ? "/" + slug : ""}`;
    const headers = {
      Authorization: token ? token : "",
      "Content-Type": contentType,
    };

    const config = {
      method,
      url,
      [method === "DELETE" ? "data" : "data"]: payload,
      headers,
    };

    return await apiInstance.request<TResponse>(config);
  }
}

export default ApiService;
