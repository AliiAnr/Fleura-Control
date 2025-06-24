import { jwtDecode } from "jwt-decode";

export interface JWTPayload {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export const getPayloadFromToken = (token: string): JWTPayload => {
  return jwtDecode<JWTPayload>(token);
};
