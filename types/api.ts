export interface APIResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}
export interface LoginResponse {
  access_token: string;
}