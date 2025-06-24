import { APIResponse, LoginResponse } from "@/types/api";
import api from "./api";

// import { getPayloadFromToken } from "@/helper/jwt";


export const login = async (email: string, password: string) => {
  const res = await api.post<APIResponse<LoginResponse>>("admin/auth/login", {
    email,
    password,
  });
  const token = res.data.data.access_token;

  // decode JWT
  // const payload = getPayloadFromToken(token);
  // const role = payload.role;

  // simpan ke localStorage
  localStorage.setItem("access_token", token);


  document.cookie = `access_token=${token}; path=/`;


  return { token};
};

export const logout = () => {
  localStorage.removeItem("access_token");

  document.cookie =
    "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

};
