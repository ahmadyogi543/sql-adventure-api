import { Request } from "express";

export type UserPayload = {
  id: number;
  username: string;
  iat: number;
  exp: number;
};

export interface AuthRequest extends Request {
  user?: UserPayload;
}
