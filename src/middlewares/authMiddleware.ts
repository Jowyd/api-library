import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import { Request } from "express";
import { JWTPayload } from "../dto/authentication.dto";
import { hasPermission } from "../auth/user";
import { Permission, Resource } from "../types/auth.types";

export const expressAuthentication = (
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<JWTPayload> => {
  if (securityName === "jwt") {
    const token: string | undefined = request.headers["authorization"];

    if (!token) {
      return Promise.reject(new Error("No token provided"));
    }

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error("No token provided"));
        return;
      }

      const tokenString = token.split(" ")[1];

      jwt.verify(tokenString, JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
          reject(new Error("Invalid token"));
          return;
        }

        if (scopes?.length) {
          const [resource, permission] = scopes[0].split(":");
          if (
            !hasPermission(
              decoded.role,
              resource as Resource,
              permission as Permission
            )
          ) {
            reject(new Error("Insufficient permissions"));
          }
        }

        resolve(decoded);
      });
    });
  }

  return Promise.reject(new Error("Unknown security name"));
};
