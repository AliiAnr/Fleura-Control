import { APIResponse } from "@/types/api";


export const extractData = <T>(response: APIResponse<T>): T => {
  return response.data;
};
