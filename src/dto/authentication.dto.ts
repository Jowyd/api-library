import { UserRole } from "../types/auth.types";

export interface AuthenticationInputDTO {
  grant_type: string;
  username: string;
  password: string;
}

export interface AuthenticationOutputDTO {
  message: string;
  token?: string;
}

export interface JWTPayload {
  userId: string;
  role: UserRole;
}
